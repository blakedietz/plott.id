import {Cell} from "./cell";

describe("cell.ts", () => {
    test("Constructor woks", () => {
        const row = 0;
        const column = 0;
        const cell = new Cell({row, column});

        expect(cell.row).toBe(row);
        expect(cell.column).toBe(column);
        expect(cell.north).toBeNull();
        expect(cell.south).toBeNull();
        expect(cell.east).toBeNull();
        expect(cell.west).toBeNull();
    });

    test("link", () => {
        const cell1 = new Cell({row: 0, column: 0});
        const cell2 = new Cell({row:0, column: 1});
        cell1.link(cell2);

        const cell1Link = cell1.links()[0];
        const cell2Link = cell2.links()[0];

        expect(cell1Link).toEqual(cell2);
        expect(cell2Link).toEqual(cell1);
    });

    test("unlink", () => {
        const cell1 = new Cell({row: 0, column: 0});
        const cell2 = new Cell({row:0, column: 1});
        cell1.link(cell2);

        const cell2Link = cell2.links()[0];

        expect(cell2Link).toEqual(cell1);

        cell2.unlink(cell1);

        expect(cell1.isLinkedToCell(cell2)).toBeFalsy();
        expect(cell2.isLinkedToCell(cell1)).toBeFalsy();
    });

    test("isLinkedToCell", () => {
        const cell1 = new Cell({row: 0, column: 0});
        const cell2 = new Cell({row:0, column: 1});
        cell1.link(cell2);
        expect(cell1.isLinkedToCell(cell2)).toBeTruthy();
        expect(cell2.isLinkedToCell(cell1)).toBeTruthy();
    });

    test("neighbors", () => {
        const cell = new Cell({row: 0, column: 0});

        expect(Object.keys(cell.neighbors()).length).toBe(0);
    });
});