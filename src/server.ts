import { enhance } from "./upgrade";
import { server, refinoInicial, refinoFinal, hammerUsageByEnhance, numberOfSimulations, spentMoreFluoriteThan } from './info';
import { showInfo } from "./utils";

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
        twelve: [],
        thirteen: []
    },
    resources: {
        fluorite: 0,
        crystal: 0,
        blessedScroll: 0
    },
    hammerUsageByEnhance,
    numberOfSimulations,
    spentMoreFluoriteThan
});

showInfo({ data, numberOfSimulations, spentMoreFluoriteThan });