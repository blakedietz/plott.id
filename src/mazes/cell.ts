import {Distances} from "./distances";

interface CellNeighbors {
    north?: Cell | null;
    south?: Cell | null;
    east?: Cell | null;
    west?: Cell | null;
}

class Cell implements CellNeighbors {
    public north: Cell | null;
    public south: Cell | null;
    public east: Cell | null;
    public west: Cell | null;

    public row: number;
    public column: number;

    private linkedCells: Map<Cell, boolean>;

    public constructor({row, column}: { row: number; column: number }) {
        this.row = row;
        this.column = column;

        this.linkedCells = new Map();

        this.north = null;
        this.south = null;
        this.east = null;
        this.west = null;
    }

    public link(cell: Cell, biDirectional = true): void {
        this.linkedCells.set(cell, true);
        if (biDirectional) {
            cell.link(this, false);
        }
    }

    public unlink(cell: Cell, biDirectional = true): void {
        this.linkedCells.delete(cell);
        if (biDirectional) {
            cell.unlink(this, false);
        }
    }

    public links(): Array<Cell> {
        return [...this.linkedCells.keys()];
    }

    public isLinkedToCell(cell: Cell): boolean {
        return this.linkedCells.has(cell);
    }

    public neighbors(): CellNeighbors {
        let neighbors = {};
        if (this.north) {
            neighbors = {north: this.north};
        }
        if (this.south) {
            neighbors = {...neighbors, south: this.south};
        }
        if (this.east) {
            neighbors = {...neighbors, east: this.east};
        }
        if (this.west) {
            neighbors = {...neighbors, west: this.west};
        }

        return neighbors;
    }

    public distances() {
        const distancesFromCell = new Distances(this);

        let frontier: Array<Cell> = [this];

        while (frontier.length) {
            const newFrontier: Array<Cell> = [];

            /*
             *                    ┌────────────────────────────────────────────────┐
             *                    │Your next frontier is all cells that are linked │
             *                    │ cells that are in your current frontier        │
             *                    └────────────────────────────────────────────────┘
             *     ┌─────────────────────────────────┐     │
             *     │  Assume this cell is the root.  │     │
             *     │  Your current frontier is just  │     │
             *     │       this cell on start.       │     │
             *     └────────────────┬────────────────┘     │
             *                      │                      │
             *                      │                      │
             *                      │                      │
             *                      ▼                      ▼
             *┌───┬───┬───┐       ┌───┬───┬───┐      ┌───┬───┬───┐
             *│   │   │   │       │ 0 │   │   │      │ 0 │ n │   │
             *├───┼───┼───┤       ├───┼───┼───┤      ├───┼───┼───┤
             *│   │   │   │──────▶│   │   │   │─────▶│ n │   │   │
             *├───┼───┼───┤       ├───┼───┼───┤      ├───┼───┼───┤
             *│   │   │   │       │   │   │   │      │   │   │   │
             *└───┴───┴───┘       └───┴───┴───┘      └───┴───┴───┘
             */
            for (const cell of frontier) {

                for (const linkedCell of  cell.links()) {
                    let cellDistance = distancesFromCell.getCellDistance(linkedCell);
                    /*
                     * At this point if the cell is not defined it hasn't been visited yet, so add it to the list of
                     * distances and update the new distance to be the current frontier distance + 1.
                     */
                    if ( cellDistance === undefined) {
                        // @ts-ignore
                        distancesFromCell.addCellDistance(linkedCell, distancesFromCell.getCellDistance(cell) + 1);

                        newFrontier.push(linkedCell);
                    }
                }
            }
            /*
             * Now dispose of the old current frontier and make the new frontier the current frontier.
             *                                                   ┌────────────────────────────┐
             *                                                   │Now the new frontier becomes│
             *                                                   │the current frontier and we │
             *                                                   │create another new frontier │
             *                                                   │to visit during the next    │
             *                                                   │iteration of the loop.      │
             *                                                   └────────────────────────────┘
             *                                                                  │
             *                                                                  │
             *                                                                  │
             *                                                                  ▼
             *┌───┬───┬───┐       ┌───┬───┬───┐      ┌───┬───┬───┐        ┌───┬───┬───┐        ┌───┬───┬───┐
             *│   │   │   │       │ x │   │   │      │ x │ n │   │        │ x │ c │   │        │ x │ c │ n │
             *├───┼───┼───┤       ├───┼───┼───┤      ├───┼───┼───┤        ├───┼───┼───┤        ├───┼───┼───┤
             *│   │   │   │──────▶│   │   │   │─────▶│ n │   │   │ ──────▶│ c │   │   │ ──────▶│ c │ n │   │
             *├───┼───┼───┤       ├───┼───┼───┤      ├───┼───┼───┤        ├───┼───┼───┤        ├───┼───┼───┤
             *│   │   │   │       │   │   │   │      │   │   │   │        │   │   │   │        │ n │   │   │
             *└───┴───┴───┘       └───┴───┴───┘      └───┴───┴───┘        └───┴───┴───┘        └───┴───┴───┘
             */
            frontier = newFrontier;
        };

        return distancesFromCell;
    }
}

export {Cell};
