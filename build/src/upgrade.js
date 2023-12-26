"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enhance = exports.upgrade = void 0;
const EServer_1 = require("./enums/EServer");
const destroyToNineChance = 0.2;
const destroyToTenChance = 0.25;
const destroyToElevenChance = 0.353;
const destroyToTwelveChance = 0.25;
const downgradeToElevenChance = 0.27;
let upgradeToNineChance = 0.021;
let upgradeToTenChance = 0.0105;
let upgradeToElevenChance = 0.007;
let upgradeToTwelveChance = 0.0105;
const getNine = (props, caso) => {
    if (props.enhance.now === 8) {
        let upgradeChance = upgradeToNineChance;
        if (props.hammerByEnhance.nine) {
            upgradeChance = upgradeToNineChance * 2;
        }
        while (props.enhance.now === 8) {
            props.resources.fluorite++;
            const chance = Math.random();
            if (chance <= upgradeChance) {
                props.enhance.now = 9;
                props.allChances.nine.push({ case: caso, fluorite: props.resources.fluorite, blessedScroll: props.resources.blessedScroll, crystal: props.resources.crystal });
                props.resources.blessedScroll = 0;
                props.resources.fluorite = 0;
            }
            else if (chance <= upgradeChance + destroyToNineChance && props.server === EServer_1.EServer.OFFICIAL) {
                props.resources.blessedScroll++;
            }
        }
    }
};
const getTen = (props, caso) => {
    if (props.enhance.now < 9) {
        getNine(props, caso);
    }
    let upgradeChance = upgradeToTenChance;
    if (props.hammerByEnhance.ten) {
        upgradeChance = upgradeToTenChance * 2;
    }
    while (props.enhance.now === 9) {
        props.resources.fluorite++;
        const chance = Math.random();
        if (chance <= upgradeChance) {
            props.enhance.now = 10;
            props.allChances.ten.push({ case: caso, fluorite: props.resources.fluorite, blessedScroll: props.resources.blessedScroll, crystal: props.resources.crystal });
            props.resources.blessedScroll = 0;
            props.resources.fluorite = 0;
        }
        else if (chance <= upgradeChance + destroyToTenChance && props.server === EServer_1.EServer.OFFICIAL) {
            props.resources.blessedScroll++;
        }
    }
};
function getEleven(props, caso) {
    if (props.enhance.now < 10) {
        getTen(props, caso);
    }
    let upgradeChance = upgradeToElevenChance;
    if (props.hammerByEnhance.eleven) {
        upgradeChance = upgradeToElevenChance * 2;
    }
    while (props.enhance.now === 10) {
        props.resources.fluorite++;
        const chance = Math.random();
        if (chance <= upgradeChance) {
            props.enhance.now = 11;
            props.allChances.eleven.push({ case: caso, fluorite: props.resources.fluorite, crystal: 0, blessedScroll: props.resources.blessedScroll });
            props.resources.blessedScroll = 0;
            props.resources.fluorite = 0;
        }
        else if (chance <= upgradeChance + destroyToElevenChance && props.server === EServer_1.EServer.OFFICIAL) {
            props.resources.blessedScroll++;
        }
    }
}
function getTwelve(props, caso) {
    while (props.enhance.now < props.enhance.final) {
        if (props.enhance.now < 11) {
            getEleven(props, caso);
        }
        else {
            let upgradeChance = upgradeToElevenChance;
            if (props.hammerByEnhance.twelve) {
                upgradeChance = upgradeToTwelveChance * 2;
            }
            props.resources.crystal++;
            const chance = Math.random();
            if (chance <= upgradeChance) {
                props.enhance.now = 12;
                props.allChances.twelve.push({ case: caso, fluorite: props.resources.fluorite, crystal: props.resources.crystal, blessedScroll: props.resources.blessedScroll });
                props.resources.blessedScroll = 0;
                props.resources.fluorite = 0;
                props.resources.crystal = 0;
            }
            else if (chance <= downgradeToElevenChance + upgradeChance) {
                props.enhance.now = 10;
            }
            else if (chance <= downgradeToElevenChance + upgradeToElevenChance + destroyToTwelveChance && props.server === EServer_1.EServer.OFFICIAL) {
                props.resources.blessedScroll++;
            }
        }
    }
}
function upgrade(props) {
    const upgradeOptions = {
        9: (caso) => getNine(props, caso),
        10: (caso) => getTen(props, caso),
        11: (caso) => getEleven(props, caso),
        12: (caso) => getTwelve(props, caso)
    };
    for (let i = 0; i < props.numberOfCases; i++) {
        props.enhance.now = props.enhance.initial;
        upgradeOptions[props.enhance.final](i);
    }
    function calculateTotals(chances) {
        const caseSummaries = [];
        for (let i = 0; i < props.numberOfCases; i++) {
            const data = chances.nine.concat(chances.ten).concat(chances.eleven).concat(chances.twelve).filter(item => item.case === i);
            const fluoriteTotal = data.reduce((total, item) => total + item.fluorite, 0);
            const blessedTotal = data.reduce((total, item) => total + item.blessedScroll, 0);
            const crystalTotal = data.reduce((total, item) => total + item.crystal, 0);
            caseSummaries.push({ case: i, fluorite: fluoriteTotal, blessed: blessedTotal, crystal: crystalTotal });
        }
        return caseSummaries;
    }
    return calculateTotals(props.allChances);
}
exports.upgrade = upgrade;
function enhance(props) {
    props.enhance.now = props.enhance.initial;
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
    };
    while (props.enhance.now < props.enhance.final) {
        let upgradeChance = options[props.enhance.now + 1].upgradeChance;
        let downgradeChance = options[props.enhance.now + 1].downgradeChance;
        let destroyChance = options[props.enhance.now + 1].destroyChance;
        let hammer = props.hammerByEnhance[options[props.enhance.now + 1].to];
        if (hammer) {
            upgradeChance = upgradeChance * 2;
        }
        if (props.enhance.now === 11) {
            props.resources.crystal++;
        }
        else {
            props.resources.fluorite++;
        }
        const chance = Math.random();
        if (chance <= upgradeChance) {
            props.enhance.now++;
            props.allChances[options[props.enhance.now].to].push({ case: 0, fluorite: props.resources.fluorite, crystal: props.resources.crystal, blessedScroll: props.resources.blessedScroll });
            props.resources.blessedScroll = 0;
            props.resources.fluorite = 0;
            props.resources.crystal = 0;
        }
        else if (downgradeChance > 0 && chance <= downgradeChance + upgradeChance) {
            props.enhance.now--;
        }
        else if (chance <= downgradeChance + upgradeChance + destroyChance && props.server === EServer_1.EServer.OFFICIAL) {
            props.resources.blessedScroll++;
        }
    }
    console.log(props.allChances);
}
exports.enhance = enhance;
//# sourceMappingURL=upgrade.js.map