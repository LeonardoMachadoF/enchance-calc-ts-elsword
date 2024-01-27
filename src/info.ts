import { EServer } from "./enums/EServer";
import { AllowedRefines, AllowedRefinesFinal } from "./types/AllowedRefines";

export const server = EServer.OFFICIAL;
export const refinoInicial: AllowedRefines = 9;
export const refinoFinal: AllowedRefinesFinal = 10;
export const numberOfCases = 5000;
export const hammerByEnhance = {
    nine: true,
    ten: true,
    eleven: true,
    twelve: true,
    thirteen: true
}
export const limit = 270;