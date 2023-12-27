import { EServer } from "./enums/EServer";
import { AllowedRefines, AllowedRefinesFinal } from "./types/AllowedRefines";

export const server = EServer.OFFICIAL;
export const refinoInicial: AllowedRefines = 10;
export const refinoFinal: AllowedRefinesFinal = 12;
export const numberOfCases = 10000;
export const hammerByEnhance = {
    nine: false,
    ten: false,
    eleven: false,
    twelve: true
}
export const limit = 100;