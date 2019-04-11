export const convertImageToCanvasBlob = file => {
  return new Promise((resolve, reject) => {
    /*
     * Note that the image and canvas tags are never shown on screen, they're only used to gather data about the
     * uploaded image.
     *
     * 1. Create a canvas tag to get data from the uploaded image.
     * 2. Create an image tag to load the image that was uploaded into the canvas.
     * 3. Create a file reader to load the image as a data url into the image tag
     * 4. Once the image has loaded draw the image on the canvas.
     * 5. Convert the canvas info to data that can be consumed.
     */

    // Create a canvas element that will not be put on the screen
    const canvas = document.createElement('canvas');
    // Get a context to compute information about the canvas
    const context = canvas.getContext('2d');

    // Create a new image that will not be rendered to screen
    const img = new Image();
    img.addEventListener(
      'load',
      ({ target: { naturalWidth, naturalHeight } }) => {
        /*
         * Set the canvas dimensions here before rendering. This is important otherwise if no dimensions are set, no
         * data will be available when calling getImageData.
         */
        canvas.width = naturalWidth;
        canvas.height = naturalHeight;
        // Add the image to the canvas
        context.drawImage(img, 0, 0);
        // Extract the data from the canvas
        const pixelData = context.getImageData(
          0,
          0,
          naturalWidth,
          naturalHeight,
        );
        resolve({ pixelData, width: canvas.width, height: canvas.height });
      },
    );

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      // dispatch(ACTION_CREATORS.setUiState({loadedImage: reader.result}));
      img.src = reader.result;
    });
    reader.readAsDataURL(file);
  });
};
