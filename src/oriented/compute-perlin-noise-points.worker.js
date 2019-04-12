import { orientedAlgorithm } from './algorithms';

self.addEventListener('message', ({ data: { count, width, height } }) => {
  const lines = orientedAlgorithm(count, width, height);
  self.postMessage({ lines });
});
