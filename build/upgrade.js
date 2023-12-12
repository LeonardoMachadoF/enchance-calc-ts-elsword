"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upgrade = void 0;
const EServer_1 = require("./enums/EServer");
const utils_1 = require("./utils");
let upgradeToNineChance = 0.021;
let upgradeToTenChance = 0.0105;
let upgradeToElevenChance = 0.17;
let upgradeToTwelveChance = 0.0105;
const destroyToNineChance = 0.2;
const destroyToTenChance = 0.25;
const destroyToElevenChance = 0.353;
const destroyToTwelveChance = 0.25;
const downgradeToElevenChance = 0.27;
function getEleven({ server, enhance, allChances, resources, hammerByEnhanceChance }) {
    if (hammerByEnhanceChance.eleven) {
        upgradeToElevenChance = upgradeToElevenChance * 2;
    }
    while (enhance.initial === 10) {
        resources.fluorite++;
        const chance = Math.random();
        if (chance <= upgradeToElevenChance) {
            enhance.initial = 11;
            allChances.eleven.push({ fluorite: resources.fluorite, crystal: resources.crystal, blessedScroll: resources.blessedScroll });
        }
        else if (chance <= upgradeToElevenChance + destroyToElevenChance && server === EServer_1.EServer.OFFICIAL) {
            resources.blessedScroll++;
        }
    }
}
function upgrade({ server, enhance, allChances, resources, hammerByEnhanceChance, numberOfCases, limit }) {
    while (enhance.initial < enhance.final) {
        if (enhance.initial === 10) {
            getEleven({ server, enhance, allChances, resources, hammerByEnhanceChance, numberOfCases });
        }
        else {
            if (hammerByEnhanceChance.twelve) {
                upgradeToTwelveChance = upgradeToTwelveChance * 2;
            }
            resources.crystal++;
            const chance = Math.random();
            if (chance <= upgradeToTwelveChance) {
                enhance.initial = 12;
                allChances.twelve.push({ fluorite: resources.fluorite, crystal: resources.crystal, blessedScroll: resources.blessedScroll });
            }
            else if (chance <= downgradeToElevenChance + upgradeToTwelveChance) {
                enhance.initial = 10;
            }
            else if (chance <= downgradeToElevenChance + upgradeToElevenChance + destroyToTwelveChance && server === EServer_1.EServer.OFFICIAL) {
                resources.blessedScroll++;
            }
        }
    }
    const fluoriteValues = allChances.twelve.map(item => item.fluorite);
    const crystalValues = allChances.twelve.map(item => item.crystal);
    const blessedScrollValues = allChances.twelve.map(item => item.blessedScroll);
    console.log(EServer_1.EServer.OFFICIAL ? "SERVER OFICIAL" : "SERVER PIRATA");
    console.log("Mediana (fluorite): " + (0, utils_1.getMedian)(fluoriteValues).toFixed());
    console.log("Média (fluorite): " + (0, utils_1.getAverage)(fluoriteValues).toFixed());
    console.log("Mediana (crystal): " + (0, utils_1.getMedian)(crystalValues).toFixed());
    console.log("Média (crystal): " + (0, utils_1.getAverage)(crystalValues).toFixed());
    console.log("Mediana (blessed): " + (0, utils_1.getMedian)(blessedScrollValues).toFixed());
    console.log("Média (blessed): " + (0, utils_1.getAverage)(blessedScrollValues).toFixed());
    const sortedArray = (0, utils_1.sortArray)(fluoriteValues);
    const minValue = sortedArray[0];
    const maxValue = sortedArray[sortedArray.length - 1];
    console.log('Minimo:', minValue);
    console.log("Máximo:", maxValue);
    console.log("Numero de simunações:", numberOfCases);
    console.log(`Gastaram mais do que ${limit} fluoritas (em %): ` + (0, utils_1.getPercentAboveXInFluorite)(fluoriteValues, limit || 0).toFixed(1));
}
exports.upgrade = upgrade;
// const upgradeToNineChance = 0.042;
// const upgradeToTenChance = 0.021;
// const upgradeToElevenChance = 0.007;
// const upgradeToTwelveChanceWithHammer = 0.021;
// const destroyToNineChance = 0.2;
// const destroyToTenChance = 0.25;
// const destroyToElevenChance = 0.353;
// const destroyToTwelveChance = 0.25;
// const downgradeToElevenChance = 0.27;
//# sourceMappingURL=upgrade.js.map