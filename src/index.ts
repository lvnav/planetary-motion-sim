import { Camera, Scene, WebGLRenderer } from "three";
import { sinPeriod } from "./helpers/math";
import init from "./init";
import { loadModels } from "./init/models";

async function main() {
  const { renderer, scene, camera } = init();
  const models = loadModels(scene);

  loop({ renderer, scene, camera, iterator: 0, models });
}

async function loop({
  renderer,
  scene,
  camera,
  iterator,
  models,
}: {
  renderer: WebGLRenderer;
  scene: Scene;
  camera: Camera;
  iterator: number;
  models: Promise<Renderable>[];
}) {
  models.forEach(async (model) => {
    (await model).update(iterator);
  });

  requestAnimationFrame(() =>
    loop({
      renderer,
      scene,
      camera,
      iterator: (iterator += sinPeriod()),
      models,
    })
  );
  renderer.render(scene, camera);
}

main();
