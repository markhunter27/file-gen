const padToSix = number => number <= 999999 ? `00000${number}`.slice(-6) : number;

const ninoPrefixes = ['PT', 'PU', 'PV', 'PW', 'PX'];
const ninoSuffixes = ['A', 'B', 'C', 'D'];
let ninoCounter = 999999, prefixPointer = 0, suffixPointer = 0;

const _incNinoCounters = () => {
    if (ninoCounter >= 999999){
        if(suffixPointer === 3) {
            suffixPointer = 0;
            prefixPointer++;
        } else {
            suffixPointer++;
        }
        ninoCounter = 0;
    } else {
        ninoCounter++;
    }
    return ninoSuffixes[suffixPointer];
};

const nextNino = () => {
    const res = `${ninoPrefixes[prefixPointer]}${padToSix(ninoCounter)}${ninoSuffixes[suffixPointer]}`;
    _incNinoCounters();
    return res;
};

module.exports.nextNino = nextNino;
