import {Grid} from "../grid";
import {sample} from "../../utilities/random";

export function binaryTree(grid: Grid) {
    let neighbors;
    let neighbor;
    for (let cell of grid.getCells()) {
        const {north, east} = cell;
        neighbors = [];

        if (north) {
            neighbors.push(north);
        }
        if (east) {
            neighbors.push(east);
        }

        neighbor = sample(neighbors);
        if (neighbor) {
            cell.link(neighbor)
        }
    }

    return grid;
}