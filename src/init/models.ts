import { get } from "svelte/store";
import { Scene } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import celestialObjectsData from "../models/celestialObjectData";
import { CelestialObject } from "../models/celestialObjects";
import { distanceDivider, scaleFactor } from "../ui/store";

export function loadModels(scene: Scene): {
  celestialObjects: Promise<CelestialObject>[];
} {
  const loader = new GLTFLoader();
  const celestialObjects = Object.values(celestialObjectsData).map(
    async (celestialObjectData) => {
      const celestialData = await loader.loadAsync(
        `${import.meta.env.VITE_ASSETS_FOLDER}/${celestialObjectData.modelPath}`
      );

      const celestialObject = new CelestialObject({
        ...celestialObjectData,
        model: celestialData.scene.children,
        scaleFactor: get(scaleFactor),
        distanceDivider: get(distanceDivider),
      });

      scene.add(celestialData.scene);

      if (celestialObject.distanceFromSun !== 0) {
        const pathway = celestialObject.buildPathway();
        scene.add(pathway);
      }

      return celestialObject;
    }
  );
  return { celestialObjects };
}
