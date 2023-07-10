import type { Coords } from "../interfaces/coords";
import CelestialObject, {
  type CelestialObjectOptions,
} from "./CelestialObject";

class Star extends CelestialObject {
  public constructor(options: CelestialObjectOptions) {
    super(options);
    this.eccentricity = options.eccentricity;
    this.semiMajorAxis = options.semiMajorAxis * 1000;
    this.semiMinorAxis =
      this.semiMajorAxis * Math.sqrt(1 - this.eccentricity ** 2);
  }

  public getInitialPosition(): Coords {
    return {
      x:
        Math.sqrt(this.semiMajorAxis ** 2 - this.semiMinorAxis ** 2) /
        this.distanceDivider,
      y: 0,
      z: 0,
    };
  }
}

export default Star;
