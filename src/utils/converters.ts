export const toRGBA = (color: string) => {
  // Create a temporary canvas element to use for color conversion
  let canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  let ctx = canvas.getContext('2d');

  if (!ctx) return [0, 0, 0, 0];
  // Set the background color of the canvas to the input color
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);

  // Get the pixel data from the canvas
  let data = ctx.getImageData(0, 0, 1, 1).data;

  // Convert the pixel data to RGBA format
  return [data[0], data[1], data[2], data[3] / 255];
};

export const getElementDimensionsPx = (element: HTMLElement) => {
  var width = element.offsetWidth;
  var height = element.offsetHeight;

  return {
    width: width,
    height: height,
  };
};

export const convertCSSValuesToUseableFormats = (
  dims: { width: number; height: number },
  colors: { rgbaBGColor: number[]; rgbaColor: number[] }
) => ({
  isTall: dims.height >= dims.width,
  isWide: dims.width >= dims.height,
  bgColorResolvedValue: Math.floor(
    colors.rgbaBGColor.reduce((a: number, c: number) => a + c, 0) / 4
  ),
  colorResolvedValue: Math.floor(
    colors.rgbaColor.reduce((a: number, c: number) => a + c, 0) / 4
  ),
});
