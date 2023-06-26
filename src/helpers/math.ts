import { EARTH_SUN_DISTANCE_IN_M } from "../constants/astronomical";

export function degToRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function radToDeg(radians: number): number {
  return (radians * 180) / Math.PI;
}

export function sinPeriod(): number {
  return Math.PI * 2;
}

export function mToAu(m: number): number {
  return m * (1 / EARTH_SUN_DISTANCE_IN_M);
}

export function auToM(au: number): number {
  return au * EARTH_SUN_DISTANCE_IN_M;
}

export function findHypotenuse(opposite: number, adjacent: number): number {
  return Math.sqrt(opposite ** 2 + adjacent ** 2);
}
