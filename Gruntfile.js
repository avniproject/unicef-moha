const rulesConfigInfra = require('rules-config/infra');
const IDI = require('openchs-idi');
const secrets = require('../secrets.json');

module.exports = IDI.configure({
    "name": "unicef-moha",
    "chs-admin": "admin",
    "org-name": "UNICEF - MOHA",
    "org-admin": "mdr-admin",
    "secrets": secrets,
    "files": {
        "adminUsers": {
            // "prod": ["admin-user.json"],
            "dev": ["users/dev-admin-user.json"],
        },
        "forms": [
            "registrationForm.json",
            "fbmdr/FacilityBasedMaternalDeathReviewForm.json",
            "cbmdr/CommunityBasedVerbalAutopsy.json",
            "MaternalDeathCaseSummaryForm.json",
            "MaternalDeathNotificationForm.json",
        ],
        "formMappings": [
            "formMappings.json",
        ],
        "formDeletions": [],
        "formAdditions": [],
        "catchments": [
            "catchments.json"
        ],
        "facilities": [
            "test-facilities.json"
        ],
        "checklistDetails": [],
        "concepts": [
            "concepts.json",
            "cbmdr/CommunityBasedVerbalAutopsyFormConcept.json",
        ],
        "locations": [
            "locations.json"
        ],
        "programs": ["programs.json"],
        "encounterTypes": ["encounterTypes.json"],
        "operationalEncounterTypes": ["operationalModules/operationalEncounterTypes.json"],
        "operationalPrograms": ["operationalModules/operationalPrograms.json"],
        "operationalSubjectTypes": ["operationalModules/operationalSubjectTypes.json"],
        "users": {
            "dev": ["users/dev-users.json"]
        },
        "rules": [
            "./rules/index.js"
        ],
        "organisationSql": [
            /* "create_organisation.sql"*/
        ]
    }
}, rulesConfigInfra);
