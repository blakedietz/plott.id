export const saveSVG = (selector, fileName) => {
  const svgDoctype =
    '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
  // serialize our SVG XML to a string.
  const svgRef = document.querySelector(selector);
  const svgString = new XMLSerializer().serializeToString(svgRef);
  const blob = new Blob([svgDoctype + svgString], {
    type: 'image/svg+xml;charset=utf-8',
  });
  /* This portion of script saves the file to local filesystem as a download */
  const svgUrl = URL.createObjectURL(blob);
  const downloadLink = document.createElement('a');
  downloadLink.href = svgUrl;
  downloadLink.download = `${fileName}-${Date.now()}.svg`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};
