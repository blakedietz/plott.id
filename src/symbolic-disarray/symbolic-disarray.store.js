import { createVisData } from './algorithms';

const ACTION_TYPES = {
  SET_ALGORITHM_PARAMS: 'SET_ALGORITHM_PARAMS',
  SET_UI_STATE: 'SET_UI_STATE',
};
export const ACTION_CREATORS = {
  setvisParams: params => ({
    type: ACTION_TYPES.SET_VIS_PARAMS,
    payload: params,
  }),
  setUiState: params => ({ type: ACTION_TYPES.SET_UI_STATE, payload: params }),
};

let initialState = {
  visParams: {
    height: 2900,
    margin: 0.03,
    numberOfColumns: 13,
    numberOfRows: 22,
    points: [],
    rotate: 0,
    sideLength: 100,
    start: 1,
    translateX: 0,
    translateY: 0,
    width: 2000,
  },
  uiState: {
    drawerOpen: false,
    debugMode: false,
  },
};

initialState.visParams.points = createVisData(
  initialState.visParams.numberOfColumns,
  initialState.visParams.numberOfRows,
);

export { initialState };
export const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.SET_VIS_PARAMS:
      return { ...state, visParams: { ...state.visParams, ...payload } };
      break;
    case ACTION_TYPES.SET_UI_STATE:
      return { ...state, uiState: { ...state.uiState, ...payload } };
      break;
    default:
      return { ...initialState };
  }
};
