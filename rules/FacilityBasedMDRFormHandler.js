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
    dateAndTimeOfDeath([programEncounter, formElement], statusBuilder) {
        let dtAdmission = programEncounter.getObservationValue('Date and time of Admission');
        let dtDeath = programEncounter.getObservationValue('Date and time of Death');
        if (dtAdmission && dtDeath && calculateDurationInDaysAndHours(dtAdmission, dtDeath).startsWith('-')) {
            statusBuilder.validationError('Time of Death cannot be before Time of Admission');
        }
        if (dtDeath && calculateDurationInDaysAndHours(dtDeath, programEncounter.encounterDateTime).startsWith('-')) {
            statusBuilder.validationError('Date/time of death cannot be in the future');
        }
        return statusBuilder.build();
    }

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
    @WithName('Facility 4 | Which other staff attended?')
    @WithStatusBuilder
    a1([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Who attended at Facility 4?")
            .containsAnswerConceptName("Other Staff");
    }
    @WithName('Facility 4 | Specify other reason for referral')
    @WithStatusBuilder
    a2([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Reason for referral from Facility 4")
            .containsAnswerConceptName("Other");
    }
    @WithName('Facility 4 | Which other type of transport was used?')
    @WithStatusBuilder
    a3([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Type of transport used from Facility 4")
            .containsAnswerConceptName("Other");
    }
    @WithName('Facility 4 | Specify other treatment given')
    @WithStatusBuilder
    a4([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Treatment given at Facility 4")
            .containsAnswerConceptName("Other");
    }

    @WithName('Facility 5 | Which other staff attended?')
    @WithStatusBuilder
    a5([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Who attended at Facility 5?")
            .containsAnswerConceptName("Other Staff");
    }

    @WithName('Facility 5 | Specify other reason for referral')
    @WithStatusBuilder
    a6([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Reason for referral from Facility 5")
            .containsAnswerConceptName("Other");
    }



    @WithName('Facility 5 | Which other type of transport was used?')
    @WithStatusBuilder
    a7([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Type of transport used from Facility 5")
            .containsAnswerConceptName("Other");
    }

    @WithName('Facility 5 | Specify other treatment given')
    @WithStatusBuilder
    a8([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Treatment given at Facility 5")
            .containsAnswerConceptName("Other");
    }
    @WithName('Facility 6 | Which other staff attended?')
    @WithStatusBuilder
    a9([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Who attended at Facility 6?")
            .containsAnswerConceptName("Other Staff");
    }
    @WithName('Facility 6 | Specify other reason for referral')
    @WithStatusBuilder
    a10([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Reason for referral from Facility 6")
            .containsAnswerConceptName("Other");
    }
    @WithName('Facility 6 | Which other type of transport was used?')
    @WithStatusBuilder
    a11([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Type of transport used from Facility 6")
            .containsAnswerConceptName("Other");
    }


    @WithName('Facility 6 | Specify other treatment given')
    @WithStatusBuilder
    a12([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Treatment given at Facility 6")
            .containsAnswerConceptName("Other");
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
    gravida([programEncounter, formElement], statusBuilder) {
        let gravida = programEncounter.getObservationValue('Gravida');
        let para = programEncounter.getObservationValue('Parity');
        if (para && !gravida) {
            statusBuilder.validationError('There is no value specified');
        }
        return statusBuilder.build();
    }

    @WithStatusBuilder
    para([programEncounter, formElement], statusBuilder) {
        let gravida = programEncounter.getObservationValue('Gravida');
        let para = programEncounter.getObservationValue('Parity');
        if (gravida && para && (para > gravida)) {
            statusBuilder.validationError('Para cannot be more than Gravida');
        }
        return statusBuilder.build();
    }

    @WithStatusBuilder
    numberOfAbortions([programEncounter, formElement], statusBuilder) {
        let gravida = programEncounter.getObservationValue('Gravida');
        let para = programEncounter.getObservationValue('Parity');
        let abortion = programEncounter.getObservationValue('Number of abortions');
        if (gravida && para && abortion && (para + abortion > gravida)) {
            statusBuilder.validationError('Para + Abortion cannot be more than Gravida');
        }
        return statusBuilder.build();
    }

    @WithStatusBuilder
    noOfLivingChildrenMale([programEncounter, formElement], statusBuilder) {
        let gravida = programEncounter.getObservationValue('Gravida');
        let numMaleLivingChildren = programEncounter.getObservationValue('No of Living Children - Male');
        let numFemaleLivingChildren = programEncounter.getObservationValue('No of Living Children - Female') || 0;
        if (gravida && numMaleLivingChildren && (numMaleLivingChildren + numFemaleLivingChildren > gravida)) {
            statusBuilder.validationError('Number of living children cannot be more than Gravida');
        }
    }

    @WithStatusBuilder
    noOfLivingChildrenFemale([programEncounter, formElement], statusBuilder) {
        let gravida = programEncounter.getObservationValue('Gravida');
        let numMaleLivingChildren = programEncounter.getObservationValue('No of Living Children - Male') || 0;
        let numFemaleLivingChildren = programEncounter.getObservationValue('No of Living Children - Female');
        if (gravida && numFemaleLivingChildren && (numMaleLivingChildren + numFemaleLivingChildren > gravida)) {
            statusBuilder.validationError('Number of living children cannot be more than Gravida');
        }
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
            statusBuilder.show().when.valueInEncounter('Number of places visited prior').is.greaterThanOrEqualTo(3);
            return statusBuilder.build();
        });
    }

    facility4ReferralDetails(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe=>{
            let statusBuilder = new FormElementStatusBuilder({programEncounter:programEncounter, formElement:fe});
            statusBuilder.show().when.valueInEncounter('Number of places visited prior').is.greaterThanOrEqualTo(4);
            return statusBuilder.build();
        });
    }

    facility5ReferralDetails(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe=>{
            let statusBuilder = new FormElementStatusBuilder({programEncounter:programEncounter, formElement:fe});
            statusBuilder.show().when.valueInEncounter('Number of places visited prior').is.greaterThanOrEqualTo(5);
            return statusBuilder.build();
        });
    }

    facility6ReferralDetails(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe=>{
            let statusBuilder = new FormElementStatusBuilder({programEncounter:programEncounter, formElement:fe});
            statusBuilder.show().when.valueInEncounter('Number of places visited prior').equals(6);
            return statusBuilder.build();
        });
    }

    @WithStatusBuilder
    dateOfAdmissionToFacility1([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter('Number of places visited prior').is.greaterThanOrEqualTo(1);
        let dateOfReferralFromHome = programEncounter.getObservationValue('Date of referral from home');
        let dateOfAdmissionToThisFacility = programEncounter.getObservationValue('Date of admission to Facility 1');
        if (dateOfReferralFromHome
            && dateOfAdmissionToThisFacility
            && calculateDurationInDaysAndHours(dateOfReferralFromHome, dateOfAdmissionToThisFacility).startsWith('-')) {
                statusBuilder.validationError('Date of admission to this facility cannot be before date of referral from home');
        }
        return statusBuilder.build();
    }

    @WithStatusBuilder
    facility1DateOfReferral([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter('Number of places visited prior').is.greaterThanOrEqualTo(1);
        let dateOfAdmissionToThisFacility = programEncounter.getObservationValue('Date of admission to Facility 1');
        let dateOfReferralFromThisFacility = programEncounter.getObservationValue('Date of referral from Facility 1');
        if(dateOfAdmissionToThisFacility
           && dateOfReferralFromThisFacility
           && calculateDurationInDaysAndHours(dateOfAdmissionToThisFacility, dateOfReferralFromThisFacility).startsWith('-')) {
                statusBuilder.validationError('Date of referral out of this facility cannot be before date of admission to this facility');
        }
        return statusBuilder.build();
    }

    @WithStatusBuilder
    dateOfAdmissionToFacility2([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter('Number of places visited prior').is.greaterThanOrEqualTo(2);
        let dateOfAdmissionToPreviousFacility = programEncounter.getObservationValue('Date of admission to Facility 1');
        let dateOfReferralFromFacility1 = programEncounter.getObservationValue('Date of referral from Facility 1');
        let dateOfAdmissionToThisFacility = programEncounter.getObservationValue('Date of admission to Facility 2');
        if (dateOfReferralFromFacility1
            && dateOfAdmissionToThisFacility
            && calculateDurationInDaysAndHours(dateOfReferralFromFacility1, dateOfAdmissionToThisFacility).startsWith('-')) {
                statusBuilder.validationError('Date of admission to this facility cannot be before date of referral from previous facility');
        }
        if (dateOfAdmissionToPreviousFacility
            && dateOfAdmissionToThisFacility
            && calculateDurationInDaysAndHours(dateOfAdmissionToPreviousFacility, dateOfAdmissionToThisFacility).startsWith('-')) {
                statusBuilder.validationError('Date of admission to this facility cannot be before date of admission to previous facility');
        }
        return statusBuilder.build();
    }

    @WithStatusBuilder
    facility2DateOfReferral([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter('Number of places visited prior').is.greaterThanOrEqualTo(2);
        let dateOfAdmissionToThisFacility = programEncounter.getObservationValue('Date of admission to Facility 2');
        let dateOfReferralFromThisFacility = programEncounter.getObservationValue('Date of referral from Facility 2');
        if(dateOfAdmissionToThisFacility
           && dateOfReferralFromThisFacility
           && calculateDurationInDaysAndHours(dateOfAdmissionToThisFacility, dateOfReferralFromThisFacility).startsWith('-')) {
                statusBuilder.validationError('Date of referral out of this facility cannot be before date of admission to this facility');
        }
        return statusBuilder.build();
    }

    @WithStatusBuilder
    dateOfAdmissionToFacility3([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter('Number of places visited prior').is.greaterThanOrEqualTo(3);
        let dateOfAdmissionToPreviousFacility = programEncounter.getObservationValue('Date of admission to Facility 2');
        let dateOfReferralFromFacility2 = programEncounter.getObservationValue('Date of referral from Facility 2');
        let dateOfAdmissionToThisFacility = programEncounter.getObservationValue('Date of admission to Facility 3');
        if (dateOfReferralFromFacility2
            && dateOfAdmissionToThisFacility
            && calculateDurationInDaysAndHours(dateOfReferralFromFacility2, dateOfAdmissionToThisFacility).startsWith('-')) {
                statusBuilder.validationError('Date of admission to this facility cannot be before date of referral from previous facility');
        }
        if (dateOfAdmissionToPreviousFacility
            && dateOfAdmissionToThisFacility
            && calculateDurationInDaysAndHours(dateOfAdmissionToPreviousFacility, dateOfAdmissionToThisFacility).startsWith('-')) {
                statusBuilder.validationError('Date of admission to this facility cannot be before date of admission to previous facility');
        }
        return statusBuilder.build();
    }

    @WithStatusBuilder
    facility3DateOfReferral([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter('Number of places visited prior').is.greaterThanOrEqualTo(3);
        let dateOfAdmissionToThisFacility = programEncounter.getObservationValue('Date of admission to Facility 3');
        let dateOfReferralFromThisFacility = programEncounter.getObservationValue('Date of referral from Facility 3');
        if(dateOfAdmissionToThisFacility &&
            dateOfReferralFromThisFacility &&
            calculateDurationInDaysAndHours(dateOfAdmissionToThisFacility, dateOfReferralFromThisFacility).startsWith('-')) {
            statusBuilder.validationError('Date of referral out of this facility cannot be before date of admission to this facility');
        }
        return statusBuilder.build();
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
    facility1SpecifyOtherReasonForReferral([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Reason for referral from Facility 1").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    facility2SpecifyOtherReasonForReferral([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Reason for referral from Facility 2").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    facility3SpecifyOtherReasonForReferral([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Reason for referral from Facility 3").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    facility1SpecifyOtherTreatmentGiven([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Treatment given at Facility 1").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    facility2SpecifyOtherTreatmentGiven([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Treatment given at Facility 2").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    facility3SpecifyOtherTreatmentGiven([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Treatment given at Facility 3").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    abortionDetails(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe=>{
            let statusBuilder = new FormElementStatusBuilder({programEncounter:programEncounter, formElement:fe});
            statusBuilder.show().when.valueInEncounter('Outcome of pregnancy').containsAnswerConceptName("Abortion");
            return statusBuilder.build();
        });
    }

    @WithStatusBuilder
    wasSpontaneousAbortionComplete([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Abortion type").containsAnswerConceptName("Spontaneous abortion");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    wasInducedAbortionLegallyDone([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Abortion type").containsAnswerConceptName("Induced abortion");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    numberOfCentresVisited([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Termination done in more than 1 center").containsAnswerConceptName("Yes");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    specifyTheCentresVisitedBeforeThisFacility([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Termination done in more than 1 center").containsAnswerConceptName("Yes");
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
    typeOfFacility([programEncounter, formElement], statusBuilder){
        statusBuilder.show().when.valueInEncounter("ANC Received").containsAnswerConceptName("Yes");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    serviceProvidedBy([programEncounter, formElement], statusBuilder){
        statusBuilder.show().when.valueInEncounter("ANC Received").containsAnswerConceptName("Yes");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    wasSheToldAboutAnyDisorderComplication([programEncounter, formElement], statusBuilder){
        statusBuilder.show().when.valueInEncounter("ANC Received").containsAnswerConceptName("Yes");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    whatWasTheRiskFactorIdentified([programEncounter, formElement], statusBuilder){
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
    pastFacility([programEncounter, formElement], statusBuilder){
        statusBuilder.show().when.valueInEncounter("Labor pain").containsAnswerConceptName("Yes");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    currentFacility([programEncounter, formElement], statusBuilder){
        statusBuilder.show().when.valueInEncounter("Labor pain").containsAnswerConceptName("Yes");
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
    noOfUnits([programEncounter, formElement], statusBuilder){
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
    placentalCauses([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Antepartum Bleeding").is.yes;
    }

    @WithStatusBuilder
    latePregnancyBleedingOtherThanPlacentalCauses([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Antepartum Bleeding").is.yes;
    }

    @WithStatusBuilder
    neonatalOutcome([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Gave birth").is.yes;
    }

    directCausesOfMaternalDeath(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe=>{
            let statusBuilder = new FormElementStatusBuilder({programEncounter:programEncounter, formElement:fe});
            statusBuilder.show().when.valueInEncounter('Cause of maternal death').containsAnswerConceptName("Direct causes");
            return statusBuilder.build();
        });
    }

    indirectCausesOfMaternalDeath(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe=>{
            let statusBuilder = new FormElementStatusBuilder({programEncounter:programEncounter, formElement:fe});
            statusBuilder.show().when.valueInEncounter('Cause of maternal death').containsAnswerConceptName("Indirect causes");
            return statusBuilder.build();
        });
    }

    @WithStatusBuilder
    selectAtLeastOneCauseOfDeathFromAllOptionsAbove([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter('Cause of maternal death').containsAnswerConceptName("Direct causes").
        and.valueInEncounter('Pregnancies with abortive outcome').is.notDefined.
        and.valueInEncounter('Hypertensive disorders in pregnancy, birth and puerperium').is.notDefined.
        and.valueInEncounter('Obstetric Haemmorhage').is.notDefined.
        and.valueInEncounter('Pregnancy related infection').is.notDefined.
        and.valueInEncounter('Other Obstetric complications').is.notDefined.
        and.valueInEncounter('Other direct cause').is.notDefined;
    }

    @WithStatusBuilder
    selectAtLeastOneCauseOfIndirectDeathFromAllOptionsAbove([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter('Cause of maternal death').containsAnswerConceptName("Indirect causes").
        and.valueInEncounter('Non-obstetric complications- Anaemia').is.notDefined.
        and.valueInEncounter('Non-obstetric complications- Cardiac disorders').is.notDefined.
        and.valueInEncounter('Non-obstetric complications- Liver Disorders').is.notDefined.
        and.valueInEncounter('Non-obstetric complications- Respiratory Disorders').is.notDefined.
        and.valueInEncounter('Non-obstetric complications- Renal disorders').is.notDefined.
        and.valueInEncounter('Non-obstetric complications- Endocrinal Disorders').is.notDefined.
        and.valueInEncounter('Non-obstetric complications- Neurological Disorders').is.notDefined.
        and.valueInEncounter('Non-obstetric complications- Infections/ Infestations').is.notDefined;
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