import { Group, Object3D, Scene } from "three";
import { auToM } from "../helpers/math";
import { type Coords } from "../interfaces/coords";
import type { Updatable, UpdatableOptions } from "../interfaces/updatable";
import { type CelestialObjectData } from "./celestialObjectsData";
import { getObjectDimensions } from "../helpers/debug";

export type CelestialObjectOptions = CelestialObjectData & {
  model: Object3D[];
  scaleDivider: number;
  distanceDivider: number;
  scene: Scene;
};

export abstract class CelestialObject
  implements Omit<CelestialObjectData, "defaultModel">, Updatable
{
  public name: string;
  public modelPath: string;
  public model: Group;
  public distanceFromCenter: number;
  public equatorialRadius: number;
  public scaleDivider: number;
  public distanceDivider: number;
  public scale: Coords;
  public scene: Scene;
  public obliquity: number | null;

  public constructor(options: CelestialObjectOptions) {
    this.name = options.name;
    this.modelPath = options.modelPath;
    this.equatorialRadius = options.equatorialRadius;
    this.distanceFromCenter = options.distanceFromCenter;
    this.scaleDivider = options.scaleDivider;
    this.distanceDivider = options.distanceDivider;
    this.scene = options.scene;
    this.obliquity = options.obliquity;
  }

  public getInitialPosition(): Coords {
    return {
      x: auToM(this.distanceFromCenter) / this.distanceDivider,
      y: 0,
      z: 0,
    };
  }

  public getScale(): Coords {
    return this.scale;
  }

  public updateScale(): this {
    this.scale = {
      x: Math.round(this.equatorialRadius / this.scaleDivider),
      y: Math.round(this.equatorialRadius / this.scaleDivider),
      z: Math.round(this.equatorialRadius / this.scaleDivider),
    };

    const { x, y, z } = this.getScale();
    this.model.children.forEach((modelPart) => {
      modelPart.scale.set(x, y, z);
    });

    return this;
  }

  public async update({
    scaleDivider,
    distanceDivider,
  }: UpdatableOptions): Promise<void> {
    if (this.distanceDivider !== distanceDivider) {
      this.setDistanceDivider(distanceDivider);
    }
    if (this.scaleDivider !== scaleDivider) {
      this.setScaleDivider(scaleDivider);
      this.updateScale();
    }
  }

  public setScaleDivider(scaleDivider: number): this {
    this.scaleDivider = scaleDivider;

    return this;
  }

  public setDistanceDivider(distanceDivider: number): this {
    this.distanceDivider = distanceDivider;

    return this;
  }
}

export default CelestialObject;
