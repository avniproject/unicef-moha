set role unicef_moha;

drop view if exists unicef_moha_individual_registration_view;
create view unicef_moha_individual_registration_view as
SELECT individual.id                     as "Ind.Id",
       individual.address_id             as "Ind.address_id",
       individual.uuid                   as "Ind.uuid",
       individual.first_name             as "Ind.first_name",
       individual.last_name              as "Ind.last_name",
       g.name                            as "Ind.Gender",
       individual.date_of_birth          as "Ind.date_of_birth",
       individual.date_of_birth_verified as "Ind.date_of_birth_verified",
       individual.registration_date      as "Ind.registration_date",
       individual.facility_id            as "Ind.facility_id",
       a.title                           as "Ind.Area",
       individual.is_voided              as "Ind.is_voided"
FROM individual individual
            INNER JOIN subject_type st on st.id = individual.subject_type_id
            LEFT OUTER JOIN gender g ON g.id = individual.gender_id
            LEFT OUTER JOIN address_level a ON individual.address_id = a.id
WHERE st.name = 'Individual';

drop view if exists unicef_moha_form_6_mdsr_case_summary_facility;
create view unicef_moha_form_6_mdsr_case_summary_facility as
SELECT individual.id                                                                                          "Ind.Id",
       individual.address_id                                                                                  "Ind.address_id",
       individual.uuid                                                                                        "Ind.uuid",
       individual.first_name                                                                                  "Ind.first_name",
       individual.last_name                                                                                   "Ind.last_name",
       g.name                                                                                                 "Ind.Gender",
       individual.date_of_birth                                                                               "Ind.date_of_birth",
       individual.date_of_birth_verified                                                                      "Ind.date_of_birth_verified",
       individual.registration_date                                                                           "Ind.registration_date",
       individual.facility_id                                                                                 "Ind.facility_id",
       a.title                                                                                                "Ind.Area",
       individual.is_voided                                                                                   "Ind.is_voided",
       op.name                                                                                                "Enl.Program Name",
       programEnrolment.id                                                                                    "Enl.Id",
       programEnrolment.uuid                                                                                  "Enl.uuid",
       programEnrolment.is_voided                                                                             "Enl.is_voided",
       oet.name                                                                                               "Enc.Type",
       programEncounter.id                                                                                    "Enc.Id",
       programEncounter.earliest_visit_date_time                                                              "Enc.earliest_visit_date_time",
       programEncounter.encounter_date_time                                                                   "Enc.encounter_date_time",
       programEncounter.program_enrolment_id                                                                  "Enc.program_enrolment_id",
       programEncounter.uuid                                                                                  "Enc.uuid",
       programEncounter.name                                                                                  "Enc.name",
       programEncounter.max_visit_date_time                                                                   "Enc.max_visit_date_time",
       programEncounter.is_voided                                                                             "Enc.is_voided",
       single_select_coded(
                  programEnrolment.observations ->> '9cee1acc-9323-46cf-8167-d67326fbd8ed')::TEXT                 as "Enl.Form filled in",
       (programEnrolment.observations ->> 'eb2fabb9-f5f8-4ee6-bab2-88e489df8751')::TEXT                    as "Enl.Name of Husband",
       (programEnrolment.observations ->> 'f7c955f5-6747-4695-bf96-f6deb8fb41b4')::TEXT                    as "Enl.Name of Father",
       (programEnrolment.observations ->> '0bae0557-7461-4d4d-a14e-1e9e8793ba6f')::TEXT                    as "Enl.RCH Number",
       (programEnrolment.observations ->> '82fa0dbb-92f9-4ec2-9263-49054e64d909')::TEXT                    as "Enl.Contact Number",
       (programEnrolment.observations ->> 'e3134346-5770-4d7c-8845-9da734bf2a93')::DATE                    as "Enl.Date and time of Death",
       (programEnrolment.observations ->> '079fb844-0d72-49cf-8389-b821f1b5ab37')::TEXT                    as "Enl.Name of place of death",
       single_select_coded(
                  programEnrolment.observations ->> '9e0e21b0-e5c2-406a-8da6-a11a78d65329')::TEXT                 as "Enl.Timing of death in pregnancy",
       (programEnrolment.observations ->> 'a334f0f7-434d-4acf-b4c2-dff3cb6f454b')::TEXT                    as "Enl.Name of reporting person",
       (programEnrolment.observations ->> 'ad31dc43-3c4d-48ff-aae6-194858207f1f')::TEXT                    as "Enl.Designation of reporting person",
       (programEnrolment.observations ->> 'a08c7590-1940-4a88-8d66-ec46649669cd')::DATE                    as "Enl.Reporting Date",
       (programEnrolment.observations ->> '4b721e9d-bf7f-4ccd-bf7e-1df9d40308ab')::TEXT                    as "Enl.Name of subcenter",
       (programEncounter.observations ->> '0bae0557-7461-4d4d-a14e-1e9e8793ba6f')::TEXT                    as "Enc.RCH Number",
       (programEncounter.observations ->> 'edd950ba-148d-4e1d-b086-6de471a6b965')::TEXT                    as "Enc.Age of the deceased woman at the time of death",
       single_select_coded(
                  programEncounter.observations ->> 'c922c13c-1fa2-42dd-a7e8-d234b0324870')::TEXT                 as "Enc.Religion",
       single_select_coded(
                  programEncounter.observations ->> '61ab6413-5c6a-4512-ab6e-7d5cd1439569')::TEXT                 as "Enc.Caste Category",
       (programEncounter.observations ->> 'e42d89b6-12fd-400a-8c25-d67251ecdfa2')::TEXT                    as "Enc.Place of residence",
       (programEncounter.observations ->> 'b9a674b8-1520-4033-99e0-25057820a5f1')::TEXT                    as "Enc.Native place",
       (programEncounter.observations ->> '079fb844-0d72-49cf-8389-b821f1b5ab37')::TEXT                    as "Enc.Name of place of death",
       (programEncounter.observations ->> 'e3134346-5770-4d7c-8845-9da734bf2a93')::DATE                    as "Enc.Date and time of Death",
       single_select_coded(
                  programEncounter.observations ->> '9e0e21b0-e5c2-406a-8da6-a11a78d65329')::TEXT                 as "Enc.Timing of death in pregnancy",
       (programEncounter.observations ->> 'dc2c23e9-19ad-471f-81d1-213069ccc975')::TEXT                    as "Enc.Gravida",
       (programEncounter.observations ->> '2d679fd5-a75b-46bd-96c2-10c180187342')::TEXT                    as "Enc.Parity",
       single_select_coded(
                  programEncounter.observations ->> '05dbdea3-2d60-4c18-9d53-57c01bd0a05b')::TEXT                 as "Enc.Previous abortion",
       (programEncounter.observations ->> 'cc745a79-95f7-431c-8bce-420eee785d40')::TEXT                    as "Enc.Infant Outcome",
       (programEncounter.observations ->> '85a2e410-411d-4243-bef9-d5d047bde636')::TEXT                    as "Enc.Number of alive children",
       (programEncounter.observations ->> 'ef4496a8-0c02-4472-91e9-432f9cd64620')::DATE                    as "Enc.Date of Interview",
       (programEncounter.observations ->> '1a59837e-f17c-44fc-85ad-2553f7027023')::DATE                    as "Enc.Date of second interview",
       (programEncounter.observations ->> '2967f6b2-7f22-428d-b753-deb91791cd5f')::TEXT                    as "Enc.Respondent Name",
       (programEncounter.observations ->> '271edc25-bfdc-4eb9-85f1-16fafd5b28e1')::TEXT                    as "Enc.Contact/Mobile No",
       multi_select_coded(
                  programEncounter.observations -> '9813a8c2-b49c-45c5-94bb-6abdde0c8900')::TEXT                  as "Enc.Delay in seeking care",
       (programEncounter.observations ->> 'f0bf309c-7970-4027-ad59-246d541822c0')::TEXT                    as "Enc.Other cause of delay in seeking care",
       multi_select_coded(
                  programEncounter.observations -> 'b74b985b-9717-4ea6-9e9a-0a47b6cc220f')::TEXT                  as "Enc.Delay in reaching health facility",
       (programEncounter.observations ->> '6ae35ea6-74f1-46a9-8435-af5f1e4cb3a1')::TEXT                    as "Enc.Other cause of delay in reaching health facility",
       multi_select_coded(
                  programEncounter.observations -> 'bd248784-7978-4f8f-bd79-8dd3064d2847')::TEXT                  as "Enc.Delay in receiving adequate care in facility",
       (programEncounter.observations ->> '28af8aa3-3c87-4ff0-9622-ed67e55ee3c9')::TEXT                    as "Enc.Other cause of delay in receiving adequate care in facility",
       (programEncounter.observations ->> 'ad15d9eb-cf06-4cb5-9712-0a012df9bdb8')::TEXT                    as "Enc.Probable direct obstetric cause of death",
       (programEncounter.observations ->> '33780edb-34e5-4a68-b0e0-4262a5e3217b')::TEXT                    as "Enc.Indirect obstetric cause of death",
       (programEncounter.observations ->> 'fd68540c-78dd-4dc3-bec1-48c877d8c3eb')::TEXT                    as "Enc.Contributory causes of death",
       (programEncounter.observations ->> 'a9f577da-ca62-4fb7-82ca-4f23e27d15c8')::TEXT                    as "Enc.Initiative suggested",
       (programEncounter.observations ->> '5504a61b-d3c1-486d-a630-591c529209af')::TEXT                    as "Enc.Name of investigator 1",
       (programEncounter.observations ->> '24ea2641-72f9-4985-8014-c2790a2de169')::TEXT                    as "Enc.Designation of investigator 1",
       (programEncounter.observations ->> 'f83c51a6-3b49-4738-bbdd-45fe89337f52')::TEXT                    as "Enc.Name of investigator 2",
       (programEncounter.observations ->> 'b2ebe620-c8c8-4caa-8e3d-f1440e7f042f')::TEXT                    as "Enc.Designation of investigator 2",
       (programEncounter.observations ->> '90de1d6a-2f0a-4d25-bbc9-09acf8813f04')::TEXT                    as "Enc.Name of investigator 3",
       (programEncounter.observations ->> '95092623-09f3-4ada-ab06-95b4f546a556')::TEXT                    as "Enc.Designation of investigator 3",
       (programEncounter.observations ->> '5f6b867d-d0a5-4a59-b940-b767593dc70d')::TEXT                    as "Enc.Name of Block MO/Facility Nodal officer",
       programEncounter.cancel_date_time                                                                      "EncCancel.cancel_date_time"
FROM program_encounter programEncounter
            LEFT OUTER JOIN operational_encounter_type oet on programEncounter.encounter_type_id = oet.encounter_type_id
            LEFT OUTER JOIN program_enrolment programEnrolment ON programEncounter.program_enrolment_id = programEnrolment.id
            LEFT OUTER JOIN operational_program op ON op.program_id = programEnrolment.program_id
            LEFT OUTER JOIN individual individual ON programEnrolment.individual_id = individual.id
            LEFT OUTER JOIN gender g ON g.id = individual.gender_id
            LEFT OUTER JOIN address_level a ON individual.address_id = a.id
WHERE op.uuid = '61383d58-82b4-44fb-96d0-6449f0e68c1b'
  AND oet.uuid = 'becd6e17-fbfe-4fa4-ab1c-a4807e557070'
  AND programEnrolment.enrolment_date_time IS NOT NULL;


drop view if exists unicef_moha_form_6_mdsr_case_summary_community;
create view unicef_moha_form_6_mdsr_case_summary_community as
SELECT individual.id                                                                                          "Ind.Id",
       individual.address_id                                                                                  "Ind.address_id",
       individual.uuid                                                                                        "Ind.uuid",
       individual.first_name                                                                                  "Ind.first_name",
       individual.last_name                                                                                   "Ind.last_name",
       g.name                                                                                                 "Ind.Gender",
       individual.date_of_birth                                                                               "Ind.date_of_birth",
       individual.date_of_birth_verified                                                                      "Ind.date_of_birth_verified",
       individual.registration_date                                                                           "Ind.registration_date",
       individual.facility_id                                                                                 "Ind.facility_id",
       a.title                                                                                                "Ind.Area",
       individual.is_voided                                                                                   "Ind.is_voided",
       op.name                                                                                                "Enl.Program Name",
       programEnrolment.id                                                                                    "Enl.Id",
       programEnrolment.uuid                                                                                  "Enl.uuid",
       programEnrolment.is_voided                                                                             "Enl.is_voided",
       oet.name                                                                                               "Enc.Type",
       programEncounter.id                                                                                    "Enc.Id",
       programEncounter.earliest_visit_date_time                                                              "Enc.earliest_visit_date_time",
       programEncounter.encounter_date_time                                                                   "Enc.encounter_date_time",
       programEncounter.program_enrolment_id                                                                  "Enc.program_enrolment_id",
       programEncounter.uuid                                                                                  "Enc.uuid",
       programEncounter.name                                                                                  "Enc.name",
       programEncounter.max_visit_date_time                                                                   "Enc.max_visit_date_time",
       programEncounter.is_voided                                                                             "Enc.is_voided",
       single_select_coded(
                  programEnrolment.observations ->> '9cee1acc-9323-46cf-8167-d67326fbd8ed')::TEXT                 as "Enl.Form filled in",
       (programEnrolment.observations ->> 'eb2fabb9-f5f8-4ee6-bab2-88e489df8751')::TEXT                    as "Enl.Name of Husband",
       (programEnrolment.observations ->> 'f7c955f5-6747-4695-bf96-f6deb8fb41b4')::TEXT                    as "Enl.Name of Father",
       (programEnrolment.observations ->> '0bae0557-7461-4d4d-a14e-1e9e8793ba6f')::TEXT                    as "Enl.RCH Number",
       (programEnrolment.observations ->> '82fa0dbb-92f9-4ec2-9263-49054e64d909')::TEXT                    as "Enl.Contact Number",
       (programEnrolment.observations ->> 'e3134346-5770-4d7c-8845-9da734bf2a93')::DATE                    as "Enl.Date and time of Death",
       (programEnrolment.observations ->> '079fb844-0d72-49cf-8389-b821f1b5ab37')::TEXT                    as "Enl.Name of place of death",
       single_select_coded(
                  programEnrolment.observations ->> '9e0e21b0-e5c2-406a-8da6-a11a78d65329')::TEXT                 as "Enl.Timing of death in pregnancy",
       (programEnrolment.observations ->> 'a334f0f7-434d-4acf-b4c2-dff3cb6f454b')::TEXT                    as "Enl.Name of reporting person",
       (programEnrolment.observations ->> 'ad31dc43-3c4d-48ff-aae6-194858207f1f')::TEXT                    as "Enl.Designation of reporting person",
       (programEnrolment.observations ->> 'a08c7590-1940-4a88-8d66-ec46649669cd')::DATE                    as "Enl.Reporting Date",
       (programEnrolment.observations ->> '4b721e9d-bf7f-4ccd-bf7e-1df9d40308ab')::TEXT                    as "Enl.Name of subcenter",
       (programEncounter.observations ->> '0bae0557-7461-4d4d-a14e-1e9e8793ba6f')::TEXT                    as "Enc.RCH Number",
       (programEncounter.observations ->> 'edd950ba-148d-4e1d-b086-6de471a6b965')::TEXT                    as "Enc.Age of the deceased woman at the time of death",
       single_select_coded(
                  programEncounter.observations ->> 'c922c13c-1fa2-42dd-a7e8-d234b0324870')::TEXT                 as "Enc.Religion",
       single_select_coded(
                  programEncounter.observations ->> '61ab6413-5c6a-4512-ab6e-7d5cd1439569')::TEXT                 as "Enc.Caste Category",
       (programEncounter.observations ->> 'e42d89b6-12fd-400a-8c25-d67251ecdfa2')::TEXT                    as "Enc.Place of residence",
       (programEncounter.observations ->> 'b9a674b8-1520-4033-99e0-25057820a5f1')::TEXT                    as "Enc.Native place",
       (programEncounter.observations ->> '079fb844-0d72-49cf-8389-b821f1b5ab37')::TEXT                    as "Enc.Name of place of death",
       (programEncounter.observations ->> 'e3134346-5770-4d7c-8845-9da734bf2a93')::DATE                    as "Enc.Date and time of Death",
       single_select_coded(
                  programEncounter.observations ->> '9e0e21b0-e5c2-406a-8da6-a11a78d65329')::TEXT                 as "Enc.Timing of death in pregnancy",
       (programEncounter.observations ->> 'dc2c23e9-19ad-471f-81d1-213069ccc975')::TEXT                    as "Enc.Gravida",
       (programEncounter.observations ->> '2d679fd5-a75b-46bd-96c2-10c180187342')::TEXT                    as "Enc.Parity",
       single_select_coded(
                  programEncounter.observations ->> '05dbdea3-2d60-4c18-9d53-57c01bd0a05b')::TEXT                 as "Enc.Previous abortion",
       (programEncounter.observations ->> 'cc745a79-95f7-431c-8bce-420eee785d40')::TEXT                    as "Enc.Infant Outcome",
       (programEncounter.observations ->> '85a2e410-411d-4243-bef9-d5d047bde636')::TEXT                    as "Enc.Number of alive children",
       (programEncounter.observations ->> 'ef4496a8-0c02-4472-91e9-432f9cd64620')::DATE                    as "Enc.Date of Interview",
       (programEncounter.observations ->> '1a59837e-f17c-44fc-85ad-2553f7027023')::DATE                    as "Enc.Date of second interview",
       (programEncounter.observations ->> '2967f6b2-7f22-428d-b753-deb91791cd5f')::TEXT                    as "Enc.Respondent Name",
       (programEncounter.observations ->> '271edc25-bfdc-4eb9-85f1-16fafd5b28e1')::TEXT                    as "Enc.Contact/Mobile No",
       multi_select_coded(
                  programEncounter.observations -> '9813a8c2-b49c-45c5-94bb-6abdde0c8900')::TEXT                  as "Enc.Delay in seeking care",
       (programEncounter.observations ->> 'f0bf309c-7970-4027-ad59-246d541822c0')::TEXT                    as "Enc.Other cause of delay in seeking care",
       multi_select_coded(
                  programEncounter.observations -> 'b74b985b-9717-4ea6-9e9a-0a47b6cc220f')::TEXT                  as "Enc.Delay in reaching health facility",
       (programEncounter.observations ->> '6ae35ea6-74f1-46a9-8435-af5f1e4cb3a1')::TEXT                    as "Enc.Other cause of delay in reaching health facility",
       multi_select_coded(
                  programEncounter.observations -> 'bd248784-7978-4f8f-bd79-8dd3064d2847')::TEXT                  as "Enc.Delay in receiving adequate care in facility",
       (programEncounter.observations ->> '28af8aa3-3c87-4ff0-9622-ed67e55ee3c9')::TEXT                    as "Enc.Other cause of delay in receiving adequate care in facility",
       (programEncounter.observations ->> 'ad15d9eb-cf06-4cb5-9712-0a012df9bdb8')::TEXT                    as "Enc.Probable direct obstetric cause of death",
       (programEncounter.observations ->> '33780edb-34e5-4a68-b0e0-4262a5e3217b')::TEXT                    as "Enc.Indirect obstetric cause of death",
       (programEncounter.observations ->> 'fd68540c-78dd-4dc3-bec1-48c877d8c3eb')::TEXT                    as "Enc.Contributory causes of death",
       (programEncounter.observations ->> 'a9f577da-ca62-4fb7-82ca-4f23e27d15c8')::TEXT                    as "Enc.Initiative suggested",
       (programEncounter.observations ->> '5504a61b-d3c1-486d-a630-591c529209af')::TEXT                    as "Enc.Name of investigator 1",
       (programEncounter.observations ->> '24ea2641-72f9-4985-8014-c2790a2de169')::TEXT                    as "Enc.Designation of investigator 1",
       (programEncounter.observations ->> 'f83c51a6-3b49-4738-bbdd-45fe89337f52')::TEXT                    as "Enc.Name of investigator 2",
       (programEncounter.observations ->> 'b2ebe620-c8c8-4caa-8e3d-f1440e7f042f')::TEXT                    as "Enc.Designation of investigator 2",
       (programEncounter.observations ->> '90de1d6a-2f0a-4d25-bbc9-09acf8813f04')::TEXT                    as "Enc.Name of investigator 3",
       (programEncounter.observations ->> '95092623-09f3-4ada-ab06-95b4f546a556')::TEXT                    as "Enc.Designation of investigator 3",
       (programEncounter.observations ->> '5f6b867d-d0a5-4a59-b940-b767593dc70d')::TEXT                    as "Enc.Name of Block MO/Facility Nodal officer",
       programEncounter.cancel_date_time                                                                      "EncCancel.cancel_date_time"
