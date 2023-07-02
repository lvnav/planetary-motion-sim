import {
  BufferGeometry,
  CircleGeometry,
  DoubleSide,
  Group,
  Line,
  LineBasicMaterial,
  LineLoop,
  Mesh,
  MeshBasicMaterial,
  Object3D,
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
import { getObjectDimensions } from "../helpers/debug";

class Planet extends CelestialObject implements Movable, Trackable {
  private oldTrace = undefined;
  public pathway?: LineLoop;
  public celestialEquator?: Mesh;
  public ecliptic?: Mesh;
  public rotationAxisLine?: Line;

  public constructor(options: CelestialObjectOptions) {
    super(options);

    this.pathway = this.buildPathway();
    this.scene.add(this.pathway);
    this.model = this.createModelGroup(options.model);
    this.scene.add(this.model);

    this.applyObliquity();
  }

  public async update(options: UpdatableOptions): Promise<void> {
    super.update(options);
    this.move(options.time);

    this.trace(options.scene);

    // const dotGeometry = new BufferGeometry();
    // dotGeometry.setAttribute(
    //   "position",
    //   new BufferAttribute(new Float32Array(this.model[0].position.toArray()), 3)
    // );
    // const dotMaterial = new PointsMaterial({ size: 100, color: 0x0000ff });
    // const dot = new Points(dotGeometry, dotMaterial);
    // options.scene.add(dot);
    //

    if (options.timeStep !== 0) {
      this.getCelestialObjectModel().rotateY(degToRad(1));
    }
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
    this.model.position.x = this.moveX(time);
    this.model.position.z = this.moveY(time);
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
    geometry.rotateX(degToRad(-this.obliquity));
    geometry.rotateX(degToRad(90));

    const pathway = new LineLoop(geometry, material);
    pathway.name = "pathway";

    return pathway;
  }

  public refreshPathway() {
    this.getPathwayModel().geometry.setFromPoints(
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
    this.getPathwayModel().geometry.rotateX(degToRad(90));
    this.getPathwayModel().geometry.attributes.position.needsUpdate = true;
  }

  public setDistanceDivider(distanceDivider: number): this {
    super.setDistanceDivider(distanceDivider);

    this.refreshPathway();

    return this;
  }

  public trace(scene: Scene) {
    const trace = drawLine(this.model.position, {
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

  private applyObliquity(): void {
    this.model.rotateX(degToRad(this.obliquity));
  }

  private buildRotationAxisLine(model: Object3D[]): Line {
    const midLineLength = 1000000000;
    const rotationAxis = drawLine(
      {
        x: model[0].position.x,
        y: model[0].position.y - midLineLength,
        z: model[0].position.z,
      },
      {
        x: model[0].position.x,
        y: model[0].position.y + midLineLength,
        z: model[0].position.z,
      }
    );

    rotationAxis.name = "rotationAxis";
    this.rotationAxisLine = rotationAxis;

    return rotationAxis;
  }

  private buildCelestialEquator(model: Object3D[]): Mesh {
    const objectDimensions = getObjectDimensions(model[0]);

    const geometry = new CircleGeometry(objectDimensions.x * 5, 50);
    geometry.rotateX(degToRad(90));
    const material = new MeshBasicMaterial({
      color: 0x556b2f,
      side: DoubleSide,
      wireframe: true,
    });
    const circle = new Mesh(geometry, material);
    circle.name = "celestialEquator";
    this.celestialEquator = circle;

    return circle;
  }

  private buildEcliptic(model: Object3D[]): Mesh {
    const objectDimensions = getObjectDimensions(model[0]);

    const geometry = new CircleGeometry(objectDimensions.x * 5, 50);
    geometry.rotateX(degToRad(-this.obliquity));
    geometry.rotateX(degToRad(90));
    const material = new MeshBasicMaterial({
      color: 0xff69b4,
      side: DoubleSide,
      wireframe: true,
    });
    const circle = new Mesh(geometry, material);
    circle.name = "ecliptic";
    this.ecliptic = circle;

    return circle;
  }

  protected createModelGroup(model: Object3D[]): Group {
    const group = new Group();

    group.add(
      ...model,
      this.buildCelestialEquator(model),
      this.buildRotationAxisLine(model),
      this.buildEcliptic(model)
    );

    return group;
  }

  public getCelestialObjectModel(): Object3D {
    return this.model.getObjectByName("celestialObject");
  }

  public getRotationAxisLineModel(): Object3D {
    return this.model.getObjectByName("rotationAxis");
  }

  public getCelestialEquatorModel(): Object3D {
    return this.model.getObjectByName("celestialEquator");
  }

  public getEcliptic(): Object3D {
    return this.model.getObjectByName("ecliptic");
  }

  public getPathwayModel(): LineLoop {
    return this.pathway;
  }
}

export default Planet;
