import {
  EARTH_SUN_DISTANCE_IN_M,
  SUN_DIAMETER_IN_M,
} from "../constants/astronomical";

const sunDiameterInPixel = 1000;

export function degToRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function radToDeg(radians: number): number {
  return (radians * 180) / Math.PI;
}

export function sinPeriod(): number {
  return Math.PI * 2;
}

export function mToPixels(m: number): number {
  return m * (sunDiameterInPixel / SUN_DIAMETER_IN_M);
}

export function pixelsToM(pixels: number): number {
  return pixels * (SUN_DIAMETER_IN_M / sunDiameterInPixel);
}

export function mToAu(m: number): number {
  return m * (1 / EARTH_SUN_DISTANCE_IN_M);
}

export function auToM(au: number): number {
  return au * (EARTH_SUN_DISTANCE_IN_M / 1);
}

export function auToPixels(au: number): number {
  return mToPixels(auToM(au));
}