FROM program_encounter programEncounter
            LEFT OUTER JOIN operational_encounter_type oet on programEncounter.encounter_type_id = oet.encounter_type_id
            LEFT OUTER JOIN program_enrolment programEnrolment ON programEncounter.program_enrolment_id = programEnrolment.id
            LEFT OUTER JOIN operational_program op ON op.program_id = programEnrolment.program_id
            LEFT OUTER JOIN individual individual ON programEnrolment.individual_id = individual.id
            LEFT OUTER JOIN gender g ON g.id = individual.gender_id
            LEFT OUTER JOIN address_level a ON individual.address_id = a.id
WHERE op.uuid = '61383d58-82b4-44fb-96d0-6449f0e68c1b'
  AND oet.uuid = 'ecee795c-2bde-4cbd-afa7-2c877d2df5e0'
  AND programEnrolment.enrolment_date_time IS NOT NULL;

drop view if exists unicef_moha_form_4_facility_based_mdsr;
create view unicef_moha_form_4_facility_based_mdsr as
SELECT individual.id                                                                                          "Ind.Id",
       individual.address_id                                                                                  "Ind.address_id",
       individual.uuid                                                                                        "Ind.uuid",
       individual.first_name                                                                                  "Ind.first_name",
       individual.last_name                                                                                   "Ind.last_name",
       g.name                                                                                                 "Ind.Gender",
       individual.date_of_birth                                                                               "Ind.date_of_birth",
       individual.date_of_birth_verified                                                                      "Ind.date_of_birth_verified",
       individual.registration_date                                                                           "Ind.registration_date",
       individual.facility_id                                                                                 "Ind.facility_id",
       a.title                                                                                                "Ind.Area",
       individual.is_voided                                                                                   "Ind.is_voided",
       op.name                                                                                                "Enl.Program Name",
       programEnrolment.id                                                                                    "Enl.Id",
       programEnrolment.uuid                                                                                  "Enl.uuid",
       programEnrolment.is_voided                                                                             "Enl.is_voided",
       oet.name                                                                                               "Enc.Type",
       programEncounter.id                                                                                    "Enc.Id",
       programEncounter.earliest_visit_date_time                                                              "Enc.earliest_visit_date_time",
       programEncounter.encounter_date_time                                                                   "Enc.encounter_date_time",
       programEncounter.program_enrolment_id                                                                  "Enc.program_enrolment_id",
       programEncounter.uuid                                                                                  "Enc.uuid",
       programEncounter.name                                                                                  "Enc.name",
       programEncounter.max_visit_date_time                                                                   "Enc.max_visit_date_time",
       programEncounter.is_voided                                                                             "Enc.is_voided",
       single_select_coded(
                  programEnrolment.observations ->> '9cee1acc-9323-46cf-8167-d67326fbd8ed')::TEXT                 as "Enl.Form filled in",
       (programEnrolment.observations ->> 'eb2fabb9-f5f8-4ee6-bab2-88e489df8751')::TEXT                    as "Enl.Name of Husband",
       (programEnrolment.observations ->> 'f7c955f5-6747-4695-bf96-f6deb8fb41b4')::TEXT                    as "Enl.Name of Father",
       (programEnrolment.observations ->> '0bae0557-7461-4d4d-a14e-1e9e8793ba6f')::TEXT                    as "Enl.RCH Number",
       (programEnrolment.observations ->> '82fa0dbb-92f9-4ec2-9263-49054e64d909')::TEXT                    as "Enl.Contact Number",
       (programEnrolment.observations ->> 'e3134346-5770-4d7c-8845-9da734bf2a93')::DATE                    as "Enl.Date and time of Death",
       (programEnrolment.observations ->> '079fb844-0d72-49cf-8389-b821f1b5ab37')::TEXT                    as "Enl.Name of place of death",
       single_select_coded(
                  programEnrolment.observations ->> '9e0e21b0-e5c2-406a-8da6-a11a78d65329')::TEXT                 as "Enl.Timing of death in pregnancy",
       (programEnrolment.observations ->> 'a334f0f7-434d-4acf-b4c2-dff3cb6f454b')::TEXT                    as "Enl.Name of reporting person",
       (programEnrolment.observations ->> 'ad31dc43-3c4d-48ff-aae6-194858207f1f')::TEXT                    as "Enl.Designation of reporting person",
       (programEnrolment.observations ->> 'a08c7590-1940-4a88-8d66-ec46649669cd')::DATE                    as "Enl.Reporting Date",
       (programEnrolment.observations ->> '4b721e9d-bf7f-4ccd-bf7e-1df9d40308ab')::TEXT                    as "Enl.Name of subcenter",
       (programEncounter.observations ->> '543a5ae4-b474-4c0f-b3ff-1313b7a8b44e')::TEXT                    as "Enc.Name and Address of Health Facility",
       (programEncounter.observations ->> '4205021b-68e6-43ec-a78b-ff6471f62337')::TEXT                    as "Enc.Name of Nodal Person",
       (programEncounter.observations ->> '82fa0dbb-92f9-4ec2-9263-49054e64d909')::TEXT                    as "Enc.Contact Number",
       (programEncounter.observations ->> '13a9c2e3-b1a9-478a-a110-67a1e21c5ab8')::TEXT                    as "Enc.FBMDR NO.",
       (programEncounter.observations ->> '0bae0557-7461-4d4d-a14e-1e9e8793ba6f')::TEXT                    as "Enc.RCH Number",
       (programEncounter.observations ->> 'a08c7590-1940-4a88-8d66-ec46649669cd')::DATE                    as "Enc.Reporting Date",
       (programEncounter.observations ->> '612ec753-4579-4e28-a305-5083bd4d9feb')::TEXT                    as "Enc.Inpatient No",
       single_select_coded(
                  programEncounter.observations ->> '77209dcc-a49d-40f1-929a-4ef95b4f085b')::TEXT                 as "Enc.Medico-legal admission",
       (programEncounter.observations ->> '8b8a1118-f2be-4f3d-ace7-8f7a16164c00')::TEXT                    as "Enc.Complete Address",
       (programEncounter.observations ->> '271edc25-bfdc-4eb9-85f1-16fafd5b28e1')::TEXT                    as "Enc.Contact/Mobile No",
       single_select_coded(
                  programEncounter.observations ->> '39595a16-a9c6-49a5-a42b-3f462607058c')::TEXT                 as "Enc.Education",
       single_select_coded(
                  programEncounter.observations ->> 'cd6e5e69-fa7a-4eb8-9b7c-96735ff7fdf1')::TEXT                 as "Enc.Below Poverty Line",
       (programEncounter.observations ->> '89881a1f-a428-40a6-a8d9-cf77ab9ef0b0')::DATE                    as "Enc.Date and time of Admission",
       (programEncounter.observations ->> 'e3134346-5770-4d7c-8845-9da734bf2a93')::DATE                    as "Enc.Date and time of Death",
       (programEncounter.observations ->> '9cf4c6e4-a516-4121-8f78-7501c7fbe8c4')::TEXT                    as "Enc.Duration of hospital stay",
       single_select_coded(
                  programEncounter.observations ->> '090bb4ab-7ba3-4aab-a040-acef52c75ed3')::TEXT                 as "Enc.Was mother admitted to ICU?",
       (programEncounter.observations ->> '2f6e79b3-eafa-4101-b01a-a18636fc21a7')::TEXT                    as "Enc.Duration of ICU Stay",
       single_select_coded(
                  programEncounter.observations ->> '91df8f1c-8029-414c-9581-7b3e01f1e724')::TEXT                 as "Enc.Reason for mother not being admitted to the ICU",
       single_select_coded(
                  programEncounter.observations ->> '2aee3472-3034-4a5e-abf5-8100c5890f3f')::TEXT                 as "Enc.Outcome of pregnancy",
       (programEncounter.observations ->> 'dcb4741d-d65c-404e-8aec-8b805cde875a')::DATE                    as "Enc.Date and time of Delivery",
       (programEncounter.observations ->> 'bc543109-7ab8-4ba4-af97-b3ba171e9153')::TEXT                    as "Enc.Admission-delivery interval",
       (programEncounter.observations ->> '01882f0f-41e5-4ce1-b0d3-0116e279d1cc')::TEXT                    as "Enc.Admission-death interval",
       (programEncounter.observations ->> '8ec0e2b3-e3c7-441a-bde0-e6d9997646be')::TEXT                    as "Enc.Complaints at time of admission",
       (programEncounter.observations ->> 'dc2c23e9-19ad-471f-81d1-213069ccc975')::TEXT                    as "Enc.Gravida",
       (programEncounter.observations ->> '2d679fd5-a75b-46bd-96c2-10c180187342')::TEXT                    as "Enc.Parity",
       (programEncounter.observations ->> '38b9986b-76e8-4015-ae51-48152b1cd42c')::TEXT                    as "Enc.Number of abortions",
       (programEncounter.observations ->> '07feabf6-13ec-41f2-8658-9bebc1848802')::TEXT                    as "Enc.No of Living Children - Male",
       (programEncounter.observations ->> '6761e531-6bad-4158-bdfc-ba6df35d6e5b')::TEXT                    as "Enc.No of Living Children - Female",
       single_select_coded(
                  programEncounter.observations ->> 'c8ca801c-e61c-4e95-9f78-501fc1d03ad7')::TEXT                 as "Enc.Period of gestation (live/still birth)",
       single_select_coded(
                  programEncounter.observations ->> '772cb5b7-3187-448b-9136-6c1b487937e1')::TEXT                 as "Enc.Period of gestation (non live/still birth)",
       single_select_coded(
                  programEncounter.observations ->> '11d4816d-4253-4dda-92fc-16f2d2704e5a')::TEXT                 as "Enc.Condition on Admission",
       (programEncounter.observations ->> '56e4d9dd-64dd-4c03-b92d-a27df84c662a')::TEXT                    as "Enc.Number of places visited prior",
       (programEncounter.observations ->> '147dfae9-1b84-4a55-9ed3-76704987f10c')::DATE                    as "Enc.Time of onset of complication or labor at home",
       (programEncounter.observations ->> 'b7fafaa7-5bc7-4c57-8dd0-3d7f0727a1c6')::DATE                    as "Enc.Date of referral from home",
       (programEncounter.observations ->> '2ea89ce6-d287-4ff0-884f-d8cfe892670a')::DATE                    as "Enc.Time of calling transport at home",
       single_select_coded(
                  programEncounter.observations ->> 'ca5c3e67-2d06-4947-b0be-8565a62eb39d')::TEXT                 as "Enc.Type of transport used from home",
       (programEncounter.observations ->> 'bce98ba0-7b07-461b-b34f-0a55cf706427')::TEXT                    as "Enc.Other type of transport used from home",
       (programEncounter.observations ->> '0c6b579d-795c-43c5-ab1e-92d7146ec930')::DATE                    as "Enc.Date of admission to Facility 1",
       (programEncounter.observations ->> 'd3fbfce1-ff22-42ce-99bc-4df3c3361046')::TEXT                    as "Enc.Time taken to reach Facility 1",
       (programEncounter.observations ->> 'cb49b1d2-51f3-4932-bfe3-7a154da8e062')::DATE                    as "Enc.Time of onset of complication or labor at Facility 1",
       multi_select_coded(
                  programEncounter.observations -> '7fd6dfff-4e8e-4412-9f21-c6c9e7a322aa')::TEXT                  as "Enc.Who attended at Facility 1?",
       (programEncounter.observations ->> '0780eb07-730f-47d2-95e0-0ee9a1d6d434')::TEXT                    as "Enc.Details of other staff who attended at Facility 1",
       (programEncounter.observations ->> 'a3938cb7-3b85-4a79-be93-8755cda12a6d')::TEXT                    as "Enc.Name of facility referred from Facility 1",
       single_select_coded(
                  programEncounter.observations ->> 'e2da4703-2531-4dd1-811f-27d4fb4fc8b1')::TEXT                 as "Enc.Type of facility referred at Facility 1",
       (programEncounter.observations ->> '1b36a513-0f93-4fbb-bd91-4d7079b2c655')::DATE                    as "Enc.Date of referral from Facility 1",
       multi_select_coded(
                  programEncounter.observations -> '5b9df7c4-4493-4a11-9b39-c534bcdad60d')::TEXT                  as "Enc.Reason for referral from Facility 1",
       (programEncounter.observations ->> '685637fa-94b9-4bbb-b1a0-3ad50176aa8e')::TEXT                    as "Enc.Other reason for referral from Facility 1",
       single_select_coded(
                  programEncounter.observations ->> 'a2576f78-9099-42b0-9e52-0c741675e1c7')::TEXT                 as "Enc.Referral Slip from Facility 1",
       (programEncounter.observations ->> '50707344-3e3a-4dff-bc7b-dd8e1ab9ceeb')::DATE                    as "Enc.Time of calling transport at Facility 1",
       (programEncounter.observations ->> '2adf6c28-d52b-4a4a-9b66-b59406297a9d')::DATE                    as "Enc.Time of arrival of transport at Facility 1",
       single_select_coded(
                  programEncounter.observations ->> '0ee7403c-85c3-4f8c-b5b3-ce9678ca28d9')::TEXT                 as "Enc.Type of transport used from Facility 1",
       (programEncounter.observations ->> '02afc5fa-0af3-4e20-a88e-d5adf0b8b833')::TEXT                    as "Enc.Other type of transport used from Facility 1",
       (programEncounter.observations ->> '00f6e34a-500c-4a84-b331-40fb6682e05b')::TEXT                    as "Enc.Money spent on transport from Facility 1",
       multi_select_coded(
                  programEncounter.observations -> 'e751fcb0-d8c3-47fc-8d39-d61feff047d2')::TEXT                  as "Enc.Treatment given at Facility 1",
       (programEncounter.observations ->> '840cb902-d2a1-4a35-8bf1-0c8fa328dacd')::TEXT                    as "Enc.Other treatment given at Facility 1",
       (programEncounter.observations ->> 'eb1f02b6-431a-4600-b63b-a4ae947a663a')::TEXT                    as "Enc.Money spent on treatment/medicine/diagnostics at Facility 1",
       (programEncounter.observations ->> '4a232aaa-ba51-4a07-9995-e05723e2c6b7')::TEXT                    as "Enc.Time spent at Facility 1",
       (programEncounter.observations ->> '5f1987e8-1ddb-4cd2-9c56-fa13a76842c4')::DATE                    as "Enc.Date of admission to Facility 2",
       (programEncounter.observations ->> 'e193c36e-3f18-4077-8ba5-32a2fb5f5500')::TEXT                    as "Enc.Time taken to reach Facility 2",
       (programEncounter.observations ->> '6ed4757a-9db8-4b02-a855-4bcf48a5ed8a')::DATE                    as "Enc.Time of onset of complication or labor at Facility 2",
       multi_select_coded(
                  programEncounter.observations -> '582ddda2-e720-4ce8-8891-8246a68f3dc5')::TEXT                  as "Enc.Who attended at Facility 2?",
       (programEncounter.observations ->> '510abab6-0b52-46f6-80a2-937f2fa3af7e')::TEXT                    as "Enc.Details of other staff who attended at facility 2",
       (programEncounter.observations ->> '6f64c2e5-05a1-4d10-9b73-cd3ee64e301a')::TEXT                    as "Enc.Name of facility referred from Facility 2",
       single_select_coded(
                  programEncounter.observations ->> '949ffb3a-254d-40be-be16-e36bf730764d')::TEXT                 as "Enc.Type of facility referred at Facility 2",
       (programEncounter.observations ->> '6239db6f-0dd1-4c81-b131-5f6c194ccd2f')::DATE                    as "Enc.Date of referral from Facility 2",
       multi_select_coded(
                  programEncounter.observations -> '30b9950f-e78c-46d1-864b-b8a4cef0a965')::TEXT                  as "Enc.Reason for referral from Facility 2",
       (programEncounter.observations ->> '393fbfb7-df6d-4c30-89c7-e6b338bdbc57')::TEXT                    as "Enc.Other reason for referral from Facility 2",
       single_select_coded(
                  programEncounter.observations ->> '76468e15-0ae4-4cb7-9eaf-756ea4256b4b')::TEXT                 as "Enc.Referral Slip from Facility 2",
       (programEncounter.observations ->> '99c2471f-cdc6-4a33-91a7-81ebbce7179b')::DATE                    as "Enc.Time of calling transport at Facility 2",
       (programEncounter.observations ->> 'f1bb3a1c-d6e5-4dd4-8293-cc3ecc1f51db')::DATE                    as "Enc.Time of arrival of transport at Facility 2",
       single_select_coded(
                  programEncounter.observations ->> '2a451e3c-b803-477b-a518-c4a2ddde9928')::TEXT                 as "Enc.Type of transport used from Facility 2",
       (programEncounter.observations ->> '25b33aef-788c-4dcc-86ba-ee2727adbf51')::TEXT                    as "Enc.Other type of transport used from Facility 2",
       (programEncounter.observations ->> '100fcbea-fbe8-4063-8aae-508edc7f2670')::TEXT                    as "Enc.Money spent on transport from Facility 2",
       multi_select_coded(
                  programEncounter.observations -> '70f354df-5846-4e7d-aec2-661bd2aba924')::TEXT                  as "Enc.Treatment given at Facility 2",
       (programEncounter.observations ->> 'f1af5992-6057-4d1a-91e1-540430e8a0d7')::TEXT                    as "Enc.Other treatment given at Facility 2",
       (programEncounter.observations ->> 'dc211530-9c2c-4835-8d7e-b615b38fa2bb')::TEXT                    as "Enc.Money spent on treatment/medicine/diagnostics at Facility 2",
       (programEncounter.observations ->> 'edd5599e-c4d4-4f4f-a0a3-280c46179c21')::TEXT                    as "Enc.Time spent at Facility 2",
       (programEncounter.observations ->> '1ce3f4cb-898f-44b4-ba6b-11e401149e18')::DATE                    as "Enc.Date of admission to Facility 3",
       (programEncounter.observations ->> 'b2bbe74f-39c8-4e45-b850-6417d7f3e903')::TEXT                    as "Enc.Time taken to reach Facility 3",
       (programEncounter.observations ->> '6ce00a0e-c05f-4b77-b49e-3420ff5646b6')::DATE                    as "Enc.Time of onset of complication or labor at Facility 3",
       multi_select_coded(
                  programEncounter.observations -> 'a4233145-2938-4377-aa3e-0f92cb2eff7a')::TEXT                  as "Enc.Who attended at Facility 3?",
       (programEncounter.observations ->> 'b7532907-648f-4648-9d2b-96eb3393e4eb')::TEXT                    as "Enc.Details of other staff who attended at facility 3",
       (programEncounter.observations ->> 'b4b8c7ed-7daa-47d7-961a-d47b47b4b45e')::TEXT                    as "Enc.Name of facility referred from Facility 3",
       single_select_coded(
                  programEncounter.observations ->> '6950dc15-92c7-4dd0-8625-82a12500c3d8')::TEXT                 as "Enc.Type of facility referred at Facility 3",
       (programEncounter.observations ->> '31aa2e89-2e6e-48ea-a9b6-4a14de360547')::DATE                    as "Enc.Date of referral from Facility 3",
       multi_select_coded(
                  programEncounter.observations -> '27daf271-29b8-4402-9ce6-abfbd4ae63d9')::TEXT                  as "Enc.Reason for referral from Facility 3",
       (programEncounter.observations ->> 'e99e949d-dc19-4a27-b27a-48bbc92f3b30')::TEXT                    as "Enc.Other reason for referral from Facility 3",
       single_select_coded(
                  programEncounter.observations ->> '4d547c43-136c-4ef2-bf9d-eadd927c5b97')::TEXT                 as "Enc.Referral Slip given at Facility 3?",
       (programEncounter.observations ->> 'cd7c2138-4806-43e1-9e03-0e98ec53d8e8')::DATE                    as "Enc.Time of calling transport at Facility 3",
       (programEncounter.observations ->> '4fa759a6-6f00-4926-9362-9417d80f40c0')::DATE                    as "Enc.Time of arrival of transport at Facility 3",
       single_select_coded(
                  programEncounter.observations ->> '7c053916-0be1-40aa-aae4-397838beef66')::TEXT                 as "Enc.Type of transport used from Facility 3",
       (programEncounter.observations ->> 'a82c140d-bf5c-426b-9a18-296b31504f43')::TEXT                    as "Enc.Other type of transport used from Facility 3",
       (programEncounter.observations ->> '199ea726-9235-4553-8f7b-21c4b66b1ffc')::TEXT                    as "Enc.Money spent on transport from Facility 3",
       multi_select_coded(
                  programEncounter.observations -> 'f6a950ca-5268-4ef4-8643-9b1f774f856e')::TEXT                  as "Enc.Treatment given at Facility 3",
       (programEncounter.observations ->> '3f178753-dfcb-4e4a-9a71-55df33222e7d')::TEXT                    as "Enc.Other treatment given at Facility 3",
       (programEncounter.observations ->> '609a5111-b61c-461d-9c3d-2431e31f9fc1')::TEXT                    as "Enc.Money spent on treatment/medicine/diagnostics at Facility 3",
       (programEncounter.observations ->> '9a6cf54d-81cd-43d8-99f3-9f47be38fba4')::TEXT                    as "Enc.Time spent at Facility 3",
       (programEncounter.observations ->> '106d3a71-0479-4aaa-af19-39df4a554816')::DATE                    as "Enc.Date of admission to Facility 4",
       (programEncounter.observations ->> '01b6abb5-1514-4bec-8e04-df04d6bb6ee8')::TEXT                    as "Enc.Time taken to reach Facility 4",
       (programEncounter.observations ->> '2cea43d4-7d4d-4a83-8981-b73f57c87bd8')::DATE                    as "Enc.Time of onset of complication or labor at Facility 4",
       multi_select_coded(
                  programEncounter.observations -> '52cdaadb-99ec-4140-a66e-23c3375d2744')::TEXT                  as "Enc.Who attended at Facility 4?",
       (programEncounter.observations ->> 'f71eb688-3971-41ac-bfe7-a4051069bc11')::TEXT                    as "Enc.Details of other staff who attended at facility 4",
       (programEncounter.observations ->> '91326b67-2f94-4abb-bf89-ce04dfb2434d')::TEXT                    as "Enc.Name of facility referred from Facility 4",
       single_select_coded(
                  programEncounter.observations ->> '004e3e9c-1c19-45e3-bed1-f12ded3ce63e')::TEXT                 as "Enc.Type of facility referred at Facility 4",
       (programEncounter.observations ->> '7d85f8c8-2f75-46c3-b3f8-f46117cbc9fb')::DATE                    as "Enc.Date of referral from Facility 4",
       multi_select_coded(
                  programEncounter.observations -> 'a14a9ca3-f4f0-4885-b4e5-b5acefcfab30')::TEXT                  as "Enc.Reason for referral from Facility 4",
       (programEncounter.observations ->> '04d0ef40-f3ea-4d55-a23c-cadf5ab2c1ae')::TEXT                    as "Enc.Other reason for referral from Facility 4",
       single_select_coded(
                  programEncounter.observations ->> 'aca0991b-381e-476d-8df2-1d2bc61ebe69')::TEXT                 as "Enc.Referral Slip given at Facility 4?",
       (programEncounter.observations ->> '3863a025-c1bb-4372-aa99-cd437e39a715')::DATE                    as "Enc.Time of calling transport at Facility 4",
       (programEncounter.observations ->> '9fd80d7a-7eae-4be0-a050-5ceed157e5e8')::DATE                    as "Enc.Time of arrival of transport at Facility 4",
       single_select_coded(
                  programEncounter.observations ->> '6535dbb5-ed11-45ba-bf04-dadacf1596a0')::TEXT                 as "Enc.Type of transport used from Facility 4",
       (programEncounter.observations ->> '60a55b00-ddfa-4ac3-87de-5d45e5aed5c7')::TEXT                    as "Enc.Other type of transport used from Facility 4",
       (programEncounter.observations ->> '0819600b-801f-4251-8ae9-69bf8cbfdfaf')::TEXT                    as "Enc.Money spent on transport from Facility 4",
       multi_select_coded(
                  programEncounter.observations -> 'a69ef4cd-de59-4f90-98df-c014287fbe39')::TEXT                  as "Enc.Treatment given at Facility 4",
       (programEncounter.observations ->> 'aa269dfe-8120-4a5b-ad29-0178ce7e3f58')::TEXT                    as "Enc.Other treatment given at Facility 4",
       (programEncounter.observations ->> '619da194-a06f-4072-9475-424d77863d82')::TEXT                    as "Enc.Money spent on treatment/medicine/diagnostics at Facility 4",
       (programEncounter.observations ->> '4aaf529c-2068-4cc9-9ee1-3deacf903071')::TEXT                    as "Enc.Time spent at Facility 4",
       (programEncounter.observations ->> '064774a5-cd7e-45f4-8db8-98a79839bc47')::DATE                    as "Enc.Date of admission to Facility 5",
       (programEncounter.observations ->> 'd1a8bdc6-3502-4319-9f31-ef823ae36b02')::TEXT                    as "Enc.Time taken to reach Facility 5",
       (programEncounter.observations ->> '73572a0c-fe7b-4da2-871e-f08363e96f18')::DATE                    as "Enc.Time of onset of complication or labor at Facility 5",
       multi_select_coded(
                  programEncounter.observations -> '5678560f-0632-44b1-9d6f-1b9c111dfe89')::TEXT                  as "Enc.Who attended at Facility 5?",
       (programEncounter.observations ->> 'a182d8b5-df5e-4241-8cfe-9530612b7735')::TEXT                    as "Enc.Details of other staff who attended at facility 5",
       (programEncounter.observations ->> '64aed21f-a2b2-43ea-8bd0-f40438135a1f')::TEXT                    as "Enc.Name of facility referred from Facility 5",
       single_select_coded(
                  programEncounter.observations ->> 'f6557b79-a79a-4728-8d7e-28f8875d1937')::TEXT                 as "Enc.Type of facility referred at Facility 5",
       (programEncounter.observations ->> '40afd0f6-2b1f-4abb-a1a8-2447b9075e47')::DATE                    as "Enc.Date of referral from Facility 5",
       multi_select_coded(
                  programEncounter.observations -> '439381ac-430a-4341-adad-d1ebeb801e55')::TEXT                  as "Enc.Reason for referral from Facility 5",
       (programEncounter.observations ->> 'e2f483a9-9093-40d7-b493-014798709bd4')::TEXT                    as "Enc.Other reason for referral from Facility 5",
       single_select_coded(
                  programEncounter.observations ->> '7b88f490-cfa1-4ab1-8c67-083b162e4b66')::TEXT                 as "Enc.Referral Slip given at Facility 5?",
       (programEncounter.observations ->> 'bd66d704-e347-4283-974b-7639b4264f52')::DATE                    as "Enc.Time of calling transport at Facility 5",
       (programEncounter.observations ->> 'ca1dee29-7910-4325-8b3e-fe682fd72b31')::DATE                    as "Enc.Time of arrival of transport at Facility 5",
       single_select_coded(
                  programEncounter.observations ->> 'a59c217b-5451-4f5d-a20a-844cc99e9426')::TEXT                 as "Enc.Type of transport used from Facility 5",
       (programEncounter.observations ->> '6cb7786a-d76f-4056-968f-5a951188d62c')::TEXT                    as "Enc.Other type of transport used from Facility 5",
       (programEncounter.observations ->> '4b400305-386e-4ca2-8620-e6f2ea664565')::TEXT                    as "Enc.Money spent on transport from Facility 5",
       multi_select_coded(
                  programEncounter.observations -> '98dc7010-63d6-4b46-a11e-07c34ddd7b45')::TEXT                  as "Enc.Treatment given at Facility 5",
       (programEncounter.observations ->> '8d20ac52-09ff-43a9-aa3b-ec92295e8ee4')::TEXT                    as "Enc.Other treatment given at Facility 5",
       (programEncounter.observations ->> '52ccf19d-805f-48e5-a7c3-193e14343aab')::TEXT                    as "Enc.Money spent on treatment/medicine/diagnostics at Facility 5",
       (programEncounter.observations ->> '4a356fda-833e-477b-849c-3f8d20006593')::TEXT                    as "Enc.Time spent at Facility 5",
       (programEncounter.observations ->> '3df2de99-4dd8-4983-84e3-129438f33b5f')::DATE                    as "Enc.Date of admission to Facility 6",
       (programEncounter.observations ->> '0238c3f9-7246-4d2a-95c6-55545d12c7ae')::TEXT                    as "Enc.Time taken to reach Facility 6",
       (programEncounter.observations ->> 'e2ed1023-b389-44a0-b6c8-38df59703480')::DATE                    as "Enc.Time of onset of complication or labor at Facility 6",
       multi_select_coded(
                  programEncounter.observations -> '34179738-feb8-47e6-864e-9e758e93ba53')::TEXT                  as "Enc.Who attended at Facility 6?",
       (programEncounter.observations ->> '81697baa-dc3c-43e1-a10c-d8f91796f997')::TEXT                    as "Enc.Details of other staff who attended at facility 6",
       (programEncounter.observations ->> 'b14741b0-ee7d-42e0-9860-68eccb9c7186')::TEXT                    as "Enc.Name of facility referred from Facility 6",
       single_select_coded(
                  programEncounter.observations ->> 'eefb864c-0fac-4a62-8a16-d4092302a5d4')::TEXT                 as "Enc.Type of facility referred at Facility 6",
       (programEncounter.observations ->> '56532853-6dcf-4494-be21-6e3d69ea057d')::DATE                    as "Enc.Date of referral from Facility 6",
       multi_select_coded(
                  programEncounter.observations -> '5e373d3c-bf33-4a17-8819-d5e136c6133b')::TEXT                  as "Enc.Reason for referral from Facility 6",
       (programEncounter.observations ->> '2240fb6e-c156-430a-89fd-a9d10f027c17')::TEXT                    as "Enc.Other reason for referral from Facility 6",
       single_select_coded(
                  programEncounter.observations ->> '610a6f50-7e8a-4bc3-9c9e-b2fb85846175')::TEXT                 as "Enc.Referral Slip given at Facility 6?",
       (programEncounter.observations ->> '75f78e6d-b4b5-4261-9255-8c45e105a465')::DATE                    as "Enc.Time of calling transport at Facility 6",
       (programEncounter.observations ->> '233fb4fb-a334-4305-ab77-164ab31912c5')::DATE                    as "Enc.Time of arrival of transport at Facility 6",
       single_select_coded(
                  programEncounter.observations ->> 'e760187b-f01f-4e30-aad1-e137e82ce909')::TEXT                 as "Enc.Type of transport used from Facility 6",
       (programEncounter.observations ->> 'ec9ebede-368b-491b-842a-1b01a59c7b33')::TEXT                    as "Enc.Other type of transport used from Facility 6",
       (programEncounter.observations ->> '6fae0a07-b4e8-4ab9-b10c-b02971a7a43c')::TEXT                    as "Enc.Money spent on transport from Facility 6",
       multi_select_coded(
                  programEncounter.observations -> '3d603cd3-8353-4361-af8e-c1951a17f650')::TEXT                  as "Enc.Treatment given at Facility 6",
       (programEncounter.observations ->> '518531b0-ff70-40e8-a475-aaaf49683b2e')::TEXT                    as "Enc.Other treatment given at Facility 6",
       (programEncounter.observations ->> 'fe88cae6-4329-4715-9de9-07dc3c385f11')::TEXT                    as "Enc.Money spent on treatment/medicine/diagnostics at Facility 6",
       (programEncounter.observations ->> '1af1f753-4c8d-4e9c-8954-3661b26913da')::TEXT                    as "Enc.Time spent at Facility 6",
       single_select_coded(
                  programEncounter.observations ->> '100b445e-1a08-4d85-a2cb-7bafc0b0a9f9')::TEXT                 as "Enc.Is Abortion Cause",
       single_select_coded(
                  programEncounter.observations ->> '460f62be-5bad-4aae-96ec-ec828ecfa1c6')::TEXT                 as "Enc.Ectopic Pregnancy",
       single_select_coded(
                  programEncounter.observations ->> '708740ff-7823-4f3b-a4eb-9e9188961649')::TEXT                 as "Enc.Gestational Trophoblastic Disease",
       single_select_coded(
                  programEncounter.observations ->> '25367c7e-d01b-4fa2-8358-f8c18e2687b6')::TEXT                 as "Enc.Antepartum Bleeding",
       single_select_coded(
                  programEncounter.observations ->> '1f8ba737-518f-44ec-8e5b-a8007b09b7a9')::TEXT                 as "Enc.Placental Causes",
       single_select_coded(
                  programEncounter.observations ->> 'b1eda256-213e-43bb-a06c-d6bfb60b16bf')::TEXT                 as "Enc.Late pregnancy Bleeding other than placental causes",
       (programEncounter.observations ->> '97aa7c03-1177-40e8-911d-afe5a9595d05')::TEXT                    as "Enc.Other cause of Antepartum Bleeding",
       single_select_coded(
                  programEncounter.observations ->> '31804433-94c1-4d35-8e97-bde2a793f480')::TEXT                 as "Enc.Intrapartum Bleeding",
       multi_select_coded(
                  programEncounter.observations -> 'f61fb650-e75f-4f47-8ede-1d01bba4c082')::TEXT                  as "Enc.Postpartum Bleeding",
       single_select_coded(
                  programEncounter.observations ->> '9929586a-01a9-4f9a-9731-71a669f9312d')::TEXT                 as "Enc.Hypertensive disorder of Pregnancy",
       single_select_coded(
                  programEncounter.observations ->> 'ea73bc0a-678b-46a6-9885-95a33a673c8d')::TEXT                 as "Enc.labor related Disorder",
       (programEncounter.observations ->> 'a1d50f93-2d22-464a-93c8-62384ec0c674')::TEXT                    as "Enc.Other labor related disorder",
       single_select_coded(
                  programEncounter.observations ->> '1aae23a3-aa93-4065-a9d4-86b1f5e80c10')::TEXT                 as "Enc.Medical Disorder",
       (programEncounter.observations ->> '4b7f1dab-65c4-4f21-852b-861ee7a0ffae')::TEXT                    as "Enc.Other Medical Disorder",
       single_select_coded(
                  programEncounter.observations ->> 'f088de32-c472-4468-88a4-3a250da5b473')::TEXT                 as "Enc.Diagnosis",
       single_select_coded(
                  programEncounter.observations ->> '3f007de4-fd27-45df-9027-b865786c23bc')::TEXT                 as "Enc.Underlying cause of infection",
       (programEncounter.observations ->> '25b3a228-d1e4-49ae-aba4-4a7dfa49bbb5')::TEXT                    as "Enc.Other underlying cause of infection",
       single_select_coded(
                  programEncounter.observations ->> '5d9c6cb9-d49f-4c5b-a8c8-ac37ba97b495')::TEXT                 as "Enc.Incidental/Accidental Disorder",
       (programEncounter.observations ->> '139fd4ab-e6e7-4f08-b4ef-89ad51e92322')::TEXT                    as "Enc.Specify incidental/accidental disorder",
       (programEncounter.observations ->> '06c7c94a-59bc-4f97-8ef5-b54eef08ccd7')::TEXT                    as "Enc.Other Diagnosis",
       single_select_coded(
                  programEncounter.observations ->> 'b3e245ca-a965-464f-823a-cd75ead26911')::TEXT                 as "Enc.Abortion type",
       single_select_coded(
                  programEncounter.observations ->> '59ebc42c-01cd-4d50-a055-6406d00faf2d')::TEXT                 as "Enc.Spontaneous abortion detail",
       single_select_coded(
                  programEncounter.observations ->> 'dfa16927-16b3-4746-a39c-2d62214ceaae')::TEXT                 as "Enc.Induced abortion details",
       single_select_coded(
                  programEncounter.observations ->> '44a60c43-b235-4e28-ba60-eeab1a2d1974')::TEXT                 as "Enc.Abortion procedure adopted",
       (programEncounter.observations ->> 'dea402d1-ec3e-4f5f-a4a6-cfd4af61b7e2')::TEXT                    as "Enc.Other procedure adopted for abortion",
       single_select_coded(
                  programEncounter.observations ->> '97b5a664-97c2-421b-bc8e-7be3875e7807')::TEXT                 as "Enc.Post abortal period symptoms",
       single_select_coded(
                  programEncounter.observations ->> '6b86a5a2-bf82-4855-a63d-16d8237ecc2b')::TEXT                 as "Enc.Termination done in more than 1 center",
       (programEncounter.observations ->> 'a6cc3e23-878b-439e-b7f3-8f24b0ec6ee9')::TEXT                    as "Enc.Number of centres visited before this facility",
       (programEncounter.observations ->> '147df247-b1cb-4bf5-afc2-c8bcbee8668f')::TEXT                    as "Enc.Specify the centre visited",
       single_select_coded(
                  programEncounter.observations ->> '4497cd7f-da68-4bff-81ca-4eb3d0ced0ec')::TEXT                 as "Enc.ANC Received",
       multi_select_coded(
                  programEncounter.observations -> '113a3c58-0211-44b7-8ac1-976f3580b6ec')::TEXT                  as "Enc.Type of facility",
       (programEncounter.observations ->> '4e78dfb6-1879-441f-b287-2c35d7aa5086')::TEXT                    as "Enc.Details of Other type of facility where ANC received",
       multi_select_coded(
                  programEncounter.observations -> 'e315b178-a617-415e-a55a-93e64075cacc')::TEXT                  as "Enc.Service provided by",
       (programEncounter.observations ->> '2e808513-8949-41d8-ae19-ef1225284b81')::TEXT                    as "Enc.Details of Other specialists",
       single_select_coded(
                  programEncounter.observations ->> '3b480c15-9a8d-4594-9b39-0f15138a3f78')::TEXT                 as "Enc.Told about disorder/ complication",
       multi_select_coded(
                  programEncounter.observations -> 'c78bdae2-6ba0-4eda-909e-41d2f3aaf271')::TEXT                  as "Enc.Risk factor identified",
       (programEncounter.observations ->> 'b3164f0c-7629-41ec-8060-5a6a32e8aae2')::TEXT                    as "Enc.Other risk factor identified",
       single_select_coded(
                  programEncounter.observations ->> 'bbb1a2b5-9535-46da-9e2b-67b47b5cc5e7')::TEXT                 as "Enc.Labor pain",
       single_select_coded(
                  programEncounter.observations ->> '402742ac-14bf-4392-ba7c-3e5250a223fb')::TEXT                 as "Enc.Past facility",
       single_select_coded(
                  programEncounter.observations ->> '4888f0d8-7e78-4441-9b2e-3eee56e77f89')::TEXT                 as "Enc.Current facility",
       multi_select_coded(
                  programEncounter.observations -> 'e26cd7f7-0117-4b9c-bfa0-6055b68e6430')::TEXT                  as "Enc.Complication during labor",
       (programEncounter.observations ->> '957cfe64-0c4e-4a33-af6d-525bd352b03e')::TEXT                    as "Enc.Other complication during labor",
       single_select_coded(
                  programEncounter.observations ->> 'eff2209c-5e76-4da6-8a8a-8c9a1c4795b9')::TEXT                 as "Enc.Undelivered mode",
       single_select_coded(
                  programEncounter.observations ->> '34a73afe-b6d0-4e70-af4a-6c9710de95dc')::TEXT                 as "Enc.Vaginal Delivery",
       single_select_coded(
                  programEncounter.observations ->> '28f5d885-23d0-45ac-833f-0d6f20e3f56d')::TEXT                 as "Enc.Caesarean section type",
       single_select_coded(
                  programEncounter.observations ->> 'b6861170-19a1-4398-9c20-9561883f1e3d')::TEXT                 as "Enc.Laparotomy type",
       single_select_coded(
                  programEncounter.observations ->> '8af338f7-0014-454e-afa2-479e3b42c4f6')::TEXT                 as "Enc.Indication type",
       single_select_coded(
                  programEncounter.observations ->> '13edc693-1f6b-4863-88bb-56a2d3dbf3b6')::TEXT                 as "Enc.Anaesthesia",
       single_select_coded(
                  programEncounter.observations ->> 'c412ce45-df14-46b6-941b-0c35e147d767')::TEXT                 as "Enc.Stage of Labor",
       single_select_coded(
                  programEncounter.observations ->> '95027850-dabc-404e-8ad5-82abe85ec39a')::TEXT                 as "Enc.Post birth details",
       single_select_coded(
                  programEncounter.observations ->> '3bf2f6dc-49c6-4395-a918-43af5f458d6b')::TEXT                 as "Enc.Gave birth",
       single_select_coded(
                  programEncounter.observations ->> 'd5fc607b-aced-446d-b89d-59038b09bbbe')::TEXT                 as "Enc.Neonatal Outcome",
       single_select_coded(
                  programEncounter.observations ->> '206af019-6ea1-4b0e-ab51-3b6218e61eba')::TEXT                 as "Enc.Probable cause of death",
       (programEncounter.observations ->> 'c6ab74e9-ea91-4614-8983-3f3136d4b10a')::TEXT                    as "Enc.Other Cause of death",
       single_select_coded(
                  programEncounter.observations ->> 'aa3ba2ab-7731-4a27-8a8a-d385f0c6b1f8')::TEXT                 as "Enc.Postnatal Period",
       single_select_coded(
                  programEncounter.observations ->> '0705498d-175d-4639-bd53-18eeac59f877')::TEXT                 as "Enc.Probable cause of death in case of eventful death",
       (programEncounter.observations ->> '75fd4760-d30e-409f-a44e-7e5df5a9ba77')::TEXT                    as "Enc.Details of medical conditions",
       (programEncounter.observations ->> 'e27afc2a-906e-4180-b7e9-91898fe7f0f7')::TEXT                    as "Enc.Other cause of death",
       multi_select_coded(
                  programEncounter.observations -> 'b40e4fec-eeb4-499d-947c-133b5811e34b')::TEXT                  as "Enc.Early pregnancy interventions",
       multi_select_coded(
                  programEncounter.observations -> '0827a2e8-a2b9-45fb-9692-c81836c5b122')::TEXT                  as "Enc.Antenatal Interventions",
       multi_select_coded(
                  programEncounter.observations -> '27505089-3f5e-444f-878b-87b22d69f070')::TEXT                  as "Enc.Intrapartum Intervention",
       multi_select_coded(
                  programEncounter.observations -> '0d3b9940-1410-4b98-ba1e-ca934fc1b05d')::TEXT                  as "Enc.Postpartum Intervention",
       multi_select_coded(
                  programEncounter.observations -> '2cbb7e66-6b9c-41ca-8636-34e50255dddc')::TEXT                  as "Enc.Anaesthesia Intervention",
       single_select_coded(
                  programEncounter.observations ->> '2860dd68-3c69-4d0d-a5bc-47c2826ac6fb')::TEXT                 as "Enc.Blood transfusion given",
       (programEncounter.observations ->> '01402db4-b091-4288-8cee-8cc115ada333')::TEXT                    as "Enc.Number of blood units",
       (programEncounter.observations ->> 'eb0a9789-de73-4b4c-a86e-db0a41cf0845')::TEXT                    as "Enc.Whole Blood units",
       (programEncounter.observations ->> 'e0f3f7ce-df38-4481-882a-c566b50ed495')::TEXT                    as "Enc.PRBC",
       (programEncounter.observations ->> 'f114dd2e-8239-449f-bc91-c17230eb8da7')::TEXT                    as "Enc.FFP",
       (programEncounter.observations ->> '92494139-7216-4b36-ab54-b69777fd30da')::TEXT                    as "Enc.Platelets",
       (programEncounter.observations ->> 'd94486d6-cbcd-4dae-97b6-ea82681ea0d7')::TEXT                    as "Enc.Cryo",
       single_select_coded(
                  programEncounter.observations ->> '741f9df1-8dcb-44b8-a9b6-70b89fed87f4')::TEXT                 as "Enc.Transfusion reaction occurred",
       (programEncounter.observations ->> 'b199a365-815a-49b7-a232-7f2c55b18ecb')::TEXT                    as "Enc.Primary diagnosis/condition leading to death",
       single_select_coded(
                  programEncounter.observations ->> '27a14e4f-b074-4d5b-8358-2ffdfa6c25a2')::TEXT                 as "Enc.Cause of maternal death",
       multi_select_coded(
                  programEncounter.observations -> '388b96fa-4756-455a-baa9-38e00f090f3f')::TEXT                  as "Enc.Pregnancies with abortive outcome",
       multi_select_coded(
                  programEncounter.observations -> '41b9a15f-d576-4457-8594-b2576a7cf3f4')::TEXT                  as "Enc.Hypertensive disorders in pregnancy, birth and puerperium",
       multi_select_coded(
                  programEncounter.observations -> '060e631e-6b1e-4d53-8f59-1227fee486db')::TEXT                  as "Enc.Obstetric Haemmorhage",
       multi_select_coded(
                  programEncounter.observations -> '9e7056f9-ba29-45cd-b019-a1bc2e079f56')::TEXT                  as "Enc.Pregnancy related infection",
       multi_select_coded(
                  programEncounter.observations -> '93c029e4-005f-46b6-93fb-9041d8d1252b')::TEXT                  as "Enc.Other Obstetric complications",
       multi_select_coded(
                  programEncounter.observations -> '470ad5fc-7931-47bc-afcc-0c77b63edf1a')::TEXT                  as "Enc.Other direct cause",
       multi_select_coded(
                  programEncounter.observations -> 'd6990222-a6fe-4f42-a0a1-1279886672bb')::TEXT                  as "Enc.Non-obstetric complications- Anaemia",
       multi_select_coded(
                  programEncounter.observations -> '1860f864-b1c2-444b-a89a-394bc0674b31')::TEXT                  as "Enc.Non-obstetric complications- Cardiac disorders",
       multi_select_coded(
                  programEncounter.observations -> 'e53298d5-d291-4b4a-9822-a8a3cdc6469c')::TEXT                  as "Enc.Non-obstetric complications- Liver Disorders",
       multi_select_coded(
                  programEncounter.observations -> 'be0d7917-421b-4254-a895-6830af9b16b6')::TEXT                  as "Enc.Non-obstetric complications- Respiratory Disorders",
       multi_select_coded(
                  programEncounter.observations -> 'db0ed88c-f838-485e-9de2-b2626982ef4b')::TEXT                  as "Enc.Non-obstetric complications- Renal disorders",
       multi_select_coded(
                  programEncounter.observations -> 'bc93dda2-15c4-4321-ac36-6bfca096f5ad')::TEXT                  as "Enc.Non-obstetric complications- Endocrinal Disorders",
       multi_select_coded(
                  programEncounter.observations -> '949a41b4-98f2-4048-b50e-bb27d79ba9e0')::TEXT                  as "Enc.Non-obstetric complications- Neurological Disorders",
       multi_select_coded(
                  programEncounter.observations -> '39367397-a350-4eac-a5dd-a27c5d39d700')::TEXT                  as "Enc.Non-obstetric complications- Infections/ Infestations",
       single_select_coded(
                  programEncounter.observations ->> 'da364946-d11b-4ce2-85c6-1d61daf62dd0')::TEXT                 as "Enc.Delay in woman seeking help",
       single_select_coded(
                  programEncounter.observations ->> '7c942ee9-dd3f-4476-8d58-b2bb9c9e4323')::TEXT                 as "Enc.Refusal of treatment or admission",
       single_select_coded(
                  programEncounter.observations ->> '5358eb08-5d76-481a-89ce-f2eb24ad302f')::TEXT                 as "Enc.Refusal of admission in previous facility",
       single_select_coded(
                  programEncounter.observations ->> 'fcdeadae-e1f8-4a0d-89f5-2e1b0104073e')::TEXT                 as "Enc.Logistical Problems",
       single_select_coded(
                  programEncounter.observations ->> '57afa4f8-a533-4bb0-b4a7-62094ec53868')::TEXT                 as "Enc.lack of transport from home to health care facility",
       single_select_coded(
                  programEncounter.observations ->> '33e76c6c-41a8-4d68-8d87-7fb0c0f1d410')::TEXT                 as "Enc.Lack of transport between health care facilities",
       single_select_coded(
                  programEncounter.observations ->> 'e7cbc7b0-7b96-448a-8c40-eb09f2220878')::TEXT                 as "Enc.lack of assured referral system",
       single_select_coded(
                  programEncounter.observations ->> '45adbbbb-a6c7-4678-8139-a4e41e8f5aaa')::TEXT                 as "Enc.Lack of facilities, equipment or consumable",
       single_select_coded(
                  programEncounter.observations ->> 'cb2f1f5e-3085-4fe2-ab9c-8da142339f0a')::TEXT                 as "Enc.Lack of blood/ blood product",
       single_select_coded(
                  programEncounter.observations ->> 'd7fb30ff-4c70-4fc2-b938-10ca8d7121fd')::TEXT                 as "Enc.Lack of OT availability",
       single_select_coded(
                  programEncounter.observations ->> '662f1569-41b1-4eb3-8983-f962918bc59c')::TEXT                 as "Enc.Lack of human resources",
       single_select_coded(
                  programEncounter.observations ->> '99e5b54b-9ebf-4832-b7ce-85134cadf9b1')::TEXT                 as "Enc.Lack of Anesthetist",
       single_select_coded(
                  programEncounter.observations ->> '57d52e87-695c-4a4f-b262-5d495a6c8ca4')::TEXT                 as "Enc.Lack of Obstetricians",
       single_select_coded(
                  programEncounter.observations ->> 'c0e38dc4-d72e-498c-af8b-6b2ad00a7841')::TEXT                 as "Enc.Lack of expertise, training or education",
       single_select_coded(
                  programEncounter.observations ->> 'e93127f1-7b72-4acc-99a4-00ad59b750ed')::TEXT                 as "Enc.Autopsy performed",
       (programEncounter.observations ->> '899b6d45-bea6-4a20-b85d-d365ea7984cd')::TEXT                    as "Enc.Final diagnosis details",
       (programEncounter.observations ->> '2e21f6a5-6500-46be-8697-c3eac21a0bde')::TEXT                    as "Enc.Case summary",
       (programEncounter.observations ->> 'ccd4c780-775b-4141-8333-b44ab807c5da')::TEXT                    as "Enc.Capture Image",
       (programEncounter.observations ->> 'bc4e9124-4afb-4c21-8dd6-e79f4d24fd5f')::TEXT                    as "Enc.Name of MO on duty",
       (programEncounter.observations ->> 'ceaa3948-76fa-4e0f-9ef1-dfd1cf329170')::TEXT                    as "Enc.Designation of MO on duty",
       (programEncounter.observations ->> '205dac1b-9f59-416a-97a9-6fc625f23dab')::DATE                    as "Enc.Date of filling",
       (programEncounter.observations ->> 'ce006fcb-e72a-4fba-9560-8f6bb59ad699')::TEXT                    as "Enc.Name of Nodal officer of the hospital",
       (programEncounter.observations ->> '9d5dfa62-fdd0-44b3-a490-8903e262ca4d')::TEXT                    as "Enc.Address of the institution",
       programEncounter.cancel_date_time                                                                      "EncCancel.cancel_date_time"
