import { upgrade, enhance } from "./upgrade";
import { showInfo } from "./utils";
import { server, refinoInicial, refinoFinal, hammerByEnhance, numberOfCases, limit } from './info';

const data = enhance({
    server,
    enhance: {
        initial: refinoInicial,
        final: refinoFinal
    },
    allChances: {
        nine: [],
        ten: [],
        eleven: [],
        twelve: []
    },
    resources: {
        fluorite: 0,
        crystal: 0,
        blessedScroll: 0
    },
    hammerByEnhance,
    numberOfCases
});

// showInfo({ data, numberOfCases, limit });