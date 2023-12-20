import { EServer } from "./enums/EServer";
import { AllowedRefines } from "./types/AllowedRefines";
import { InfoDTO } from "./types/InfoDTO";
import { upgrade } from "./upgrade";
import { getAverage, getMedian } from "./utils";

let refinoInicial = 9;
let refinoFinal: AllowedRefines = 10;
let fluorite = 0;
let crystal = 0;
let blessedScroll = 0;
let numberOfCases = 2;
const allChancesTo09: InfoDTO[] = [];
const allChancesTo10: InfoDTO[] = [];
const allChancesTo11: InfoDTO[] = [];
const allChancesTo12: InfoDTO[] = [];
const allChancesTo11ReducedPerCase: { case: number, fluorites: number, blessedScroll: number }[] = [];

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
        nine: false,
        ten: true,
        eleven: false,
        twelve: true
    },
    numberOfCases
});

// const fluoriteValues = data.map(item => item.fluorite);
// const blessedValues = data.map(item => item.blessed);
console.log(data)