const fixtures = {
    1: {
        type: 'single',
        content: 'scenario 1|random|text|here'
    },
    2: {
        type: 'joint',
        contentMain: 'scenario 2 A|content|in|here',
        contentPartner: 'scenario 2 B|content|in|here'
    },
    3: {
        type: 'single',
        content: 'scenario 3|more|stuff|finally'
    }
};

const fixtureColumnsDandA = {
    NAME: 1,
    NINO: 2,
    ADDRESS_LINE_1: 3
};

const retrieveFixtureTemplate = (fixtureNumber) => {
    if(fixtures.hasOwnProperty(fixtureNumber)){
        const fixtureDefn = fixtures[fixtureNumber];
        switch (fixtureDefn.type){
            case 'joint':
                return [fixtureDefn.contentMain, fixtureDefn.contentPartner];
            default:
                return [fixtureDefn.content];
        }
    } else {
        throw new Error(`Requested fixture number ${fixtureNumber} is not defined in the fixture repository`);
    }
};

module.exports = {
    retrieveFixtureTemplate : retrieveFixtureTemplate,
    fixtureColumnsDandA : fixtureColumnsDandA
};
