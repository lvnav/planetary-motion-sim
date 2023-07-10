import {
  BufferGeometry,
  EllipseCurve,
  Line,
  LineBasicMaterial,
  Path,
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
  public pathway?: Line;
  public linearSpeed: number = 0;
  public angularSpeed: number = 0;
  public type = "planet";

  public constructor(options: CelestialObjectOptions) {
    super(options);
    this.scene.add(this.buildPathway());
    this.eccentricity = options.eccentricity;
    this.semiMajorAxis = options.semiMajorAxis * 1000;
    this.semiMinorAxis =
      this.semiMajorAxis * Math.sqrt(1 - this.eccentricity ** 2);
  }

  public async update(options: UpdatableOptions): Promise<void> {
    super.update(options);
    this.move(options.time);
    this.trace(options.scene);
    this.setAngularSpeed(options.time);
    this.setLinearSpeed();
  }

  public move(time: number) {
    this.model.forEach((modelPart) => {
      modelPart.position.x =
        (Math.cos(time / 60 / 60) * this.semiMajorAxis) / this.distanceDivider;

      modelPart.position.z =
        (Math.sin(time / 60 / 60) * this.semiMinorAxis) / this.distanceDivider;
    });
  }

  public buildPathway(): Line {
    const curve = new EllipseCurve(
      0,
      0,
      this.semiMajorAxis,
      this.semiMinorAxis
    );

    const points = curve.getPoints(1000000);
    const geometry = new BufferGeometry().setFromPoints(points);

    const material = new LineBasicMaterial({ color: 0xff0000 });

    const ellipse = new Line(geometry, material);
    this.pathway = ellipse;

    return ellipse;
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

  public setAngularSpeed(time: number) {
    const theta = time / 60 / 60;
    this.angularSpeed = theta / time;
  }

  public setLinearSpeed() {
    this.linearSpeed = this.angularSpeed * this.equatorialRadius;
  }
}

export default Planet;
