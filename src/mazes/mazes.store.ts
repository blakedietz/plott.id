import {Grid} from "./grid";


interface IMazeStoreState {
    rows: number,
    columns: number,
    grid: Grid,
    algorithm: ALGORIGHTMS,
    debug: IMazeDebugState
};

export interface IMazeDebugState {
    displayDistancesFromRoot: boolean,
    displaySolutionDistances: boolean,
};

enum MAZE_ACTION_TYPES {
    SET_MAZE_PARAMS = "SET_MAZE_PARAMS"
}

export enum ALGORIGHTMS {
    BINARY_TREE = "Binary tree",
    SIDEWINDER = "Sidewinder"
}

interface IFSA {
    type: MAZE_ACTION_TYPES,
    payload: object
}

export const initialState: IMazeStoreState = {
    rows: 40,
    columns: 40,
    grid: (new Grid({rows: 40, columns: 40})),
    algorithm: ALGORIGHTMS.BINARY_TREE,
    debug: {
        displayDistancesFromRoot: false,
        displaySolutionDistances: false
    }
};


export const ACTION_CREATORS = {
    setMazeParams: (params) => ({type: MAZE_ACTION_TYPES.SET_MAZE_PARAMS, payload: {...params}})
};

export const reducer = (state: IMazeStoreState, action: IFSA) => {
    switch (action.type) {
        case MAZE_ACTION_TYPES.SET_MAZE_PARAMS:
            return {...state, ...action.payload};
        default:
            return {...state};
    }
};
