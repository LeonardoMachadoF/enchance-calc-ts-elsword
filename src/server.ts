import { EServer } from "./enums/EServer";
import { AllowedRefines } from "./types/AllowedRefines";
import { InfoDTO } from "./types/InfoDTO";
import { upgrade } from "./upgrade";
import { getAverage, getMedian, getPercentAboveXInFluorite, sortArray } from "./utils";

let refinoInicial: AllowedRefines = 10;
let refinoFinal: AllowedRefines = 11;
let fluorite = 0;
let crystal = 0;
let blessedScroll = 0;
let numberOfCases = 10000;
let limit = 100;
const allChancesTo09: InfoDTO[] = [];
const allChancesTo10: InfoDTO[] = [];
const allChancesTo11: InfoDTO[] = [];
const allChancesTo12: InfoDTO[] = [];

const data = upgrade({
    server: EServer.OFFICIAL,
    enhance: {
        initial: refinoInicial,
        final: refinoFinal
    },
    allChances: {
        nine: allChancesTo09,
        ten: allChancesTo10,
        eleven: allChancesTo11,
        twelve: allChancesTo12
    },
    resources: {
        fluorite,
        crystal,
        blessedScroll
    },
    hammerByEnhanceChance: {
        nine: true,
        ten: true,
        eleven: true,
        twelve: true
    },
    numberOfCases
});

const fluoriteValues = data.map(item => item.fluorite);
const blessedValues = data.map(item => item.blessed);
const crystalValues = data.map(item => item.crystal);

console.log(data)

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
