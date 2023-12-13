"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upgrade = void 0;
const EServer_1 = require("./enums/EServer");
let upgradeToNineChance = 0.021;
let upgradeToTenChance = 0.0105;
let upgradeToElevenChance = 0.907;
let upgradeToTwelveChance = 0.0105;
const destroyToNineChance = 0.2;
const destroyToTenChance = 0.25;
const destroyToElevenChance = 0.353;
const destroyToTwelveChance = 0.25;
const downgradeToElevenChance = 0.27;
const getNine = (props) => {
    if (props.hammerByEnhanceChance.nine) {
        upgradeToNineChance = upgradeToNineChance * 2;
    }
    while (props.enhance.initial === 8) {
        props.resources.fluorite++;
        const chance = Math.random();
        if (chance <= upgradeToNineChance) {
            props.enhance.initial = 9;
            props.allChances.nine.push({ fluorite: props.resources.fluorite, blessedScroll: props.resources.blessedScroll, crystal: props.resources.crystal });
        }
        else if (chance <= upgradeToNineChance + destroyToNineChance && props.server === EServer_1.EServer.OFFICIAL) {
            props.resources.blessedScroll++;
        }
    }
};
const getTen = (props) => {
    if (props.hammerByEnhanceChance.ten) {
        upgradeToTenChance = upgradeToTenChance * 2;
    }
    while (props.enhance.initial === 9) {
        props.resources.fluorite++;
        const chance = Math.random();
        if (chance <= upgradeToTenChance) {
            props.enhance.initial = 10;
            props.allChances.ten.push({ fluorite: props.resources.fluorite, blessedScroll: props.resources.blessedScroll, crystal: props.resources.crystal });
        }
        else if (chance <= upgradeToTenChance + destroyToTenChance && props.server === EServer_1.EServer.OFFICIAL) {
            props.resources.blessedScroll++;
        }
    }
};
function getEleven(props) {
    if (props.hammerByEnhanceChance.eleven) {
        upgradeToElevenChance = upgradeToElevenChance * 2;
    }
    while (props.enhance.initial === 10) {
        props.resources.fluorite++;
        const chance = Math.random();
        if (chance <= upgradeToElevenChance) {
            props.enhance.initial = 11;
            props.allChances.eleven.push({ fluorite: props.resources.fluorite, crystal: 0, blessedScroll: props.resources.blessedScroll });
        }
        else if (chance <= upgradeToElevenChance + destroyToElevenChance && props.server === EServer_1.EServer.OFFICIAL) {
            props.resources.blessedScroll++;
        }
    }
    return props;
}
function getTwelve(props) {
    while (props.enhance.initial < props.enhance.final) {
        if (props.enhance.initial === 10) {
            getEleven(props);
        }
        else {
            if (props.hammerByEnhanceChance.twelve) {
                upgradeToTwelveChance = upgradeToTwelveChance * 2;
            }
            props.resources.crystal++;
            const chance = Math.random();
            if (chance <= upgradeToTwelveChance) {
                props.enhance.initial = 12;
                props.allChances.twelve.push({ fluorite: props.resources.fluorite, crystal: props.resources.crystal, blessedScroll: props.resources.blessedScroll });
            }
            else if (chance <= downgradeToElevenChance + upgradeToTwelveChance) {
                props.enhance.initial = 10;
            }
            else if (chance <= downgradeToElevenChance + upgradeToElevenChance + destroyToTwelveChance && props.server === EServer_1.EServer.OFFICIAL) {
                props.resources.blessedScroll++;
            }
        }
    }
}
function upgrade(props) {
    const upgradeOptions = {
        nine: getNine(props),
        ten: getTen(props),
        eleven: getEleven(props),
        twelve: getTwelve(props)
    };
    for (let i = 0; i < props.numberOfCases; i++) {
        props.enhance.initial = 10;
        props.resources.fluorite = 0;
        props.resources.crystal = 0;
        props.resources.blessedScroll = 0;
        upgradeOptions[props.to];
    }
    console.log(props.allChances.eleven);
}
exports.upgrade = upgrade;
//     const fluoriteValues = allChances.eleven.map(item => item.fluorite);
//     const crystalValues = allChances.eleven.map(item => item.crystal);
//     const blessedScrollValues = allChances.eleven.map(item => item.blessedScroll);
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
//     console.log(`Gastaram mais do que ${limit} fluoritas (em %): ` + getPercentAboveXInFluorite(fluoriteValues, limit || 0).toFixed(1));
// console.log(allChances)
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