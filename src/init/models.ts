import {
  BufferGeometry,
  LineBasicMaterial,
  LineLoop,
  Path,
  Scene,
} from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { auToPixels } from "../helpers/math";
import celestialObjectsData from "../models/celestialObjectData";
import { CelestialObject, distanceDivider } from "../models/celestialObjects";

export function loadModels(scene: Scene): Promise<Renderable>[] {
  const loader = new GLTFLoader();
  const celestialObjects = Object.values(celestialObjectsData).map(
    async (celestialObjectData) => {
      const celestialData = await loader.loadAsync(
        `${import.meta.env.VITE_ASSETS_FOLDER}/${celestialObjectData.modelPath}`
      );

      const celestialObject = new CelestialObject({
        ...celestialObjectData,
        model: celestialData.scene.children,
      });

      scene.add(celestialData.scene);

      if (celestialObject.distanceFromSun !== 0) {
        const material = new LineBasicMaterial({ color: 0x0000ff });
        const geometry = new BufferGeometry().setFromPoints(
          new Path()
            .absarc(
              0,
              0,
              auToPixels(celestialObject.distanceFromSun) / distanceDivider,
              0,
              Math.PI * 2,
              false
            )
            .getSpacedPoints(50)
        );

        scene.add(new LineLoop(geometry, material));
      }

      return celestialObject;
    }
  );
  return celestialObjects;
}
