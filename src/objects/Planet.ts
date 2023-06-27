import {
  BufferGeometry,
  LineBasicMaterial,
  LineLoop,
  Path,
  Scene,
} from "three";
import { drawLine } from "../helpers/draw";
import { auToM, degToRad } from "../helpers/math";
import type { Movable } from "../interfaces/movable";
import type { Trackable } from "../interfaces/trackable";
import type { UpdatableOptions } from "../interfaces/updatable";
import CelestialObject from "./CelestialObject";

class Planet extends CelestialObject implements Movable, Trackable {
  private oldTrace = undefined;

  public async update(options: UpdatableOptions): Promise<void> {
    super.update(options);
    this.move(options.time);
    this.trace(options.scene);
  }

  public move(time: number) {
    if (this.rotate !== false) {
      this.model.forEach((modelPart) => {
        modelPart.position.x =
          (Math.cos(time / 60 / 60) * auToM(this.distanceFromCenter)) /
          this.distanceDivider;

        modelPart.position.z =
          (Math.sin(time / 60 / 60) * auToM(this.distanceFromCenter)) /
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
    if (this.pathway !== undefined) {
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
