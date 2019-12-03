import {
    RuleFactory,
    FormElementStatus,
    FormElementsStatusHelper,
    FormElementStatusBuilder,
    StatusBuilderAnnotationFactory,
    lib
} from 'rules-config/rules';
import {WithName} from "rules-config";
import moment from 'moment';

const _ = require("lodash");


const WithStatusBuilder = StatusBuilderAnnotationFactory('programEncounter', 'formElement');

const EncounterViewFilter = RuleFactory("814fdf94-52d9-48ee-a923-4042d799fb61", "ViewFilter");
// const FormValidation = RuleFactory("2bfd54fe-7cf4-414f-9c54-ef06e950945a",'Validation');

const dateDiff = (startDateTime, endDateTime) => {
    if (!_.isNil(startDateTime) && !_.isNil(endDateTime)) {
        return moment(endDateTime).diff(moment(startDateTime), 'days', true);
    }
};

const calculateDurationInDaysAndHours = (startDateTime, endDateTime) => {
    if (!_.isNil(startDateTime) && !_.isNil(endDateTime)) {
        let diff = moment(endDateTime).diff(moment(startDateTime), 'days', true);
        let days = Math.floor(diff);
        let decimalValue = diff - days;
        let hours = Math.round(decimalValue * 24 * 4) / 4;
        return `${days} days, ${hours} hours`;
    }
};

@EncounterViewFilter("81af8852-dd3f-48e3-9717-0f2de5de6654", "CBMDR View Filter", 100, {})
class CbmdrViewFilter {

