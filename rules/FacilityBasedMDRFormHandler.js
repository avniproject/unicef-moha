import {
    FormElementsStatusHelper,
    FormElementStatus,
    FormElementStatusBuilder,
    RuleFactory,
    StatusBuilderAnnotationFactory,
    WithName,
    lib
} from 'rules-config/rules';
import moment from 'moment';
const _ = require("lodash");


const WithStatusBuilder = StatusBuilderAnnotationFactory('programEncounter', 'formElement');
const RuleHelper = require('./RuleHelper');


const ViewFilter = RuleFactory("2bfd54fe-7cf4-414f-9c54-ef06e950945a","ViewFilter");
const Validation = RuleFactory("2bfd54fe-7cf4-414f-9c54-ef06e950945a",'Validation');


const calculateDurationInDaysAndHours = (startDateTime, endDateTime) => {
    if (!_.isNil(startDateTime) && !_.isNil(endDateTime)) {
        let diff = moment(endDateTime).diff(moment(startDateTime), 'days', true);
        let days = Math.floor(diff);
        let decimalValue = diff - days;
        let hours = Math.round(decimalValue * 24 * 4) / 4;
        return `${days} days, ${hours} hours`;
    }
};

@ViewFilter("63c43b26-794d-4213-aecb-c8093bc74921", "FBMDR View Filter", 100, {})
class FbmdrViewFilter {

    @WithStatusBuilder
    durationOfHospitalStay([programEncounter, formElement], statusBuilder) {
        statusBuilder.show();
        let formElementStatus = statusBuilder.build();
        formElementStatus.value = calculateDurationInDaysAndHours(
            programEncounter.getObservationValue('Date and time of Admission'),
            programEncounter.getObservationValue('Date and time of Death')
        );
        return formElementStatus;
    }

    @WithStatusBuilder
    durationOfIcuStay([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Was mother admitted to ICU?").containsAnswerConceptName("Yes");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    whyWasMotherNotAdmittedToTheIcu([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Was mother admitted to ICU?").containsAnswerConceptName("No");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    dateAndTimeOfDelivery([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Outcome of pregnancy").containsAnyAnswerConceptName("Live Birth", "Still Birth");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    admissionDeliveryInterval([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Outcome of pregnancy").containsAnyAnswerConceptName("Live Birth", "Still Birth");
        let formElementStatus = statusBuilder.build();
        formElementStatus.value = calculateDurationInDaysAndHours(
            programEncounter.getObservationValue('Date and time of Admission'),
            programEncounter.getObservationValue('Date and time of Delivery')
        );
        return formElementStatus;
    }

    @WithStatusBuilder
    admissionDeathInterval([programEncounter, formElement], statusBuilder) {
        statusBuilder.show();
        let formElementStatus = statusBuilder.build();
        formElementStatus.value = calculateDurationInDaysAndHours(
            programEncounter.getObservationValue('Date and time of Admission'),
            programEncounter.getObservationValue('Date and time of Death')
        );

        return formElementStatus;
    }

    @WithStatusBuilder
    periodOfGestationLiveStillBirth([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Outcome of pregnancy").containsAnyAnswerConceptName("Live Birth", "Still Birth");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    periodOfGestationNonLiveStillBirth([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Outcome of pregnancy").containsAnyAnswerConceptName("Abortion", "Ectopic", "Undelivered");
        return statusBuilder.build();
    }

    facility1ReferralDetails(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe=>{
            let statusBuilder = new FormElementStatusBuilder({programEncounter:programEncounter, formElement:fe});
            statusBuilder.show().when.valueInEncounter('Number of places visited prior').is.greaterThanOrEqualTo(1);
            return statusBuilder.build();
        });
    }

    facility2ReferralDetails(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe=>{
            let statusBuilder = new FormElementStatusBuilder({programEncounter:programEncounter, formElement:fe});
            statusBuilder.show().when.valueInEncounter('Number of places visited prior').is.greaterThanOrEqualTo(2);
            return statusBuilder.build();
        });
    }

    facility3ReferralDetails(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe=>{
            let statusBuilder = new FormElementStatusBuilder({programEncounter:programEncounter, formElement:fe});
            statusBuilder.show().when.valueInEncounter('Number of places visited prior').equals(3);
            return statusBuilder.build();
        });
    }

    @WithStatusBuilder
    facility1WhichOtherStaffAttended([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Who attended at Facility 1?").containsAnswerConceptName("Other Staff");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    facility2WhichOtherStaffAttended([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Who attended at Facility 2?").containsAnswerConceptName("Other Staff");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    facility3WhichOtherStaffAttended([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Who attended at Facility 3?").containsAnswerConceptName("Other Staff");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    homeWhichOtherTypeOfTransportWasUsed([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Type of transport used from home").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    facility1WhichOtherTypeOfTransportWasUsed([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Type of transport used from Facility 1").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    facility2WhichOtherTypeOfTransportWasUsed([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Type of transport used from Facility 2").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    facility3WhichOtherTypeOfTransportWasUsed([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Type of transport used from Facility 3").containsAnswerConceptName("Other");
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

@Validation("aeb9dad4-7583-4ee9-be24-05762185b503", "FBMDR Form Validator",100,{})
class FbmdrFormValidator {
    validate(programEncounter){
        const validationResults = [];

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