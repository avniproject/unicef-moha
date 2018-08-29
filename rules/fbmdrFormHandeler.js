
import { RuleFactory, FormElementStatus, FormElementsStatusHelper ,FormElementStatusBuilder, StatusBuilderAnnotationFactory} from 'rules-config/rules';
const WithStatusBuilder = StatusBuilderAnnotationFactory('programEncounter', 'formElement');
const RuleHelper = require('./RuleHelper');
import lib from './lib';


const EncounterViewFilter = RuleFactory("2bfd54fe-7cf4-414f-9c54-ef06e950945a","ViewFilter");
const FormValidation = RuleFactory("2bfd54fe-7cf4-414f-9c54-ef06e950945a",'Validation');



@EncounterViewFilter("63c43b26-794d-4213-aecb-c8093bc74921", "FBMDR View Filter", 100, {})
class FbmdrViewFilter {
    @WithStatusBuilder
    otherStaffAttendedAtHome([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Referral Attended from home").containsAnswerConceptName("Other Staff");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    otherStaffAttendedAtFacility1([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Referral Attended at Facility 1").containsAnswerConceptName("Other Staff");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    otherStaffAttendedAtFacility2([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Referral Attended at Facility 2").containsAnswerConceptName("Other Staff");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    otherStaffAttendedAtFacility3([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Referral Attended at Facility 3").containsAnswerConceptName("Other Staff");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    otherCauseOfAntepartumBleeding([programEncounter, formElement], statusBuilder){
        statusBuilder.show().when.valueInEncounter("Late pregnancy Bleeding other than placental causes").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    // @WithStatusBuilder
    // otherCausesOfHypertensiveDisorderInPregnancy([programEncounter, formElement], statusBuilder){
    //     statusBuilder.show().when.valueInEncounter("Hypertensive disorder of Pregnancy").containsAnswerConceptName("Other");
    //     return statusBuilder.build();
    // }
    //
    // @WithStatusBuilder
    // otherLaborRelatedDisorder([programEncounter, formElement], statusBuilder){
    //     statusBuilder.show().when.valueInEncounter("labor related Disorder").containsAnswerConceptName("Other");
    //     return statusBuilder.build();
    // }
    //
    // @WithStatusBuilder
    // otherMedicalDisorder([programEncounter, formElement], statusBuilder){
    //     statusBuilder.show().when.valueInEncounter("Medical Disorder").containsAnswerConceptName("Other");
    //     return statusBuilder.build();
    // }
    // @WithStatusBuilder
    // otherUnderlyingCauseOfInfection([programEncounter, formElement], statusBuilder){
    //         statusBuilder.show().when.valueInEncounter("Underlying cause of infection").containsAnswerConceptName("Other");
    //         return statusBuilder.build();
    //     }


    static exec(programEncounter, formElementGroup, today) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new FbmdrViewFilter(), programEncounter, formElementGroup, today);
    }

}

@FormValidation("aeb9dad4-7583-4ee9-be24-05762185b503", "FBMDR Form Validator",100,{})
class FbmdrFormValidator {
    validate(programEncounter){
        const validationResults = [];
        console.log("para",programEncounter.getObservationReadableValue('Parity'));
        console.log("gravida",programEncounter.getObservationReadableValue('Gravida'));

        if(programEncounter.getObservationReadableValue('Parity') > programEncounter.getObservationReadableValue('Gravida')){
            validationResults.push(lib.C.createValidationError('Para Cannot be greater than Gravida'));
        }
        return validationResults;
    }
    static exec(programEncounter, validationErrors) {
        return new FbmdrFormValidator().validate(programEncounter);
    }
}



module.exports = {FbmdrViewFilter, FbmdrFormValidator};