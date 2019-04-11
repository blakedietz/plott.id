export interface IPixelToSquiggleAlgorithmParams {
  amplitude: number;
  black: boolean;
  brightness: number;
  contrast: number;
  frequency: number;
  height: number;
  lineCount: number;
  maxBrightness: number;
  minBrightness: number;
  pixels: [Object] | [];
  spacing: number;
  width: number;
}

export const convertPixelsToSquiggles = (
  visParams: IPixelToSquiggleAlgorithmParams,
) => {
  const {
    amplitude,
    black,
    brightness,
    contrast,
    frequency,
    height,
    lineCount,
    maxBrightness,
    minBrightness,
    pixels,
    spacing,
    width,
  } = visParams;

  // Create some defaults for squiggle-point array
  let squiggleData = [];
  let r = 5;
  let a = 0;
  let b;
  let z;

  // Create empty array for storing x,y coordinate pairs
  let currentLine = [];
  let currentVerticalPixelIndex = 0;
  let currentHorizontalPixelIndex = 0;

  // This was established through experiments
  const contrastFactor = (259 * (contrast + 255)) / (255 * (259 - contrast));

  // Number of pixels to advance in vertical direction
  // TODO: (bdietz) - this doesn't make any sense, why is it called horizontal line spacing?
  let verticalLineSpacing = Math.floor(height / lineCount);

  // Iterate line by line (top line to bottom line) in increments of horizontalLineSpacing
  for (let y = 0; y < height; y += verticalLineSpacing) {
    a = 0;
    // Start the line
    currentLine = [[0, y]];
    /*
         * Because Image Pixel array is of length width * height,
         * starting pixel for each line will be this
         */
    currentVerticalPixelIndex = y * width;

    // Loop through pixels from left to right within the current line, advancing by increments of config.SPACING
    for (let x = spacing; x < width; x += spacing) {
      currentHorizontalPixelIndex = Math.floor(x + currentVerticalPixelIndex); // Get array position of current pixel
      // When there is contrast adjustment, the calculations of brightness values are a bit different
      if (contrast !== 0) {
        // Determine how bright a pixel is, from 0 to 255 by summing three channels (R,G,B) multiplied by some coefficients
        b =
          0.2125 *
            (contrastFactor *
              (pixels.data[4 * currentHorizontalPixelIndex] - 128) +
              128 +
              brightness) +
          0.7154 *
            (contrastFactor *
              (pixels.data[4 * (currentHorizontalPixelIndex + 1)] - 128) +
              128 +
              brightness) +
          0.0721 *
            (contrastFactor *
              (pixels.data[4 * (currentHorizontalPixelIndex + 2)] - 128) +
              128 +
              brightness);
      } else {
        b =
          0.2125 * (pixels.data[4 * currentHorizontalPixelIndex] + brightness) +
          0.7154 *
            (pixels.data[4 * (currentHorizontalPixelIndex + 1)] + brightness) +
          0.0721 *
            (pixels.data[4 * (currentHorizontalPixelIndex + 2)] + brightness);
      }
      if (black) {
        // Set minimum line curvature to value set by the user
        b = Math.min(255 - minBrightness, 255 - b);
        // Set maximum line curvature to value set by the user
        z = Math.max(maxBrightness - b, 0);
      } else {
        // Set minimum line curvature to value set by the user
        b = Math.max(minBrightness, b);
        // Set maximum line curvature to value set by the user
        z = Math.max(maxBrightness - b, 0);
      }
      // The magic of the script, determines how high / low the squiggle goes
      r = (amplitude * z) / lineCount;
      a += z / frequency;
      currentLine.push([x, y + Math.sin(a) * r]);
    }
    squiggleData.push(currentLine);
  }
  return squiggleData;
};
