import type { Updatable, UpdatableOptions } from "../interfaces/updatable";
import CelestialObject from "../objects/CelestialObject";

class Pythagorean implements Updatable {
  public objects: Promise<CelestialObject>[];

  public constructor(data: Promise<CelestialObject>[]) {
    this.objects = data
      .filter(async (celestialObject) =>
        ["earth"].includes((await celestialObject).name)
      )
      .map(async (celestialObject) => {
        if ((await celestialObject).name === "earth") {
          (await celestialObject).distanceFromCenter = 0;
        }

        if ((await celestialObject).name === "sun") {
          (await celestialObject).distanceFromCenter = 1;
        }

        return celestialObject;
      });
  }

  public update({
    time,
    distanceDivider,
    scaleDivider,
    scene,
    timeStep,
  }: UpdatableOptions) {
    this.objects.forEach(async (object) => {
      (await object).update({
        time,
        distanceDivider: distanceDivider,
        scaleDivider: scaleDivider,
        scene,
        timeStep,
      });
    });
  }
}

export default Pythagorean;
