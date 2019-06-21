import {Cell} from "./cell";

class Distances {
    root: Cell;
    cells: Map<Cell,number> ;

    constructor(root: Cell) {
        this.root = root;
        this.cells = new Map();
        this.addCellDistance(root, 0);
    }

    public addCellDistance(cell: Cell, distance: number): void {
        this.cells.set(cell, distance);
    }

    public getCellDistance(cell: Cell): number|undefined {
        return this.cells.get(cell);
    }

    public pathTo(goal: Cell) {
        let current = goal;

        const breadCrumbs = new Distances(this.root);
        // @ts-ignore
        breadCrumbs.addCellDistance(current, breadCrumbs.getCellDistance(current));
        while(current !== this.root) {
            for (const neighbor of current.links()) {
                if (this.getCellDistance(neighbor) < this.getCellDistance(current)) {
                    breadCrumbs.addCellDistance(neighbor, this.getCellDistance(current))
                    current = neighbor;
                }
            }
        }

        return breadCrumbs;
    }
}


export {Distances};
