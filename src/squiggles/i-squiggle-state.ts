import {IPixelToSquiggleAlgorithmParams} from "./algorithms/pixels-to-squiggles";

export interface ISquigglesState {
    uiState: {
        imageUri: string,
        loadedImage: string,
        drawerOpen: boolean,
        debugMode: boolean,
        scale: number
    },
    algorithmParams: IPixelToSquiggleAlgorithmParams,
    squiggles: []
    webWorker: Object | null
}