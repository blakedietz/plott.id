import {Grid as GridModel} from "../grid";
import {Cell as CellModel} from "../cell";
import {Cell, CELL_DIRECTION} from "./cell";
import * as d3 from "d3";
import {ISquare} from "./cell";
import {IMazeDebugState} from "../mazes.store";

interface IMazeProps {
    grid: GridModel;
    width: number;
    height: number;
    debug: IMazeDebugState
};

const convertCellToPoints = (xScale, yScale) => (cell: CellModel): ISquare => {
    const points = {
        northWestCorner: {x: xScale(cell.column), y: yScale(cell.row)},
        northEastCorner: {x: xScale(cell.column + 1), y: yScale(cell.row)},
        southWestCorner: {x: xScale(cell.column), y: yScale(cell.row + 1)},
        southEastCorner: {x: xScale(cell.column + 1), y: yScale(cell.row + 1)},
    };
    return points;
};

const getPassages = (cell) => {
    const neighbors = [];

    if (cell.isLinkedToCell(cell.north)) {
        neighbors.push(CELL_DIRECTION.NORTH);
    }
    if (cell.isLinkedToCell(cell.east)) {
        neighbors.push(CELL_DIRECTION.EAST)
    }
    if (cell.isLinkedToCell(cell.south)) {
        neighbors.push(CELL_DIRECTION.SOUTH);
    }
    if (cell.isLinkedToCell(cell.west)) {
        neighbors.push(CELL_DIRECTION.WEST);
    }

    return neighbors;
};

const Maze = ({grid, width, height, debug: {displaySolutionDistances, displayDistancesFromRoot}}: IMazeProps) => {
    const {rows, columns} = grid;
    /*
     * Rows and columns have + 1 added because that is the number of unique points in the cell grid for the corners
     * of all the cells
     */
    const xScale = d3.scaleLinear()
        .domain([0, columns])
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([0, rows])
        .range([0, height]);

    const cells = [...grid.getCells()].map((cell) => {
        return {
            cellPoints: convertCellToPoints(xScale, yScale)(cell),
            cellPassages: getPassages(cell),
            cell
        };
    });

    return (
        <svg
            id="mazes"
            width={width}
            height={height}
        >
            {cells.map(({cellPoints, cell, cellPassages}) => {
                return <Cell cellPoints={cellPoints} cellPassages={cellPassages} cell={cell}/>;
            })}
            {grid.distances && displayDistancesFromRoot && cells.map(({cellPoints, cell, cellPassages}) => {
                const {
                    northWestCorner,
                    northEastCorner,
                    southWestCorner,
                } = cellPoints;
                const midX = northWestCorner.x - ((northWestCorner.x - northEastCorner.x)/2);
                const midY = northEastCorner.y - ((northWestCorner.y - southWestCorner.y)/2);
                const distance = grid.distances.getCellDistance(cell);

                return <text textAnchor="middle" x={midX} y={midY} fontSize="5">{distance}</text>
            })}
            {grid.distances && displaySolutionDistances && cells.map(({cellPoints, cell, cellPassages}) => {
                const {
                    northWestCorner,
                    northEastCorner,
                    southWestCorner,
                } = cellPoints;
                const midX = northWestCorner.x - ((northWestCorner.x - northEastCorner.x)/2);
                const midY = northEastCorner.y - ((northWestCorner.y - southWestCorner.y)/2);
                const breadCrumb = grid.breadCrumbs.getCellDistance(cell);

                return <text fill="red" textAnchor="middle" x={midX} y={midY} fontSize="5">{breadCrumb}</text>
            })}
        </svg>
    );
};

export {Maze};
