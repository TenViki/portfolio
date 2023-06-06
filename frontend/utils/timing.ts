export const wait = async (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const rgbToHex = (r: number, g: number, b: number) => {
  const componentToHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

// Given two colors of a gradient and a percentage, return the color at that percentage
// Path: src\utils\color.ts
export const getColorAtPercentage = (
  color1: string,
  color2: string,
  percentage: number
) => {
  const color1Rgb = hexToRgb(color1)!;
  const color2Rgb = hexToRgb(color2)!;

  const color1R = color1Rgb.r;
  const color1G = color1Rgb.g;
  const color1B = color1Rgb.b;

  const color2R = color2Rgb.r;
  const color2G = color2Rgb.g;
  const color2B = color2Rgb.b;

  const r = Math.floor(color1R + percentage * (color2R - color1R));
  const g = Math.floor(color1G + percentage * (color2G - color1G));
  const b = Math.floor(color1B + percentage * (color2B - color1B));

  return rgbToHex(r, g, b)!;
};
