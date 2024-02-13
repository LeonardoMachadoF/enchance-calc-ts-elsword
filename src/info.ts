import { EServer } from "./enums/EServer";
import { AllowedRefines, AllowedRefinesFinal } from "./types/AllowedRefines";

export const server = EServer.OFFICIAL;

export const refinoInicial: AllowedRefines = 10;
export const refinoFinal: AllowedRefinesFinal = 11;
export const numberOfSimulations = 10000;
export const hammerUsageByEnhance = {
    nine: true,
    ten: true,
    eleven: false,
    twelve: true,
    thirteen: true
}
export const spentMoreFluoriteThan = 80;