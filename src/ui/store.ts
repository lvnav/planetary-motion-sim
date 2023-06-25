import { writable } from "svelte/store";
import CelestialObject from "../models/celestialObjects";

export const celestialObjectsStored =
  writable<Promise<CelestialObject>[]>(null);
