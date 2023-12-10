import { getAverage, getMedian, sortArray } from "./utils";

let refino = 10;
let fluorite = 0;
let crystal = 0;
const upgradeToElevenChance = 0.004;
const upgradeToTwelveChanceWithHammer = 0.021;
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
            } else if (chance <= downgradeToElevenChance) {
                refino = 10;
                getEleven();
            }
        }
    }
}

for (let i = 0; i < 1000000; i++) {
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


const numeroLimite = 2500;
const valoresAcimaDoLimite = fluoriteValues.filter(valor => valor > numeroLimite);
const porcentagemAcimaDoLimite = (valoresAcimaDoLimite.length / fluoriteValues.length) * 100;
console.log(porcentagemAcimaDoLimite)