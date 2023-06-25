import {
  BufferGeometry,
  LineBasicMaterial,
  LineLoop,
  Object3D,
  Path,
} from "three";
import { auToPixels, degToRad } from "../helpers/math";
import { type Coords } from "../interfaces/coords";
import { type CelestialObjectData } from "./celestialObjectData";

export class CelestialObject {
  public name: string;
  public modelPath: string;
  public model: Object3D[];
  public rotate?: boolean;
  public distanceFromSun: number;
  protected relativeScaleFromSun: number;
  public pathway?: LineLoop;
  public pathwayHasChanged?: boolean;
  public scaleFactor: number;
  public distanceDivider: number;
  public scale: Coords;

  public constructor(
    data: CelestialObjectData & {
      model: Object3D[];
      scaleFactor: number;
      distanceDivider: number;
    }
  ) {
    this.name = data.name;
    this.modelPath = data.modelPath;
    this.relativeScaleFromSun = data.relativeScaleFromSun;
    this.distanceFromSun = data.distanceFromSun;
    this.model = data.model;
    this.rotate = data.rotate;
    this.scaleFactor = data.scaleFactor;
    this.distanceDivider = data.distanceDivider;
    this.updateScale();
  }

  public getInitialPosition(): Coords {
    return {
      x: auToPixels(this.distanceFromSun) / this.distanceDivider,
      y: 0,
      z: 0,
    };
  }

  public getScale(): Coords {
    return this.scale;
  }

  public updateScale(): this {
    this.scale = {
      x: this.relativeScaleFromSun * this.scaleFactor,
      y: this.relativeScaleFromSun * this.scaleFactor,
      z: this.relativeScaleFromSun * this.scaleFactor,
    };

    const { x, y, z } = this.getScale();
    this.model.forEach((modelPart) => {
      modelPart.scale.set(x, y, z);
      modelPart.position.x = this.getInitialPosition().x;
    });

    return this;
  }

  public async update({
    time,
    scaleFactor,
    distanceDivider,
  }: {
    time: number;
    scaleFactor: number;
    distanceDivider: number;
  }): Promise<void> {
    if (this.distanceDivider !== distanceDivider) {
      this.setDistanceDivider(distanceDivider);
    }

    if (this.scaleFactor !== scaleFactor) {
      this.setScaleFactor(scaleFactor);
      this.updateScale();
    }

    if (this.rotate !== false) {
      this.model.forEach((modelPart) => {
        modelPart.position.x =
          (Math.cos(time / 60 / 60) * auToPixels(this.distanceFromSun)) /
          this.distanceDivider;

        modelPart.position.z =
          (Math.sin(time / 60 / 60) * auToPixels(this.distanceFromSun)) /
          this.distanceDivider;
      });
    }
  }

  public buildPathway(): LineLoop {
    const material = new LineBasicMaterial({ color: 0x0000ff });
    const geometry = new BufferGeometry().setFromPoints(
      new Path()
        .absarc(
          0,
          0,
          auToPixels(this.distanceFromSun) / this.distanceDivider,
          0,
          Math.PI * 2,
          false
        )
        .getSpacedPoints(50)
    );
    geometry.rotateX(degToRad(90));

    const pathway = new LineLoop(geometry, material);
    this.pathway = pathway;

    return pathway;
  }

  public refreshPathway() {
    if (this.pathway !== undefined) {
      this.pathway.geometry.setFromPoints(
        new Path()
          .absarc(
            0,
            0,
            auToPixels(this.distanceFromSun) / this.distanceDivider,
            0,
            Math.PI * 2,
            false
          )
          .getSpacedPoints(50)
      );
      this.pathway.geometry.rotateX(degToRad(90));
      this.pathway.geometry.attributes.position.needsUpdate = true;
    }
  }

  public setScaleFactor(scaleFactor: number): this {
    this.scaleFactor = scaleFactor;

    return this;
  }

  public setDistanceDivider(distanceDivider: number): this {
    this.distanceDivider = distanceDivider;
    this.refreshPathway();
    this.pathwayHasChanged = true;

    return this;
  }
}

export default CelestialObject;
