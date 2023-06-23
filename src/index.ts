import { clearCanvas } from "./helpers/draw";
import { degToRad, sinPeriod } from "./helpers/math";
import { Coords } from "./interfaces/coords";

function main() {
  const canvas = document.querySelector("canvas");
  const body = document.querySelector("body");

  if (canvas === null) {
    throw new Error("canvas is null !");
  }

  if (body === null) {
    throw new Error("body is null !");
  }

  const canvasDimensions: Coords = {
    x: (canvas.width = body.clientWidth),
    y: (canvas.height = body.clientHeight),
  };

  const context = initCanvas(canvas, canvasDimensions);

  loop(context, 0, canvasDimensions);
}

function initCanvas(
  canvas: HTMLCanvasElement,
  { x: width, y: height }: Coords
): CanvasRenderingContext2D {
  const context = canvas.getContext("2d");

  if (context === null) {
    throw new Error("canvasContext is null !");
  }

  context.fillStyle = "#2B2A33";
  context.fillRect(0, 0, width, height);

  context.translate(width / 2, height / 2);

  return context;
}

function loop(
  context: CanvasRenderingContext2D,
  loopIterator: number,
  canvasDimensions: Coords
): void {
  loopIterator += sinPeriod();

  clearCanvas(context, canvasDimensions);

  runPythagoreanModel({ context, loopIterator });

  requestAnimationFrame(() => loop(context, loopIterator, canvasDimensions));
}

function drawPlanet({
  context,
  radius,
  orbitalRadius,
  time,
  color,
  withOrbitCounter,
}: {
  context: CanvasRenderingContext2D;
  radius: number;
  orbitalRadius: number;
  time: number;
  color: string;
  withOrbitCounter?: boolean;
}) {
  const coords = {
    x: Math.cos(time) * orbitalRadius,
    y: Math.sin(time) * orbitalRadius,
  };
  const orbitCounter = Math.trunc(time / sinPeriod());

  drawDisk({
    context,
    radius,
    coords,
    color,
  });

  if (withOrbitCounter === true) {
    context.font = "24px serif";
    context.fillStyle = "black";
    context.fillText(`${orbitCounter} orbit(s)`, coords.x, coords.y);
  }
}

function drawDisk({
  context,
  radius,
  coords: { x, y },
  color,
}: {
  context: CanvasRenderingContext2D;
  radius: number;
  coords: Coords;
  color: string;
}) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, radius, degToRad(0), degToRad(360));
  context.fill();
  context.closePath();
}

function runPythagoreanModel({
  context,
  loopIterator,
}: {
  context: CanvasRenderingContext2D;
  loopIterator: number;
}): void {
  drawDisk({
    context,
    color: "red",
    radius: 10,
    coords: { x: 0, y: 0 },
  });

  drawPlanet({
    context,
    radius: 50,
    orbitalRadius: 300,
    color: "red",
    time: loopIterator / 60 / 60,
    withOrbitCounter: true,
  });

  drawPlanet({
    context,
    radius: 100,
    orbitalRadius: 500,
    color: "yellow",
    time: loopIterator / 60 / 60,
    withOrbitCounter: true,
  });
}
main();
