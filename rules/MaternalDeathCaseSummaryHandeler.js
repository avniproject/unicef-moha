
import { RuleFactory, FormElementStatus, FormElementsStatusHelper ,FormElementStatusBuilder, StatusBuilderAnnotationFactory} from 'rules-config/rules';
const WithStatusBuilder = StatusBuilderAnnotationFactory('programEncounter', 'formElement');
const RuleHelper = require('./RuleHelper');



const CaseSummaryFilter = RuleFactory("d982c23e-133c-4012-99fc-33eb9598d166","ViewFilter");


@CaseSummaryFilter("81a988a2-dl3f-48e3-9717-0f2lasdfe6654", "Case Summary Filter", 100, {})
class CaseSummaryViewFilter {
    @WithStatusBuilder
    otherCauseOfDelayInSeekingCare([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Delay in seeking care").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    otherCauseOfDelayInReachingHealthFacility([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Delay in reaching health facility").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    otherCauseOfDelayInReceivingAdequateCcareInFacility([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Delay in receiving adequate care in facility").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }


    static exec(programEncounter, formElementGroup, today) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new CaseSummaryViewFilter(), programEncounter, formElementGroup, today);
    }
}


module.exports = {CaseSummaryViewFilter};