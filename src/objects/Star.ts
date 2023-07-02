import { Group, type Object3D } from "three";
import CelestialObject, {
  type CelestialObjectOptions,
} from "./CelestialObject";

class Star extends CelestialObject {
  public constructor(options: CelestialObjectOptions) {
    super(options);

    this.model = this.createModelGroup(options.model);
    this.scene.add(this.model);
  }

  protected createModelGroup(model: Object3D[]): Group {
    const group = new Group();

    group.add(...model);

    return group;
  }

  public getCelestialObjectModel(): Object3D {
    return this.model.getObjectByName("celestialObject");
  }
}

export default Star;
