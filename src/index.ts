import { get } from "svelte/store";
import { Camera, Scene, WebGLRenderer } from "three";
import init from "./init";
import { loadObjects } from "./init/objects";
import Pythagorean from "./models/Pythagorean";
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
  const { celestialObjects } = loadObjects(scene);

  loadUi();

  const model = new Pythagorean(celestialObjects);
  console.log(model.objects);

  // const model = new Circle(celestialObjects);
  // const font = await loadFont();

  // const material = new MeshBasicMaterial({ color: "red" });
  // const mesh = new Mesh(font, material);
  // scene.add(mesh);

  loop({
    renderer,
    scene,
    camera,
    model,
  });
}

async function loop({
  renderer,
  scene,
  camera,
  model,
}: {
  renderer: WebGLRenderer;
  scene: Scene;
  camera: Camera;
  model: Pythagorean;
}) {
  const time = get(simTime);
  const step = get(timeStep);
  const storedDistanceDivider = get(distanceDivider);
  const storedScaleDivider = get(scaleDivider);

  model.update({
    time,
    distanceDivider: storedDistanceDivider,
    scaleDivider: storedScaleDivider,
    scene,
  });

  celestialObjectsStored.update(() => model.objects);
  simTime.set(time + step);
  requestAnimationFrame(() =>
    loop({
      renderer,
      scene,
      camera,
      model,
    })
  );
  renderer.render(scene, camera);
}

main();
