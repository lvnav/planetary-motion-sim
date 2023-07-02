import {
  BufferGeometry,
  Line,
  LineBasicMaterial,
  LineCurve3,
  Vector3,
} from "three";
import type { Coords } from "../interfaces/coords";

export function drawLine(from: Coords, to: Coords): Line {
  const material = new LineBasicMaterial({ color: 0x800080 });
  const geometry = new BufferGeometry().setFromPoints(
    new LineCurve3(
      new Vector3(from.x, from.y, from.z),
      new Vector3(to.x, to.y, to.z)
    ).getSpacedPoints(50)
  );

  return new Line(geometry, material);
}
