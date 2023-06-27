import { get } from "svelte/store";
import {
  Camera,
  Line,
  Mesh,
  MeshBasicMaterial,
  Scene,
  WebGLRenderer,
} from "three";
import { drawLine } from "./helpers/draw";
import init from "./init";
import { loadFont } from "./init/font";
import { loadModels } from "./init/models";
import type CelestialObject from "./models/celestialObject";
import "./style/style.css";
import loadUi from "./ui";
import {
  celestialObjectsStored,
  distanceDivider,
  scaleDivider,
  simTime,
  timeStep,
} from "./ui/store";

async function main() {
  const { renderer, scene, camera } = init();
  const models = loadModels(scene);
  loadUi();
  const font = await loadFont();

  const material = new MeshBasicMaterial({ color: "red" });
  const mesh = new Mesh(font, material);
  scene.add(mesh);

  loop({
    renderer,
    scene,
    camera,
    celestialObjects: models.celestialObjects,
  });
}

async function loop({
  renderer,
  scene,
  camera,
  celestialObjects,
  oldLines,
}: {
  renderer: WebGLRenderer;
  scene: Scene;
  camera: Camera;
  celestialObjects: Promise<CelestialObject>[];
  oldLines?: Line[];
}) {
  const time = get(simTime);
  const step = get(timeStep);
  const storedDistanceDivider = get(distanceDivider);
  const storedScaleDivider = get(scaleDivider);

  let lines = [];
  celestialObjects.forEach(async (celestialObject) => {
    (await celestialObject).update({
      time,
      distanceDivider: storedDistanceDivider,
      scaleDivider: storedScaleDivider,
    });

    const line = drawLine((await celestialObject).model[0].position, {
      x: 0,
      y: 0,
      z: 0,
    });

    lines.push(line);
    scene.add(line);

    if (oldLines !== undefined) {
      scene.remove(...oldLines);
    }
  });

  celestialObjectsStored.update(() => celestialObjects);
  simTime.set(time + step);
  requestAnimationFrame(() =>
    loop({
      renderer,
      scene,
      camera,
      celestialObjects,
      oldLines: lines,
    })
  );
  renderer.render(scene, camera);
}

main();
