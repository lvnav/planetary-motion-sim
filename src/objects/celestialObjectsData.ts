import type CelestialObject from "./CelestialObject";
import Planet from "./Planet";
import Star from "./Star";

export interface CelestialObjectData {
  name: string;
  modelPath: string;
  equatorialRadius: number; // km
  distanceFromCenter: number; // au
  defaultModel: typeof CelestialObject;
}

const celestialObjectsData = [
  {
    name: "sun",
    modelPath: `sun.glb`,
    distanceFromCenter: 0,
    equatorialRadius: 695700,
    defaultModel: Star,
  },
  {
    name: "mercury",
    modelPath: `mercury.glb`,
    distanceFromCenter: 0.4,
    equatorialRadius: 2439.7,
    defaultModel: Planet,
  },
  {
    name: "venus",
    modelPath: `venus.glb`,
    equatorialRadius: 6051.8,
    distanceFromCenter: 0.7,
    defaultModel: Planet,
  },
  {
    name: "earth",
    modelPath: `earth.glb`,
    distanceFromCenter: 1,
    equatorialRadius: 6371,
    defaultModel: Planet,
  },
  {
    name: "mars",
    modelPath: `mars.glb`,
    distanceFromCenter: 1.524,
    equatorialRadius: 3389.5,
    defaultModel: Planet,
  },
  {
    name: "jupiter",
    modelPath: `jupiter.glb`,
    distanceFromCenter: 5.2,
    equatorialRadius: 69911,
    defaultModel: Planet,
  },
  {
    name: "saturn",
    modelPath: `saturn.glb`,
    distanceFromCenter: 9.5,
    equatorialRadius: 58232,
    defaultModel: Planet,
  },
  {
    name: "uranus",
    modelPath: `uranus.glb`,
    distanceFromCenter: 19.8,
    equatorialRadius: 25559,
    defaultModel: Planet,
  },
  {
    name: "neptune",
    modelPath: `neptune.glb`,
    distanceFromCenter: 30,
    equatorialRadius: 24622,
    defaultModel: Planet,
  },
  {
    name: "pluto",
    modelPath: `pluto.glb`,
    distanceFromCenter: 39,
    equatorialRadius: 1188.3,
    defaultModel: Planet,
  },
] as const satisfies ReadonlyArray<CelestialObjectData>;

export default celestialObjectsData;
