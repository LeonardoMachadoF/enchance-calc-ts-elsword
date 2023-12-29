import { EServer } from "./enums/EServer";
import { AllowedRefines, AllowedRefinesFinal } from "./types/AllowedRefines";

export const server = EServer.OFFICIAL;
export const refinoInicial: AllowedRefines = 11;
export const refinoFinal: AllowedRefinesFinal = 12;
export const numberOfCases = 5000;
export const hammerByEnhance = {
    nine: false,
    ten: false,
    eleven: false,
    twelve: true
}
export const limit = 1000;