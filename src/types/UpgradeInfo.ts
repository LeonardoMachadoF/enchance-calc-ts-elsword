import { EServer } from "../enums/EServer"
import { AllowedRefines, AllowedRefinesFinal } from "./AllowedRefines"
import { UpgradeResultInfo } from "./UpgradeReturnDTO"

export interface UpgradeInfo {
    server: EServer,
    enhance: {
        initial: AllowedRefines,
        final: AllowedRefinesFinal,
        now?: AllowedRefines
    }
    allChances: UpgradeResultInfo,
    resources: {
        fluorite: number,
        crystal: number,
        blessedScroll: number
    },
    hammerUsageByEnhance: {
        nine: boolean,
        ten: boolean,
        eleven: boolean,
        twelve: boolean
    },
    numberOfSimulations: number,
    spentMoreFluoriteThan: number
}