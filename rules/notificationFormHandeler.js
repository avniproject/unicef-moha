import {
    complicationsBuilder as ComplicationsBuilder,
    FormElementsStatusHelper,
    FormElementStatus,
    FormElementStatusBuilder,
    RuleFactory
} from 'rules-config/rules';

const Decision = RuleFactory("68171a3b-106d-4b2c-bf18-8732eb10cf5c", "Decision");

@Decision("00d05d46-8761-40e4-b48f-708a88e06550", "Maternal Death Notification Decision", 100.0, {})
class Decisions {
    static getDecisions({enrolment}) {
        const complicationsBuilder = new ComplicationsBuilder({
            programEnrolment: enrolment,
            complicationsConcept: 'Type of death'
        });
        if (!enrolment.isActive) {
            return complicationsBuilder.getComplications();
        }
        complicationsBuilder.addComplication("Suspected Maternal Death")
            .when.valueInEnrolment("Timing of death in pregnancy")
            .containsAnyAnswerConceptName("Pregnancy", "During or within 6 weeks of abortion", "In labour or During Delivery", "Within 1 week after delivery", "7-42 days after delivery");
        complicationsBuilder.addComplication("Non-maternal death")
            .when.valueInEnrolment("Timing of death in pregnancy")
            .containsAnyAnswerConceptName("None");
        return complicationsBuilder.getComplications();
    }

    static exec(enrolment, decisions, context, today) {
        decisions.enrolmentDecisions.push(Decisions.getDecisions({enrolment}));
        return decisions;
    }
}

export {
    Decisions
}