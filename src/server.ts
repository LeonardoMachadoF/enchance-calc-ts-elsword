import { EServer } from "./enums/EServer";
import { AllowedRefines, AllowedRefinesFinal } from "./types/AllowedRefines";
import { upgrade } from "./upgrade";
import { getAverage, getMedian, getPercentAboveXInFluorite, sortArray } from "./utils";

let refinoInicial: AllowedRefines = 10;
let refinoFinal: AllowedRefinesFinal = 12;
let numberOfCases = 3000;
let limit = 100;

const data = upgrade({
    server: EServer.OFFICIAL,
    enhance: {
        initial: refinoInicial,
        final: refinoFinal
    },
    allChances: {
        nine: [],
        ten: [],
        eleven: [],
        twelve: []
    },
    resources: {
        fluorite: 0,
        crystal: 0,
        blessedScroll: 0
    },
    hammerByEnhanceChance: {
        nine: false,
        ten: false,
        eleven: false,
        twelve: true
    },
    numberOfCases
});

const fluoriteValues = data.map(item => item.fluorite);
const blessedValues = data.map(item => item.blessed);
const crystalValues = data.map(item => item.crystal);

console.log(EServer.OFFICIAL ? "SERVER OFICIAL" : "SERVER PIRATA")
console.log("Mediana (fluorite): " + getMedian(fluoriteValues).toFixed());
console.log("Média (fluorite): " + getAverage(fluoriteValues).toFixed());
console.log("Mediana (crystal): " + getMedian(crystalValues).toFixed());
console.log("Média (crystal): " + getAverage(crystalValues).toFixed());
console.log("Mediana (blessed): " + getMedian(blessedValues).toFixed());
console.log("Média (blessed): " + getAverage(blessedValues).toFixed());

const sortedArray = sortArray(fluoriteValues);
const minValue = sortedArray[0];
const maxValue = sortedArray[sortedArray.length - 1];

console.log('Minimo:', minValue);
console.log("Máximo:", maxValue);
console.log("Numero de simunações:", numberOfCases);

console.log(`Gastaram mais do que ${limit} fluoritas (em %): ` + getPercentAboveXInFluorite(fluoriteValues, limit || 0).toFixed(1));
