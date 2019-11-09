const fs = require('fs');
// const { createSingleScenarioFixture } = require('./fixtureFactory.js');

const buildPrinter = function (fileName) {
  //  const MAX_LIM = 1e6;
    const bufferWaterMarkBytes = 1000000;
    const fil = fs.createWriteStream(fileName, { highWaterMark: bufferWaterMarkBytes });
   // let i = 0, lastDrain = 0;

    // const printer = function (callback) {
    //
    //     let bufferBelowWaterMark = true;
    //
    //     while (i < MAX_LIM && bufferBelowWaterMark) {
    //         const content = createSingleScenarioFixture(2, {isPartnerAddressMatched : false}).map(arrayEntry => `${arrayEntry}\n`).join('');
    //
    //         if (i === (MAX_LIM - 1)){
    //             fil.write(content, 'UTF-8', callback);
    //         } else {
    //             bufferBelowWaterMark = fil.write(content, 'UTF-8');
    //         }
    //         i++;
    //     }
    //
    //     // If iteration not complete on loop fallout - must have hit high mater mark - wait for buffer to drain and then re-start
    //     if (i < MAX_LIM) {
    //         fil.once('drain', () => {
    //             console.log("Draining at " + i + ", interval " + (i-lastDrain));
    //             lastDrain = i;
    //             printer(callback);
    //         });
    //     }
    // };

    const print = function (fixtureArray, callback, start = 0, lastDrain = 0) {

        let bufferBelowWaterMark = true, i = start;

        if (i===0)
            fil.write('Header goes here\n', 'UTF-8');

        while (i < fixtureArray.length && bufferBelowWaterMark) {

            const content = `${fixtureArray[i]}\n`;
            if (i === (fixtureArray.length - 1)){
                fil.write(content, 'UTF-8');
                fil.write('Footer goes here\n', 'UTF-8', callback);
            } else {
                bufferBelowWaterMark = fil.write(content, 'UTF-8');
            }
            i++;
        }

        // If iteration not complete on loop fallout - must have hit high mater mark - wait for buffer to drain and then re-start
        if (i < fixtureArray.length) {
            fil.once('drain', () => {
                // console.log("Draining at " + i + ", interval " + (i-lastDrain));
                lastDrain = i;
                print(fixtureArray, callback, i, lastDrain);  // enable tail call optimise
            });
        }
    };

    return print;
};

// consider pipeline & async await
// https://nodejs.org/es/docs/guides/backpressuring-in-streams/

module.exports = {
    print : buildPrinter('fixtureFile'),
};
