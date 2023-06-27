import type { Scene } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import CelestialObject from "../objects/CelestialObject";
import celestialObjectsData from "../objects/celestialObjectData";

export function loadObjects(scene: Scene): {
  celestialObjects: Promise<CelestialObject>[];
} {
  const loader = new GLTFLoader();
  const celestialObjects = Object.values(celestialObjectsData).map(
    async (celestialObjectData) => {
      const celestialData = await loader.loadAsync(
        `${import.meta.env.VITE_ASSETS_FOLDER}/${celestialObjectData.modelPath}`
      );

      const celestialObject: CelestialObject =
        new celestialObjectData.defaultModel({
          ...celestialObjectData,
          model: celestialData.scene.children,
          scaleDivider: 1,
          distanceDivider: 1,
        });

      scene.add(celestialData.scene);

      return celestialObject;
    }
  );
  return { celestialObjects };
}
