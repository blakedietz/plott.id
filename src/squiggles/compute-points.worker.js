import {convertPixelsToSquiggles} from "./algorithms/pixels-to-squiggles";

self.addEventListener('message', (event) => {
    const squiggles = convertPixelsToSquiggles(event.data);
    self.postMessage({squiggles});
});
