export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const statusUpdate = async (message: string, isRunning: boolean) => {
  await delay(1000);

  console.log('CSS Sound: ', message);

  chrome.runtime.sendMessage({
    type: 'STATUS_UPDATE',
    statusText: message,
    isRunning,
  });

  return message;
};

export const isNonZero = (arr: number[]) => {
  let isNotZero = false;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      isNotZero = true;
      break;
    }
  }
  return isNotZero;
};

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

export const getElementDimensionsPx = (element: any) => {
  var width = element.offsetWidth;
  var height = element.offsetHeight;

  return {
    width: width,
    height: height,
  };
};
