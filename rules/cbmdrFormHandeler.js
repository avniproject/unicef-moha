
import { RuleFactory, FormElementStatus, FormElementsStatusHelper ,FormElementStatusBuilder, StatusBuilderAnnotationFactory} from 'rules-config/rules';
const WithStatusBuilder = StatusBuilderAnnotationFactory('programEncounter', 'formElement');
    const RuleHelper = require('./RuleHelper');


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


    //Module II formelement group to be skipped

    moduleIi(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe=>{
            let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
            statusBuilder.show().when.valueInEncounter("Died during antenatal period").is.yes;
            return statusBuilder.build();
        })
    }

    deathDuringAntenatalPeriod(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe=>{
            let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
            statusBuilder.show().when.valueInEncounter("Died during antenatal period").is.yes.and
                .when.valueInEncounter("No of weeks of pregnancy").is.greaterThanOrEqualTo(6);
            return statusBuilder.build();
        })
    }

    referralFromHomeVillage(programEncounter, formElementGroup) {
            return formElementGroup.formElements.map(fe=>{
                let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
                statusBuilder.show().when.valueInEncounter("Died during antenatal period").is.yes.and
                    .when.valueInEncounter("No of weeks of pregnancy").is.greaterThanOrEqualTo(6).and
                    .when.valueInEncounter("Referred at that time").is.yes;
                return statusBuilder.build();
            })
        }
    referralFormFromFacility1(programEncounter, formElementGroup) {
            return formElementGroup.formElements.map(fe=>{
                let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
                statusBuilder.show().when.valueInEncounter("Died during antenatal period").is.yes.and
                    .when.valueInEncounter("No of weeks of pregnancy").is.greaterThanOrEqualTo(6).and
                    .when.valueInEncounter("Referred at that time").is.yes;
                return statusBuilder.build();
            })
        }
    referralFormFromFacility2(programEncounter, formElementGroup) {
            return formElementGroup.formElements.map(fe=>{
                let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
                statusBuilder.show().when.valueInEncounter("Died during antenatal period").is.yes.and
                    .when.valueInEncounter("No of weeks of pregnancy").is.greaterThanOrEqualTo(6).and
                    .when.valueInEncounter("Referred at that time").is.yes;
                return statusBuilder.build();
            })
        }

    referralFormFromFacility3(programEncounter, formElementGroup) {
            return formElementGroup.formElements.map(fe=>{
                let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
                statusBuilder.show().when.valueInEncounter("Died during antenatal period").is.yes.and
                    .when.valueInEncounter("No of weeks of pregnancy").is.greaterThanOrEqualTo(6).and
                    .when.valueInEncounter("Referred at that time").is.yes;
                return statusBuilder.build();
            })
        }


    seekingCare(programEncounter, formElementGroup) {
            return formElementGroup.formElements.map(fe=>{
                let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
                statusBuilder.show().when.valueInEncounter("Died during antenatal period").is.yes.and
                    .when.valueInEncounter("No of weeks of pregnancy").is.greaterThanOrEqualTo(6).and
                    .when.valueInEncounter("Did she seek care").is.no;
                return statusBuilder.build();
            })
        }
    viiiAbortionRelatedDeath(programEncounter, formElementGroup) {
            return formElementGroup.formElements.map(fe=>{
                let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
                statusBuilder.show().when.valueInEncounter("Died during antenatal period").is.yes;
                return statusBuilder.build();
            })
        }

    moduleIii(programEncounter, formElementGroup) {
            return formElementGroup.formElements.map(fe=>{
                let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
                statusBuilder.show().when.valueInEncounter("Died during antenatal period").is.no;
                return statusBuilder.build();
            })
        }

    outcomeOfTheDelivery(programEncounter, formElementGroup) {
            return formElementGroup.formElements.map(fe=>{
                let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
                statusBuilder.show().when.valueInEncounter("Died during antenatal period").is.no;
                return statusBuilder.build();
            })
        }
    xPostNatalPeriod(programEncounter, formElementGroup) {
                return formElementGroup.formElements.map(fe=>{
                    let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
                    statusBuilder.show().when.valueInEncounter("Died during antenatal period").is.no;
                    return statusBuilder.build();
                })
            }
    problemsFollowingDelivery(programEncounter, formElementGroup) {
                return formElementGroup.formElements.map(fe=>{
                    let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
                    statusBuilder.show().when.valueInEncounter("Died during antenatal period").is.no.and
                        .when.valueInEncounter("Any problem following delivery").is.yes;
                    return statusBuilder.build();
                })
            }

    postnatalCheckups(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe=>{
            let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
            statusBuilder.show().when.valueInEncounter("Died during antenatal period").is.no;
            return statusBuilder.build();
        })
    }





    @WithStatusBuilder
    viiDeathDuringAntenatalPeriod([programEncounter, formElement], statusBuilder) {
            statusBuilder.show().when.valueInEncounter("No of weeks of pregnancy").is.greaterThanOrEqualTo(6);
            return statusBuilder.build();
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
        statusBuilder.show().when.valueInEncounter("Type of abortion").containsAnswerConceptName("Spontaneous");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    viii4IfTheAbortionWasSpontaneousWhereWasTheAbortionCompleted([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Type of abortion").containsAnswerConceptName("Spontaneous");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    viii4IfOtherWhereWasTheAbortionCompleted([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Where was the abortion completed").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    viii5IfTheAbortionWasInducedHowWasItInduced([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Type of abortion").containsAnswerConceptName("Induced");
        return statusBuilder.build();
    }
    @WithStatusBuilder
    viii7IfTheAbortionWasInducedWhoPerformedTheAbortion([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Type of abortion").containsAnswerConceptName("Induced");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    viii6IfTheAbortionWasInducedWhereDidSheHaveTheAbortion([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Type of abortion").containsAnswerConceptName("Induced");
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
        statusBuilder.show().when.valueInEncounter("Type of abortion").containsAnswerConceptName("Induced");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    viii8BDescribeTheReasonForInducingTheAbortion([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Type of abortion").containsAnswerConceptName("Induced");
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

    @WithStatusBuilder
    ix18IfYesPleaseDescribTheDelayInInitiatingTreatment([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Delay in initiating treatment 3").containsAnswerConceptName("Yes");
        return statusBuilder.build();
    }
    //Section X

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
    xIfOtherPleaseDescribeTheTreatmentProvidedAtTheHealthFacility([programEncounter, formElement], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Treatment in hospital").containsAnswerConceptName("Other");
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

    xReferralFromHomeVillage(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe=>{
            let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
            statusBuilder.show().when.valueInEncounter("Did she seek treatment").is.yes
                .or.when.valueInEncounter("Referral attended").yes;
            return statusBuilder.build();
        })
    }

    xReferralFormFromFacility1(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe=>{
            let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
            statusBuilder.show().when.valueInEncounter("Did she seek treatment").is.yes
                .or.when.valueInEncounter("Referral attended").yes;
            return statusBuilder.build();
        })
    }
    xReferralFormFromFacility2(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe=>{
            let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
            statusBuilder.show().when.valueInEncounter("Did she seek treatment").is.yes
                .or.when.valueInEncounter("Referral attended").yes;
            return statusBuilder.build();
        })
    }
    xReferralFormFromFacility3(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe=>{
            let statusBuilder = new FormElementStatusBuilder({formElement: fe, programEncounter: programEncounter});
            statusBuilder.show().when.valueInEncounter("Did she seek treatment").is.yes
                .or.when.valueInEncounter("Referral attended").yes;
            return statusBuilder.build();
        })
    }


    static exec(programEncounter, formElementGroup, today) {


        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new CbmdrViewFilter(), programEncounter, formElementGroup, today);
    }
}


module.exports = {CbmdrViewFilter};