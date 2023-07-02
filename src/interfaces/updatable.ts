import type { Scene } from "three";

export interface UpdatableOptions {
  time: number;
  scaleDivider: number;
  distanceDivider: number;
  scene: Scene;
  timeStep: number;
}

export interface Updatable {
  update: (options: UpdatableOptions) => Promise<void> | void;
}
