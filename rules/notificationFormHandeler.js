import lib from './lib';

import { RuleFactory, FormElementStatus, FormElementsStatusHelper ,FormElementStatusBuilder, complicationsBuilder as ComplicationsBuilder } from 'rules-config/rules';

const RuleHelper = require('./RuleHelper');
// const ObservationMatcherAnnotationFactory = require('../ObservationMatcherAnnotationFactory');
// const CodedObservationMatcher = ObservationMatcherAnnotationFactory(RuleHelper.Scope.Enrolment, 'containsAnyAnswerConceptName')(['programEnrolment', 'formElement']);



const Decision = RuleFactory("68171a3b-106d-4b2c-bf18-8732eb10cf5c", "Decision");
const EnrolmentViewFilter = RuleFactory("68171a3b-106d-4b2c-bf18-8732eb10cf5c","ViewFilter");



@EnrolmentViewFilter("d6666fc9-3290-489c-a987-93f60fda264f", "MDSR Notification View Filter", 1.0, {})
class NotificationHandlerMDSR {
    static exec(programEnrolment, formElementGroup) {
        return FormElementsStatusHelper
            .getFormElementsStatuses(new NotificationHandlerMDSR(), programEnrolment, formElementGroup);
    }

    otherPlaceOfDeath(programEnrolment, formElement) {
        const statusBuilder = this._getStatusBuilder(programEnrolment, formElement);
        statusBuilder.show().when.valueInEnrolment("Place of death").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }


    _getStatusBuilder(programEnrolment, formElement) {
        return new FormElementStatusBuilder({programEnrolment, formElement});
    }

}



@Decision("00d05d46-8761-40e4-b48f-708a88e06550", "Maternal Death Notification Decision", 100.0, {})
class Decisions {

    static getDecisions({ enrolment}) {
        const complicationsBuilder = new ComplicationsBuilder({
            programEnrolment: enrolment,
            complicationsConcept: 'Type of death'
        });

        complicationsBuilder.addComplication("Suspected Maternal Death")
            .when.valueInEnrolment("Timing of death in pregnancy")
            .containsAnyAnswerConceptName("Pregnancy","During or within 6 weeks of abortion","In labour or During Delivery","Within 1 week after delivery","7-42 days after delivery");

 complicationsBuilder.addComplication("Non-maternal death")
            .when.valueInEnrolment("Timing of death in pregnancy")
            .containsAnyAnswerConceptName("None");


        return complicationsBuilder.getComplications();

    }

    static exec(enrolment, decisions, context, today) {
        decisions.enrolmentDecisions.push(Decisions.getDecisions({ enrolment}));
        return decisions;
    }
}


module.exports = {NotificationHandlerMDSR,  Decisions};