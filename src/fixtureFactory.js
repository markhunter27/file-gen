const { retrieveFixtureTemplate, fixtureColumnsDandA } = require('./fixtureTemplateRepository.js');
const { nextNino } = require('./util/ninoGenerator.js');

let counter = 0;

const createSingleScenarioFixture = (fixtureNumber, options = {}) => {
    const isAddressMatched = options.hasOwnProperty('isAddressMatched') ? options.isAddressMatched : true;
    const isPartnerAddressMatched = options.hasOwnProperty('isPartnerAddressMatched') ? options.isPartnerAddressMatched : true;
    const fixtureTemplateArray = retrieveFixtureTemplate(fixtureNumber);
    if (fixtureTemplateArray.length > 1){
        return _instantiateJointFixture(fixtureTemplateArray[0], fixtureTemplateArray[1], isAddressMatched, isPartnerAddressMatched);
    } else {
        return _instantiateSingleFixture(fixtureTemplateArray[0], isAddressMatched);
    }
};

const _instantiateSingleFixture = (fixtureString, isAddressMatched) => {
    const fixtureFieldArray = fixtureString.split('|');
    fixtureFieldArray[fixtureColumnsDandA.NAME] = `instantiated name ${counter++} goes here`;
    fixtureFieldArray[fixtureColumnsDandA.NINO] = `instantiated nino ${nextNino()}`;
    fixtureFieldArray[fixtureColumnsDandA.ADDRESS_LINE_1] = `instantiated address line 1 goes here: matched ${isAddressMatched}`;
    return [fixtureFieldArray.join('|')];
};

const _instantiateJointFixture = (fixtureStringMain, fixtureStringPartner, isAddressMatched, isPartnerAddressMatched) => {
    const mainFixtureFieldArray = fixtureStringMain.split('|');
    mainFixtureFieldArray[fixtureColumnsDandA.NAME] = 'instantiated main name goes here';
    mainFixtureFieldArray[fixtureColumnsDandA.NINO] = 'instantiated main nino goes here';
    mainFixtureFieldArray[fixtureColumnsDandA.ADDRESS_LINE_1] = `instantiated main address line 1 goes here: matched ${isAddressMatched}`;
    const partnerFixtureFieldArray = fixtureStringPartner.split('|');
    partnerFixtureFieldArray[fixtureColumnsDandA.NAME] = 'instantiated partner name goes here';
    partnerFixtureFieldArray[fixtureColumnsDandA.NINO] = 'instantiated partner nino goes here';
    partnerFixtureFieldArray[fixtureColumnsDandA.ADDRESS_LINE_1] = `instantiated partner address line 1 goes here: matched ${isPartnerAddressMatched}`;
    return [mainFixtureFieldArray.join('|'), partnerFixtureFieldArray.join('|')];
};

const createFixtureFromPlan = (fixturePlan, approxFileSize) => {

    const fixtureArray = [];
    fixturePlan.forEach(planEntry => {
        const quantity = Math.round(planEntry.percent * (approxFileSize / 100));
        let i = 0;
        while(i < quantity) {
            fixtureArray.push(...createSingleScenarioFixture(planEntry.fixtureNumber, planEntry.options));
            i++;
        }
    });

    return fixtureArray;
};

module.exports = {
    createSingleScenarioFixture : createSingleScenarioFixture,
    createFixtureFromPlan : createFixtureFromPlan
};
