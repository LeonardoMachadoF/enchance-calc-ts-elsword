"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const upgrade_1 = require("./upgrade");
const info_1 = require("./info");
const data = (0, upgrade_1.enhance)({
    server: info_1.server,
    enhance: {
        initial: info_1.refinoInicial,
        final: info_1.refinoFinal
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
    hammerByEnhance: info_1.hammerByEnhance,
    numberOfCases: info_1.numberOfCases
});
// showInfo({ data, numberOfCases, limit });
//# sourceMappingURL=server.js.map