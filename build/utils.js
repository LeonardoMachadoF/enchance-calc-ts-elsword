"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPercentAboveXInFluorite = exports.getAverage = exports.getMedian = exports.sortArray = void 0;
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
//# sourceMappingURL=utils.js.map