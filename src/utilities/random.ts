export function getRandomArbitrary(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

/**
 *
 * @param givenArray
 */
export function sample(givenArray:Array<any>): any {
    return givenArray[Math.floor(Math.random() * givenArray.length)];
}