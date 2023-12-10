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