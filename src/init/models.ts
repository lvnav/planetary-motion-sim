import { get } from "svelte/store";
import { Scene } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { CelestialObject } from "../models/celestialObject";
import celestialObjectsData from "../models/celestialObjectData";
import { distanceDivider, scaleDivider } from "../ui/store";

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
        scaleDivider: get(scaleDivider),
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
