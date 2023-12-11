import { getAverage, getMedian, getPercentAboveXInFluorite, sortArray } from "./utils";
import { EServer } from './enums/EServer';

let refino = 10;
let fluorite = 0;
let crystal = 0;
let blessedScroll = 0;
const upgradeToElevenChance = 0.007;
const upgradeToTwelveChanceWithHammer = 0.021;
const destroyToElevenChance = 0.353;
const destroyToTwelveChance = 0.25;
const downgradeToElevenChance = 0.27;
const allChancesTo11: { fluorite: number, blessedScroll: number }[] = [];
const allChancesTo12: { fluorite: number, crystal: number, blessedScroll: number }[] = [];

const getEleven: (server: EServer) => void = (server) => {
    while (refino === 10) {
        fluorite++;
        const chance = Math.random();
        if (chance <= upgradeToElevenChance) {
            refino = 11;
            allChancesTo11.push({ fluorite, blessedScroll });
        } else if (chance <= upgradeToElevenChance + destroyToElevenChance && server === EServer.OFFICIAL) {
            blessedScroll++;
        }
    }
}

const getTwelve: (server: EServer) => void = (server) => {
    while (refino < 12) {
        if (refino === 10) {
            getEleven(server);
        } else {
            crystal++;
            const chance = Math.random();
            if (chance <= upgradeToTwelveChanceWithHammer) {
                refino = 12;
                allChancesTo12.push({ fluorite, crystal, blessedScroll });
            } else if (chance <= downgradeToElevenChance + upgradeToTwelveChanceWithHammer) {
                refino = 10;
                getEleven(server);
            } else if (chance <= downgradeToElevenChance + upgradeToElevenChance + destroyToTwelveChance && server === EServer.OFFICIAL) {
                blessedScroll++;
            }
        }
    }
}

interface infoToEnhanceProps {
    numberOfCases: number,
    server: EServer,
    nLimitFluorite: number
}

const showUpgradeToTwelveInfoWithNSimulations = ({ server, numberOfCases, nLimitFluorite }: infoToEnhanceProps) => {
    for (let i = 0; i < numberOfCases; i++) {
        refino = 10;
        fluorite = 0;
        crystal = 0;
        blessedScroll = 0;
        getTwelve(server);
    }

    const fluoriteValues = allChancesTo12.map(item => item.fluorite);
    const crystalValues = allChancesTo12.map(item => item.crystal);
    const blessedScrollValues = allChancesTo12.map(item => item.blessedScroll);

    console.log("Mediana (fluorite): " + getMedian(fluoriteValues).toFixed());
    console.log("Média (fluorite): " + getAverage(fluoriteValues).toFixed());
    console.log("Mediana (crystal): " + getMedian(crystalValues).toFixed());
    console.log("Média (crystal): " + getAverage(crystalValues).toFixed());
    console.log("Mediana (blessed): " + getMedian(blessedScrollValues).toFixed());
    console.log("Média (blessed): " + getAverage(blessedScrollValues).toFixed());

    const sortedArray = sortArray(fluoriteValues);
    const minValue = sortedArray[0];
    const maxValue = sortedArray[sortedArray.length - 1];

    console.log('Minimo:', minValue);
    console.log("Máximo:", maxValue);
    console.log("Numero de simunações:", numberOfCases);

    console.log(`Gastaram mais do que ${nLimitFluorite} fluoritas (em %): ` + getPercentAboveXInFluorite(fluoriteValues, nLimitFluorite).toFixed());
}

const showUpgradeToEleven = ({ server, numberOfCases, nLimitFluorite }: infoToEnhanceProps) => {
    for (let i = 0; i < numberOfCases; i++) {
        refino = 10;
        fluorite = 0;
        crystal = 0;
        blessedScroll = 0;
        getEleven(server);
    }

    const fluoriteValues = allChancesTo11.map(item => item.fluorite);
    const blessedScrollValues = allChancesTo11.map(item => item.blessedScroll);

    console.log("Mediana (fluorite): " + getMedian(fluoriteValues).toFixed());
    console.log("Média (fluorite): " + getAverage(fluoriteValues).toFixed());
    console.log("Mediana (blessed): " + getMedian(blessedScrollValues).toFixed());
    console.log("Média (blessed): " + getAverage(blessedScrollValues).toFixed());
    console.log(`Gastaram mais do que ${nLimitFluorite} fluoritas (em %): ` + getPercentAboveXInFluorite(fluoriteValues, nLimitFluorite).toFixed());
}

// showUpgradeToEleven({
//     server: EServer.PRIVATE,
//     numberOfCases: 1000,
//     nLimitFluorite: 250
// });

showUpgradeToTwelveInfoWithNSimulations({
    server: EServer.PRIVATE,
    numberOfCases: 10000,
    nLimitFluorite: 2500
});