export interface CelestialObjectData {
  name: string;
  modelPath: string;
  equatorialRadius: number; // km
  distanceFromSun: number;
  rotate?: boolean;
}

const celestialObjectsData = [
  {
    name: "sun",
    modelPath: `sun.glb`,
    distanceFromSun: 0,
    equatorialRadius: 695700,
    rotate: false,
  },
  // {
  //   name: "mercury",
  //   modelPath: `mercury.glb`,
  //   distanceFromSun: 0.4,
  //   equatorialRadius: 2439.7,
  // },
  // {
  //   name: "venus",
  //   modelPath: `venus.glb`,
  //   equatorialRadius: 6051.8,
  //   distanceFromSun: 0.7,
  // },
  {
    name: "earth",
    modelPath: `earth.glb`,
    distanceFromSun: 1,
    equatorialRadius: 6371,
  },
  // {
  //   name: "mars",
  //   modelPath: `mars.glb`,
  //   distanceFromSun: 1.524,
  //   equatorialRadius: 3389.5,
  // },
  {
    name: "jupiter",
    modelPath: `jupiter.glb`,
    distanceFromSun: 5.2,
    equatorialRadius: 69911,
  },
  // {
  //   name: "saturn",
  //   modelPath: `saturn.glb`,
  //   distanceFromSun: 9.5,
  //   equatorialRadius: 58232,
  // },
  // {
  //   name: "uranus",
  //   modelPath: `uranus.glb`,
  //   distanceFromSun: 19.8,
  //   equatorialRadius: 25559,
  // },
  // {
  //   name: "neptune",
  //   modelPath: `neptune.glb`,
  //   distanceFromSun: 30,
  //   equatorialRadius: 24622,
  // },
  // {
  //   name: "pluto",
  //   modelPath: `pluto.glb`,
  //   distanceFromSun: 39,
  //   equatorialRadius: 1188.3,
  // },
] as const satisfies ReadonlyArray<CelestialObjectData>;

export default celestialObjectsData;
