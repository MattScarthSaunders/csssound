import { getElementDimensionsPx, toRGBA } from './converters';

export const fetchCSSProperties = (element: Element) => {
  const style = window.getComputedStyle(element);
  let rgbaBGColor = toRGBA(style.backgroundColor);
  let rgbaColor = toRGBA(style.color);
  const dims = getElementDimensionsPx(element);

  return { dims, colors: { rgbaBGColor, rgbaColor } };
};
