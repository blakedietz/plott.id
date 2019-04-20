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

    public links(): [Cell] {
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
}

export {Cell};