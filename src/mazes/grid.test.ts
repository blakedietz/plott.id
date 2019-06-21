import {
    Grid
} from "./grid";

describe("grid", () => {
    test("constructor", () => {
        const grid = new Grid({rows:2, columns: 2});
        expect(grid.size()).toBe([...grid.getCells()].length);
    });
    test("neighbors", () => {
        const grid = new Grid({rows:2, columns: 2});
        const cells = [...grid.getCells()];

        expect(cells[0].north).toBeNull();
        expect(cells[0].south).toEqual(cells[2]);
        expect(cells[0].east).toEqual(cells[1]);
        expect(cells[0].west).toBeNull();

        expect(cells[1].north).toBeNull();
        expect(cells[1].south).toEqual(cells[3]);
        expect(cells[1].east).toBeNull();
        expect(cells[1].west).toEqual(cells[0]);

        expect(cells[2].north).toEqual(cells[0]);
        expect(cells[2].south).toBeNull();
        expect(cells[2].east).toEqual(cells[3]);
        expect(cells[2].west).toBeNull();

        expect(cells[3].north).toEqual(cells[1]);
        expect(cells[3].south).toBeNull();
        expect(cells[3].east).toBeNull();
        expect(cells[3].west).toEqual(cells[2]);
    });
});
