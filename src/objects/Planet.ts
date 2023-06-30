import {
  BufferAttribute,
  BufferGeometry,
  LineBasicMaterial,
  LineLoop,
  Path,
  Points,
  PointsMaterial,
  Scene,
} from "three";
import { drawLine } from "../helpers/draw";
import { auToM, degToRad } from "../helpers/math";
import type { Movable } from "../interfaces/movable";
import type { Trackable } from "../interfaces/trackable";
import type { UpdatableOptions } from "../interfaces/updatable";
import CelestialObject, {
  type CelestialObjectOptions,
} from "./CelestialObject";

class Planet extends CelestialObject implements Movable, Trackable {
  private oldTrace = undefined;
  public pathway?: LineLoop;

  public constructor(options: CelestialObjectOptions) {
    super(options);
    this.scene.add(this.buildPathway());
  }

  public async update(options: UpdatableOptions): Promise<void> {
    super.update(options);
    this.move(options.time);
    this.trace(options.scene);

    const dotGeometry = new BufferGeometry();
    dotGeometry.setAttribute(
      "position",
      new BufferAttribute(new Float32Array(this.model[0].position.toArray()), 3)
    );
    const dotMaterial = new PointsMaterial({ size: 100, color: 0x0000ff });
    const dot = new Points(dotGeometry, dotMaterial);
    options.scene.add(dot);
  }

  public moveX(time: number) {
    return (
      (Math.cos(time / 60 / 60) * auToM(this.distanceFromCenter)) /
      this.distanceDivider
    );
  }

  public moveY(time: number) {
    return (
      (Math.sin(time / 60 / 60) * auToM(this.distanceFromCenter)) /
      this.distanceDivider
    );
  }

  public move(time: number) {
    this.model.forEach((modelPart) => {
      modelPart.position.x = this.moveX(time) + 500000;

      modelPart.position.z = this.moveY(time) + 500000;
    });
  }

  public buildPathway(): LineLoop {
    const material = new LineBasicMaterial({ color: 0x0000ff });
    const geometry = new BufferGeometry().setFromPoints(
      new Path()
        .absarc(
          0,
          0,
          auToM(this.distanceFromCenter) / this.distanceDivider,
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
    this.pathway.geometry.setFromPoints(
      new Path()
        .absarc(
          0,
          0,
          auToM(this.distanceFromCenter) / this.distanceDivider,
          0,
          Math.PI * 2,
          false
        )
        .getSpacedPoints(50)
    );
    this.pathway.geometry.rotateX(degToRad(90));
    this.pathway.geometry.attributes.position.needsUpdate = true;
  }

  public setDistanceDivider(distanceDivider: number): this {
    super.setDistanceDivider(distanceDivider);
    this.refreshPathway();

    return this;
  }

  public trace(scene: Scene) {
    const trace = drawLine(this.model[0].position, {
      x: 0,
      y: 0,
      z: 0,
    });

    if (this.oldTrace !== undefined) {
      scene.remove(this.oldTrace);
    }

    scene.add(trace);

    this.oldTrace = trace;
  }
}

export default Planet;
