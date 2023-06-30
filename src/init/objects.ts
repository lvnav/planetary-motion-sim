import type { Scene } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import CelestialObject from "../objects/CelestialObject";
import Planet from "../objects/Planet";
import Star from "../objects/Star";
import celestialObjectsData from "../objects/celestialObjectsData";

export function loadObjects(scene: Scene): {
  celestialObjects: Promise<CelestialObject>[];
} {
  const loader = new GLTFLoader();
  const celestialObjects = Object.values(celestialObjectsData)
    .filter((celestialObject) => {
      return ["earth", "sun"].includes(celestialObject.name);
    })
    .map(async (celestialObjectData) => {
      const celestialData = await loader.loadAsync(
        `${import.meta.env.VITE_ASSETS_FOLDER}/${celestialObjectData.modelPath}`
      );

      const celestialObject: CelestialObject =
        celestialObjectData.name === "sun"
          ? new Planet({
              ...celestialObjectData,
              model: celestialData.scene.children,
              scaleDivider: 1,
              distanceDivider: 1,
              distanceFromCenter: 1,
              scene,
            })
          : new Star({
              ...celestialObjectData,
              model: celestialData.scene.children,
              scaleDivider: 1,
              distanceDivider: 1,
              distanceFromCenter: 0,
              scene,
            });

      scene.add(celestialData.scene);

      return celestialObject;
    });
  return { celestialObjects };
}
