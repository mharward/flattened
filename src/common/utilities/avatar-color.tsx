
const SATURATION = 70;
const LIGHTNESS = 60;
const DISTINCT_SECTORS = 6;

let previous = 0;

const distinctRandom = (max: number) => {
    let current = Math.floor(Math.random() * max);
    const differenceFromPrevious = Math.abs(current - previous);
    const sizeOfDistinctSector = max / DISTINCT_SECTORS;
    if (differenceFromPrevious < sizeOfDistinctSector) {
        current = (current + sizeOfDistinctSector) % max;
    }
    previous = current;
    return current;
};

export const getAvatarColor = (): string => {
    const hue = distinctRandom(360);
    return 'hsl(' + hue + ', ' + SATURATION + '%, ' + LIGHTNESS + '%)';
}
