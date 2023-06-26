import { get } from "svelte/store";
import { Camera, Scene, WebGLRenderer } from "three";
import init from "./init";
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
}: {
  renderer: WebGLRenderer;
  scene: Scene;
  camera: Camera;
  celestialObjects: Promise<CelestialObject>[];
}) {
  const time = get(simTime);
  const step = get(timeStep);
  const storedDistanceDivider = get(distanceDivider);
  const storedScaleDivider = get(scaleDivider);

  celestialObjects.forEach(async (celestialObject) => {
    (await celestialObject).update({
      time,
      distanceDivider: storedDistanceDivider,
      scaleDivider: storedScaleDivider,
    });
  });

  celestialObjectsStored.update(() => celestialObjects);
  simTime.set(time + step);
  requestAnimationFrame(() =>
    loop({
      renderer,
      scene,
      camera,
      celestialObjects,
    })
  );
  renderer.render(scene, camera);
}

main();
