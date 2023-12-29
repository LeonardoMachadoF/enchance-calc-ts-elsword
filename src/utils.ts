import { EServer } from "./enums/EServer";
import { ShowInfoType } from "./types/ShowInfoType";

export const sortArray = (arr: number[]) => ([...arr].sort((a, b) => a - b));

export function getMedian(arr: number[]) {
    const sortedArray = sortArray(arr);
    const middleIndex = Math.floor(sortedArray.length / 2);
    if (sortedArray.length % 2 === 0) {
        return (sortedArray[middleIndex - 1] + sortedArray[middleIndex]) / 2;
    } else {
        return sortedArray[middleIndex];
    }
}

export function getAverage(arr: number[]) {
    const sum = arr.reduce((acc: number, value: number) => acc + value, 0);
    const average = sum / arr.length;
    return average;
}

export function getPercentAboveXInFluorite(fluoriteValues: number[], nLimit: number) {
    const valoresAcimaDoLimite = fluoriteValues.filter(valor => valor > nLimit);
    const porcentagemAcimaDoLimite = (valoresAcimaDoLimite.length / fluoriteValues.length) * 100;

    return porcentagemAcimaDoLimite;
}

export function showInfo({ data, numberOfCases, limit }: ShowInfoType) {
    const fluoriteValues = data.map(item => item.fluorite);
    const blessedValues = data.map(item => item.blessedScroll);
    const crystalValues = data.map(item => item.crystal);

    console.log(EServer.OFFICIAL ? "SERVER OFICIAL" : "SERVER PIRATA")
    console.log("Mediana (fluorite): " + getMedian(fluoriteValues).toFixed());
    console.log("Média (fluorite): " + getAverage(fluoriteValues).toFixed());
    console.log("Mediana (crystal): " + getMedian(crystalValues).toFixed());
    console.log("Média (crystal): " + getAverage(crystalValues).toFixed());
    console.log("Mediana (blessed): " + getMedian(blessedValues).toFixed());
    console.log("Média (blessed): " + getAverage(blessedValues).toFixed());

    const sortedArray = sortArray(fluoriteValues);
    const minValue = sortedArray[0];
    const maxValue = sortedArray[sortedArray.length - 1];

    console.log('Minimo:', minValue);
    console.log("Máximo:", maxValue);
    console.log("Numero de simunações:", numberOfCases);

    console.log(`Gastaram mais do que ${limit} fluoritas (em %): ` + getPercentAboveXInFluorite(fluoriteValues, limit || 0).toFixed(2));
}