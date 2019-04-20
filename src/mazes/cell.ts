interface CellNeighbors {
    north?: Cell;
    south?: Cell;
    east?: Cell;
    west?: Cell;
}

class Cell implements CellNeighbors {
    north : Cell;
    south : Cell;
    east : Cell;
    west : Cell;

    private row: [];
    private column:[];
    private linkedCells: Map<Cell, boolean>;

    public constructor({row, column }: {row: number, column: number}) {
        this.row = row;
        this.column = column;
        this.linkedCells = new Map();
    }

    public link(cell: Cell, biDirectional = true): void {
        this.linkedCells.set(cell, true);
        if (biDirectional) {
            cell.link(this);
        }
    }

    public unlink(cell: Cell, biDirectional = true): void {
        this.linkedCells.delete(cell);
        if (biDirectional) {
            cell.unlink(this);
        }
    }

    public links(): [Cell]{
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
            neighbors = {...neighbors, easth: this.east};
        }
        if (this.west) {
            neighbors = {...neighbors, west: this.west};
        }

        return neighbors;
    }
}