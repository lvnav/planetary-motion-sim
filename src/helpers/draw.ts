import { Coords } from "../interfaces/coords";

export function clearCanvas(
  context: CanvasRenderingContext2D,
  { x: width, y: height }: Coords
): void {
  context.save();
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, width, height);
  context.fillStyle = "#2B2A33";
  context.fillRect(0, 0, width, height);
  context.restore();
}
