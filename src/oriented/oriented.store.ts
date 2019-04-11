import {A_SERIES_PAPER, PAPER_SIZES, PaperName} from "../utilities/paper-size";

interface IOrientedState {
    visParams: {
        lines: []
    }
    uiState: {
        paperSize: PaperName,
        width: number,
        height: number,
        portrait: boolean
    },
    algorithmParams: Object
}
export let initialState: IOrientedState = {
    visParams: {
        lines: []
    },
    uiState: {
        paperSize: A_SERIES_PAPER.A5,
        width: PAPER_SIZES.get(A_SERIES_PAPER.A5).width,
        height: PAPER_SIZES.get(A_SERIES_PAPER.A5).height,
        portrait: true
    },
    algorithmParams: {
    },
};
const ACTION_TYPES = {
    SET_ALGORITHM_PARAMS: "SET_ALGORITHM_PARAMS",
    SET_SQUIGGLES: "SET_SQUIGGLES",
    SET_UI_STATE: "SET_UI_STATE",
    SET_VIS_PARAMS: "SET_VIS_PARAMS",
};
export const ACTION_CREATORS = {
    setAlgorithmParams: (params) => ({type: ACTION_TYPES.SET_ALGORITHM_PARAMS, payload: params}),
    setSquiggles: (squiggles) => ({type: ACTION_TYPES.SET_SQUIGGLES, payload: {squiggles}}),
    setUiState: (params) => ({type: ACTION_TYPES.SET_UI_STATE, payload: params}),
    setvisParams: (params) => ({type: ACTION_TYPES.SET_VIS_PARAMS, payload: params}),
};
export const reducer = (state, {type, payload}) => {
    switch (type) {
        case ACTION_TYPES.SET_ALGORITHM_PARAMS:
            return {...state, algorithmParams: {...state.algorithmParams, ...payload}};
            break;
        case ACTION_TYPES.SET_VIS_PARAMS:
            return {...state, visParams: {...state.visParams, ...payload}};
            break;
        case ACTION_TYPES.SET_UI_STATE:
            return {...state, uiState: {...state.uiState, ...payload}};
            break;
        case ACTION_TYPES.SET_SQUIGGLES:
            return {...state, squiggles: payload.squiggles};
            break;
        case ACTION_TYPES.SET_FILE_BLOB:
            return {...state, fileBlob: payload.fileBlob};
            break;
        default:
            return {...initialState};
    }
};