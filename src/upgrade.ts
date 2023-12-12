import { EServer } from "./enums/EServer";
import { getAverage, getMedian, getPercentAboveXInFluorite, sortArray } from "./utils";

interface InfoDTO {
    fluorite: number,
    crystal: number,
    blessedScroll: number
}

interface UpgradeInfo {
    server: EServer,
    enhance: {
        initial: number,
        final: number
    }
    allChances: {
        nine: InfoDTO[],
        ten: InfoDTO[],
        eleven: InfoDTO[],
        twelve: InfoDTO[]
    },
    resources: {
        fluorite: number,
        crystal: number,
        blessedScroll: number
    },
    hammerByEnhanceChance: {
        nine: boolean,
        ten: boolean,
        eleven: boolean,
        twelve: boolean
    },
    numberOfCases: number,
    limit?: number
}

let upgradeToNineChance = 0.021;
let upgradeToTenChance = 0.0105;
let upgradeToElevenChance = 0.007;
let upgradeToTwelveChance = 0.0105;
const destroyToNineChance = 0.2;
const destroyToTenChance = 0.25;
const destroyToElevenChance = 0.353;
const destroyToTwelveChance = 0.25;
const downgradeToElevenChance = 0.27;

function getEleven({ server, enhance, allChances, resources, hammerByEnhanceChance }: UpgradeInfo) {
    if (hammerByEnhanceChance.eleven) {
        upgradeToElevenChance = upgradeToElevenChance * 2;
    }
    while (enhance.initial === 10) {
        resources.fluorite++;
        const chance = Math.random();
        if (chance <= upgradeToElevenChance) {
            enhance.initial = 11;
            allChances.eleven.push({ fluorite: resources.fluorite, crystal: 0, blessedScroll: resources.blessedScroll });
        } else if (chance <= upgradeToElevenChance + destroyToElevenChance && server === EServer.OFFICIAL) {
            resources.blessedScroll++;
        }
    }
}

export function upgrade({ server, enhance, allChances, resources, hammerByEnhanceChance, numberOfCases, limit }: UpgradeInfo) {
    while (enhance.initial < enhance.final) {
        if (enhance.initial === 10) {
            getEleven({ server, enhance, allChances, resources, hammerByEnhanceChance, numberOfCases });
        } else {
            if (hammerByEnhanceChance.twelve) {
                upgradeToTwelveChance = upgradeToTwelveChance * 2;
            }

            resources.crystal++;
            const chance = Math.random();
            if (chance <= upgradeToTwelveChance) {
                enhance.initial = 12;
                allChances.twelve.push({ fluorite: resources.fluorite, crystal: resources.crystal, blessedScroll: resources.blessedScroll });
            } else if (chance <= downgradeToElevenChance + upgradeToTwelveChance) {
                enhance.initial = 10;
            } else if (chance <= downgradeToElevenChance + upgradeToElevenChance + destroyToTwelveChance && server === EServer.OFFICIAL) {
                resources.blessedScroll++;
            }
        }
    }

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
    console.log(allChances)
}




// const upgradeToNineChance = 0.042;
// const upgradeToTenChance = 0.021;
// const upgradeToElevenChance = 0.007;
// const upgradeToTwelveChanceWithHammer = 0.021;
// const destroyToNineChance = 0.2;
// const destroyToTenChance = 0.25;
// const destroyToElevenChance = 0.353;
// const destroyToTwelveChance = 0.25;
// const downgradeToElevenChance = 0.27;