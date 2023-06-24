import {
  AmbientLight,
  BufferGeometry,
  Camera,
  Color,
  LineBasicMaterial,
  LineLoop,
  Object3D,
  Path,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { auToPixels, degToRad, sinPeriod } from "./helpers/math";

const distanceDivider = 20;
const scaleFactor = 50;
const celestialObjects = [
  {
    name: "sun",
    modelPath: `sun.glb`,
    initialPosition: { x: 0, y: 0, z: 0 },
    rotate: false,
  },
  {
    name: "mercury",
    modelPath: `mercury.glb`,
    scale: { x: 1 / 277, y: 1 / 277, z: 1 / 277 },
    initialPosition: { x: auToPixels(0.4) / distanceDivider, y: 0, z: 0 },
    distanceFromSun: 0.4,
  },
  {
    name: "venus",
    modelPath: `venus.glb`,
    scale: { x: 1 / 115, y: 1 / 115, z: 1 / 115 },
    initialPosition: { x: auToPixels(0.7) / distanceDivider, y: 0, z: 0 },
    distanceFromSun: 0.7,
  },
  {
    name: "earth",
    modelPath: `earth.glb`,
    scale: { x: 1 / 109, y: 1 / 109, z: 1 / 109 },
    initialPosition: { x: auToPixels(1) / distanceDivider, y: 0, z: 0 },
    distanceFromSun: 1,
  },
  {
    name: "mars",
    modelPath: `mars.glb`,
    scale: { x: 1 / 207, y: 1 / 207, z: 1 / 207 },
    initialPosition: { x: auToPixels(1.524) / distanceDivider, y: 0, z: 0 },
    distanceFromSun: 1.524,
  },
  {
    name: "jupiter",
    modelPath: `jupiter.glb`,
    scale: { x: 1 / 10, y: 1 / 10, z: 1 / 10 },
    initialPosition: { x: auToPixels(5.2) / distanceDivider, y: 0, z: 0 },
    distanceFromSun: 5.2,
  },
  // {
  //   name: "saturn",
  //   modelPath: `saturn.glb`,
  //   scale: { x: 1 / 12, y: 1 / 12, z: 1 / 12 },
  //   initialPosition: { x: auToPixels(9.5) / distanceDivider, y: 0, z: 0 },
  // },
  {
    name: "uranus",
    modelPath: `uranus.glb`,
    scale: { x: 1 / 27.4, y: 1 / 27.4, z: 1 / 27.4 },
    initialPosition: { x: auToPixels(19.8) / distanceDivider, y: 0, z: 0 },
    distanceFromSun: 19.8,
  },
  {
    name: "neptune",
    modelPath: `neptune.glb`,
    scale: { x: 1 / 27.7, y: 1 / 27.7, z: 1 / 27.7 },
    initialPosition: { x: auToPixels(30) / distanceDivider, y: 0, z: 0 },
    distanceFromSun: 30,
  },
  {
    name: "pluto",
    modelPath: `pluto.glb`,
    scale: { x: 1 / 585, y: 1 / 585, z: 1 / 585 },
    initialPosition: { x: auToPixels(39) / distanceDivider, y: 0, z: 0 },
    distanceFromSun: 39,
  },
];

async function init() {
  const { renderer, scene, camera } = initCanvas();

  new OrbitControls(camera, renderer.domElement);

  const assetsFolder = "../assets";

  const loader = new GLTFLoader();
  const celestialMeshes = Object.values(celestialObjects).map(
    async ({
      modelPath,
      scale,
      initialPosition,
      name,
      rotate,
      distanceFromSun,
    }) => {
      const celestialData = await loader.loadAsync(
        `${assetsFolder}/${modelPath}`
      );

      const celestialMesh = celestialData.scene.children[0];
      if (scale != null) {
        celestialMesh.scale.set(
          scale.x * scaleFactor,
          scale.y * scaleFactor,
          scale.z * scaleFactor
        );
      }
      celestialMesh.userData.name = name;
      celestialMesh.userData.rotate = rotate ?? null;
      celestialMesh.userData.distanceFromSun = distanceFromSun;

      celestialMesh.position.x = initialPosition.x;
      scene.add(celestialData.scene);

      if (distanceFromSun != null) {
        console.log("cc");

        const material = new LineBasicMaterial({ color: 0x0000ff });
        const geometry = new BufferGeometry()
          .setFromPoints(
            new Path()
              .absarc(
                0,
                0,
                auToPixels(distanceFromSun) / distanceDivider,
                0,
                Math.PI * 2,
                false
              )
              .getSpacedPoints(50)
          )
          .rotateX(degToRad(45));

        scene.add(new LineLoop(geometry, material));
      }

      return celestialMesh;
    }
  );

  loop({ renderer, scene, camera, iterator: 0, celestialMeshes });
}

async function loop({
  renderer,
  scene,
  camera,
  iterator,
  celestialMeshes,
}: {
  renderer: WebGLRenderer;
  scene: Scene;
  camera: Camera;
  iterator: number;
  celestialMeshes: Promise<Object3D>[];
}) {
  iterator += sinPeriod();
  celestialMeshes.forEach(async (celestialMesh, key) => {
    const { userData, position } = await celestialMesh;
    if (userData.rotate !== false) {
      position.x =
        (Math.cos(iterator / 60 / 60 / key) *
          auToPixels(userData.distanceFromSun)) /
        distanceDivider;
      position.z =
        (Math.sin(iterator / 60 / 60 / key) *
          auToPixels(userData.distanceFromSun)) /
        distanceDivider;
    }
  });

  requestAnimationFrame(() =>
    loop({
      renderer,
      scene,
      camera,
      iterator: (iterator += sinPeriod()),
      celestialMeshes,
    })
  );
  renderer.render(scene, camera);
}

function initCanvas(): {
  renderer: WebGLRenderer;
  scene: Scene;
  camera: Camera;
} {
  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const scene = new Scene();
  scene.background = new Color(0xdddddd);
  scene.scale.set(0.01, 0.01, 0.01);

  const camera = new PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    1000000
  );
  camera.position.y = 150;
  camera.rotation.x = degToRad(45);

  const hlight = new AmbientLight(0x404040, 10);
  scene.add(hlight);

  // const grid = new GridHelper(10000, 10);
  // scene.add(grid);

  return { renderer, scene, camera };
}

init();
