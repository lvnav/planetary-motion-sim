import type { Scene } from "three";

export interface UpdatableOptions {
  time: number;
  scaleDivider: number;
  distanceDivider: number;
  scene: Scene;
}

export interface Updatable {
  update: (options: UpdatableOptions) => Promise<void> | void;
}
