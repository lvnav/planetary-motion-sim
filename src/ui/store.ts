import { writable } from "svelte/store";
import type CelestialObject from "../objects/CelestialObject";

export const celestialObjectsStored =
  writable<Promise<CelestialObject>[]>(null);

export const simTime = writable(0);

export const timeStep = writable(1);

export const distanceDivider = writable(1000000);
export const scaleDivider = writable(10000);
