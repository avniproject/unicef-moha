# <makefile>
# Objects: refdata, package
# Actions: clean, build, deploy
help:
	@IFS=$$'\n' ; \
	help_lines=(`fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//'`); \
	for help_line in $${help_lines[@]}; do \
	    IFS=$$'#' ; \
	    help_split=($$help_line) ; \
	    help_command=`echo $${help_split[0]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
	    help_info=`echo $${help_split[2]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
	    printf "%-30s %s\n" $$help_command $$help_info ; \
	done
# </makefile>

port:= $(if $(port),$(port),8021)
server:= $(if $(server),$(server),http://localhost)
server_url:=$(server):$(port)

su:=$(shell id -un)
org_admin_name=mdr-admin

define _curl
	curl -X $(1) $(server_url)/$(2) -d $(3)  \
		-H "Content-Type: application/json"  \
		-H "USER-NAME: $(org_admin_name)"  \
		$(if $(token),-H "AUTH-TOKEN: $(token)",)
	@echo
	@echo
endef

define _curl_as_openchs
	curl -X $(1) $(server_url)/$(2) -d $(3)  \
		-H "Content-Type: application/json"  \
		-H "USER-NAME: admin"  \
		$(if $(token),-H "AUTH-TOKEN: $(token)",)
	@echo
	@echo
endef

auth:
	$(if $(poolId),$(eval token:=$(shell node scripts/token.js $(poolId) $(clientId) $(username) $(password))))

auth-print: auth
	@echo $(token)

# <create_org>
create_org: ## Create MDSR org and user+privileges
	psql -U$(su) openchs < create_organisation.sql
# </create_org>

# <refdata>
deploy_admin_user:
	$(call _curl_as_openchs,POST,users,@users/dev-admin-user.json)

deploy_test_users:
	$(call _curl,POST,users,@users/dev-users.json)

deploy_concepts:
	$(call _curl,POST,concepts,@concepts.json)
	$(call _curl,POST,concepts,@cbmdr/CommunityBasedVerbalAutopsyFormConcept.json)

deploy_subjects:
	$(call _curl,POST,operationalSubjectTypes,@operationalModules/operationalSubjectTypes.json)

deploy_r:
	$(call _curl,POST,forms,@registrationForm.json)

deploy_refdata: deploy_subjects deploy_concepts
	$(call _curl,POST,locations,@locations/districts.json)
	$(call _curl,POST,locations,@locations/blocks.json)
	$(call _curl,POST,locations,@locations/phcs.json)
	$(call _curl,POST,catchments,@catchments.json)
	$(call _curl,POST,facilities,@test-facilities.json)
	$(call _curl,POST,programs,@programs.json)
	$(call _curl,POST,encounterTypes,@encounterTypes.json)
	$(call _curl,POST,operationalEncounterTypes,@operationalModules/operationalEncounterTypes.json)
	$(call _curl,POST,operationalPrograms,@operationalModules/operationalPrograms.json)

	$(call _curl,POST,forms,@fbmdr/FacilityBasedMaternalDeathReviewForm.json)
	$(call _curl,POST,forms,@cbmdr/CommunityBasedVerbalAutopsy.json)
	$(call _curl,POST,forms,@MaternalDeathCaseSummaryForm.json)
	$(call _curl,POST,forms,@MaternalDeathNotificationForm.json)

	$(call _curl,POST,forms,@registrationForm.json)

	$(call _curl,POST,formMappings,@formMappings.json)

# </refdata>

# <deploy>
deploy: deploy_admin_user deploy_refdata deploy_rules deploy_test_users

deploy_wo_users: deploy_refdata deploy_rules

deploy_rules:
	node index.js "$(server_url)" "$(token)" "$(org_admin_name)"

deploy_staging:
	make auth deploy_wo_users poolId=$(OPENCHS_STAGING_USER_POOL_ID) clientId=$(OPENCHS_STAGING_APP_CLIENT_ID) server=https://staging.openchs.org port=443 username=$(org_admin_name) password=$(password)

create_deploy: create_org deploy ##
# </c_d>



deps:
	npm i

# <package>
#build_package: ## Builds a deployable package
#	rm -rf output/impl
#	mkdir -p output/impl
#	cp registrationForm.json catchments.json deploy.sh output/impl
#	cd output/impl && tar zcvf ../openchs_impl.tar.gz *.*
# </package>
