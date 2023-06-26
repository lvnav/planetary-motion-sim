import {
  BufferGeometry,
  LineBasicMaterial,
  LineLoop,
  Object3D,
  Path,
} from "three";
import { auToM, degToRad } from "../helpers/math";
import { type Coords } from "../interfaces/coords";
import { type CelestialObjectData } from "./celestialObjectData";

export class CelestialObject implements CelestialObjectData {
  public name: string;
  public modelPath: string;
  public model: Object3D[];
  public rotate?: boolean;
  public distanceFromSun: number;
  public equatorialRadius: number;
  public pathway?: LineLoop;
  public scaleDivider: number;
  public distanceDivider: number;
  public scale: Coords;

  public constructor(
    data: CelestialObjectData & {
      model: Object3D[];
      scaleDivider: number;
      distanceDivider: number;
    }
  ) {
    this.name = data.name;
    this.modelPath = data.modelPath;
    this.equatorialRadius = data.equatorialRadius;
    this.distanceFromSun = data.distanceFromSun;
    this.model = data.model;
    this.rotate = data.rotate;
    this.scaleDivider = data.scaleDivider;
    this.distanceDivider = data.distanceDivider;
    this.updateScale();
  }

  public getInitialPosition(): Coords {
    return {
      x: auToM(this.distanceFromSun) / this.distanceDivider,
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
    this.model.forEach((modelPart) => {
      modelPart.scale.set(x, y, z);
      console.dir({
        scale: modelPart.scale,
        pos: modelPart.position,
        name: this.name,
      });
    });

    return this;
  }

  public async update({
    time,
    scaleDivider,
    distanceDivider,
  }: {
    time: number;
    scaleDivider: number;
    distanceDivider: number;
  }): Promise<void> {
    if (this.distanceDivider !== distanceDivider) {
      this.setDistanceDivider(distanceDivider);
    }

    if (this.scaleDivider !== scaleDivider) {
      this.setScaleDivider(scaleDivider);
      this.updateScale();
    }

    if (this.rotate !== false) {
      this.model.forEach((modelPart) => {
        modelPart.position.x =
          (Math.cos(time / 60 / 60) * auToM(this.distanceFromSun)) /
          this.distanceDivider;

        modelPart.position.z =
          (Math.sin(time / 60 / 60) * auToM(this.distanceFromSun)) /
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
          auToM(this.distanceFromSun) / this.distanceDivider,
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
            auToM(this.distanceFromSun) / this.distanceDivider,
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

  public setScaleDivider(scaleDivider: number): this {
    this.scaleDivider = scaleDivider;

    return this;
  }

  public setDistanceDivider(distanceDivider: number): this {
    this.distanceDivider = distanceDivider;
    this.refreshPathway();

    return this;
  }
}

export default CelestialObject;
