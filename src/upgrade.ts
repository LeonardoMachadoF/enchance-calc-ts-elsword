import { enhanceItem } from "./enhanceItem";
import { UpgradeInfo } from "./types/UpgradeInfo";
import { UpgradeResultInfo } from "./types/UpgradeReturnDTO";

const destroyToNineChance = 0.2;
const destroyToTenChance = 0.25;
const destroyToElevenChance = 0.353;
const destroyToTwelveChance = 0.25;
const destroyToThirteenChance = 0.29;
const downgradeToElevenChance = 0.27;
const downgradeToThirteenChance = 0.27;
let upgradeToNineChance = 0.021;
let upgradeToTenChance = 0.0105;
let upgradeToElevenChance = 0.007;
let upgradeToTwelveChance = 0.0105;
let upgradeToThirteenChance = 0.0105;


export function enhance(props: UpgradeInfo) {
    const options = {
        9: {
            to: 'nine',
            upgradeChance: upgradeToNineChance,
            destroyChance: destroyToNineChance,
            downgradeChance: 0
        },
        10: {
            to: 'ten',
            upgradeChance: upgradeToTenChance,
            destroyChance: destroyToTenChance,
            downgradeChance: 0
        },
        11: {
            to: 'eleven',
            upgradeChance: upgradeToElevenChance,
            destroyChance: destroyToElevenChance,
            downgradeChance: 0
        },
        12: {
            to: 'twelve',
            upgradeChance: upgradeToTwelveChance,
            destroyChance: destroyToTwelveChance,
            downgradeChance: downgradeToElevenChance
        },
        13: {
            to: 'thirteen',
            upgradeChance: upgradeToThirteenChance,
            destroyChance: destroyToThirteenChance,
            downgradeChance: downgradeToThirteenChance
        }
    }

    console.time('tempoEnhanceItem');
    for (let i = 0; i < props.numberOfSimulations; i++) {
        props.enhance.now = props.enhance.initial;
        enhanceItem({
            props,
            options,
            caso: i
        })
    }
    console.timeEnd('tempoEnhanceItem');

    console.time('tempoEnhanceItemCalculateTotals');
    function calculateTotals(chances: UpgradeResultInfo) {
        const caseSummaries = [];

        for (let i = 0; i < props.numberOfSimulations; i++) {
            const data = chances.nine.concat(chances.ten).concat(chances.eleven).concat(chances.twelve).filter(item => item.case === i);
            const fluoriteTotal = data.reduce((total, item) => total + item.fluorite, 0);
            const blessedTotal = data.reduce((total, item) => total + item.blessedScroll, 0);
            const crystalTotal = data.reduce((total, item) => total + item.crystal, 0);

            caseSummaries.push({ case: i, fluorite: fluoriteTotal, blessedScroll: blessedTotal, crystal: crystalTotal });
        }

        return caseSummaries;
    }
    console.timeEnd('tempoEnhanceItemCalculateTotals');

    return calculateTotals(props.allChances);
}