export interface CelestialObjectData {
  name: string;
  modelPath: string;
  relativeScaleFromSun: number;
  distanceFromSun: number;
  rotate?: boolean;
}

const celestialObjectsData = [
  {
    name: "sun",
    modelPath: `sun.glb`,
    distanceFromSun: 0,
    relativeScaleFromSun: 1,
    rotate: false,
  },
  {
    name: "mercury",
    modelPath: `mercury.glb`,
    relativeScaleFromSun: 1 / 227,
    distanceFromSun: 0.4,
  },
  {
    name: "venus",
    modelPath: `venus.glb`,
    relativeScaleFromSun: 1 / 115,
    distanceFromSun: 0.7,
  },
  {
    name: "earth",
    modelPath: `earth.glb`,
    relativeScaleFromSun: 1 / 109,
    distanceFromSun: 1,
  },
  {
    name: "mars",
    modelPath: `mars.glb`,
    relativeScaleFromSun: 1 / 207,
    distanceFromSun: 1.524,
  },
  {
    name: "jupiter",
    modelPath: `jupiter.glb`,
    relativeScaleFromSun: 1 / 10,
    distanceFromSun: 5.2,
  },
  {
    name: "saturn",
    modelPath: `saturn.glb`,
    relativeScaleFromSun: 1 / 12,
    distanceFromSun: 9.5,
  },
  {
    name: "uranus",
    modelPath: `uranus.glb`,
    relativeScaleFromSun: 1 / 27.4,
    distanceFromSun: 19.8,
  },
  {
    name: "neptune",
    modelPath: `neptune.glb`,
    relativeScaleFromSun: 1 / 27.7,
    distanceFromSun: 30,
  },
  {
    name: "pluto",
    modelPath: `pluto.glb`,
    relativeScaleFromSun: 1 / 585,
    distanceFromSun: 39,
  },
] as const satisfies ReadonlyArray<CelestialObjectData>;

export default celestialObjectsData;
