import { EServer } from "./enums/EServer";
import { AllChancesToReducer } from "./types/AllChancesToReducer";
import { AllowedRefines } from "./types/AllowedRefines";
import { UpgradeInfo } from "./types/UpgradeInfo";

const destroyToNineChance = 0.2;
const destroyToTenChance = 0.25;
const destroyToElevenChance = 0.353;
const destroyToTwelveChance = 0.25;
const downgradeToElevenChance = 0.27;

let upgradeToNineChance = 0.021;
let upgradeToTenChance = 0.0105;
let upgradeToElevenChance = 0.007;
let upgradeToTwelveChance = 0.0105;

const getNine = (props: UpgradeInfo, caso: number) => {
    if (props.enhance.now! === 8) {
        let upgradeChance = upgradeToNineChance;
        if (props.hammerByEnhanceChance.nine) {
            upgradeChance = upgradeToNineChance * 2;
        }
        while (props.enhance.now === 8) {
            props.resources.fluorite++;
            const chance = Math.random();
            if (chance <= upgradeChance) {
                props.enhance.now = 9;
                props.allChances.nine.push({ fluorite: props.resources.fluorite, blessedScroll: props.resources.blessedScroll, crystal: props.resources.crystal });
                props.resources.blessedScroll = 0;
                props.resources.fluorite = 0;
            } else if (chance <= upgradeChance + destroyToNineChance && props.server === EServer.OFFICIAL) {
                props.resources.blessedScroll++;
            }
        }
    }
}

const getTen = (props: UpgradeInfo, caso: number) => {
    if (props.enhance.now! < 9) {
        getNine(props, caso);
    }

    let upgradeChance = upgradeToTenChance;
    if (props.hammerByEnhanceChance.ten) {
        upgradeChance = upgradeToTenChance * 2;
    }
    while (props.enhance.now === 9) {
        props.resources.fluorite++;
        const chance = Math.random();
        if (chance <= upgradeChance) {
            props.enhance.now = 10;
            props.allChances.ten.push({ fluorite: props.resources.fluorite, blessedScroll: props.resources.blessedScroll, crystal: props.resources.crystal });
            props.resources.blessedScroll = 0;
            props.resources.fluorite = 0;
        } else if (chance <= upgradeChance + destroyToTenChance && props.server === EServer.OFFICIAL) {
            props.resources.blessedScroll++;
        }
    }
}

function getEleven(props: UpgradeInfo, caso: number) {
    if (props.enhance.now! < 10) {
        getTen(props, caso);
    }

    let upgradeChance = upgradeToElevenChance;
    if (props.hammerByEnhanceChance.eleven) {
        upgradeChance = upgradeToElevenChance * 2;
    }
    while (props.enhance.now === 10) {
        props.resources.fluorite++;
        const chance = Math.random();
        if (chance <= upgradeChance) {
            props.enhance.now = 11;
            props.allChances.eleven.push({ fluorite: props.resources.fluorite, crystal: 0, blessedScroll: props.resources.blessedScroll });

            props.allChancesTo11ReducedPerCase.push({ case: caso, blessedScroll: props.resources.blessedScroll, fluorites: props.resources.fluorite });

            props.resources.blessedScroll = 0;
            props.resources.fluorite = 0;
        } else if (chance <= upgradeChance + destroyToElevenChance && props.server === EServer.OFFICIAL) {
            props.resources.blessedScroll++;
        }
    }
}

function getTwelve(props: UpgradeInfo, caso: number) {
    while (props.enhance.now! < props.enhance.final!) {
        if (props.enhance.now! < 11) {
            getEleven(props, caso);
        } else {
            let upgradeChance = upgradeToElevenChance;
            if (props.hammerByEnhanceChance.twelve) {
                upgradeChance = upgradeToTwelveChance * 2;
            }

            props.resources.crystal++;
            const chance = Math.random();
            if (chance <= upgradeChance) {
                props.enhance.now = 12;
                props.allChances.twelve.push({ fluorite: props.resources.fluorite, crystal: props.resources.crystal, blessedScroll: props.resources.blessedScroll });
                props.resources.blessedScroll = 0;
                props.resources.fluorite = 0;
                props.resources.crystal = 0;
            } else if (chance <= downgradeToElevenChance + upgradeChance) {
                props.enhance.now = 10;
            } else if (chance <= downgradeToElevenChance + upgradeToElevenChance + destroyToTwelveChance && props.server === EServer.OFFICIAL) {
                props.resources.blessedScroll++;
            }
        }
    }
}

export function upgrade(props: UpgradeInfo) {
    const upgradeOptions = {
        9: (caso: number) => getNine(props, caso),
        10: (caso: number) => getTen(props, caso),
        11: (caso: number) => getEleven(props, caso),
        12: (caso: number) => getTwelve(props, caso)
    }

    for (let i = 0; i < props.numberOfCases; i++) {
        props.enhance.now = props.enhance.initial;
        upgradeOptions[props.enhance.final](i);
    }

    function calcularSomaPorCase(chances: AllChancesToReducer[]) {
        const result: { case: number, fluorita: number, blessex: number }[] = [];

        chances.forEach(chance => {
            const existingItem = result.find(item => item.case === chance.case);

            if (existingItem) {
                existingItem.fluorita += chance.fluorites;
                existingItem.blessex += chance.blessedScroll;
            } else {
                result.push({
                    case: chance.case,
                    fluorita: chance.fluorites,
                    blessex: chance.blessedScroll
                });
            }
        });

        return result;
    }

    console.log(calcularSomaPorCase(props.allChancesTo11ReducedPerCase))
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