function main() {
    var canvas = document.querySelector("canvas");
    var body = document.querySelector("body");
    if (canvas === null) {
        throw new Error("canvas is null !");
    }
    var canvasDimensions = {
        width: (canvas.width = body.clientWidth),
        height: (canvas.height = body.clientHeight),
    };
    var context = init(canvas, canvasDimensions);
    var renderingTimer = 0;
    loop(context, renderingTimer, canvasDimensions);
}
function loop(context, renderingTimer, canvasDimensions) {
    var radius = 50;
    renderingTimer += 0.01;
    clearCanvas(context, canvasDimensions);
    buildPlanet({
        context: context,
        radius: radius,
        orbitalRadius: 300,
        color: "red",
        time: renderingTimer,
    });
    requestAnimationFrame(function () { return loop(context, renderingTimer, canvasDimensions); });
}
function init(canvas, _a) {
    var width = _a.width, height = _a.height;
    var context = canvas.getContext("2d");
    if (context === null) {
        throw new Error("canvasContext is null !");
    }
    context.fillStyle = "#2B2A33";
    context.fillRect(0, 0, width, height);
    context.translate(width / 2, height / 2);
    return context;
}
function degToRad(degrees) {
    return (degrees * Math.PI) / 180;
}
function clearCanvas(context, canvasDimensions) {
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);
    context.fillStyle = "#2B2A33";
    context.fillRect(0, 0, canvasDimensions.width, canvasDimensions.height);
    context.restore();
}
function buildPlanet(_a) {
    var context = _a.context, radius = _a.radius, orbitalRadius = _a.orbitalRadius, time = _a.time, color = _a.color;
    context.fillStyle = color;
    context.beginPath();
    context.arc(Math.cos(time) * orbitalRadius, Math.sin(time) * orbitalRadius, radius, degToRad(0), degToRad(360));
    context.fill();
    context.closePath();
}
main();
