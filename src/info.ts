import { EServer } from "./enums/EServer";
import { AllowedRefines, AllowedRefinesFinal } from "./types/AllowedRefines";

export const server = EServer.OFFICIAL;
export const refinoInicial: AllowedRefines = 10;
export const refinoFinal: AllowedRefinesFinal = 11;
export const numberOfCases = 30000;
export const hammerByEnhance = {
    nine: false,
    ten: false,
    eleven: true,
    twelve: true
}
export const limit = 100;