import type { Line } from "three";
import type { Updatable, UpdatableOptions } from "../interfaces/updatable";
import type CelestialObject from "../objects/CelestialObject";

class Circle implements Updatable {
  public objects: Promise<CelestialObject>[];
  public oldLines?: Line[];

  public constructor(data: Promise<CelestialObject>[]) {
    this.objects = data;
  }

  public update({
    time,
    distanceDivider,
    scaleDivider,
    scene,
  }: UpdatableOptions) {
    this.objects.forEach(async (object) => {
      (await object).update({
        time,
        distanceDivider: distanceDivider,
        scaleDivider: scaleDivider,
        scene,
      });
    });
  }
}

export default Circle;
