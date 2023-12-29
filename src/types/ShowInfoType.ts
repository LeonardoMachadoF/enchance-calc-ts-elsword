import { InfoDTO } from "./InfoDTO";

export type ShowInfoType = {
    data: InfoDTO[],
    numberOfCases: number;
    limit: number;
}