FROM program_encounter programEncounter
            LEFT OUTER JOIN operational_encounter_type oet on programEncounter.encounter_type_id = oet.encounter_type_id
            LEFT OUTER JOIN program_enrolment programEnrolment ON programEncounter.program_enrolment_id = programEnrolment.id
            LEFT OUTER JOIN operational_program op ON op.program_id = programEnrolment.program_id
            LEFT OUTER JOIN individual individual ON programEnrolment.individual_id = individual.id
            LEFT OUTER JOIN gender g ON g.id = individual.gender_id
            LEFT OUTER JOIN address_level a ON individual.address_id = a.id
WHERE op.uuid = '61383d58-82b4-44fb-96d0-6449f0e68c1b'
  AND oet.uuid = '42d867f1-209b-465f-ba90-d9c865b0ccc6'
  AND programEnrolment.enrolment_date_time IS NOT NULL;

drop view if exists unicef_moha_form_5_community_based_verbal_autopsy;
create view unicef_moha_form_5_community_based_verbal_autopsy as
SELECT individual.id                                                                                          "Ind.Id",
       individual.address_id                                                                                  "Ind.address_id",
       individual.uuid                                                                                        "Ind.uuid",
       individual.first_name                                                                                  "Ind.first_name",
       individual.last_name                                                                                   "Ind.last_name",
       g.name                                                                                                 "Ind.Gender",
       individual.date_of_birth                                                                               "Ind.date_of_birth",
       individual.date_of_birth_verified                                                                      "Ind.date_of_birth_verified",
       individual.registration_date                                                                           "Ind.registration_date",
       individual.facility_id                                                                                 "Ind.facility_id",
       a.title                                                                                                "Ind.Area",
       individual.is_voided                                                                                   "Ind.is_voided",
       op.name                                                                                                "Enl.Program Name",
       programEnrolment.id                                                                                    "Enl.Id",
       programEnrolment.uuid                                                                                  "Enl.uuid",
       programEnrolment.is_voided                                                                             "Enl.is_voided",
       oet.name                                                                                               "Enc.Type",
       programEncounter.id                                                                                    "Enc.Id",
       programEncounter.earliest_visit_date_time                                                              "Enc.earliest_visit_date_time",
       programEncounter.encounter_date_time                                                                   "Enc.encounter_date_time",
       programEncounter.program_enrolment_id                                                                  "Enc.program_enrolment_id",
       programEncounter.uuid                                                                                  "Enc.uuid",
       programEncounter.name                                                                                  "Enc.name",
       programEncounter.max_visit_date_time                                                                   "Enc.max_visit_date_time",
       programEncounter.is_voided                                                                             "Enc.is_voided",
       single_select_coded(
                  programEnrolment.observations ->> '9cee1acc-9323-46cf-8167-d67326fbd8ed')::TEXT                 as "Enl.Form filled in",
       (programEnrolment.observations ->> 'eb2fabb9-f5f8-4ee6-bab2-88e489df8751')::TEXT                    as "Enl.Name of Husband",
       (programEnrolment.observations ->> 'f7c955f5-6747-4695-bf96-f6deb8fb41b4')::TEXT                    as "Enl.Name of Father",
       (programEnrolment.observations ->> '0bae0557-7461-4d4d-a14e-1e9e8793ba6f')::TEXT                    as "Enl.RCH Number",
       (programEnrolment.observations ->> '82fa0dbb-92f9-4ec2-9263-49054e64d909')::TEXT                    as "Enl.Contact Number",
       (programEnrolment.observations ->> 'e3134346-5770-4d7c-8845-9da734bf2a93')::DATE                    as "Enl.Date and time of Death",
       (programEnrolment.observations ->> '079fb844-0d72-49cf-8389-b821f1b5ab37')::TEXT                    as "Enl.Name of place of death",
       single_select_coded(
                  programEnrolment.observations ->> '9e0e21b0-e5c2-406a-8da6-a11a78d65329')::TEXT                 as "Enl.Timing of death in pregnancy",
       (programEnrolment.observations ->> 'a334f0f7-434d-4acf-b4c2-dff3cb6f454b')::TEXT                    as "Enl.Name of reporting person",
       (programEnrolment.observations ->> 'ad31dc43-3c4d-48ff-aae6-194858207f1f')::TEXT                    as "Enl.Designation of reporting person",
       (programEnrolment.observations ->> 'a08c7590-1940-4a88-8d66-ec46649669cd')::DATE                    as "Enl.Reporting Date",
       (programEnrolment.observations ->> '4b721e9d-bf7f-4ccd-bf7e-1df9d40308ab')::TEXT                    as "Enl.Name of subcenter",
       (programEncounter.observations ->> 'e3134346-5770-4d7c-8845-9da734bf2a93')::DATE                    as "Enc.Date and time of Death",
       (programEncounter.observations ->> 'a425325b-919e-4aca-801f-5d9c8ae9f211')::TEXT                    as "Enc.Name of Investigator",
       (programEncounter.observations ->> 'eb3336cc-454c-44ff-be3c-a67f7ebfc22f')::TEXT                    as "Enc.Designation of Investigator",
       (programEncounter.observations ->> 'a6351c9a-9e76-4e0d-af62-01dda452f895')::DATE                    as "Enc.Date of Investigation",
       single_select_coded(
                  programEncounter.observations ->> '04880a88-b87e-4bd5-a75d-ce230b847506')::TEXT                 as "Enc.Probable cause of death details",
       (programEncounter.observations ->> 'e3a7aab6-e92a-45b6-b04f-81c8c9af29f3')::TEXT                    as "Enc.Other probable cause of death",
       single_select_coded(
                  programEncounter.observations ->> '55b83b4e-48a0-432c-be25-d164e0067561')::TEXT                 as "Enc.Participate in this interview",
       (programEncounter.observations ->> '2967f6b2-7f22-428d-b753-deb91791cd5f')::TEXT                    as "Enc.Respondent Name",
       (programEncounter.observations ->> '2ae9c037-5183-4aaa-bc7a-3f3ae104dd67')::TEXT                    as "Enc.Name of Interviewer",
       (programEncounter.observations ->> 'ef4496a8-0c02-4472-91e9-432f9cd64620')::DATE                    as "Enc.Date of Interview",
       (programEncounter.observations ->> '49b04d10-6ef6-45fa-81f1-652976291e00')::TEXT                    as "Enc.Name and Designation of Investigator 1",
       (programEncounter.observations ->> '46742922-0a9f-44d3-9e3b-87b529e87f0e')::TEXT                    as "Enc.Name and Designation of Investigator 2",
       (programEncounter.observations ->> '1f85ace4-cd2d-47b2-bca7-e45ab9242794')::TEXT                    as "Enc.Name and Designation of Investigator 3",
       (programEncounter.observations ->> 'ced2be73-842f-44fe-a380-fab94a9474b4')::TEXT                    as "Enc.Name of the respondent",
       (programEncounter.observations ->> '87493ece-1633-41c2-8a87-8d17c748583c')::TEXT                    as "Enc.Name of the deceased woman",
       (programEncounter.observations ->> 'cd640449-02b3-402c-a063-6b0014900885')::TEXT                    as "Enc.Relationship of the respondent/s with the deceased woman",
       (programEncounter.observations ->> 'edd950ba-148d-4e1d-b086-6de471a6b965')::TEXT                    as "Enc.Age of the deceased woman at the time of death",
       single_select_coded(
                  programEncounter.observations ->> '1ffb6eeb-84ab-4323-b86b-ea97fbc847d1')::TEXT                 as "Enc.Period of Death",
       single_select_coded(
                  programEncounter.observations ->> '3f6c371a-4638-4823-be14-98c22f208902')::TEXT                 as "Enc.Place of death",
       (programEncounter.observations ->> '3631fbd7-40d9-456d-8987-ba3b9d5f4a2f')::TEXT                    as "Enc.Other Place of death",
       (programEncounter.observations ->> '4daa982b-5886-405a-be04-4c26cbca3c41')::TEXT                    as "Enc.Specify the name and place of the institution or village / urban area where death occurred",
       (programEncounter.observations ->> 'f7e5d7d4-110a-4ecd-a77d-7fb26086f68e')::DATE                    as "Enc.Date & Time of Death",
       single_select_coded(
                  programEncounter.observations ->> 'f44552ea-41f7-4056-b3ca-6867d3893ec2')::TEXT                 as "Enc.Did the doctor or nurse at the health facility tell you the cause of death.",
       (programEncounter.observations ->> '105764fd-9786-4254-b3ae-a00f711ec952')::TEXT                    as "Enc.Cause of death",
       single_select_coded(
                  programEncounter.observations ->> 'c7381c2e-1f1d-4175-b8d9-9ebc54cae55b')::TEXT                 as "Enc.Deceased woman married",
       (programEncounter.observations ->> 'ce235c58-c84b-4cda-b600-305ebf7091e4')::TEXT                    as "Enc.Age at Marriage",
       (programEncounter.observations ->> '6a7c1cd1-9c21-4b61-8779-150643ce8bd8')::TEXT                    as "Enc.Age at the time of first pregnancy",
       single_select_coded(
                  programEncounter.observations ->> 'c922c13c-1fa2-42dd-a7e8-d234b0324870')::TEXT                 as "Enc.Religion",
       (programEncounter.observations ->> '8cb023a6-d855-42a7-840b-286dd8ef3ed6')::TEXT                    as "Enc.Other Religion",
       single_select_coded(
                  programEncounter.observations ->> '61ab6413-5c6a-4512-ab6e-7d5cd1439569')::TEXT                 as "Enc.Caste Category",
       single_select_coded(
                  programEncounter.observations ->> '7a30ab52-f140-49be-8386-085d36379cfa')::TEXT                 as "Enc.BPL Status",
       single_select_coded(
                  programEncounter.observations ->> '39595a16-a9c6-49a5-a42b-3f462607058c')::TEXT                 as "Enc.Education",
       (programEncounter.observations ->> '9899e90e-efa7-4755-b0b7-d91444a1995a')::TEXT                    as "Enc.Other Education",
       (programEncounter.observations ->> '03fb1242-a83c-4421-ace7-1a0c10c89b97')::TEXT                    as "Enc.Name and location of the nearest government/private facility providing emergency obstetric care services",
       (programEncounter.observations ->> '23fd3369-d1d3-4ab9-a6c9-a6c3641f94a8')::TEXT                    as "Enc.Distance of this facility from the residence",
       multi_select_coded(
                  programEncounter.observations -> 'ca5c3e67-2d06-4947-b0be-8565a62eb39d')::TEXT                  as "Enc.Type of transport used from home",
       (programEncounter.observations ->> 'aebc54ac-c856-4ccf-a534-73e8008337be')::TEXT                    as "Enc.Other mode of transport available from home",
       (programEncounter.observations ->> 'dc2c23e9-19ad-471f-81d1-213069ccc975')::TEXT                    as "Enc.Gravida",
       (programEncounter.observations ->> '2d679fd5-a75b-46bd-96c2-10c180187342')::TEXT                    as "Enc.Parity",
       (programEncounter.observations ->> 'eca8d9c2-b818-4913-abb1-1724920c9a41')::TEXT                    as "Enc.Past Live Births",
       (programEncounter.observations ->> '38b9986b-76e8-4015-ae51-48152b1cd42c')::TEXT                    as "Enc.Number of abortions",
       single_select_coded(
                  programEncounter.observations ->> '59ff5327-2911-4fb0-a895-3b3714550147')::TEXT                 as "Enc.Infant Survival",
       single_select_coded(
                  programEncounter.observations ->> '913df14a-525d-4fd0-b69f-4a5a9acab7b0')::TEXT                 as "Enc.Antenatal care received",
       (programEncounter.observations ->> 'bdd87c87-f073-40c0-952a-38f9cd160235')::TEXT                    as "Enc.Number of Antenatal care received",
       multi_select_coded(
                  programEncounter.observations -> 'bf699779-4fd4-48d0-8450-e843ecded6eb')::TEXT                  as "Enc.Place of antenatal checkup",
       (programEncounter.observations ->> 'af349d7b-22fd-43d7-925d-b7c4af0b0e49')::TEXT                    as "Enc.Other place of antenatal checkup",
       multi_select_coded(
                  programEncounter.observations -> '15423d2c-4d95-4b4e-a574-47e4049c8ceb')::TEXT                  as "Enc.Services during ANC",
       single_select_coded(
                  programEncounter.observations ->> '11e40f0e-4b64-4b49-a3c6-624669c07165')::TEXT                 as "Enc.Problem during antenatal period",
       single_select_coded(
                  programEncounter.observations ->> '1e542756-fa2e-4cef-925c-7f36bb54156e')::TEXT                 as "Enc.Symptoms for problems during ANC",
       (programEncounter.observations ->> '899fd3df-dcbd-4024-8a4e-86f2df2f60bc')::TEXT                    as "Enc.Other Symptoms",
       single_select_coded(
                  programEncounter.observations ->> '8a46cfec-f6c4-4802-ac8d-3d230c8dab11')::TEXT                 as "Enc.Care for these symptoms",
       multi_select_coded(
                  programEncounter.observations -> 'f061a8b1-213b-47db-954a-e43b80a4cb56')::TEXT                  as "Enc.Where seeked care",
       (programEncounter.observations ->> 'a6bf54e1-4591-4f5f-8600-a2c6fab928f3')::TEXT                    as "Enc.Other seeked care",
       multi_select_coded(
                  programEncounter.observations -> '62cc39a8-be58-473e-9fde-36824ab73127')::TEXT                  as "Enc.Reason for not seeking care 3",
       (programEncounter.observations ->> '20d1bf50-a3b8-4c45-b71f-ad1bc1de2491')::TEXT                    as "Enc.Other reason for not seeking care 1",
       (programEncounter.observations ->> '7d73d261-3975-4b0a-bbba-fe765955b962')::TEXT                    as "Enc.No of weeks of pregnancy",
       (programEncounter.observations ->> '0f151dbe-93a6-46f4-a759-36b13de95c50')::TEXT                    as "Enc.Problems deceased woman had at time of death",
       multi_select_coded(
                  programEncounter.observations -> '86039e4d-efd8-4920-9e73-869fca7bc0a9')::TEXT                  as "Enc.Symptoms at time of death",
       (programEncounter.observations ->> '2266a771-71bf-4f8f-a0ba-267bfd630982')::TEXT                    as "Enc.Other symptoms at time of death",
       single_select_coded(
                  programEncounter.observations ->> '514144ac-4782-481d-b32c-19dcd9f28ff4')::TEXT                 as "Enc.Referred at that time",
       single_select_coded(
                  programEncounter.observations ->> 'ee47b9b0-eb32-4bab-80cc-efd525f01f98')::TEXT                 as "Enc.Did she seek care",
       single_select_coded(
                  programEncounter.observations ->> '2b3da568-9523-42e4-a9ab-4ef581096723')::TEXT                 as "Enc.Where seeked care for these complications",
       (programEncounter.observations ->> '00719230-f57d-4c51-8183-eded9a67267f')::TEXT                    as "Enc.Other place to seek care",
       (programEncounter.observations ->> 'b7fafaa7-5bc7-4c57-8dd0-3d7f0727a1c6')::DATE                    as "Enc.Date of referral from home",
       (programEncounter.observations ->> 'e58bb7d9-66d4-49b6-b74a-cedac3ab2a5f')::TEXT                    as "Enc.Time of onset of complication of labor at home",
       (programEncounter.observations ->> '2ea89ce6-d287-4ff0-884f-d8cfe892670a')::DATE                    as "Enc.Time of calling transport at home",
       (programEncounter.observations ->> '0c6b579d-795c-43c5-ab1e-92d7146ec930')::DATE                    as "Enc.Date of admission to Facility 1",
       (programEncounter.observations ->> 'bdddd6ae-504f-4562-b00c-96f9a794693b')::TEXT                    as "Enc.Referral time of onset of complication at facility 1",
       (programEncounter.observations ->> '50707344-3e3a-4dff-bc7b-dd8e1ab9ceeb')::DATE                    as "Enc.Time of calling transport at Facility 1",
       (programEncounter.observations ->> '2adf6c28-d52b-4a4a-9b66-b59406297a9d')::DATE                    as "Enc.Time of arrival of transport at Facility 1",
       single_select_coded(
                  programEncounter.observations ->> 'bb85a4a6-d35b-4878-80fd-2aca12af2857')::TEXT                 as "Enc.Referral transport used",
       (programEncounter.observations ->> '02afc5fa-0af3-4e20-a88e-d5adf0b8b833')::TEXT                    as "Enc.Other type of transport used from Facility 1",
       (programEncounter.observations ->> 'd3fbfce1-ff22-42ce-99bc-4df3c3361046')::TEXT                    as "Enc.Time taken to reach Facility 1",
       (programEncounter.observations ->> '60982d69-1cb9-448b-916f-1b7af4b93aae')::TEXT                    as "Enc.Referral Money spent on transportation from facility 1",
       (programEncounter.observations ->> '6916fe24-12d4-4595-9d19-b3581473e68f')::TEXT                    as "Enc.Name of facility/level of referral form facility 1",
       multi_select_coded(
                  programEncounter.observations -> 'db1a4228-8029-4039-aa8c-334da1fba10e')::TEXT                  as "Enc.Attened at facility 1 by",
       (programEncounter.observations ->> 'ebae71dc-e00d-47e6-af3f-ede9ad5c2169')::TEXT                    as "Enc.Specify Other Staff..",
       (programEncounter.observations ->> '7d162394-617b-4dee-9d0b-8ec427e12acf')::TEXT                    as "Enc.Reason for referral from facility 1",
       single_select_coded(
                  programEncounter.observations ->> '61dfc28e-54e6-4a66-9449-c6b1e92e710e')::TEXT                 as "Enc.Referral slip given from Facility 1",
       single_select_coded(
                  programEncounter.observations ->> 'e751fcb0-d8c3-47fc-8d39-d61feff047d2')::TEXT                 as "Enc.Treatment given at Facility 1",
       (programEncounter.observations ->> '0ebfe58e-c5a6-42e4-b977-7a5ea438e84f')::TEXT                    as "Enc.Specify Other Treatment given at Facility 1",
       (programEncounter.observations ->> 'ce501675-82f0-4b30-a699-d8c67b674a46')::TEXT                    as "Enc.Money spent on treatment at facility 1",
       (programEncounter.observations ->> '5dcadb2f-910a-4e33-950d-a67296a1aae8')::TEXT                    as "Enc.Time spent at facility 1",
       (programEncounter.observations ->> '5f1987e8-1ddb-4cd2-9c56-fa13a76842c4')::DATE                    as "Enc.Date of admission to Facility 2",
       (programEncounter.observations ->> '05afff29-f474-408b-b4ea-fccf75b29996')::TEXT                    as "Enc.Referral time of onset of complication at facility 2",
       (programEncounter.observations ->> '99c2471f-cdc6-4a33-91a7-81ebbce7179b')::DATE                    as "Enc.Time of calling transport at Facility 2",
       (programEncounter.observations ->> 'f1bb3a1c-d6e5-4dd4-8293-cc3ecc1f51db')::DATE                    as "Enc.Time of arrival of transport at Facility 2",
       single_select_coded(
                  programEncounter.observations ->> 'a388eef9-2abc-41f5-a195-8936d396a05b')::TEXT                 as "Enc.Referral transport used from facility 2",
       (programEncounter.observations ->> '25b33aef-788c-4dcc-86ba-ee2727adbf51')::TEXT                    as "Enc.Other type of transport used from Facility 2",
       (programEncounter.observations ->> '830edb61-7b64-4b1b-a8b3-ec9072c67da7')::TEXT                    as "Enc.Time to reach from Facility 1 to Facility 2",
       (programEncounter.observations ->> 'c6b8d417-76aa-42bc-b6ff-43098f18dbcb')::TEXT                    as "Enc.Referral Money spent on transportation from facility 2",
       (programEncounter.observations ->> 'ad9b7585-75f2-4670-baac-e2eda7dc8e32')::TEXT                    as "Enc.Name of facility/level of referral form facility 2",
       multi_select_coded(
                  programEncounter.observations -> '0f498e7c-92e6-4407-8c76-526127e4037a')::TEXT                  as "Enc.Attended at facility 2 by",
       (programEncounter.observations ->> '29bb6fc5-44e0-4c93-b366-b74fcc4d5c76')::TEXT                    as "Enc.Specify Other Staff at Facility 2",
       (programEncounter.observations ->> '6f169c87-ce42-4966-947d-6f036c31b13c')::TEXT                    as "Enc.Reason for referral from facility 2",
       single_select_coded(
                  programEncounter.observations ->> 'dcd04ea9-c92b-4356-94dd-67408e17c933')::TEXT                 as "Enc.Referral slip given from Facility 2",
       single_select_coded(
                  programEncounter.observations ->> '70f354df-5846-4e7d-aec2-661bd2aba924')::TEXT                 as "Enc.Treatment given at Facility 2",
       (programEncounter.observations ->> '0d96bbb9-7216-467c-8d5d-7f162d7112ef')::TEXT                    as "Enc.Other Treatment given at Facility 2",
       (programEncounter.observations ->> 'ff2aaf60-b72e-46ff-88dd-ee02e2a1e26f')::TEXT                    as "Enc.Money spent on treatment at facility 2",
       (programEncounter.observations ->> '25cf63f3-3d05-423e-8837-2ac6828d90cc')::TEXT                    as "Enc.Time spent at facility 2",
       (programEncounter.observations ->> '1ce3f4cb-898f-44b4-ba6b-11e401149e18')::DATE                    as "Enc.Date of admission to Facility 3",
       (programEncounter.observations ->> 'd625abc1-f93c-44c7-bb53-983af6a49082')::TEXT                    as "Enc.Referral time of onset of complication at facility 3",
       (programEncounter.observations ->> '848bb657-7e29-4b15-b248-0f7a56690b3c')::TEXT                    as "Enc.Referral time of calling of transport from facility 3",
       (programEncounter.observations ->> '4fa759a6-6f00-4926-9362-9417d80f40c0')::DATE                    as "Enc.Time of arrival of transport at Facility 3",
       single_select_coded(
                  programEncounter.observations ->> '328d7efd-39a5-4aa6-9e31-26bebced8d1b')::TEXT                 as "Enc.Referral transport used from facility 3",
       (programEncounter.observations ->> 'a82c140d-bf5c-426b-9a18-296b31504f43')::TEXT                    as "Enc.Other type of transport used from Facility 3",
       (programEncounter.observations ->> '4ea46b09-646d-4764-85ee-224945510b4e')::TEXT                    as "Enc.Time to reach from Facility 2 to Facility 3",
       (programEncounter.observations ->> 'c89bc382-df76-49fb-b685-21dfcf746c11')::TEXT                    as "Enc.Referral Money spent on transportation from facility 3",
       (programEncounter.observations ->> 'ca0a04aa-334f-4237-983a-905dfd071cde')::TEXT                    as "Enc.Name of facility/level of referral form facility 3",
       multi_select_coded(
                  programEncounter.observations -> 'e9c09426-00ba-4ffb-90a1-9b3ead39a337')::TEXT                  as "Enc.Attended at facility 3 by",
       (programEncounter.observations ->> 'cc665228-3833-4039-9e67-d53bee86dfdf')::TEXT                    as "Enc.Specify Other Staff at Facility 3",
       (programEncounter.observations ->> '2048afc7-7872-455e-83f4-fa12f3ce462f')::TEXT                    as "Enc.Reason for referral from facility 3",
       single_select_coded(
                  programEncounter.observations ->> 'c9a0d818-4fda-4c28-bb33-4551740eedf2')::TEXT                 as "Enc.Referral slip given from Facility 3",
       single_select_coded(
                  programEncounter.observations ->> 'f6a950ca-5268-4ef4-8643-9b1f774f856e')::TEXT                 as "Enc.Treatment given at Facility 3",
       (programEncounter.observations ->> '31e1c862-1784-4e37-a5d4-f99c30d24a44')::TEXT                    as "Enc.Other Treatment given at Facility 3",
       (programEncounter.observations ->> 'c7829aca-9edb-4e90-b11e-07cb8a9d8963')::TEXT                    as "Enc.Money spent on treatment at facility 3",
       (programEncounter.observations ->> 'a620420d-3b52-45f4-9bf2-e1e539638e6f')::TEXT                    as "Enc.Time spent at facility 3",
       (programEncounter.observations ->> '106d3a71-0479-4aaa-af19-39df4a554816')::DATE                    as "Enc.Date of admission to Facility 4",
       (programEncounter.observations ->> 'b2444282-fa1e-45e1-8498-c0f58add7dfb')::TEXT                    as "Enc.Referral time of onset of complication at facility 4",
       (programEncounter.observations ->> '3863a025-c1bb-4372-aa99-cd437e39a715')::DATE                    as "Enc.Time of calling transport at Facility 4",
       (programEncounter.observations ->> '9fd80d7a-7eae-4be0-a050-5ceed157e5e8')::DATE                    as "Enc.Time of arrival of transport at Facility 4",
       single_select_coded(
                  programEncounter.observations ->> '9819aa51-f52f-413c-b8fd-4b407ffa8500')::TEXT                 as "Enc.Referral transport used from facility 4",
       (programEncounter.observations ->> '60a55b00-ddfa-4ac3-87de-5d45e5aed5c7')::TEXT                    as "Enc.Other type of transport used from Facility 4",
       (programEncounter.observations ->> '2ed9d7f6-5396-4d60-8d38-4b2c2ff188e2')::TEXT                    as "Enc.Time to reach from Facility 3 to Facility 4",
       (programEncounter.observations ->> '0d4f6ce7-77a8-4b6b-b039-42599347c9d7')::TEXT                    as "Enc.Referral Money spent on transportation from facility 4",
       (programEncounter.observations ->> '1480b9cd-0108-402a-8c6b-4dce278eae85')::TEXT                    as "Enc.Name of facility/level of referral form facility 4",
       multi_select_coded(
                  programEncounter.observations -> 'ab3850eb-ecf3-40f1-9595-f8d7a5b73df3')::TEXT                  as "Enc.Attended at facility 4 by",
       (programEncounter.observations ->> 'e731bbe8-cdfc-494d-83e4-06ee7706c1d6')::TEXT                    as "Enc.Specify Other Staff at Facility 4",
       single_select_coded(
                  programEncounter.observations ->> 'a14a9ca3-f4f0-4885-b4e5-b5acefcfab30')::TEXT                 as "Enc.Reason for referral from Facility 4",
       (programEncounter.observations ->> '11fa2b9e-d98f-47f5-9e48-4d47677a92bc')::TEXT                    as "Enc.Other Reason for referral from Facility 4",
       single_select_coded(
                  programEncounter.observations ->> 'c47dc768-2630-4942-91ba-d0d7b18bfe62')::TEXT                 as "Enc.Referral slip given from Facility 4",
       single_select_coded(
                  programEncounter.observations ->> 'a69ef4cd-de59-4f90-98df-c014287fbe39')::TEXT                 as "Enc.Treatment given at Facility 4",
       (programEncounter.observations ->> '0e211eaf-b283-4349-9198-5b5dee72be71')::TEXT                    as "Enc.Specify Other Treatment given at Facility 4",
       (programEncounter.observations ->> 'cab492fb-b9ee-445d-883e-f62ea76623a6')::TEXT                    as "Enc.Money spent on treatment at facility 4",
       (programEncounter.observations ->> '1d20e2e6-d9a1-4aa0-a45e-3f5fca0e111e')::TEXT                    as "Enc.Time spent at facility 4",
       (programEncounter.observations ->> '064774a5-cd7e-45f4-8db8-98a79839bc47')::DATE                    as "Enc.Date of admission to Facility 5",
       (programEncounter.observations ->> 'be019ec3-5e76-4263-832f-c3a29a851792')::TEXT                    as "Enc.Referral time of onset of complication at facility 5",
       (programEncounter.observations ->> 'bd66d704-e347-4283-974b-7639b4264f52')::DATE                    as "Enc.Time of calling transport at Facility 5",
       (programEncounter.observations ->> 'ca1dee29-7910-4325-8b3e-fe682fd72b31')::DATE                    as "Enc.Time of arrival of transport at Facility 5",
       single_select_coded(
                  programEncounter.observations ->> 'fa119bd1-3466-4c81-94bd-73c0607dfe99')::TEXT                 as "Enc.Referral transport used from facility 5",
       (programEncounter.observations ->> '6cb7786a-d76f-4056-968f-5a951188d62c')::TEXT                    as "Enc.Other type of transport used from Facility 5",
       (programEncounter.observations ->> '7d061b88-1689-4a31-9a4d-3c166c450d86')::TEXT                    as "Enc.Time to reach from Facility 4 to Facility 5",
       (programEncounter.observations ->> '43ec9956-51e4-4e95-97ce-3c3177d9854a')::TEXT                    as "Enc.Referral Money spent on transportation from facility 5",
       (programEncounter.observations ->> '71f42867-070b-47f6-aff5-e1171ee91dc5')::TEXT                    as "Enc.Name of facility/level of referral form facility 5",
       multi_select_coded(
                  programEncounter.observations -> '2eaa8d56-57bd-457b-8a01-6c317bf720aa')::TEXT                  as "Enc.Attended at facility 5 by",
       (programEncounter.observations ->> 'fa5772ab-b347-4a14-9095-9ece2dc803c4')::TEXT                    as "Enc.Specify Other Staff at Facility 5",
       (programEncounter.observations ->> '726f4528-ca7a-443d-95bb-e5db37ee6aab')::TEXT                    as "Enc.Reason for referral from facility 5",
       single_select_coded(
                  programEncounter.observations ->> '8431dffb-ce81-48b8-84e6-66b25fb8e1ea')::TEXT                 as "Enc.Referral slip given from Facility 5",
       single_select_coded(
                  programEncounter.observations ->> '98dc7010-63d6-4b46-a11e-07c34ddd7b45')::TEXT                 as "Enc.Treatment given at Facility 5",
       (programEncounter.observations ->> 'c7c75a51-75b7-4a50-bbf2-7d8cd4dddd56')::TEXT                    as "Enc.Other Treatment given at Facility 5",
       (programEncounter.observations ->> '6efad4b5-6d38-48c7-b3cb-04062392ec62')::TEXT                    as "Enc.Money spent on treatment at facility 5",
       (programEncounter.observations ->> '4d2043dc-e30d-49d1-b0cb-fbfabdb4ca94')::TEXT                    as "Enc.Time spent at facility 5",
       (programEncounter.observations ->> '3df2de99-4dd8-4983-84e3-129438f33b5f')::DATE                    as "Enc.Date of admission to Facility 6",
       (programEncounter.observations ->> '0abbfdfa-062c-4e9c-bd91-31e189d36b66')::TEXT                    as "Enc.Referral time of onset of complication at facility 6",
       (programEncounter.observations ->> '75f78e6d-b4b5-4261-9255-8c45e105a465')::DATE                    as "Enc.Time of calling transport at Facility 6",
       (programEncounter.observations ->> '233fb4fb-a334-4305-ab77-164ab31912c5')::DATE                    as "Enc.Time of arrival of transport at Facility 6",
       single_select_coded(
                  programEncounter.observations ->> 'e7026a6c-68a1-4846-8a35-1a42a3606532')::TEXT                 as "Enc.Referral transport used from facility 6",
       (programEncounter.observations ->> 'ec9ebede-368b-491b-842a-1b01a59c7b33')::TEXT                    as "Enc.Other type of transport used from Facility 6",
       (programEncounter.observations ->> '859447a0-f9d1-4c3d-b429-4162e6ee22c4')::TEXT                    as "Enc.Time to reach from Facility 5 to Facility 6",
       (programEncounter.observations ->> '11366457-72db-4220-8354-31bdaa40a88f')::TEXT                    as "Enc.Referral Money spent on transportation from facility 6",
       (programEncounter.observations ->> '019de148-4fb4-47d2-92c8-d64306f6e32f')::TEXT                    as "Enc.Name of facility/level of referral form facility 6",
       multi_select_coded(
                  programEncounter.observations -> '6adc8455-4b3b-4ee3-ac34-ff3f4ddf1dea')::TEXT                  as "Enc.Attended at facility 6 by",
       (programEncounter.observations ->> 'dec660a4-9c71-4c1a-a5c6-dcc7dc286da5')::TEXT                    as "Enc.Specify Other Staff at Facility 6",
       (programEncounter.observations ->> '0298f470-e618-48a8-90d3-e31458e370fe')::TEXT                    as "Enc.Reason for referral from facility 6",
       single_select_coded(
                  programEncounter.observations ->> '6a704866-52fa-46a4-a540-abee351c353d')::TEXT                 as "Enc.Referral slip given from Facility 6",
       single_select_coded(
                  programEncounter.observations ->> '3d603cd3-8353-4361-af8e-c1951a17f650')::TEXT                 as "Enc.Treatment given at Facility 6",
       (programEncounter.observations ->> '8cb178c6-a23d-47d7-88bc-8ad131b69de3')::TEXT                    as "Enc.Other Treatment given at Facility 6",
       (programEncounter.observations ->> '33161700-1326-4e05-a53f-08e1f4565eed')::TEXT                    as "Enc.Money spent on treatment at facility 6",
       (programEncounter.observations ->> '325453bc-80f3-4200-9e39-a3aae2c34f8f')::TEXT                    as "Enc.Time spent at facility 6",
       multi_select_coded(
                  programEncounter.observations -> 'b559e6c1-4f0a-41cc-8e3d-79cc81caf846')::TEXT                  as "Enc.Reasons for not seeking care",
       (programEncounter.observations ->> 'b7b8a157-12b6-480e-adc3-7db72b7cec18')::TEXT                    as "Enc.Other reason for not seeking care 2",
       single_select_coded(
                  programEncounter.observations ->> 'ef32af44-9595-4f23-a441-f3b7e2b91665')::TEXT                 as "Enc.Did deceased woman died while having abortion",
       single_select_coded(
                  programEncounter.observations ->> '3c387716-7fe2-40d6-86a6-41628ed50edb')::TEXT                 as "Enc.Type of abortion",
       (programEncounter.observations ->> '9b7b4dad-5cab-4bad-9861-fef24e16e423')::DATE                    as "Enc.3. Date of spontaneous abortion/ date of termination of pregnany",
       single_select_coded(
                  programEncounter.observations ->> '71980fe4-af70-4e4b-a53a-735b738238e6')::TEXT                 as "Enc.Where was the abortion completed",
       (programEncounter.observations ->> 'd742e6b7-8ed7-4d83-8513-2ec303faf2f5')::TEXT                    as "Enc.Other, where was abortion completed",
       single_select_coded(
                  programEncounter.observations ->> '5583472c-5559-407b-b2eb-8e32d709b2f1')::TEXT                 as "Enc.Abortion inducing method",
       single_select_coded(
                  programEncounter.observations ->> '2fc661cb-29fb-4bfe-9b6c-77375173405d')::TEXT                 as "Enc.Induced abortion performed at",
       (programEncounter.observations ->> '8fe6bbc8-6cae-41c5-985a-979a4944da8b')::TEXT                    as "Enc.Other, where she had induced abortion",
       multi_select_coded(
                  programEncounter.observations -> 'a0ac3d78-77ae-45a8-af66-8f6d1144c8a2')::TEXT                  as "Enc.Induced abortion performed by",
       (programEncounter.observations ->> '80bc390f-dc9a-465e-96c8-40cae85e6a9c')::TEXT                    as "Enc.Other, who performed the abortion",
       single_select_coded(
                  programEncounter.observations ->> 'e31162a3-ca80-4ce8-adfc-97b201be3e21')::TEXT                 as "Enc.Reason for inducing the abortion",
       (programEncounter.observations ->> '1f5b781c-1360-4ab8-9dd1-4fc9bdecad71')::TEXT                    as "Enc.Description of inducing abortion",
       multi_select_coded(
                  programEncounter.observations -> 'c7c04aac-f63c-4c0e-8b11-7e379cb8e31f')::TEXT                  as "Enc.Complication/symptoms after the abortion",
       single_select_coded(
                  programEncounter.observations ->> 'd0073b51-c020-489b-bfba-cbb3834cb1e4')::TEXT                 as "Enc.Seek care after developing complication 1",
       single_select_coded(
                  programEncounter.observations ->> '02f97f10-5043-4db1-952c-803762532df0')::TEXT                 as "Enc.Seek care after developing complication 2",
       (programEncounter.observations ->> '6ff1cc86-efdb-4f17-9666-5841321087b0')::TEXT                    as "Enc.VIII. 11. If Other, specify",
       multi_select_coded(
                  programEncounter.observations -> '12bbcc67-21e0-4e4b-8fa3-6c1c1f1ef3d9')::TEXT                  as "Enc.Reason for not seeking the care",
       (programEncounter.observations ->> '668dd606-f285-42c9-92af-b6a6edfdb5e1')::TEXT                    as "Enc.Other reason for not seeking care 3",
       single_select_coded(
                  programEncounter.observations ->> '704bd399-471e-47f7-a557-15a8822e7de0')::TEXT                 as "Enc.Place of delivery.",
       (programEncounter.observations ->> 'b600db53-5338-47ff-b4af-cd9118f7e91b')::TEXT                    as "Enc.Other, place of delivery",
       multi_select_coded(
                  programEncounter.observations -> 'e7ae50e1-4c1c-43bd-8584-54b0d24d109a')::TEXT                  as "Enc.Reason for home delivery",
       (programEncounter.observations ->> '2f7da1fd-f199-4068-8f7a-cb3cf881af1e')::TEXT                    as "Enc.Other, reason for home delivery",
       (programEncounter.observations ->> '0625382b-a698-4232-b3bb-5ef94aa66fb3')::TEXT                    as "Enc.3. No. of completed pregnancy weeks at time of delivery",
       (programEncounter.observations ->> 'dcb4741d-d65c-404e-8aec-8b805cde875a')::DATE                    as "Enc.Date and time of Delivery",
       multi_select_coded(
                  programEncounter.observations -> '3868f0f7-51b7-4714-ab84-6ecb321ae885')::TEXT                  as "Enc.Delivery conducted by",
       (programEncounter.observations ->> '462fff03-0a0c-4552-bf78-7a212834c6e5')::TEXT                    as "Enc.other, delivery conducte by",
       single_select_coded(
                  programEncounter.observations ->> 'aac560fc-303d-464d-9922-f0e4ea18d79d')::TEXT                 as "Enc.Type of delivery.",
       (programEncounter.observations ->> 'f15ae5ba-369f-469f-9792-a8f4a0039189')::TEXT                    as "Enc.Live births in this delivery",
       (programEncounter.observations ->> 'f751d9b5-a83c-48c9-8db6-4418aa3c24d8')::TEXT                    as "Enc.Still Births",
       multi_select_coded(
                  programEncounter.observations -> '301165eb-9c76-45c0-89a8-a21eac81cfbf')::TEXT                  as "Enc.Complication during labor.",
       (programEncounter.observations ->> 'a45ea9cd-2be0-4d0a-b68d-5150dedd01bc')::TEXT                    as "Enc.Other complication during labor / delivery",
       multi_select_coded(
                  programEncounter.observations -> 'c2f51fe9-1610-4535-a679-bb77cebe9ce9')::TEXT                  as "Enc.Treatmet provided at health facility",
       (programEncounter.observations ->> '95c83bef-053e-4d99-acdf-e3b326fb5c48')::TEXT                    as "Enc.Other, treatment provided at health facility",
       (programEncounter.observations ->> 'd3f8c64e-d983-414a-a4cf-909558043f7f')::TEXT                    as "Enc.Details of treatment from hospital record",
       (programEncounter.observations ->> 'ffa84411-6f26-49d9-8c82-f4f7d6139f9a')::TEXT                    as "Enc.Photo with details of treatment received from hospital record",
       single_select_coded(
                  programEncounter.observations ->> 'aad907d4-381c-4b04-82b6-86866f463eb4')::TEXT                 as "Enc.Information about the complication from hospital",
       (programEncounter.observations ->> '7a3d684c-a57e-4ceb-94a2-df45a5afaa37')::TEXT                    as "Enc.Description of information given",
       single_select_coded(
                  programEncounter.observations ->> '4d83afcc-4eec-4bc3-81fe-2ea36f45ad3c')::TEXT                 as "Enc.Delay in initiating treatment 1",
       (programEncounter.observations ->> 'fe283485-a971-442f-a4e9-e2b21c32d505')::TEXT                    as "Enc.description of delay in treatment 1",
       single_select_coded(
                  programEncounter.observations ->> 'df9125c1-af56-41ac-a3d9-a1025bac081b')::TEXT                 as "Enc.Care seeked in home delivery",
       multi_select_coded(
                  programEncounter.observations -> '48b4a563-bf3c-4870-8415-c512f7e4c25f')::TEXT                  as "Enc.Reason for not seeking care in home delivery",
       (programEncounter.observations ->> 'd670c4f6-27bb-4c97-985e-c903b0dc1acc')::TEXT                    as "Enc.Other, reason for not seeking care",
       single_select_coded(
                  programEncounter.observations ->> 'b169ef37-1f46-41e5-a0db-fa9e4eeb405b')::TEXT                 as "Enc.Where seek care",
       (programEncounter.observations ->> 'e34fa97d-1e9f-446f-a558-9cb1e95a9f9d')::TEXT                    as "Enc.Other, care seeked",
       single_select_coded(
                  programEncounter.observations ->> '0a9358d2-84e8-4056-90c7-6ab36bd01ff6')::TEXT                 as "Enc.Information given about nature of complication",
       (programEncounter.observations ->> 'ced27e49-e658-4af8-a041-d374f61c4ea8')::TEXT                    as "Enc.Description of nature of complication",
       single_select_coded(
                  programEncounter.observations ->> '8148431d-0006-4ce3-975e-35e0e6fe247b')::TEXT                 as "Enc.Delay in initiating treatment 2",
       (programEncounter.observations ->> '25d97fb0-eb3a-4b03-b748-aa09a4a8dd3f')::TEXT                    as "Enc.Description of delay in initiating the treatment 2",
       single_select_coded(
                  programEncounter.observations ->> '73a40297-bf71-4def-a90f-36dad552422b')::TEXT                 as "Enc.Deceased woman referred from place of delivery",
       single_select_coded(
                  programEncounter.observations ->> '9905cd49-e313-40e9-a367-74d34d82aba4')::TEXT                 as "Enc.deceased woman referred in case of home delivery",
       single_select_coded(
                  programEncounter.observations ->> '82cc079f-6a8b-4368-9b1d-767483b3e232')::TEXT                 as "Enc.Woman attend referral centre",
       multi_select_coded(
                  programEncounter.observations -> '71026db3-f2ff-4678-b554-5418c3ed23e9')::TEXT                  as "Enc.Reason for not seeking care 1",
       (programEncounter.observations ->> 'b52f6ba4-c794-4045-bbde-ad1bc19c6553')::TEXT                    as "Enc.Other reason for not seeking care from hospital",
       single_select_coded(
                  programEncounter.observations ->> 'f9d8f7aa-c229-4af8-832a-24a6cdb62ae6')::TEXT                 as "Enc.Information given to relative about nature of complication",
       (programEncounter.observations ->> '4b6a3c48-3b67-4a28-b38a-6523962d7255')::TEXT                    as "Enc.Details of information given about the nature of complication to family",
       single_select_coded(
                  programEncounter.observations ->> 'f48594bb-708a-4121-ab37-f885762a6a79')::TEXT                 as "Enc.Delay in initiating treatment 3",
       (programEncounter.observations ->> '63096bd8-bd43-45d9-84ad-2d68e8d3c29f')::TEXT                    as "Enc.description of delay in treatment 3",
       single_select_coded(
                  programEncounter.observations ->> 'a8d00f9f-056a-4de5-90d8-224ec828ae71')::TEXT                 as "Enc.Any problem following delivery",
       (programEncounter.observations ->> 'a93c67d9-3dd4-4e27-8a52-6d5960d3c1bd')::DATE                    as "Enc.Date and time of onset of problem",
       (programEncounter.observations ->> '7ba57be5-d20b-430f-8b2d-8a2816db4672')::TEXT                    as "Enc.2b. Duration of onset of problem after delivery",
       multi_select_coded(
                  programEncounter.observations -> '915a72da-8e27-4aff-9283-a4459281522d')::TEXT                  as "Enc.Problem during postnatal period",
       (programEncounter.observations ->> 'a9e315dc-b178-45e5-9865-e042fb315bbf')::TEXT                    as "Enc.Describe Other, postnatal period problem",
       single_select_coded(
                  programEncounter.observations ->> '4e65a938-503e-40ca-a121-41e855a09e63')::TEXT                 as "Enc.Did she seek treatment",
       single_select_coded(
                  programEncounter.observations ->> 'a13c7c06-bc67-403e-92fa-740c3ea1cdad')::TEXT                 as "Enc.Where seeked treatment",
       (programEncounter.observations ->> '25e84245-a829-4c5e-9379-1bf01acd8d18')::TEXT                    as "Enc.Other place to seek treatment in postnatal",
       multi_select_coded(
                  programEncounter.observations -> 'bc39c166-c853-4170-8fc4-b5e876018f36')::TEXT                  as "Enc.Treatment in hospital",
       (programEncounter.observations ->> 'd4419fb1-3b50-4cbf-9dda-ffdc8e5f320c')::TEXT                    as "Enc.Other treatment",
       (programEncounter.observations ->> '83b056ae-3924-4789-9ef4-3532c201b8ff')::TEXT                    as "Enc.Details of treatment revceived from hospital record",
       single_select_coded(
                  programEncounter.observations ->> '0c9ec484-a94e-4035-8460-d73c3d730557')::TEXT                 as "Enc.Was she referred",
       single_select_coded(
                  programEncounter.observations ->> 'c968f906-79d2-4ac2-882d-7091302df767')::TEXT                 as "Enc.Referral attended",
       single_select_coded(
                  programEncounter.observations ->> '4ccafbcf-0320-485d-8aee-4e66144ba6ef')::TEXT                 as "Enc.Reason for not seeking care 2",
       (programEncounter.observations ->> '325a9bbd-c400-41b8-a1bc-17a3b87edf85')::TEXT                    as "Enc.Other reason for not seeking care 4",
       single_select_coded(
                  programEncounter.observations ->> 'c5726d7b-f470-4159-ae73-5578fce7f6d2')::TEXT                 as "Enc.Any postnatal checkups received",
       (programEncounter.observations ->> '4993b64f-e285-4b73-8d59-a181b579e6d6')::TEXT                    as "Enc.11. No of post natal checkups received",
       multi_select_coded(
                  programEncounter.observations -> '13fee8d6-5c00-4256-a4e1-589febb538a5')::TEXT                  as "Enc.Postnatal checkup done by",
       (programEncounter.observations ->> 'a7644be7-d3f5-4f74-9fae-0fe5127322e2')::TEXT                    as "Enc.Other , post natal checkup done by",
       (programEncounter.observations ->> 'd0b56cef-8d96-4b46-8985-ff834d7a0242')::DATE                    as "Enc.X. Date of referral from home",
       (programEncounter.observations ->> 'bb768e54-50bf-4acd-b481-39653303b452')::TEXT                    as "Enc.X. Time of onset of complication of labor at home",
       (programEncounter.observations ->> '7de28c1b-7c58-45c2-b766-444ba0131e34')::TEXT                    as "Enc.X. Time of calling of transport at home",
       (programEncounter.observations ->> '28482632-6821-4e74-a672-3feeac45fb93')::TEXT                    as "Enc.X. Time of arrival of transport at home",
       (programEncounter.observations ->> '6c9766e9-7128-4483-b587-f2a9199b9981')::DATE                    as "Enc.X. Date of admission to Facility 1",
       (programEncounter.observations ->> '1cd88bbe-b5e3-4879-8bc3-6604a9d9d65f')::TEXT                    as "Enc.X. Referral time of onset of complication at facility 1",
       (programEncounter.observations ->> '38d65814-7fdd-4a77-8b70-66034cb10678')::TEXT                    as "Enc.X. Referral time of calling of transport from facility 1",
       (programEncounter.observations ->> '403fa83b-a8a3-4929-af40-c92cad21e97f')::TEXT                    as "Enc.X. Time of arrival of transport from facility 1",
       single_select_coded(
                  programEncounter.observations ->> '93b1b241-e145-4e4f-a897-2dddc81d1b12')::TEXT                 as "Enc.X. Referral transport used",
       (programEncounter.observations ->> '31428e6d-ac8e-41f8-a6ed-dd4f9731f237')::TEXT                    as "Enc.X. Other type of transport used from Facility 1",
       (programEncounter.observations ->> '2e2082e5-c64b-4058-bbb4-6e92da759360')::TEXT                    as "Enc.X. Referral Time to reach from home to Facility 1",
       (programEncounter.observations ->> '22bf7ca3-6ba7-4372-ab2e-e61d70b175cb')::TEXT                    as "Enc.X. Referral Money spent on transportation from facility 1",
       (programEncounter.observations ->> '47d89571-be99-4458-828e-2534515be93b')::TEXT                    as "Enc.X. Name of facility/level of referral form facility 1",
       multi_select_coded(
                  programEncounter.observations -> 'a86048c3-c55c-4478-9832-87e3544140a0')::TEXT                  as "Enc.X. Attened at facility 1 by",
       (programEncounter.observations ->> 'c91d02a8-2261-4a47-9afb-bdf4c80139f1')::TEXT                    as "Enc.X. Reason for referral from facility 1",
       single_select_coded(
                  programEncounter.observations ->> '96dd6138-3c0d-40bd-aa59-807b62dd87a2')::TEXT                 as "Enc.X. Referral slip given from Facility 1",
       (programEncounter.observations ->> 'f683e4bd-f942-4d1b-923d-d1853d103bfc')::TEXT                    as "Enc.X. Treatment given at Facility 1",
       (programEncounter.observations ->> '2faeb2a6-edc7-48ce-bf68-33f61deb5c76')::TEXT                    as "Enc.X. Money spent on treatment at facility 1",
       (programEncounter.observations ->> '9b25b7e2-ee93-4f54-9900-1174b112f6b2')::TEXT                    as "Enc.X. Time spent at facility 1",
       (programEncounter.observations ->> '1b806320-3956-4ca0-bf24-a67294ae5f1a')::DATE                    as "Enc.X. Date of admission to Facility 2",
       (programEncounter.observations ->> '1c2a7104-30ad-41f4-b4ef-0615db691643')::TEXT                    as "Enc.X. Referral time of onset of complication at facility 2",
       (programEncounter.observations ->> '676a967b-a9c1-4e44-9179-b68c673ddde1')::TEXT                    as "Enc.X. Referral time of calling of transport from facility 2",
       (programEncounter.observations ->> 'd7f084a8-2808-4746-90a7-87e0bbc2b17c')::TEXT                    as "Enc.X. Time of arrival of transport from facility 2",
       single_select_coded(
                  programEncounter.observations ->> 'ed54c6c0-f08d-4a06-8835-9eff0b5f9824')::TEXT                 as "Enc.X. Referral transport used from facility 2",
       (programEncounter.observations ->> '74684707-e27b-4493-9122-9d8f103cf2f8')::TEXT                    as "Enc.X. Other type of transport used from Facility 2",
       (programEncounter.observations ->> 'f17ef349-befc-4f89-a4a6-ef000d34c342')::TEXT                    as "Enc.X. Time to reach from Facility 1 to Facility 2",
       (programEncounter.observations ->> '745585c6-e5f3-4465-b20a-bd0c1987bf38')::TEXT                    as "Enc.X. Referral Money spent on transportation from facility 2",
       (programEncounter.observations ->> 'f3061746-5b69-41f6-8eed-97b50913f901')::TEXT                    as "Enc.X. Name of facility/level of referral form facility 2",
       multi_select_coded(
                  programEncounter.observations -> '2d632d7d-4480-4bbe-b991-ccbfe8e29ce8')::TEXT                  as "Enc.X. Attended at facility by",
       (programEncounter.observations ->> '39e429b6-937f-41a8-8518-e594f66f481c')::TEXT                    as "Enc.X. Reason for referral from facility 2",
       single_select_coded(
                  programEncounter.observations ->> '9f31e2f0-b193-4cad-93fe-c3f071e74bed')::TEXT                 as "Enc.X. Referral slip given from Facility 2",
       (programEncounter.observations ->> '642f1360-169e-4f55-b2a5-6984a2a7fdfe')::TEXT                    as "Enc.X. Treatment given at Facility 2",
       (programEncounter.observations ->> '67fe72e3-d85b-4ba5-8fcc-c6379d511b92')::TEXT                    as "Enc.X. Money spent on treatment at facility 2",
       (programEncounter.observations ->> 'd9aa2a20-baf0-40ac-8bd1-8925370e26a1')::TEXT                    as "Enc.X. Time spent at facility 2",
       (programEncounter.observations ->> '12d6ad0d-d10c-42f0-a772-a9a84b64f32b')::DATE                    as "Enc.X. Date of admission to Facility 3",
       (programEncounter.observations ->> '8935ceb9-d461-4053-b471-3764a5936e3c')::TEXT                    as "Enc.X. Referral time of onset of complication at facility 3",
       (programEncounter.observations ->> '0034d570-5cc0-4a84-b12a-064aade68fa7')::TEXT                    as "Enc.X. Referral time of calling of transport from facility 3",
       (programEncounter.observations ->> '0fe44620-83be-4416-b588-a12dae0344d6')::TEXT                    as "Enc.X. Time of arrival of transport from facility 3",
       single_select_coded(
                  programEncounter.observations ->> '8bbe333f-acd5-4d95-96f9-d7e6ec00b0f3')::TEXT                 as "Enc.X. Referral transport used from facility 3",
       (programEncounter.observations ->> 'b6a02373-5507-4b19-9e37-ac1bec26a798')::TEXT                    as "Enc.X. Other type of transport used from Facility 3",
       (programEncounter.observations ->> '1af6414e-2b4d-42e0-9947-bdb9055247bc')::TEXT                    as "Enc.X. Time to reach from Facility 2 to Facility 3",
       (programEncounter.observations ->> '16797bde-913a-4228-8a91-fea4bbb01170')::TEXT                    as "Enc.X. Referral Money spent on transportation from facility 3",
       (programEncounter.observations ->> '6a446b27-706c-4870-b2b8-2f486df95b64')::TEXT                    as "Enc.X. Name of facility/level of referral form facility 3",
       multi_select_coded(
                  programEncounter.observations -> 'adfa5264-f51a-4986-a2c0-649cc523ae91')::TEXT                  as "Enc.X. Attended at facility 3 by",
       (programEncounter.observations ->> '005c1675-6d79-42d8-9039-622325097258')::TEXT                    as "Enc.X. Reason for referral from facility 3",
       single_select_coded(
                  programEncounter.observations ->> 'c6080205-38d2-400b-8921-2177a82a9d7f')::TEXT                 as "Enc.X. Referral slip given from Facility 3",
       (programEncounter.observations ->> '9deb75f9-0b98-43ee-9c6f-f45cf02c0076')::TEXT                    as "Enc.X. Treatment given at Facility 3",
       (programEncounter.observations ->> 'bd83a32d-d03d-462f-8f45-4382c76a3613')::TEXT                    as "Enc.X. Money spent on treatment at facility 3",
       (programEncounter.observations ->> '43a6d1ff-f6b4-433e-b34d-aa616fc71992')::TEXT                    as "Enc.X. Time spent at facility 3",
       (programEncounter.observations ->> '3825e83b-bbad-4065-b78f-ba6328596371')::DATE                    as "Enc.X. Date of admission to Facility 4",
       (programEncounter.observations ->> '819add6e-1e00-4ef8-b6f6-9593d5818daa')::TEXT                    as "Enc.X. Referral time of onset of complication at facility 4",
       (programEncounter.observations ->> '56a9bbd0-116e-4c57-997b-3b9f4d9d7545')::TEXT                    as "Enc.X. Referral time of calling of transport from facility 4",
       (programEncounter.observations ->> '07570892-ed12-4a40-9f81-dbcc26a2d7ee')::TEXT                    as "Enc.X. Time of arrival of transport from facility 4",
       single_select_coded(
                  programEncounter.observations ->> '591c512a-fc78-49b1-a5c1-3e350f6a8600')::TEXT                 as "Enc.X. Referral transport used from facility 4",
       (programEncounter.observations ->> 'd40c7432-1ac8-4072-9ce6-1d95b0583bbb')::TEXT                    as "Enc.X. Other type of transport used from Facility 4",
       (programEncounter.observations ->> '785af3e9-1566-46f6-9620-dcd38fca4915')::TEXT                    as "Enc.X. Time to reach from Facility 3 to Facility 4",
       (programEncounter.observations ->> '8530654c-d6c5-4c8f-a9f2-32b1fe785d3b')::TEXT                    as "Enc.X. Referral Money spent on transportation from facility 4",
       (programEncounter.observations ->> 'ecabb312-8a50-47a5-a60e-368d8495641c')::TEXT                    as "Enc.X. Name of facility/level of referral form facility 4",
       multi_select_coded(
                  programEncounter.observations -> '20b88cad-a02b-4ca6-b5e6-1ecb220002fb')::TEXT                  as "Enc.X. Attended at facility 4 by",
       (programEncounter.observations ->> '83d2eb2a-53ee-4f77-bd95-3c95e5d36664')::TEXT                    as "Enc.X. Reason for referral from facility 4",
       single_select_coded(
                  programEncounter.observations ->> '99120eed-d90f-4d80-afcb-22f5786db428')::TEXT                 as "Enc.X. Referral slip given from Facility 4",
       (programEncounter.observations ->> '85a67c59-edf0-453e-8364-ecb5dcea8851')::TEXT                    as "Enc.X. Treatment given at Facility 4",
       (programEncounter.observations ->> 'f9d3c1d7-1e38-4b72-ba30-fab18afaf584')::TEXT                    as "Enc.X. Money spent on treatment at facility 4",
       (programEncounter.observations ->> 'd85702ee-c21c-4cc4-8e11-fe8e6a108e1e')::TEXT                    as "Enc.X. Time spent at facility 4",
       (programEncounter.observations ->> '59e4308a-86a7-4207-b5b6-4ce6d2255227')::DATE                    as "Enc.X. Date of admission to Facility 5",
       (programEncounter.observations ->> '03a36a0a-b5ef-41a5-9e3f-cc08f430c2c9')::TEXT                    as "Enc.X. Referral time of onset of complication at facility 5",
       (programEncounter.observations ->> '19bbfd99-b2f6-45df-824e-ee46a86b9aec')::TEXT                    as "Enc.X. Referral time of calling of transport from facility 5",
       (programEncounter.observations ->> '472ad462-663a-45af-9305-f620cf05f7c7')::TEXT                    as "Enc.X. Time of arrival of transport from facility 5",
       single_select_coded(
                  programEncounter.observations ->> 'e0f20cf4-6a59-4041-9edb-9bcf44a21e17')::TEXT                 as "Enc.X. Referral transport used from facility 5",
       (programEncounter.observations ->> '545f2edb-991f-42a4-924a-d6972ebc1a43')::TEXT                    as "Enc.X. Other type of transport used from Facility 5",
       (programEncounter.observations ->> 'b3bc445a-93bf-40dc-94f6-0b4d3d8f6ee1')::TEXT                    as "Enc.X. Time to reach from Facility 4 to Facility 5",
       (programEncounter.observations ->> '99ddefc5-c4e2-4f65-b555-96b51e6ecf3c')::TEXT                    as "Enc.X. Referral Money spent on transportation from facility 5",
       (programEncounter.observations ->> '81105506-cb51-496c-bc83-863934378710')::TEXT                    as "Enc.X. Name of facility/level of referral form facility 5",
       multi_select_coded(
                  programEncounter.observations -> '87b4f4f0-7a38-4f36-8a32-83d57a1fcd5e')::TEXT                  as "Enc.X. Attended at facility 5 by",
       (programEncounter.observations ->> 'fdb6748d-6529-4024-87a4-5dc228d426f3')::TEXT                    as "Enc.X. Reason for referral from facility 5",
       single_select_coded(
                  programEncounter.observations ->> '05302dc6-2417-4c22-a8d3-2db9cfe335a2')::TEXT                 as "Enc.X. Referral slip given from Facility 5",
       (programEncounter.observations ->> 'cbaf94f8-b29f-4d70-b0a1-f30e2e231729')::TEXT                    as "Enc.X. Treatment given at Facility 5",
       (programEncounter.observations ->> 'df7fdaae-7c59-4a20-878d-8218f2ea7b6c')::TEXT                    as "Enc.X. Money spent on treatment at facility 5",
       (programEncounter.observations ->> '77db585c-4fa7-48d1-a0db-441c9a8d623e')::TEXT                    as "Enc.X. Time spent at facility 5",
       (programEncounter.observations ->> '163d538f-17a5-4a10-a7f5-32ee625d4e19')::DATE                    as "Enc.X. Date of admission to Facility 6",
       (programEncounter.observations ->> 'd42e5fcf-2693-4d48-8b26-928e191045b7')::TEXT                    as "Enc.X. Referral time of onset of complication at facility 6",
       (programEncounter.observations ->> '14773230-c899-46f5-b383-08f8a8b9ca35')::TEXT                    as "Enc.X. Referral time of calling of transport from facility 6",
       (programEncounter.observations ->> 'a0161970-1ca5-4053-a183-a5e662a68698')::TEXT                    as "Enc.X. Time of arrival of transport from facility 6",
       single_select_coded(
                  programEncounter.observations ->> '44992cff-46ff-4dcf-9250-a87c97d19eeb')::TEXT                 as "Enc.X. Referral transport used from facility 6",
       (programEncounter.observations ->> '347ddede-cb86-4871-aae9-9109ea1635e2')::TEXT                    as "Enc.X. Other type of transport used from Facility 6",
       (programEncounter.observations ->> 'cdd9dc11-6c59-4ab1-8583-02c35e8aab5b')::TEXT                    as "Enc.X. Time to reach from Facility 5 to Facility 6",
       (programEncounter.observations ->> 'e2c7132c-c2b9-4521-9157-36eda2537544')::TEXT                    as "Enc.X. Referral Money spent on transportation from facility 6",
       (programEncounter.observations ->> '33c45185-6ad3-4725-bf0d-9dde03f91e67')::TEXT                    as "Enc.X. Name of facility/level of referral form facility 6",
       multi_select_coded(
                  programEncounter.observations -> '07d19d6c-d654-4363-a618-df47aa67be3d')::TEXT                  as "Enc.X. Attended at facility 6 by",
       (programEncounter.observations ->> 'f9f5df1f-aeb7-45c7-baf3-723c28f02669')::TEXT                    as "Enc.X. Reason for referral from facility 6",
       single_select_coded(
                  programEncounter.observations ->> '58c40e70-cc47-4405-a7e1-0b174bfe7a06')::TEXT                 as "Enc.X. Referral slip given from Facility 6",
       (programEncounter.observations ->> '863d89c4-b3c3-4ce6-938c-9e80149b85b2')::TEXT                    as "Enc.X. Treatment given at Facility 6",
       (programEncounter.observations ->> '52987a53-add5-43a6-a3eb-2ab59745cf72')::TEXT                    as "Enc.X. Money spent on treatment at facility 6",
       (programEncounter.observations ->> '892eec5d-066f-4393-a912-be16a7c72ab0')::TEXT                    as "Enc.X. Time spent at facility 6",
       (programEncounter.observations ->> '5ddb88ec-b309-44ed-ac29-0045023ab36a')::TEXT                    as "Enc.Open History",
       (programEncounter.observations ->> '20664cf0-c724-4701-bb7c-01fdf4a6131c')::TEXT                    as "Enc.Open History (Image)",
       (programEncounter.observations ->> '6daf0c36-3a3f-4487-ae0b-6bc64ca04052')::TEXT                    as "Enc.steps to prevent death",
       (programEncounter.observations ->> 'ccd4c780-775b-4141-8333-b44ab807c5da')::TEXT                    as "Enc.Capture Image",
       programEncounter.cancel_date_time                                                                      "EncCancel.cancel_date_time"
