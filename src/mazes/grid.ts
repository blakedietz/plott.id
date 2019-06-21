import {Cell} from "./cell";
import {getRandomArbitrary} from "../utilities/random";
import {Distances} from "./distances";

class Grid {
    public rows: number;
    public columns: number;
    public distances: Distances;
    public breadCrumbs: Distances
    readonly grid: Array<Array<Cell>>;

    constructor({rows, columns}: { rows: number, columns: number }) {
        this.rows = rows;
        this.columns = columns;
        this.grid = this.prepareGrid();
        this.configureCells();
    }

    public createDistances() {
        this.distances = this.grid[0][0].distances();
        this.breadCrumbs = this.distances.pathTo(this.grid[this.rows-1][0])
    }

    /**
     * Instantiates each of the cells within the grid.
     */
    public prepareGrid() {
        const cells: Array<Array<Cell>> = [];
        for (let {row, column} of this.getIndices()) {
            if (column === 0) {
                cells.push([]);
            }

            cells[row][column] = (new Cell({row, column}));
        }
        return cells;
    }

    /**
     * Sets up the cells within the grid. Specifically sets up the neighboring cell information.
     */
    public configureCells() {
        for (let cell of this.getCells()) {
            const {row, column} = cell;
            cell.north = this.accessGrid(row - 1, column);
            cell.south = this.accessGrid(row + 1, column);
            cell.west = this.accessGrid(row, column - 1);
            cell.east = this.accessGrid(row, column + 1);
        }
    }

    /**
     * Returns the number of cells in the grid.
     */
    public size() {
        return this.rows * this.columns;
    }

    /**
     * Gets a random cell from within the grid.
     */
    public randomCell() {
        const row = getRandomArbitrary(0, this.rows);
        const column = getRandomArbitrary(0, this.columns);
        return this.grid[row][column];
    }

    /**
     * Iterates over ach cell in the grid row by row
     */
    public* getCells() {
        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                yield this.grid[row][column];
            }
        }
    }

    public* getIndices() {
        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                yield {row, column};
            }
        }
    }

    /**
     * Iterates over each row of cells within the grid
     */
    public* getRows() {
        for (let row of this.grid)
            yield row;
    }

    /**
     * Safely access the grid if given indices are not within the grid.
     * @param row
     * @param column
     * returns Cell|null If a cell is within the grid the cell is returned, otherwise null is returned
     */
    protected accessGrid(row: number, column: number): Cell|null {
        if ((0 <= row && row < this.rows) &&
            (0 <= column && column < this.columns)
        ) {
            return this.grid[row][column];
        }
        return null;
    }
}

export {Grid};
