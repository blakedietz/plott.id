export function getRandomArbitrary(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

/**
 *
 * @param givenArray
 */
export function sample(givenArray:Array<any>): any {
    return givenArray[Math.floor(Math.random() * givenArray.length)];
}
