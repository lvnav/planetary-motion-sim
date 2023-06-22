type Coords = {
  x: number;
  y: number;
};

type CanvasDimensions = {
  width: number;
  height: number;
};

function main() {
  const canvas = document.querySelector("canvas");
  const body = document.querySelector("body");

  if (canvas === null) {
    throw new Error("canvas is null !");
  }

  const canvasDimensions: CanvasDimensions = {
    width: (canvas.width = body.clientWidth),
    height: (canvas.height = body.clientHeight),
  };

  const context = init(canvas, canvasDimensions);

  const renderingTimer = 0;

  loop(context, renderingTimer, canvasDimensions);
}

function loop(
  context: CanvasRenderingContext2D,
  renderingTimer: number,
  canvasDimensions: CanvasDimensions
): void {
  const radius = 50;
  renderingTimer += 0.01;

  clearCanvas(context, canvasDimensions);

  buildPlanet({
    context,
    radius,
    orbitalRadius: 300,
    color: "red",
    time: renderingTimer,
  });

  requestAnimationFrame(() => loop(context, renderingTimer, canvasDimensions));
}

function init(
  canvas: HTMLCanvasElement,
  { width, height }: CanvasDimensions
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

function degToRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function clearCanvas(
  context: CanvasRenderingContext2D,
  canvasDimensions: CanvasDimensions
): void {
  context.save();
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);
  context.fillStyle = "#2B2A33";
  context.fillRect(0, 0, canvasDimensions.width, canvasDimensions.height);
  context.restore();
}

function buildPlanet({
  context,
  radius,
  orbitalRadius,
  time,
  color,
}: {
  context: CanvasRenderingContext2D;
  radius: number;
  orbitalRadius: number;
  time: number;
  color: string;
}) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(
    Math.cos(time) * orbitalRadius,
    Math.sin(time) * orbitalRadius,
    radius,
    degToRad(0),
    degToRad(360)
  );
  context.fill();
  context.closePath();
}
main();
