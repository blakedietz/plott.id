import {Cell as CellModel} from "../cell";
import {SVGLine} from "../../components/svg-line";

interface IPoint {
    x: number,
    y: number
}

export interface ISquare {
    northEastCorner: IPoint;
    northWestCorner: IPoint;
    southEastCorner: IPoint;
    southWestCorner: IPoint;
}

export enum CELL_DIRECTION {
    NORTH,
    SOUTH,
    EAST,
    WEST
}

interface ICellProps {
    cellPoints: ISquare,
    cellPassages: [CELL_DIRECTION],
    cell: CellModel
}

const convertPointToArray = (point: IPoint) => {
    return [point.x, point.y];
};

const Cell = ({cellPoints, cell, cellPassages}: ICellProps) => {
    const {northWestCorner, northEastCorner, southEastCorner, southWestCorner} = cellPoints;

    const points = [];

    if (!cellPassages.includes(CELL_DIRECTION.NORTH)) {
        points.push(
            [northEastCorner, northWestCorner].map(convertPointToArray)
        );
    }

    if (!cellPassages.includes(CELL_DIRECTION.SOUTH)) {
        points.push(
            [southEastCorner, southWestCorner].map(convertPointToArray)
        );
    }

    if (!cellPassages.includes(CELL_DIRECTION.EAST)) {
        points.push(
            [northEastCorner, southEastCorner].map(convertPointToArray)
        );
    }

    if (!cellPassages.includes(CELL_DIRECTION.WEST)) {
        points.push(
            [northWestCorner, southWestCorner].map(convertPointToArray)
        );
    }

    return points
        .map((points, index) => {
            return <SVGLine fill="none" stroke="black" key={index} points={points}/>
        });
};

export {Cell};