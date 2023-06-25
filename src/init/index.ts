import {
  AmbientLight,
  Camera,
  Color,
  GridHelper,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { degToRad } from "../helpers/math";

function init(): {
  renderer: WebGLRenderer;
  scene: Scene;
  camera: Camera;
} {
  const renderer = initRenderer();
  const scene = initScene();
  const camera = initCamera();
  const hlight = initLight(scene);
  const grid = initGrid(scene);
  const controls = initControls(camera, renderer);

  return { renderer, scene, camera };
}

function initRenderer(): WebGLRenderer {
  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  return renderer;
}

function initScene(): Scene {
  const scene = new Scene();
  scene.background = new Color(0xdddddd);
  scene.scale.set(0.01, 0.01, 0.01);

  return scene;
}

function initCamera(): Camera {
  const camera = new PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    0.1,
    1000000
  );
  camera.position.z = 150;

  return camera;
}

function initLight(scene: Scene): AmbientLight {
  const hlight = new AmbientLight(0x404040, 10);
  scene.add(hlight);

  return hlight;
}

function initGrid(scene: Scene): GridHelper {
  const grid = new GridHelper(500000, 100);
  grid.rotation.x = degToRad(90);
  scene.add(grid);

  return grid;
}

function initControls(camera: Camera, renderer: WebGLRenderer): OrbitControls {
  return new OrbitControls(camera, renderer.domElement);
}

export default init;
