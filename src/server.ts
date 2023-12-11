import { getAverage, getMedian, getPercentAboveXInFluorite, sortArray } from "./utils";

let refino = 10;
let fluorite = 0;
let crystal = 0;
const upgradeToElevenChance = 0.004;
const upgradeToTwelveChanceWithHammer = 0.021;
const destroyToElevenChance = 0.353;
const destroyToTwelveChance = 0.25;
const downgradeToElevenChance = 0.27;
const allChancesTo12: { fluorite: number, crystal: number }[] = [];

const getEleven: () => void = () => {
    while (refino === 10) {
        fluorite++;
        if (Math.random() >= upgradeToElevenChance) {
            continue;
        } else {
            refino = 11;
        }
    }
}

const getTwelve: () => void = () => {
    while (refino < 12) {
        if (refino === 10) {
            getEleven();
        } else {
            crystal++;
            const chance = Math.random();
            if (chance <= upgradeToTwelveChanceWithHammer) {
                refino = 12;
                allChancesTo12.push({ fluorite, crystal });
            } else if (chance <= downgradeToElevenChance + upgradeToTwelveChanceWithHammer) {
                refino = 10;
                getEleven();
            }
        }
    }
}

for (let i = 0; i < 100; i++) {
    refino = 10;
    fluorite = 0;
    crystal = 0;
    getTwelve();
}

const fluoriteValues = allChancesTo12.map(item => item.fluorite);
const crystalValues = allChancesTo12.map(item => item.crystal);


console.log("Mediana (fluorite): " + getMedian(fluoriteValues));
console.log("Média (fluorite): " + getAverage(fluoriteValues));
console.log("Mediana (crystal): " + getMedian(crystalValues));
console.log("Média (crystal): " + getAverage(crystalValues));

const sortedArray = sortArray(fluoriteValues);
const minValue = sortedArray[0];
const maxValue = sortedArray[sortedArray.length - 1];

console.log('Minimo:', minValue);
console.log("Máximo:", maxValue);

const nLimitFluorite = 2500;
console.log(`Gastaram mais do que ${nLimitFluorite} fluoritas (em %): ` + getPercentAboveXInFluorite(fluoriteValues, nLimitFluorite));