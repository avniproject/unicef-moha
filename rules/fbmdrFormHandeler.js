import {
    FormElementsStatusHelper,
    FormElementStatus,
    FormElementStatusBuilder,
    RuleFactory,
    StatusBuilderAnnotationFactory,
    WithName
} from 'rules-config/rules';
import lib from './lib';

const WithStatusBuilder = StatusBuilderAnnotationFactory('programEncounter', 'formElement');
const RuleHelper = require('./RuleHelper');


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


    @WithStatusBuilder
    otherLaborRelatedDisorder([programEncounter, formElement], statusBuilder){
        statusBuilder.show().when.valueInEncounter("labor related Disorder").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    otherMedicalDisorder([programEncounter, formElement], statusBuilder){
        statusBuilder.show().when.valueInEncounter("Medical Disorder").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }
    @WithStatusBuilder
    otherUnderlyingCauseOfInfection([programEncounter, formElement], statusBuilder){
        statusBuilder.show().when.valueInEncounter("Underlying cause of infection").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }
    @WithStatusBuilder
    specifyIncidentalAccidentalDisorder([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Incidental/Accidental Disorder").is.yes;
    }
    @WithStatusBuilder
    otherProcedureAdoptedForAbortion([programEncounter, formElement], statusBuilder){
        statusBuilder.show().when.valueInEncounter("Abortion procedure adopted").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    specifyTheCentreVisited([programEncounter, formElement], statusBuilder){
        statusBuilder.show().when.valueInEncounter("Termination done in more than 1 center").containsAnswerConceptName("Yes");
        return statusBuilder.build();
    }
    @WithStatusBuilder
    bIfYesTypeOfFacility([programEncounter, formElement], statusBuilder){
        statusBuilder.show().when.valueInEncounter("ANC Received").containsAnswerConceptName("Yes");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    cServiceProvidedBy([programEncounter, formElement], statusBuilder){
        statusBuilder.show().when.valueInEncounter("ANC Received").containsAnswerConceptName("Yes");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    dWasSheToldAboutAnyDisorderComplication([programEncounter, formElement], statusBuilder){
        statusBuilder.show().when.valueInEncounter("ANC Received").containsAnswerConceptName("Yes");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    eWhatWasTheRiskFactorIdentified([programEncounter, formElement], statusBuilder){
        statusBuilder.show().when.valueInEncounter("ANC Received").containsAnswerConceptName("Yes");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    otherRiskFactorIdentified([programEncounter, formElement], statusBuilder){
        statusBuilder.show().when.valueInEncounter("Risk factor identified").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    detailsOfOtherTypeOfFacilityWhereAncReceived([programEncounter, formElement], statusBuilder){
        statusBuilder.show().when.valueInEncounter("Type of facility").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }
    @WithStatusBuilder
    detailsOfOtherSpecialists([programEncounter, formElement], statusBuilder){
        statusBuilder.show().when.valueInEncounter("Service provided by").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    iPastFacility([programEncounter, formElement], statusBuilder){
        statusBuilder.show().when.valueInEncounter("labor Pain").containsAnswerConceptName("Yes");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    iiCurrentFacility([programEncounter, formElement], statusBuilder){
        statusBuilder.show().when.valueInEncounter("labor Pain").containsAnswerConceptName("Yes");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    otherComplicationDuringLabor([programEncounter, formElement], statusBuilder){
        statusBuilder.show().when.valueInEncounter("Complication during labor").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    postBirthDetails([programEncounter, formElement], statusBuilder){
        statusBuilder.show().when.valueInEncounter("Stage of Labor").containsAnswerConceptName("Post birth");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    specifyTheCauseOfDeathInCaseOfOther([programEncounter, formElement], statusBuilder){
        statusBuilder.show().when.valueInEncounter("Probable cause of death").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    ifEventfulProbableCauseOfDeath([programEncounter, formElement], statusBuilder){
        statusBuilder.show().when.valueInEncounter("Postnatal Period").containsAnswerConceptName("Eventful");
        return statusBuilder.build();
    }
    @WithStatusBuilder
    detailsOfMedicalConditions([programEncounter, formElement], statusBuilder){
        statusBuilder.show().when.valueInEncounter("Probable cause of death in case of eventful death").containsAnswerConceptName("Medical conditions");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    otherCauseOfDeath([programEncounter, formElement], statusBuilder){
        statusBuilder.show().when.valueInEncounter("Probable cause of death in case of eventful death").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    ifYesNoOfUnits([programEncounter, formElement], statusBuilder){
        statusBuilder.show().when.valueInEncounter("Blood transfusion given").containsAnswerConceptName("Yes");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    wholeBlood([programEncounter, formElement], statusBuilder){
        statusBuilder.show().when.valueInEncounter("Blood transfusion given").containsAnswerConceptName("Yes");
        return statusBuilder.build();
    }
    @WithStatusBuilder
    prbc([programEncounter, formElement], statusBuilder){
        statusBuilder.show().when.valueInEncounter("Blood transfusion given").containsAnswerConceptName("Yes");
        return statusBuilder.build();
    }
    @WithStatusBuilder
    ffp([programEncounter, formElement], statusBuilder){
        statusBuilder.show().when.valueInEncounter("Blood transfusion given").containsAnswerConceptName("Yes");
        return statusBuilder.build();
    }
    @WithStatusBuilder
    platelets([programEncounter, formElement], statusBuilder){
        statusBuilder.show().when.valueInEncounter("Blood transfusion given").containsAnswerConceptName("Yes");
        return statusBuilder.build();
    }
    @WithStatusBuilder
    cryo([programEncounter, formElement], statusBuilder){
        statusBuilder.show().when.valueInEncounter("Blood transfusion given").containsAnswerConceptName("Yes");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    finalDiagnosisDetails([programEncounter, formElement], statusBuilder){
        statusBuilder.show().when.valueInEncounter("Autopsy performed").containsAnswerConceptName("Performed");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    ivAPlacentalCauses([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Antepartum Bleeding").is.yes;
    }

    @WithStatusBuilder
    ivBLatePregnancyBleedingOtherThanPlacentalCauses([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Antepartum Bleeding").is.yes;
    }

    @WithStatusBuilder
    neonatalOutcome([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Gave birth").is.yes;
    }

    referralFormFromFacility1(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe=>{
            let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
            statusBuilder.show().when.valueInEncounter("No of Places Visited Prior").is.greaterThanOrEqualTo(1);
            return statusBuilder.build();
        })
    }

    referralFormFromFacility2(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe=>{
            let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
            statusBuilder.show().when.valueInEncounter("No of Places Visited Prior").is.greaterThanOrEqualTo(2);
            return statusBuilder.build();
        })
    }

    referralFormFromFacility3(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe=>{
            let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
            statusBuilder.show().when.valueInEncounter("No of Places Visited Prior").is.greaterThanOrEqualTo(3);
            return statusBuilder.build();
        })
    }


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