    static exec(programEncounter, formElementGroup, today) {


        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new CbmdrViewFilter(), programEncounter, formElementGroup, today);
    }

    participateInInterview(formElementGroup, encounter) {
        return formElementGroup.formElements.map(fe => {
            let statusBuilder = new FormElementStatusBuilder({programEncounter: encounter, formElement: fe});
            statusBuilder.show().when.valueInEncounter("Participate in this interview").is.yes;
            return statusBuilder.build();
        });
    }

    backgroundInformation(encounter, formElementGroup) {
        return this.participateInInterview(formElementGroup, encounter)
    }

    profileOfDeceaseWoman(encounter, formElementGroup) {
        return this.participateInInterview(formElementGroup, encounter)
    }

    @WithName('Availability of health facilities, services and transport')
    dummy1(encounter, formElementGroup) {
        return this.participateInInterview(formElementGroup, encounter)
    }

    @WithName('Write GPLA-Gravida, Para, Live Births, Abortions')
    dummy2(encounter, formElementGroup) {
        return this.participateInInterview(formElementGroup, encounter)
    }

    @WithName('Current Pregnancy (To be filled from the information given by the respondents and MCP Card)')
    dummy3(encounter, formElementGroup) {
        return this.participateInInterview(formElementGroup, encounter)
    }

    @WithName('Open History')
    dummy21(encounter, formElementGroup) {
        return this.participateInInterview(formElementGroup, encounter)
    }

    @WithName('What could have been done to prevent death')
    dummy22(encounter, formElementGroup) {
        return this.participateInInterview(formElementGroup, encounter)
    }

    @WithName('Image')
    dummy23(encounter, formElementGroup) {
        return this.participateInInterview(formElementGroup, encounter)
    }

    @WithName('Date of Admission to Facility 1')
    @WithStatusBuilder
    dummy24([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter('Period of Death').containsAnswerConceptName('During pregnancy').and
            .when.valueInEncounter("No of weeks of pregnancy").is.greaterThanOrEqualTo(6).and
            .when.valueInEncounter("Referred at that time").is.yes;
        let dateOfReferralFromHome = programEncounter.getObservationValue('Date of referral from home');
        let dateOfAdmissionToThisFacility = programEncounter.getObservationValue('Date of admission to Facility 1');
        const dateDiff = dateOfReferralFromHome
            && dateOfAdmissionToThisFacility
            && calculateDurationInDaysAndHours(dateOfReferralFromHome, dateOfAdmissionToThisFacility).startsWith('-');
        statusBuilder.validationError('Date of admission to this facility cannot be before date of referral from home')
            .whenItem(dateDiff).is.truthy;
    }

    @WithName('Date of Admission to Facility 2')
    @WithStatusBuilder
    dummy25([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter('Period of Death').containsAnswerConceptName('During pregnancy').and
            .when.valueInEncounter("No of weeks of pregnancy").is.greaterThanOrEqualTo(6).and
            .when.valueInEncounter("Referred at that time").is.yes;
        let dateOfReferralFromPrevFacility = programEncounter.getObservationValue('Date of admission to Facility 1');
        let dateOfAdmissionToThisFacility = programEncounter.getObservationValue('Date of admission to Facility 2');
        const dateDiff = dateOfReferralFromPrevFacility
            && dateOfAdmissionToThisFacility
            && calculateDurationInDaysAndHours(dateOfReferralFromPrevFacility, dateOfAdmissionToThisFacility).startsWith('-');
        statusBuilder.validationError('Date of admission to facility 2 cannot be before date of referral from facility 1')
            .whenItem(dateDiff).is.truthy;
    }

    @WithName('Date of Admission to Facility 3')
    @WithStatusBuilder
    dummy26([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter('Period of Death').containsAnswerConceptName('During pregnancy').and
            .when.valueInEncounter("No of weeks of pregnancy").is.greaterThanOrEqualTo(6).and
            .when.valueInEncounter("Referred at that time").is.yes;
        let dateOfReferralFromPrevFacility = programEncounter.getObservationValue('Date of admission to Facility 2');
        let dateOfAdmissionToThisFacility = programEncounter.getObservationValue('Date of admission to Facility 3');
        const dateDiff = dateOfReferralFromPrevFacility
            && dateOfAdmissionToThisFacility
            && calculateDurationInDaysAndHours(dateOfReferralFromPrevFacility, dateOfAdmissionToThisFacility).startsWith('-');
        statusBuilder.validationError('Date of admission to facility 3 cannot be before date of referral from facility 2')
            .whenItem(dateDiff).is.truthy;
    }

    @WithName('Date of Admission to Facility 4')
    @WithStatusBuilder
    dummy27([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter('Period of Death').containsAnswerConceptName('During pregnancy').and
            .when.valueInEncounter("No of weeks of pregnancy").is.greaterThanOrEqualTo(6).and
            .when.valueInEncounter("Referred at that time").is.yes;
        let dateOfReferralFromPrevFacility = programEncounter.getObservationValue('Date of admission to Facility 3');
        let dateOfAdmissionToThisFacility = programEncounter.getObservationValue('Date of admission to Facility 4');
        const dateDiff = dateOfReferralFromPrevFacility
            && dateOfAdmissionToThisFacility
            && calculateDurationInDaysAndHours(dateOfReferralFromPrevFacility, dateOfAdmissionToThisFacility).startsWith('-');
        statusBuilder.validationError('Date of admission to facility 4 cannot be before date of referral from facility 3')
            .whenItem(dateDiff).is.truthy;
    }

    @WithName('Date of Admission to Facility 5')
    @WithStatusBuilder
    dummy28([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter('Period of Death').containsAnswerConceptName('During pregnancy').and
            .when.valueInEncounter("No of weeks of pregnancy").is.greaterThanOrEqualTo(6).and
            .when.valueInEncounter("Referred at that time").is.yes;
        let dateOfReferralFromPrevFacility = programEncounter.getObservationValue('Date of admission to Facility 4');
        let dateOfAdmissionToThisFacility = programEncounter.getObservationValue('Date of admission to Facility 5');
        const dateDiff = dateOfReferralFromPrevFacility
            && dateOfAdmissionToThisFacility
            && calculateDurationInDaysAndHours(dateOfReferralFromPrevFacility, dateOfAdmissionToThisFacility).startsWith('-');
        statusBuilder.validationError('Date of admission to facility 5 cannot be before date of referral from facility 4')
            .whenItem(dateDiff).is.truthy;
    }

    @WithName('Date of Admission to Facility 6')
    @WithStatusBuilder
    dummy29([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter('Period of Death').containsAnswerConceptName('During pregnancy').and
            .when.valueInEncounter("No of weeks of pregnancy").is.greaterThanOrEqualTo(6).and
            .when.valueInEncounter("Referred at that time").is.yes;
        let dateOfReferralFromPrevFacility = programEncounter.getObservationValue('Date of admission to Facility 5');
        let dateOfAdmissionToThisFacility = programEncounter.getObservationValue('Date of admission to Facility 6');
        const dateDiff = dateOfReferralFromPrevFacility
            && dateOfAdmissionToThisFacility
            && calculateDurationInDaysAndHours(dateOfReferralFromPrevFacility, dateOfAdmissionToThisFacility).startsWith('-');
        statusBuilder.validationError('Date of admission to facility 6 cannot be before date of referral from facility 5')
            .whenItem(dateDiff).is.truthy;
    }

    @WithName('X. Date of Admission to Facility 1')
    @WithStatusBuilder
    dummy30([programEncounter, formElement], statusBuilder) {
        console.log("came here --------------");
        statusBuilder.show().when.valueInEncounter("Did she seek treatment").is.yes
            .or.when.valueInEncounter("Referral attended").yes;
        let dateOfReferralFromHome = programEncounter.getObservationValue('X. Date of referral from home');
        let dateOfAdmissionToThisFacility = programEncounter.getObservationValue('X. Date of admission to Facility 1');
        console.log("dateOfReferralFromHome", dateOfReferralFromHome);
        console.log("dateOfAdmissionToThisFacility", dateOfAdmissionToThisFacility);
        const dateDiff = dateOfReferralFromHome
            && dateOfAdmissionToThisFacility
            && calculateDurationInDaysAndHours(dateOfReferralFromHome, dateOfAdmissionToThisFacility).startsWith('-');
        console.log("dateDiff =", dateDiff);
        statusBuilder.validationError('Date of admission to facility 1 cannot be before date of referral from Home')
            .whenItem(dateDiff).is.truthy;
    }

    @WithName('X. Date of Admission to Facility 2')
    @WithStatusBuilder
    dummy31([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Did she seek treatment").is.yes
            .or.when.valueInEncounter("Referral attended").yes;
        let dateOfReferralFromPrevFacility = programEncounter.getObservationValue('X. Date of admission to Facility 1');
        let dateOfAdmissionToThisFacility = programEncounter.getObservationValue('X. Date of admission to Facility 2');
        const dateDiff = dateOfReferralFromPrevFacility
            && dateOfAdmissionToThisFacility
            && calculateDurationInDaysAndHours(dateOfReferralFromPrevFacility, dateOfAdmissionToThisFacility).startsWith('-');
        statusBuilder.validationError('Date of admission to facility 2 cannot be before date of referral from Facility 1')
            .whenItem(dateDiff).is.truthy;
    }

    @WithName('X. Date of Admission to Facility 3')
    @WithStatusBuilder
    dummy33([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Did she seek treatment").is.yes
            .or.when.valueInEncounter("Referral attended").yes;
        let dateOfReferralFromPrevFacility = programEncounter.getObservationValue('X. Date of admission to Facility 2');
        let dateOfAdmissionToThisFacility = programEncounter.getObservationValue('X. Date of admission to Facility 3');
        const dateDiff = dateOfReferralFromPrevFacility
            && dateOfAdmissionToThisFacility
            && calculateDurationInDaysAndHours(dateOfReferralFromPrevFacility, dateOfAdmissionToThisFacility).startsWith('-');
        statusBuilder.validationError('Date of admission to facility 3 cannot be before date of referral from Facility 2')
            .whenItem(dateDiff).is.truthy;
    }

    @WithName('X. Date of Admission to Facility 4')
    @WithStatusBuilder
    dummy34([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Did she seek treatment").is.yes
            .or.when.valueInEncounter("Referral attended").yes;
        let dateOfReferralFromPrevFacility = programEncounter.getObservationValue('X. Date of admission to Facility 3');
        let dateOfAdmissionToThisFacility = programEncounter.getObservationValue('X. Date of admission to Facility 4');
        const dateDiff = dateOfReferralFromPrevFacility
            && dateOfAdmissionToThisFacility
            && calculateDurationInDaysAndHours(dateOfReferralFromPrevFacility, dateOfAdmissionToThisFacility).startsWith('-');
        statusBuilder.validationError('Date of admission to facility 4 cannot be before date of referral from Facility 3')
            .whenItem(dateDiff).is.truthy;
    }

    @WithName('X. Date of Admission to Facility 5')
    @WithStatusBuilder
    dummy35([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Did she seek treatment").is.yes
            .or.when.valueInEncounter("Referral attended").yes;
        let dateOfReferralFromPrevFacility = programEncounter.getObservationValue('X. Date of admission to Facility 4');
        let dateOfAdmissionToThisFacility = programEncounter.getObservationValue('X. Date of admission to Facility 5');
        const dateDiff = dateOfReferralFromPrevFacility
            && dateOfAdmissionToThisFacility
            && calculateDurationInDaysAndHours(dateOfReferralFromPrevFacility, dateOfAdmissionToThisFacility).startsWith('-');
        statusBuilder.validationError('Date of admission to facility 5 cannot be before date of referral from Facility 4')
            .whenItem(dateDiff).is.truthy;
    }

    @WithName('X. Date of Admission to Facility 6')
    @WithStatusBuilder
    dummy36([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Did she seek treatment").is.yes
            .or.when.valueInEncounter("Referral attended").yes;
        let dateOfReferralFromPrevFacility = programEncounter.getObservationValue('X. Date of admission to Facility 5');
        let dateOfAdmissionToThisFacility = programEncounter.getObservationValue('X. Date of admission to Facility 6');
        const dateDiff = dateOfReferralFromPrevFacility
            && dateOfAdmissionToThisFacility
            && calculateDurationInDaysAndHours(dateOfReferralFromPrevFacility, dateOfAdmissionToThisFacility).startsWith('-');
        statusBuilder.validationError('Date of admission to facility 6 cannot be before date of referral from Facility 5')
            .whenItem(dateDiff).is.truthy;
    }

    @WithStatusBuilder
    facility1WhichOtherTypeOfTransportWasUsed([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Referral transport used").containsAnswerConceptName("Other")
            .and.when.valueInEncounter('Period of Death')
            .containsAnyAnswerConceptName('During pregnancy', 'During abortion or within 6 weeks after abortion');
    }

    @WithStatusBuilder
    facility2WhichOtherTypeOfTransportWasUsed([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Referral transport used from facility 2").containsAnswerConceptName("Other")
            .and.when.valueInEncounter('Period of Death')
            .containsAnyAnswerConceptName('During pregnancy', 'During abortion or within 6 weeks after abortion');
    }

    @WithName('Facility 3 | Which other type of transport was used?')
    @WithStatusBuilder
    other3([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Referral transport used from facility 3").containsAnswerConceptName("Other")
            .and.when.valueInEncounter('Period of Death')
            .containsAnyAnswerConceptName('During pregnancy', 'During abortion or within 6 weeks after abortion');
    }

    @WithName('Facility 4 | Which other type of transport was used?')
    @WithStatusBuilder
    other4([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Referral transport used from facility 4").containsAnswerConceptName("Other")
            .and.when.valueInEncounter('Period of Death')
            .containsAnyAnswerConceptName('During pregnancy', 'During abortion or within 6 weeks after abortion');
    }

    @WithName('Facility 5 | Which other type of transport was used?')
    @WithStatusBuilder
    other5([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Referral transport used from facility 5").containsAnswerConceptName("Other")
            .and.when.valueInEncounter('Period of Death')
            .containsAnyAnswerConceptName('During pregnancy', 'During abortion or within 6 weeks after abortion');

    }

    @WithName('Facility 6 | Which other type of transport was used?')
    @WithStatusBuilder
    other6([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Referral transport used from facility 6").containsAnswerConceptName("Other")
            .and.when.valueInEncounter('Period of Death')
            .containsAnyAnswerConceptName('During pregnancy', 'During abortion or within 6 weeks after abortion');
    }

    @WithName('X. Facility 1 | Which other type of transport was used?')
    @WithStatusBuilder
    other7([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("X. Referral transport used").containsAnswerConceptName("Other")
            .and.when.valueInEncounter("Period of Death")
            .containsAnyAnswerConceptName("During Delivery", "Within 42 days of delivery");
    }

    @WithName('X. Facility 2 | Which other type of transport was used?')
    @WithStatusBuilder
    other8([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("X. Referral transport used from facility 2").containsAnswerConceptName("Other")
            .and.when.valueInEncounter("Period of Death")
            .containsAnyAnswerConceptName("During Delivery", "Within 42 days of delivery");
    }

    @WithName('X. Facility 3 | Which other type of transport was used?')
    @WithStatusBuilder
    other9([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("X. Referral transport used from facility 3").containsAnswerConceptName("Other")
            .and.when.valueInEncounter("Period of Death")
            .containsAnyAnswerConceptName("During Delivery", "Within 42 days of delivery");
    }

    @WithName('X. Facility 4 | Which other type of transport was used?')
    @WithStatusBuilder
    other10([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("X. Referral transport used from facility 4").containsAnswerConceptName("Other")
            .and.when.valueInEncounter("Period of Death")
            .containsAnyAnswerConceptName("During Delivery", "Within 42 days of delivery");
    }

    @WithName('X. Facility 5 | Which other type of transport was used?')
    @WithStatusBuilder
    other11([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("X. Referral transport used from facility 5").containsAnswerConceptName("Other")
            .and.when.valueInEncounter("Period of Death")
            .containsAnyAnswerConceptName("During Delivery", "Within 42 days of delivery");
    }

    @WithName('X. Facility 6 | Which other type of transport was used?')
    @WithStatusBuilder
    other12([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("X. Referral transport used from facility 6").containsAnswerConceptName("Other")
            .and.when.valueInEncounter("Period of Death")
            .containsAnyAnswerConceptName("During Delivery", "Within 42 days of delivery");
    }

    @WithName('Specify Other Staff..')
    @WithStatusBuilder
    a1([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Attened at facility 1 by")
            .containsAnswerConceptName("Other Staff")
    }

    @WithName('Specify Other Treatment given at Facility 1')
    @WithStatusBuilder
    a2([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Treatment given at Facility 1")
            .containsAnswerConceptName("Other")
    }

    @WithName('Specify Other Staff at Facility 2')
    @WithStatusBuilder
    a3([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Attended at facility 2 by")
            .containsAnswerConceptName("Other Staff")
    }

    @WithName('Other Treatment given at Facility 2')
    @WithStatusBuilder
    a4([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Treatment given at Facility 2")
            .containsAnswerConceptName("Other")
    }

    @WithName('Specify Other Staff at Facility 3')
    @WithStatusBuilder
    a5([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Attended at facility 3 by")
            .containsAnswerConceptName("Other Staff")
    }

    @WithName('Other Treatment given at Facility 3')
    @WithStatusBuilder
    a6([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Treatment given at Facility 3")
            .containsAnswerConceptName("Other")
    }

    @WithName('Specify Other Staff at Facility 4')
    @WithStatusBuilder
    a7([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Attended at facility 4 by")
            .containsAnswerConceptName("Other Staff")
    }

    @WithName('Other Reason for referral from Facility 4')
    @WithStatusBuilder
    a8([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Reason for referral from facility 4")
            .containsAnswerConceptName("Other")
    }

    @WithName('Specify Other Treatment given at Facility 4')
    @WithStatusBuilder
    a9([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Treatment given at Facility 4")
            .containsAnswerConceptName("Other")
    }

    @WithName('Specify Other Staff at Facility 5')
    @WithStatusBuilder
    a10([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Attended at facility 5 by")
            .containsAnswerConceptName("Other Staff")
    }

    @WithName('Other Treatment given at Facility 5')
    @WithStatusBuilder
    a11([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Treatment given at Facility 5")
            .containsAnswerConceptName("Other")
    }

    @WithName('Specify Other Staff at Facility 6')
    @WithStatusBuilder
    a12([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Attended at facility 6 by")
            .containsAnswerConceptName("Other Staff")
    }

    @WithName('Other Treatment given at Facility 6')
    @WithStatusBuilder
    a13([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Treatment given at Facility 6")
            .containsAnswerConceptName("Other")
    }


    @WithStatusBuilder
    dateOfDeath([programEncounter, formElement], statusBuilder) {
        let dtDeath = programEncounter.getObservationValue('Date and time of Death');
        if (dtDeath && dateDiff(dtDeath, programEncounter.encounterDateTime) < 0) {
            statusBuilder.validationError('Date/time of death cannot be in the future');
        }
    }

    // In Background Information section
    @WithStatusBuilder
    q8DateTimeOfDeath([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Participate in this interview").is.yes;
        let dtDeath = programEncounter.getObservationValue('Date & Time of Death');
        if (dtDeath && dateDiff(dtDeath, programEncounter.encounterDateTime) < 0) {
            statusBuilder.validationError('Date/time of death cannot be in the future');
        }
    }

    @WithStatusBuilder
    dateOfInvestigation([programEncounter, formElement], statusBuilder) {
        let dtInvestigation = programEncounter.getObservationValue('Date of Investigation');
        let dtDeath = programEncounter.getObservationValue('Date and time of Death');
        if (dtInvestigation && (dateDiff(dtDeath, dtInvestigation) < 0)) {
            statusBuilder.validationError('Date/time of investigation cannot be before Date/time of death');
        }
        return statusBuilder.build();
    }

    @WithStatusBuilder
    specifyOtherProbableCauseOfDeath([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when
            .valueInEncounter("Probable cause of death details")
            .containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

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
    specifyOtherTransportAvailable([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when
            .valueInEncounter("Type of transport used from home").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    gravida([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Participate in this interview").is.yes;
        let gravida = programEncounter.getObservationValue('Gravida');
        let para = programEncounter.getObservationValue('Parity');
        if (para && !gravida) {
            statusBuilder.validationError('There is no value specified');
        }
        return statusBuilder.build();
    }

    @WithStatusBuilder
    para([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Participate in this interview").is.yes;
        let gravida = programEncounter.getObservationValue('Gravida');
        let para = programEncounter.getObservationValue('Parity');
        if (gravida && para && (para > gravida)) {
            statusBuilder.validationError('Para cannot be more than Gravida');
        }
        return statusBuilder.build();
    }

    @WithStatusBuilder
    abortions([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Participate in this interview").is.yes;
        let gravida = programEncounter.getObservationValue('Gravida');
        let para = programEncounter.getObservationValue('Parity');
        let abortion = programEncounter.getObservationValue('Number of abortions');
        if (gravida && para && abortion && (para + abortion > gravida)) {
            statusBuilder.validationError('Para + Abortion cannot be more than Gravida');
        }
        return statusBuilder.build();
    }

    @WithStatusBuilder
    noOfLiveBirths([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Participate in this interview").is.yes;
        let para = programEncounter.getObservationValue('Parity');
        let numLiveBirths = programEncounter.getObservationValue('Past Live Births');
        if (para && numLiveBirths && (numLiveBirths > para)) {
            statusBuilder.validationError('Number of live births cannot be more than Para');
        }
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


    //Module II formelement group to be skipped

    @WithStatusBuilder
    otherReasonForNotSeekingCare([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Reason for not seeking care 3").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    moduleIi(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe => {
            let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
            statusBuilder.show().when
                .valueInEncounter('Period of Death').containsAnyAnswerConceptName('During pregnancy', 'During abortion or within 6 weeks after abortion');
            return statusBuilder.build();
        })
    }

    deathDuringAntenatalPeriod(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe => {
            let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
            statusBuilder.show().when
                .valueInEncounter('Period of Death').containsAnswerConceptName('During pregnancy');
            return statusBuilder.build();
        })
    }

    referralFromHomeVillage(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe => {
            let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
            statusBuilder.show().when.valueInEncounter('Period of Death').containsAnswerConceptName('During pregnancy').and
                .when.valueInEncounter("No of weeks of pregnancy").is.greaterThanOrEqualTo(6).and
                .when.valueInEncounter("Referred at that time").is.yes;
            return statusBuilder.build();
        })
    }

    referralFormFromFacility1(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe => {
            let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
            statusBuilder.show().when.valueInEncounter('Period of Death').containsAnswerConceptName('During pregnancy').and
                .when.valueInEncounter("No of weeks of pregnancy").is.greaterThanOrEqualTo(6).and
                .when.valueInEncounter("Referred at that time").is.yes;
            return statusBuilder.build();
        })
    }

    referralFormFromFacility2(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe => {
            let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
            statusBuilder.show().when.valueInEncounter('Period of Death').containsAnswerConceptName('During pregnancy').and
                .when.valueInEncounter("No of weeks of pregnancy").is.greaterThanOrEqualTo(6).and
                .when.valueInEncounter("Referred at that time").is.yes;
            return statusBuilder.build();
        })
    }

    referralFormFromFacility3(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe => {
            let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
            statusBuilder.show().when.valueInEncounter('Period of Death').containsAnswerConceptName('During pregnancy').and
                .when.valueInEncounter("No of weeks of pregnancy").is.greaterThanOrEqualTo(6).and
                .when.valueInEncounter("Referred at that time").is.yes;
            return statusBuilder.build();
        })
    }

    referralFormFromFacility4(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe => {
            let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
            statusBuilder.show().when.valueInEncounter('Period of Death').containsAnswerConceptName('During pregnancy').and
                .when.valueInEncounter("No of weeks of pregnancy").is.greaterThanOrEqualTo(6).and
                .when.valueInEncounter("Referred at that time").is.yes;
            return statusBuilder.build();
        })
    }

    referralFormFromFacility5(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe => {
            let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
            statusBuilder.show().when.valueInEncounter('Period of Death').containsAnswerConceptName('During pregnancy').and
                .when.valueInEncounter("No of weeks of pregnancy").is.greaterThanOrEqualTo(6).and
                .when.valueInEncounter("Referred at that time").is.yes;
            return statusBuilder.build();
        })
    }

    referralFormFromFacility6(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe => {
            let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
            statusBuilder.show().when.valueInEncounter('Period of Death').containsAnswerConceptName('During pregnancy').and
                .when.valueInEncounter("No of weeks of pregnancy").is.greaterThanOrEqualTo(6).and
                .when.valueInEncounter("Referred at that time").is.yes;
            return statusBuilder.build();
        })
    }

    seekingCare(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe => {
            let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
            statusBuilder.show().when.valueInEncounter('Period of Death').containsAnswerConceptName('During pregnancy').and
                .when.valueInEncounter("Did she seek care").is.no;
            return statusBuilder.build();
        })
    }

    moduleIii(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe => {
            let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
            statusBuilder.show().when
                .valueInEncounter("Period of Death")
                .containsAnyAnswerConceptName("During Delivery", "Within 42 days of delivery");
            return statusBuilder.build();
        })
    }

    outcomeOfTheDelivery(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe => {
            let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
            statusBuilder.show().when
                .valueInEncounter("Period of Death")
                .containsAnyAnswerConceptName("During Delivery", "Within 42 days of delivery");
            return statusBuilder.build();
        })
    }

    xPostNatalPeriod(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe => {
            let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
            statusBuilder.show().when
                .valueInEncounter("Period of Death")
                .containsAnswerConceptName("Within 42 days of delivery");
            return statusBuilder.build();
        })
    }

    problemsFollowingDelivery(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe => {
            let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
            statusBuilder.show().when.valueInEncounter("Any problem following delivery").is.yes;
            return statusBuilder.build();
        })
    }

    postnatalCheckups(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe => {
            let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
            statusBuilder.show().when
                .valueInEncounter("Period of Death")
                .containsAnswerConceptName("Within 42 days of delivery");
            return statusBuilder.build();
        })
    }

    @WithStatusBuilder
    viiIfYesWhereDidSheSeekCare([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Did she seek care").is.yes;
        return statusBuilder.build();
    }

    @WithStatusBuilder
    ifOtherSeekedCare([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Where seeked care for these complications").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    viiiOtherReasonForNotSeekingCare([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Reasons for not seeking care").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    ifOtherWriteSymptoms([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Symptoms at time of death").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    viii3DateOfSpontaneousAbortionDateOfTerminationOfPregnany([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Type of abortion").containsAnswerConceptName("Spontaneous abortion");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    viii4IfTheAbortionWasSpontaneousWhereWasTheAbortionCompleted([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Type of abortion").containsAnswerConceptName("Spontaneous abortion");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    viii4IfOtherWhereWasTheAbortionCompleted([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Where was the abortion completed").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    viii5IfTheAbortionWasInducedHowWasItInduced([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Type of abortion").containsAnswerConceptName("Induced abortion");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    viii7IfTheAbortionWasInducedWhoPerformedTheAbortion([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Type of abortion").containsAnswerConceptName("Induced abortion");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    viii6IfTheAbortionWasInducedWhereDidSheHaveTheAbortion([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Type of abortion").containsAnswerConceptName("Induced abortion");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    viiiIfOtherWhereSheHadAbortion([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Induced abortion performed at").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    viiiOtherWhoPerformedAbortion([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Induced abortion performed by").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    viii8AWhatWasTheReasonForInducingAbortion([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Type of abortion").containsAnswerConceptName("Induced abortion");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    viii8BDescribeTheReasonForInducingTheAbortion([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Type of abortion").containsAnswerConceptName("Induced abortion");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    viii11IfYesWhereDidSheSeekCare([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Seek care after developing complication 1").containsAnswerConceptName("Yes");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    viii12InCaseOfNotSeekingCareFromTheHospitalWhatWereTheReasonForNotSeekingCare([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Seek care after developing complication 1").containsAnswerConceptName("No");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    viii11IfOtherSpecify([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Seek care after developing complication 2").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    viii12OtherReasonForNotSeekingCare([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Reason for not seeking the care").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    ixIfOtherPlaceOfDelivery([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Place of delivery.").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    ix2InCaseOfHomeDeliveryWhatWereTheReasonsForHomeDelivery([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Place of delivery.").containsAnswerConceptName("Home");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    ixIfOtherReasonForHomeDelivery([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Reason for home delivery").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    ix6OtherConductedDelivery([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Delivery conducted by").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    ix9OtherComplication([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Complication during labor.").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    ix10AOtherTreatmentProvided([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Treatmet provided at health facility").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    ix10DIfYesPleaseDescribeTheInformationGiven([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Information about the complication from hospital").containsAnswerConceptName("Yes");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    ix10FIfYesPleaseDescribeTheDelayInGivingTreatment([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Delay in initiating treatment 1").containsAnswerConceptName("Yes");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    ix11BInCaseOfNotSeekingCareWhatWereTheReasonsForNotSeekingCare([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Care seeked in home delivery").containsAnswerConceptName("No");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    ix11CWhereDidSheSeekCare([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Care seeked in home delivery").containsAnswerConceptName("Yes");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    ix11BOtherReasonForNotSeekingCare([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Reason for not seeking care in home delivery").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    ix11COtherSeekCare([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Where seek care").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    ix11DIfYesDescribe([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Information given about nature of complication").containsAnswerConceptName("Yes");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    ix11FIfYesPleaseDescribeDelayInInitiatingTreatment([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Delay in initiating treatment 2").containsAnswerConceptName("Yes");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    ix15OtherReasonForNotSeekingCare([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Reason for not seeking care 1").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    ix17IfYesPleaseDescribeTheDetailsOfNatureOfComplicationFromTheHospital([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Information given to relative about nature of complication").containsAnswerConceptName("Yes");
        return statusBuilder.build();
    }

    //Section X

    @WithStatusBuilder
    ix18IfYesPleaseDescribeTheDelayInInitiatingTreatment([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Delay in initiating treatment 3").containsAnswerConceptName("Yes");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    xIfOtherPleaseDescribeTheProblemDuringPostnatalPeriod([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Problem during postnatal period").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    x5IfYesWhereDidSheSeekTreatment([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Did she seek treatment").containsAnswerConceptName("Yes");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    x5IfOtherPleaseDescribeWhereDidSheSeekTreatment([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Where seeked treatment").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    x6AWhatWasTheTreatmentProvidedAtTheHealthFacility([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Did she seek treatment").containsAnswerConceptName("Yes");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    xIfOtherPleaseDescribeTheTreatmentProvidedAtTheHealthFacility([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Treatment in hospital").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    x6BSeeTheHospitalRecordsIfAvailableAndFillDetailsOfTreatmentReceived([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Did she seek treatment").containsAnswerConceptName("Yes");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    xIfOtherPleaseDescribeTheReasonForNotSeekingCare([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Reason for not seeking care 2").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    x11NoOfPostNatalCheckupsReceived([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Any postnatal checkups received").containsAnswerConceptName("Yes");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    x12WhoDidThePostNatalCheckUps([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Any postnatal checkups received").containsAnswerConceptName("Yes");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    xOtherWhoDidPostNatalCheckUps([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Postnatal checkup done by").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }


    //Referral form section X

    @WithStatusBuilder
    viii2TypeOfAbortion([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Did deceased woman died while having abortion").is.yes;
        return statusBuilder.build();
    }

    xReferralFromHomeVillage(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe => {
            let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
            statusBuilder.show().when.valueInEncounter("Did she seek treatment").is.yes
                .or.when.valueInEncounter("Referral attended").yes;
            return statusBuilder.build();
        })
    }

    xReferralFormFromFacility1(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe => {
            let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
            statusBuilder.show().when.valueInEncounter("Did she seek treatment").is.yes
                .or.when.valueInEncounter("Referral attended").yes;
            return statusBuilder.build();
        })
    }

    xReferralFormFromFacility2(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe => {
            let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
            statusBuilder.show().when.valueInEncounter("Did she seek treatment").is.yes
                .or.when.valueInEncounter("Referral attended").yes;
            return statusBuilder.build();
        })
    }

    xReferralFormFromFacility3(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe => {
            let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
            statusBuilder.show().when.valueInEncounter("Did she seek treatment").is.yes
                .or.when.valueInEncounter("Referral attended").yes;
            return statusBuilder.build();
        })
    }

    xReferralFormFromFacility4(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe => {
            let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
            statusBuilder.show().when.valueInEncounter("Did she seek treatment").is.yes
                .or.when.valueInEncounter("Referral attended").yes;
            return statusBuilder.build();
        })
    }

    xReferralFormFromFacility5(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe => {
            let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
            statusBuilder.show().when.valueInEncounter("Did she seek treatment").is.yes
                .or.when.valueInEncounter("Referral attended").yes;
            return statusBuilder.build();
        })
    }

    xReferralFormFromFacility6(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe => {
            let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
            statusBuilder.show().when.valueInEncounter("Did she seek treatment").is.yes
                .or.when.valueInEncounter("Referral attended").yes;
            return statusBuilder.build();
        })
    }

    viiiAbortionRelatedDeath(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe => {
            let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
            statusBuilder.show().when
                .valueInEncounter("Period of Death")
                .containsAnswerConceptName('During abortion or within 6 weeks after abortion');
            return statusBuilder.build();
        })
    }

    nameOfTheDeceasedWoman(programEncounter, formElement) {
        const name = programEncounter.programEnrolment.individual.nameString;
        const display = programEncounter.getObservationReadableValue('Participate in this interview') === 'No' ? false : true;
        return new FormElementStatus(formElement.uuid, display, name);
    }
}


module.exports = {CbmdrViewFilter};
