import {Grid} from "./grid";

interface IMazeStoreState {
    rows: number,
    columns: number,
    grid: Grid
};

enum MAZE_ACTION_TYPES {
    SET_MAZE_PARAMS = "SET_MAZE_PARAMS"
};

interface IFSA {
    type: MAZE_ACTION_TYPES,
    payload: object
}

export const initialState: IMazeStoreState = {
    rows: 40,
    columns: 40,
    grid: (new Grid({rows: 40, columns: 40}))
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
