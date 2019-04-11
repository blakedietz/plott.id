import {PerlinNoise} from "./perlin-noise";

/**
 * Takend directly from https://observablehq.com/@mbostock/oriented Modified slightly for usage with svg.
 * This might also be useful: https://observablehq.com/@2timesjay/oriented-annotated
 * @param count
 * @param width
 * @param height
 * @returns {Array}
 */
export const orientedAlgorithm = (count, width, height) => {
    const perlin = new PerlinNoise(3);
    const particles = new Map();
    const lines = [];

    for (let i = 0; i < count; ++i) {
        particles.set(i, {
            key: i,
            x: width / 2,
            y: height / 2,
            a: i / count * 2 * Math.PI,
            points: []
        });
    }

    while(particles.size) {
        for (const [index, p] of particles) {
            const n = perlin.noise(p.x * .01, p.y * 0.01);
            const a = p.a + n * 16;
            p.x += Math.cos(a);
            p.y += Math.sin(a);
            p.points.push([p.x, p.y]);

            particles.set(p.key, p);

            if (p.x < 0 || p.x >= width || p.y < 0 || p.y >= height) {
                lines.push(p.points);
                particles.delete(p.key);
            }
        }
    }

    console.log(lines);

    return lines;
};
