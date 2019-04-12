import {
  A_SERIES_PAPER,
  PAPER_SIZES,
  PaperName,
} from '../utilities/paper-size';

interface IOrientedState {
  visParams: {
    lines: [];
  };
  uiState: {
    paperSize: PaperName;
    width: number;
    height: number;
    portrait: boolean;
  };
  algorithmParams: Object;
  webWorker: Object|null;
}
export let initialState: IOrientedState = {
  visParams: {
    lines: [],
  },
  uiState: {
    paperSize: A_SERIES_PAPER.A5,
    width: PAPER_SIZES.get(A_SERIES_PAPER.A5).width,
    height: PAPER_SIZES.get(A_SERIES_PAPER.A5).height,
    portrait: true,
  },
  algorithmParams: {
    octaves: 3,
    count: 720,
  },
  webWorker: null
};
enum ACTION_TYPES {
  SET_ALGORITHM_PARAMS = 'SET_ALGORITHM_PARAMS',
  SET_UI_STATE = 'SET_UI_STATE',
  SET_VIS_PARAMS = 'SET_VIS_PARAMS',
  SET_WEB_WORKER = 'SET_WEB_WORKER',
};
export const ACTION_CREATORS = {
  setAlgorithmParams: params => ({
    type: ACTION_TYPES.SET_ALGORITHM_PARAMS,
    payload: params,
  }),
  setUiState: params => ({ type: ACTION_TYPES.SET_UI_STATE, payload: params }),
  setWebWorker: webWorker => ({ type: ACTION_TYPES.SET_WEB_WORKER, payload: {webWorker}}),
  setvisParams: params => ({
    type: ACTION_TYPES.SET_VIS_PARAMS,
    payload: params,
  }),
};
export const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.SET_ALGORITHM_PARAMS:
      return {
        ...state,
        algorithmParams: { ...state.algorithmParams, ...payload },
      };
      break;
    case ACTION_TYPES.SET_VIS_PARAMS:
      return { ...state, visParams: { ...state.visParams, ...payload } };
      break;
    case ACTION_TYPES.SET_WEB_WORKER:
      return { ...state, webWorker: payload.webWorker};
      break;
    case ACTION_TYPES.SET_UI_STATE:
      return { ...state, uiState: { ...state.uiState, ...payload } };
      break;
    default:
      return { ...initialState };
  }
};
