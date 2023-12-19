import { EServer } from "../enums/EServer"
import { AllChancesToReducer } from "./AllChancesToReducer"
import { AllowedRefines } from "./AllowedRefines"
import { InfoDTO } from "./InfoDTO"

export interface UpgradeInfo {
    server: EServer,
    enhance: {
        initial: number,
        final: AllowedRefines,
        now?: number
    }
    allChances: {
        nine: InfoDTO[],
        ten: InfoDTO[],
        eleven: InfoDTO[],
        twelve: InfoDTO[]
    },
    resources: {
        fluorite: number,
        crystal: number,
        blessedScroll: number
    },
    hammerByEnhanceChance: {
        nine: boolean,
        ten: boolean,
        eleven: boolean,
        twelve: boolean
    },
    numberOfCases: number,
    allChancesTo11ReducedPerCase: AllChancesToReducer[];
}