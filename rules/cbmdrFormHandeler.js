
import { RuleFactory, FormElementStatus, FormElementsStatusHelper ,FormElementStatusBuilder, StatusBuilderAnnotationFactory} from 'rules-config/rules';
const WithStatusBuilder = StatusBuilderAnnotationFactory('programEncounter', 'formElement');
const RuleHelper = require('./RuleHelper');
import lib from './lib';


const EncounterViewFilter = RuleFactory("814fdf94-52d9-48ee-a923-4042d799fb61","ViewFilter");
// const FormValidation = RuleFactory("2bfd54fe-7cf4-414f-9c54-ef06e950945a",'Validation');


@EncounterViewFilter("81af8852-dd3f-48e3-9717-0f2de5de6654", "CBMDR View Filter", 100, {})
class CbmdrViewFilter {
    @WithStatusBuilder
    otherPlaceOfDeath([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Place of death").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }
    @WithStatusBuilder
    ifYesWhatIsTheCauseOfDeath([programEncounter, formElement], statusBuilder) {
            statusBuilder.show().when.valueInEncounter("Did the doctor or nurse at the health facility tell you the cause of death.").containsAnswerConceptName("Yes");
            return statusBuilder.build();
    }
    @WithStatusBuilder
    ageAtMarriage([programEncounter, formElement], statusBuilder) {
            statusBuilder.show().when.valueInEncounter("Deceased woman married").containsAnswerConceptName("Yes");
            return statusBuilder.build();
    }

    @WithStatusBuilder
    otherReligion([programEncounter, formElement], statusBuilder) {
            statusBuilder.show().when.valueInEncounter("Religion").containsAnswerConceptName("Other");
            return statusBuilder.build();
    }

    @WithStatusBuilder
    otherEducation([programEncounter, formElement], statusBuilder) {
            statusBuilder.show().when.valueInEncounter("Education").containsAnswerConceptName("Other");
            return statusBuilder.build();
    }

    @WithStatusBuilder
    v3IfYesNumberOfAntenatalCheckupsReceived([programEncounter, formElement], statusBuilder) {
            statusBuilder.show().when.valueInEncounter("Antenatal care received").containsAnswerConceptName("Yes");
            return statusBuilder.build();
    }
    @WithStatusBuilder
    v4PlaceOfAntenatalCheckUpsMultipleResponsePossible([programEncounter, formElement], statusBuilder) {
            statusBuilder.show().when.valueInEncounter("Antenatal care received").containsAnswerConceptName("Yes");
            return statusBuilder.build();
    }
   @WithStatusBuilder
   v5ServicesReceivedDuringAncMultipleResponsePossible([programEncounter, formElement], statusBuilder) {
            statusBuilder.show().when.valueInEncounter("Antenatal care received").containsAnswerConceptName("Yes");
            return statusBuilder.build();
    }
    @WithStatusBuilder
    otherPlaceOfAntenatalCheckUps([programEncounter, formElement], statusBuilder) {
            statusBuilder.show().when.valueInEncounter("Place of antenatal checkup").containsAnswerConceptName("Other");
            return statusBuilder.build();
    }

    @WithStatusBuilder
    otherSymptoms([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Symptoms for problems during ANC").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    v7WhatWereTheSymptomsSheHad([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Problem during antenatal period").containsAnswerConceptName("Yes");
        return statusBuilder.build();
    }
    @WithStatusBuilder
    v8DidSheSeekCareForTheseSymptoms([programEncounter, formElement], statusBuilder) {
            statusBuilder.show().when.valueInEncounter("Problem during antenatal period").containsAnswerConceptName("Yes");
            return statusBuilder.build();
    }
    @WithStatusBuilder
    v9IfYesWhereDidSheSeekCare([programEncounter, formElement], statusBuilder) {
            statusBuilder.show().when.valueInEncounter("Care for these symptoms").containsAnswerConceptName("Yes");
            return statusBuilder.build();
    }
    @WithStatusBuilder
    otherSeekCare([programEncounter, formElement], statusBuilder) {
            statusBuilder.show().when.valueInEncounter("Where seeked care").containsAnswerConceptName("Other");
            return statusBuilder.build();
    }

    @WithStatusBuilder
    v10WhatWereTheReasonsForNotSeekingCareMultipleResponsePossible([programEncounter, formElement], statusBuilder) {
            statusBuilder.show().when.valueInEncounter("Care for these symptoms").containsAnswerConceptName("No");
            return statusBuilder.build();
    }

    @WithStatusBuilder
    otherReasonForNotSeekingCare([programEncounter, formElement], statusBuilder) {
            statusBuilder.show().when.valueInEncounter("Reason for not seeking care 3").containsAnswerConceptName("Other");
            return statusBuilder.build();
    }




    static exec(programEncounter, formElementGroup, today) {
        const mapper = formElement => {
            let builder = new FormElementStatusBuilder({programEncounter,formElement});
            builder.show().when.valueInEncounter('Died during antenatal period').containsAnswerConceptName('Yes');
            return builder.build();
        };
        const mapper2 = formElement => {
            let builder = new FormElementStatusBuilder({programEncounter,formElement});
            builder.show().when.valueInEncounter('Died during antenatal period').containsAnswerConceptName('No');
            return builder.build();
        };


        let groupsToBeSkipped = ["Module II",
                                "Referral from Home/Village",
                                "Referral form from Facility 1",
                                "Referral form from Facility 2",
                                "Referral form from Facility 3",
                                "Seeking care",
                                "VIII. Abortion related Death"];

        let groupsToBeSkipped2 = ["Module III",
                                    "8. Outcome of the delivery",
                                    "X. POST NATAL PERIOD"];

        if(_.includes(groupsToBeSkipped, `${formElementGroup.name}`)){
            return RuleHelper.hideFormElementGroupHasEncounterObs(formElementGroup, mapper);
        }
        if(_.includes(groupsToBeSkipped2, `${formElementGroup.name}`)){
            return RuleHelper.hideFormElementGroupHasEncounterObs(formElementGroup, mapper2);
        }
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new CbmdrViewFilter(), programEncounter, formElementGroup, today);
    }
}


module.exports = {CbmdrViewFilter};