FROM program_encounter programEncounter
            LEFT OUTER JOIN operational_encounter_type oet on programEncounter.encounter_type_id = oet.encounter_type_id
            LEFT OUTER JOIN program_enrolment programEnrolment ON programEncounter.program_enrolment_id = programEnrolment.id
            LEFT OUTER JOIN operational_program op ON op.program_id = programEnrolment.program_id
            LEFT OUTER JOIN individual individual ON programEnrolment.individual_id = individual.id
            LEFT OUTER JOIN gender g ON g.id = individual.gender_id
            LEFT OUTER JOIN address_level a ON individual.address_id = a.id
WHERE op.uuid = '61383d58-82b4-44fb-96d0-6449f0e68c1b'
  AND oet.uuid = 'a77b9936-ab0a-46db-9a92-d90911e0f9e0'
  AND programEnrolment.enrolment_date_time IS NOT NULL;

drop view if exists unicef_moha_mdsr_enrolment_view;
create view unicef_moha_mdsr_enrolment_view as
SELECT individual.id                                                                          "Ind.Id",
       individual.address_id                                                                  "Ind.address_id",
       individual.uuid                                                                        "Ind.uuid",
       individual.first_name                                                                  "Ind.first_name",
       individual.last_name                                                                   "Ind.last_name",
       g.name                                                                                 "Ind.Gender",
       individual.date_of_birth                                                               "Ind.date_of_birth",
       individual.date_of_birth_verified                                                      "Ind.date_of_birth_verified",
       individual.registration_date                                                           "Ind.registration_date",
       individual.facility_id                                                                 "Ind.facility_id",
       a.title                                                                                "Ind.Area",
       individual.is_voided                                                                   "Ind.is_voided",
       op.name                                                                                "Enl.Program Name",
       programEnrolment.id                                                                    "Enl.Id",
       programEnrolment.uuid                                                                  "Enl.uuid",
       programEnrolment.is_voided                                                             "Enl.is_voided",
       programEnrolment.enrolment_date_time                                                   "Enl.enrolment_date_time",
       single_select_coded(
                  programEnrolment.observations ->> '9cee1acc-9323-46cf-8167-d67326fbd8ed')::TEXT as "Enl.Form filled in",
       (programEnrolment.observations ->> 'eb2fabb9-f5f8-4ee6-bab2-88e489df8751')::TEXT    as "Enl.Name of Husband",
       (programEnrolment.observations ->> 'f7c955f5-6747-4695-bf96-f6deb8fb41b4')::TEXT    as "Enl.Name of Father",
       (programEnrolment.observations ->> '0bae0557-7461-4d4d-a14e-1e9e8793ba6f')::TEXT    as "Enl.RCH Number",
       (programEnrolment.observations ->> '82fa0dbb-92f9-4ec2-9263-49054e64d909')::TEXT    as "Enl.Contact Number",
       (programEnrolment.observations ->> 'e3134346-5770-4d7c-8845-9da734bf2a93')::DATE    as "Enl.Date and time of Death",
       single_select_coded(programenrolment.observations ->>
                           'edf3dc1b-9895-41f1-bfd3-f0e2ad1d667d'::text)::text             as "Enl.Name of place of death",
       single_select_coded(
                  programEnrolment.observations ->> '9e0e21b0-e5c2-406a-8da6-a11a78d65329')::TEXT as "Enl.Timing of death in pregnancy",
       (programEnrolment.observations ->> 'a334f0f7-434d-4acf-b4c2-dff3cb6f454b')::TEXT    as "Enl.Name of reporting person",
       (programEnrolment.observations ->> 'ad31dc43-3c4d-48ff-aae6-194858207f1f')::TEXT    as "Enl.Designation of reporting person",
       (programEnrolment.observations ->> 'a08c7590-1940-4a88-8d66-ec46649669cd')::DATE    as "Enl.Reporting Date",
       (programEnrolment.observations ->> '4b721e9d-bf7f-4ccd-bf7e-1df9d40308ab')::TEXT    as "Enl.Name of subcenter"
FROM program_enrolment programEnrolment
            LEFT OUTER JOIN operational_program op ON op.program_id = programEnrolment.program_id
            LEFT OUTER JOIN individual individual ON programEnrolment.individual_id = individual.id
            LEFT OUTER JOIN gender g ON g.id = individual.gender_id
            LEFT OUTER JOIN address_level a ON individual.address_id = a.id
WHERE op.uuid = '61383d58-82b4-44fb-96d0-6449f0e68c1b'
  AND programEnrolment.enrolment_date_time IS NOT NULL;
