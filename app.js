const { print } = require("./src/fixturePrinter.js");
const { fixturePlan } = require('./src/fixturePlan.js');
const { createFixtureFromPlan } = require('./src/fixtureFactory.js');
const { shuffleArray } = require('./src/util/arrayShuffler.js');

const fixtureArray = createFixtureFromPlan(fixturePlan, 20);

console.log("Constructed in memory fixture length", fixtureArray.length);

shuffleArray(fixtureArray);

console.log('Fixture order randomised');

print(fixtureArray, () => { console.log('All done'); });
