import {convertPixelsToSquiggles} from "./algorithms/squiggile-visualization";

self.addEventListener('message', (event) => {
    console.log('Worker received:', event.data);
    const squiggles = convertPixelsToSquiggles(event.data);
    self.postMessage({squiggles});
});
// self.postMessage('from Worker');