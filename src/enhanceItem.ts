import { EServer } from "./enums/EServer";
import { AllowedRefinesFinal } from "./types/AllowedRefines";
import { OptionType } from "./types/OptionsType";
import { UpgradeInfo } from "./types/UpgradeInfo";

export function enhanceItem({ props, options, caso }: { props: UpgradeInfo, options: OptionType, caso: number }) {
    while (props.enhance.now! < props.enhance.final) {
        let upgradeChance = options[props.enhance.now! + 1 as AllowedRefinesFinal].upgradeChance;
        let downgradeChance = options[props.enhance.now! + 1 as AllowedRefinesFinal].downgradeChance;
        let destroyChance = options[props.enhance.now! + 1 as AllowedRefinesFinal].destroyChance;
        let hammer = props.hammerByEnhance[options[props.enhance.now! + 1 as AllowedRefinesFinal].to as 'nine' | 'ten' | 'eleven' | 'twelve'];

        if (hammer) {
            upgradeChance = upgradeChance * 2;
        }
        if (props.enhance.now === 11) {
            props.resources.crystal++;
        } else {
            props.resources.fluorite++;
        }

        const chance = Math.random();
        if (chance <= upgradeChance) {
            props.enhance.now!++;
            props.allChances[options[props.enhance.now as AllowedRefinesFinal].to as 'nine' | 'ten' | 'eleven' | 'twelve'].push({ case: caso, fluorite: props.resources.fluorite, crystal: props.resources.crystal, blessedScroll: props.resources.blessedScroll });
            props.resources.blessedScroll = 0;
            props.resources.fluorite = 0;
            props.resources.crystal = 0;
        } else if (downgradeChance > 0 && chance <= downgradeChance + upgradeChance) {
            props.allChances[options[props.enhance.now! + 1 as AllowedRefinesFinal].to as 'nine' | 'ten' | 'eleven' | 'twelve'].push({ case: caso, fluorite: props.resources.fluorite, crystal: props.resources.crystal, blessedScroll: props.resources.blessedScroll });
            props.resources.blessedScroll = 0;
            props.resources.fluorite = 0;
            props.resources.crystal = 0;
            props.enhance.now!--;
        } else if (chance <= downgradeChance + upgradeChance + destroyChance && props.server === EServer.OFFICIAL) {
            props.resources.blessedScroll++;
        }
    }
}