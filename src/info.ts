import { EServer } from "./enums/EServer";
import { AllowedRefines, AllowedRefinesFinal } from "./types/AllowedRefines";

export const server = EServer.OFFICIAL;
export const refinoInicial: AllowedRefines = 9;
export const refinoFinal: AllowedRefinesFinal = 12;
export const numberOfCases = 30000;
export const hammerByEnhance = {
    nine: false,
    ten: false,
    eleven: true,
    twelve: true
}
export const limit = 100;