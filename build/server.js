"use strict";
// import { getAverage, getMedian, getPercentAboveXInFluorite, sortArray } from "./utils";
// import { EServer } from './enums/EServer';
// import { infoToEnhanceProps } from "./types/InfoToEnhanceProps";
// import { upgrade } from "./upgrade";
Object.defineProperty(exports, "__esModule", { value: true });
const EServer_1 = require("./enums/EServer");
const upgrade_1 = require("./upgrade");
// let refino = 10;
// let fluorite = 0;
// let crystal = 0;
// let blessedScroll = 0;
// const upgradeToNineChance = 0.042;
// const upgradeToTenChance = 0.021;
// const upgradeToElevenChance = 0.007;
// const upgradeToTwelveChanceWithHammer = 0.021;
// const destroyToNineChance = 0.2;
// const destroyToTenChance = 0.25;
// const destroyToElevenChance = 0.353;
// const destroyToTwelveChance = 0.25;
// const downgradeToElevenChance = 0.27;
// const allChancesTo09: { fluorite: number, blessedScroll: number }[] = [];
// const allChancesTo10: { fluorite: number, blessedScroll: number }[] = [];
// const allChancesTo11: { fluorite: number, blessedScroll: number }[] = [];
// const allChancesTo12: { fluorite: number, crystal: number, blessedScroll: number }[] = [];
// const getNine: (server: EServer) => void = (server) => {
//     while (refino === 8) {
//         fluorite++;
//         const chance = Math.random();
//         if (chance <= upgradeToNineChance) {
//             refino = 10;
//             allChancesTo09.push({ fluorite, blessedScroll });
//         } else if (chance <= upgradeToNineChance + destroyToNineChance && server === EServer.OFFICIAL) {
//             blessedScroll++;
//         }
//     }
// }
// const getTen: (server: EServer) => void = (server) => {
//     while (refino === 9) {
//         fluorite++;
//         const chance = Math.random();
//         if (chance <= upgradeToTenChance) {
//             refino = 10;
//             allChancesTo10.push({ fluorite, blessedScroll });
//         } else if (chance <= upgradeToTenChance + destroyToTenChance && server === EServer.OFFICIAL) {
//             blessedScroll++;
//         }
//     }
// }
// const getEleven: (server: EServer) => void = (server) => {
//     while (refino === 10) {
//         fluorite++;
//         const chance = Math.random();
//         if (chance <= upgradeToElevenChance) {
//             refino = 11;
//             allChancesTo11.push({ fluorite, blessedScroll });
//         } else if (chance <= upgradeToElevenChance + destroyToElevenChance && server === EServer.OFFICIAL) {
//             blessedScroll++;
//         }
//     }
// }
// const getTwelve: (server: EServer) => void = (server) => {
//     while (refino < 12) {
//         if (refino === 10) {
//             getEleven(server);
//         } else {
//             crystal++;
//             const chance = Math.random();
//             if (chance <= upgradeToTwelveChanceWithHammer) {
//                 refino = 12;
//                 allChancesTo12.push({ fluorite, crystal, blessedScroll });
//             } else if (chance <= downgradeToElevenChance + upgradeToTwelveChanceWithHammer) {
//                 refino = 10;
//                 getEleven(server);
//             } else if (chance <= downgradeToElevenChance + upgradeToElevenChance + destroyToTwelveChance && server === EServer.OFFICIAL) {
//                 blessedScroll++;
//             }
//         }
//     }
// }
// const showUpgradeToTwelveInfoWithNSimulations = ({ server, numberOfCases, nLimitFluorite }: infoToEnhanceProps) => {
//     for (let i = 0; i < numberOfCases; i++) {
//         refino = 10;
//         fluorite = 0;
//         crystal = 0;
//         blessedScroll = 0;
//         getTwelve(server);
//     }
//     const fluoriteValues = allChancesTo12.map(item => item.fluorite);
//     const crystalValues = allChancesTo12.map(item => item.crystal);
//     const blessedScrollValues = allChancesTo12.map(item => item.blessedScroll);
//     console.log(EServer.OFFICIAL ? "SERVER OFICIAL" : "SERVER PIRATA")
//     console.log("Mediana (fluorite): " + getMedian(fluoriteValues).toFixed());
//     console.log("Média (fluorite): " + getAverage(fluoriteValues).toFixed());
//     console.log("Mediana (crystal): " + getMedian(crystalValues).toFixed());
//     console.log("Média (crystal): " + getAverage(crystalValues).toFixed());
//     console.log("Mediana (blessed): " + getMedian(blessedScrollValues).toFixed());
//     console.log("Média (blessed): " + getAverage(blessedScrollValues).toFixed());
//     const sortedArray = sortArray(fluoriteValues);
//     const minValue = sortedArray[0];
//     const maxValue = sortedArray[sortedArray.length - 1];
//     console.log('Minimo:', minValue);
//     console.log("Máximo:", maxValue);
//     console.log("Numero de simunações:", numberOfCases);
//     console.log(`Gastaram mais do que ${nLimitFluorite} fluoritas (em %): ` + getPercentAboveXInFluorite(fluoriteValues, nLimitFluorite).toFixed(1));
// }
// const showUpgradeToEleven = ({ server, numberOfCases, nLimitFluorite }: infoToEnhanceProps) => {
//     for (let i = 0; i < numberOfCases; i++) {
//         refino = 10;
//         fluorite = 0;
//         crystal = 0;
//         blessedScroll = 0;
//         getEleven(server);
//     }
//     const fluoriteValues = allChancesTo11.map(item => item.fluorite);
//     const blessedScrollValues = allChancesTo11.map(item => item.blessedScroll);
//     console.log("Mediana (fluorite): " + getMedian(fluoriteValues).toFixed());
//     console.log("Média (fluorite): " + getAverage(fluoriteValues).toFixed());
//     console.log("Mediana (blessed): " + getMedian(blessedScrollValues).toFixed());
//     console.log("Média (blessed): " + getAverage(blessedScrollValues).toFixed());
//     console.log(`Gastaram mais do que ${nLimitFluorite} fluoritas (em %): ` + getPercentAboveXInFluorite(fluoriteValues, nLimitFluorite).toFixed());
// }
// const showUpgradeToNine = ({ server, numberOfCases, nLimitFluorite }: infoToEnhanceProps) => {
//     for (let i = 0; i < numberOfCases; i++) {
//         refino = 8;
//         fluorite = 0;
//         crystal = 0;
//         blessedScroll = 0;
//         getNine(server);
//     }
//     const fluoriteValues = allChancesTo09.map(item => item.fluorite);
//     const blessedScrollValues = allChancesTo09.map(item => item.blessedScroll);
//     console.log(allChancesTo09)
//     console.log("Mediana (fluorite): " + getMedian(fluoriteValues).toFixed());
//     console.log("Média (fluorite): " + getAverage(fluoriteValues).toFixed());
//     console.log("Mediana (blessed): " + getMedian(blessedScrollValues).toFixed());
//     console.log("Média (blessed): " + getAverage(blessedScrollValues).toFixed());
//     console.log(`Gastaram mais do que ${nLimitFluorite} fluoritas (em %): ` + getPercentAboveXInFluorite(fluoriteValues, nLimitFluorite).toFixed());
// }
// const showUpgradeToTen = ({ server, numberOfCases, nLimitFluorite }: infoToEnhanceProps) => {
//     for (let i = 0; i < numberOfCases; i++) {
//         refino = 9;
//         fluorite = 0;
//         crystal = 0;
//         blessedScroll = 0;
//         getTen(server);
//     }
//     const fluoriteValues = allChancesTo10.map(item => item.fluorite);
//     const blessedScrollValues = allChancesTo10.map(item => item.blessedScroll);
//     console.log(allChancesTo10)
//     console.log("Mediana (fluorite): " + getMedian(fluoriteValues).toFixed());
//     console.log("Média (fluorite): " + getAverage(fluoriteValues).toFixed());
//     console.log("Mediana (blessed): " + getMedian(blessedScrollValues).toFixed());
//     console.log("Média (blessed): " + getAverage(blessedScrollValues).toFixed());
//     console.log(`Gastaram mais do que ${nLimitFluorite} fluoritas (em %): ` + getPercentAboveXInFluorite(fluoriteValues, nLimitFluorite).toFixed());
// }
// // showUpgradeToEleven({
// //     server: EServer.OFFICIAL,
// //     numberOfCases: 1000,
// //     nLimitFluorite: 250
// // });
// showUpgradeToTen({
//     server: EServer.OFFICIAL,
//     numberOfCases: 100000,
//     nLimitFluorite: 2720
// });
let refino = 10;
let fluorite = 0;
let crystal = 0;
let blessedScroll = 0;
let numberOfCases = 100;
const limit = 2000;
const allChancesTo09 = [];
const allChancesTo10 = [];
const allChancesTo11 = [];
const allChancesTo12 = [];
(0, upgrade_1.upgrade)({
    server: EServer_1.EServer.OFFICIAL,
    enhance: {
        initial: 10,
        final: 11
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
        ten: false,
        eleven: false,
        twelve: true
    },
    numberOfCases,
    limit
});
//# sourceMappingURL=server.js.map