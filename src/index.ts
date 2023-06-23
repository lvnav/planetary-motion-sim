import { degToRad } from "./helpers";
import { clearCanvas } from "./helpers/draw";
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

  const context = init(canvas, canvasDimensions);

  const renderingTimer = 0;

  loop(context, renderingTimer, canvasDimensions);
}

function init(
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
  renderingTimer: number,
  canvasDimensions: Coords
): void {
  const radius = 50;
  renderingTimer += Math.PI * 2; // sin() period

  clearCanvas(context, canvasDimensions);

  runPythagoreanModel({ context, renderingTimer, radius });

  requestAnimationFrame(() => loop(context, renderingTimer, canvasDimensions));
}

function drawPlanet({
  context,
  radius,
  orbitalRadius,
  time,
  color,
  orbitCounter,
}: {
  context: CanvasRenderingContext2D;
  radius: number;
  orbitalRadius: number;
  time: number;
  color: string;
  orbitCounter?: number;
}) {
  const coords = {
    x: Math.cos(time) * orbitalRadius,
    y: Math.sin(time) * orbitalRadius,
  };

  drawDisk({
    context,
    radius,
    coords,
    color,
  });

  if (orbitCounter !== undefined) {
    context.font = "48px serif";
    context.fillStyle = "black";
    context.fillText(`${orbitCounter} orbit(s)`, coords.x + 100, coords.y);
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
  renderingTimer,
  radius,
}: {
  context: CanvasRenderingContext2D;
  renderingTimer: number;
  radius: number;
}): void {
  drawDisk({
    context,
    color: "red",
    radius: 10,
    coords: { x: 0, y: 0 },
  });

  drawPlanet({
    context,
    radius,
    orbitalRadius: 300,
    color: "red",
    time: renderingTimer / 60,
    orbitCounter: Math.round(renderingTimer / 60 / (2 * Math.PI)),
  });

  // console.log(renderingTimer / (Math.PI * 2));

  // drawPlanet({
  //   context,
  //   radius: radius * 2,
  //   orbitalRadius: 500,
  //   color: "yellow",
  //   time: renderingTimer / 60 / 60,
  //   orbitCounter: 0,
  // });
}
main();
