import _ from "lodash";
import {RuleFactory, VisitScheduleBuilder} from "rules-config/rules";
import RuleHelper from "./RuleHelper";

const cbmdrVisitRule = RuleFactory("68171a3b-106d-4b2c-bf18-8732eb10cf5c", "VisitSchedule");
const caseSummaryScheduleForForm5 = RuleFactory("814fdf94-52d9-48ee-a923-4042d799fb61", "VisitSchedule");
const caseSummaryScheduleForForm4 = RuleFactory("2bfd54fe-7cf4-414f-9c54-ef06e950945a", "VisitSchedule");


@cbmdrVisitRule("e08ec9cc-3f99-4014-ab43-419ea5186ec7", "CommunityBasedMdrVisitPostEnrolment", 10.0)
class CbMdrPostEnrolment {
    static exec(programEnrolment, visitSchedule = []) {
        let scheduleBuilder = RuleHelper.createEnrolmentScheduleBuilder(programEnrolment, visitSchedule);
        let dateOfReporting = programEnrolment.getObservationReadableValue('Reporting Date');
        let earliestDate = _.isNil(dateOfReporting) ? programEnrolment.enrolmentDateTime : dateOfReporting;

        if (_.get(programEnrolment.getObservationReadableValue("Type of death"), 0) !== "Suspected Maternal Death") {
            return scheduleBuilder.getAllUnique("encounterType");
        }
        if (programEnrolment.getObservationReadableValue("Form filled in") === "Community") {
            let maxDate = 21;
            return RuleHelper.scheduleOneVisit(scheduleBuilder, 'Form 5 : Community Based MDSR', 'Form5 : Community Based Verbal Autopsy Form', earliestDate, maxDate);
        } else if (programEnrolment.getObservationReadableValue("Form filled in") === "Facility") {
            let maxDate = 2;
            return RuleHelper.scheduleOneVisit(scheduleBuilder, 'Form 4 : Facility Based MDSR', 'Form 4 : Facility Based MDSR', earliestDate, maxDate);
        }

    }

}

@caseSummaryScheduleForForm5("76b2d695-4311-4ed5-86dc-7b4393a952f3", "caseSummarySchedulePostForm5", 10.0)
class CaseSummaryPostForm5 {
    static exec(programEncounter, visitSchedule = []) {
        let scheduleBuilder = RuleHelper.createProgramEncounterVisitScheduleBuilder(programEncounter, visitSchedule);
        let dateOfEncounter = programEncounter.encounterDateTime;
        let maxDate = 1;
        if (_.get(programEncounter.programEnrolment.getObservationReadableValue("Type of death"), 0) !== "Suspected Maternal Death") {
            return scheduleBuilder.getAllUnique("encounterType");
        }
        return RuleHelper.scheduleOneVisit(scheduleBuilder, "Form 6 : Case Summary - Community", "Form 6: MDSR Case summary", dateOfEncounter, maxDate);
    }
}

@caseSummaryScheduleForForm4("7bd5f9eb-97f8-4780-b527-a10fea22341d", "caseSummarySchedulePostForm4", 10.0)
class CaseSummaryPostForm6 {
    static exec(programEncounter, visitSchedule = []) {
        let scheduleBuilder = RuleHelper.createProgramEncounterVisitScheduleBuilder(programEncounter, visitSchedule);
        let dateOfEncounter = programEncounter.encounterDateTime;
        let maxDate = 1;
        if (_.get(programEncounter.programEnrolment.getObservationReadableValue("Type of death"), 0) !== "Suspected Maternal Death") {
            return scheduleBuilder.getAllUnique("encounterType");
        }
        if (programEncounter.programEnrolment.getObservationReadableValue("Form filled in") === "Facility") {
            return RuleHelper.scheduleTwoVisits(scheduleBuilder, "Form 6 : Case Summary - Facility", "Form 6: MDSR Case summary", dateOfEncounter, maxDate,
                'Form 5 : Community Based MDSR', 'Form5 : Community Based Verbal Autopsy Form', dateOfEncounter, 21);
        }
    }
}


module.exports = {CbMdrPostEnrolment, CaseSummaryPostForm5, CaseSummaryPostForm6};
