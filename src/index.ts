import { Camera, Scene, WebGLRenderer } from "three";
import { sinPeriod } from "./helpers/math";
import init from "./init";
import { loadModels } from "./init/models";
import type CelestialObject from "./models/celestialObjects";
import "./style/style.css";
import loadUi from "./ui";
import { celestialObjectsStored } from "./ui/store";

async function main() {
  const { renderer, scene, camera } = init();
  const models = loadModels(scene);
  loadUi();

  loop({
    renderer,
    scene,
    camera,
    iterator: 0,
    celestialObjects: models.celestialObjects,
  });
}

async function loop({
  renderer,
  scene,
  camera,
  iterator,
  celestialObjects,
}: {
  renderer: WebGLRenderer;
  scene: Scene;
  camera: Camera;
  iterator: number;
  celestialObjects: Promise<CelestialObject>[];
}) {
  celestialObjects.forEach(async (model) => {
    (await model).update(iterator);
  });
  celestialObjectsStored.update(() => celestialObjects);

  requestAnimationFrame(() =>
    loop({
      renderer,
      scene,
      camera,
      iterator: (iterator += sinPeriod()),
      celestialObjects,
    })
  );
  renderer.render(scene, camera);
}

main();
