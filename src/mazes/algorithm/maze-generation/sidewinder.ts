import {Grid} from "../../grid";
import { getRandomIntInclusive, sample} from "../../../utilities/random";

export function sideWinder(grid: Grid) {
    let neighbors;
    let neighbor;
    let atEasternBoundary;
    let atNorthernBoundary;
    let shouldCloseOut;

    let member;
    let run: any[];

    for (let row of grid.getRows()) {
        run = [];
        for (let cell of row) {
            run.push(cell);

            const {north, east} = cell;

            atNorthernBoundary = north === null;
            atEasternBoundary = east === null;
            shouldCloseOut = atEasternBoundary || (!atNorthernBoundary && getRandomIntInclusive(0,2) === 0);

            if (shouldCloseOut) {
                member = sample(run);
                if (member && member.north !== null) {
                    member.link(member.north);
                }
                run = [];
            }
            else {
                cell.link(cell.east);
            }
        }

    }

    grid.createDistances();
    return grid;
}
