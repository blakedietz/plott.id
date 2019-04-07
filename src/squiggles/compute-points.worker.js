import {convertPixelsToSquiggles} from "./algorithms/pixels-to-squiggles";

self.addEventListener('message', (event) => {
    console.log('Worker received:', event.data);
    const squiggles = convertPixelsToSquiggles(event.data);
    self.postMessage({squiggles});
});
// self.postMessage('from Worker');