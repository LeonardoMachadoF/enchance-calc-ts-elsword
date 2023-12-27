"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showInfo = exports.getPercentAboveXInFluorite = exports.getAverage = exports.getMedian = exports.sortArray = void 0;
const EServer_1 = require("./enums/EServer");
const sortArray = (arr) => ([...arr].sort((a, b) => a - b));
exports.sortArray = sortArray;
function getMedian(arr) {
    const sortedArray = (0, exports.sortArray)(arr);
    const middleIndex = Math.floor(sortedArray.length / 2);
    if (sortedArray.length % 2 === 0) {
        return (sortedArray[middleIndex - 1] + sortedArray[middleIndex]) / 2;
    }
    else {
        return sortedArray[middleIndex];
    }
}
exports.getMedian = getMedian;
function getAverage(arr) {
    const sum = arr.reduce((acc, value) => acc + value, 0);
    const average = sum / arr.length;
    return average;
}
exports.getAverage = getAverage;
function getPercentAboveXInFluorite(fluoriteValues, nLimit) {
    const valoresAcimaDoLimite = fluoriteValues.filter(valor => valor > nLimit);
    const porcentagemAcimaDoLimite = (valoresAcimaDoLimite.length / fluoriteValues.length) * 100;
    return porcentagemAcimaDoLimite;
}
exports.getPercentAboveXInFluorite = getPercentAboveXInFluorite;
function showInfo({ data, numberOfCases, limit }) {
    const fluoriteValues = data.map(item => item.fluorite);
    const blessedValues = data.map(item => item.blessed);
    const crystalValues = data.map(item => item.crystal);
    console.log(EServer_1.EServer.OFFICIAL ? "SERVER OFICIAL" : "SERVER PIRATA");
    console.log("Mediana (fluorite): " + getMedian(fluoriteValues).toFixed());
    console.log("Média (fluorite): " + getAverage(fluoriteValues).toFixed());
    console.log("Mediana (crystal): " + getMedian(crystalValues).toFixed());
    console.log("Média (crystal): " + getAverage(crystalValues).toFixed());
    console.log("Mediana (blessed): " + getMedian(blessedValues).toFixed());
    console.log("Média (blessed): " + getAverage(blessedValues).toFixed());
    const sortedArray = (0, exports.sortArray)(fluoriteValues);
    const minValue = sortedArray[0];
    const maxValue = sortedArray[sortedArray.length - 1];
    console.log('Minimo:', minValue);
    console.log("Máximo:", maxValue);
    console.log("Numero de simunações:", numberOfCases);
    console.log(`Gastaram mais do que ${limit} fluoritas (em %): ` + getPercentAboveXInFluorite(fluoriteValues, limit || 0).toFixed(2));
}
exports.showInfo = showInfo;
//# sourceMappingURL=utils.js.map