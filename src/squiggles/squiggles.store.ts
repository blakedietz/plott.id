import { ISquigglesState } from './i-squiggle-state';

export let initialState: ISquigglesState = {
  uiState: {
    imageUri: '',
    loadedImage: '',
    drawerOpen: false,
    debugMode: false,
    scale: 100,
  },
  algorithmParams: {
    amplitude: 1,
    black: false,
    brightness: 0,
    contrast: 0,
    frequency: 150,
    height: 0,
    lineCount: 50,
    maxBrightness: 255,
    minBrightness: 0,
    pixels: [],
    spacing: 1,
    width: 0,
  },
  squiggles: [],
  fileBlob: Object | null,
  webWorker: null,
};
const ACTION_TYPES = {
  SET_ALGORITHM_PARAMS: 'SET_ALGORITHM_PARAMS',
  SET_SQUIGGLES: 'SET_SQUIGGLES',
  SET_UI_STATE: 'SET_UI_STATE',
  SET_VIS_PARAMS: 'SET_VIS_PARAMS',
  SET_WEB_WORKER: 'SET_WEB_WORKER',
  SET_FILE_BLOB: 'SET_FILE_BLOB',
};
export const ACTION_CREATORS = {
  setAlgorithmParams: params => ({
    type: ACTION_TYPES.SET_ALGORITHM_PARAMS,
    payload: params,
  }),
  setSquiggles: squiggles => ({
    type: ACTION_TYPES.SET_SQUIGGLES,
    payload: { squiggles },
  }),
  setUiState: params => ({ type: ACTION_TYPES.SET_UI_STATE, payload: params }),
  setWebWorker: webWorker => ({
    type: ACTION_TYPES.SET_WEB_WORKER,
    payload: { webWorker },
  }),
  setFileBlob: fileBlob => ({
    type: ACTION_TYPES.SET_FILE_BLOB,
    payload: { fileBlob },
  }),
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
    case ACTION_TYPES.SET_UI_STATE:
      return { ...state, uiState: { ...state.uiState, ...payload } };
      break;
    case ACTION_TYPES.SET_WEB_WORKER:
      return { ...state, webWorker: payload.webWorker };
      break;
    case ACTION_TYPES.SET_SQUIGGLES:
      return { ...state, squiggles: payload.squiggles };
      break;
    case ACTION_TYPES.SET_FILE_BLOB:
      return { ...state, fileBlob: payload.fileBlob };
      break;
    default:
      return { ...initialState };
  }
};
