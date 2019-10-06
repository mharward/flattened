export const hashCode = (value: string): number => {
    return value
        .split('')
        .reduce(
            (previousHash, currentValue) =>
                ((previousHash << 5) -
                    previousHash +
                    currentValue.charCodeAt(0)) |
                0,
            0
        );
};

export const stringToHslColor = (
    stringValue: string,
    s: number,
    l: number
): string => {
    const hash = hashCode(stringValue);

    const h = (hash * 1000) % 360;
    return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
};
