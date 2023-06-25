import { writable } from "svelte/store";
import { sinPeriod } from "../helpers/math";
import CelestialObject from "../models/celestialObjects";

export const celestialObjectsStored =
  writable<Promise<CelestialObject>[]>(null);

export const simTime = writable(0);

export const timeStep = writable(sinPeriod());
