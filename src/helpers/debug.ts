import { Box3, Object3D } from "three";
import { type Coords } from "../interfaces/coords";

export function getObjectDimensions(object: Object3D): Coords {
  const meshBounds = new Box3().setFromObject(object);

  return {
    x: Math.abs(meshBounds.max.x - meshBounds.min.x),
    y: Math.abs(meshBounds.max.y - meshBounds.min.y),
    z: Math.abs(meshBounds.max.z - meshBounds.min.z),
  };
}
