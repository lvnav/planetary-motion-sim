import { Object3D } from "three";
import { auToPixels } from "../helpers/math";
import { type Coords } from "../interfaces/coords";
import { type CelestialObjectData } from "./celestialObjectData";

export const distanceDivider = 20;
export const scaleFactor = 50;

export class CelestialObject implements Renderable {
  public name: string;
  public modelPath: string;
  public model: Object3D[];
  public rotate?: boolean;
  public distanceFromSun: number;
  protected relativeScaleFromSun: number;

  public constructor(data: CelestialObjectData & { model: Object3D[] }) {
    this.name = data.name;
    this.modelPath = data.modelPath;
    this.relativeScaleFromSun = data.relativeScaleFromSun;
    this.distanceFromSun = data.distanceFromSun;
    this.model = data.model;
    this.rotate = data.rotate;

    const { x, y, z } = this.getScale();
    this.model.forEach((modelPart) => {
      modelPart.scale.set(1, 1, 1);
      modelPart.position.x = this.getInitialPosition().x;
    });
  }

  public getInitialPosition(): Coords {
    return {
      x: auToPixels(this.distanceFromSun) / distanceDivider,
      y: 0,
      z: 0,
    };
  }

  public getScale(): Coords {
    return {
      x: this.relativeScaleFromSun * scaleFactor,
      y: this.relativeScaleFromSun * scaleFactor,
      z: this.relativeScaleFromSun * scaleFactor,
    };
  }

  public async update(time: number): Promise<void> {
    if (this.rotate !== false) {
      this.model.forEach((modelPart) => {
        modelPart.position.x =
          (Math.cos(time / 60 / 60) * auToPixels(this.distanceFromSun)) /
          distanceDivider;

        modelPart.position.y =
          (Math.sin(time / 60 / 60) * auToPixels(this.distanceFromSun)) /
          distanceDivider;
      });
    }
  }
}

export default CelestialObject;
