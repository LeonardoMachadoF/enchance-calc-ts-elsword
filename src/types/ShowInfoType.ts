import { InfoDTO } from "./InfoDTO";

export type ShowInfoType = {
    data: InfoDTO[],
    numberOfSimulations: number;
    spentMoreFluoriteThan: number;
}