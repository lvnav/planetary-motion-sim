import type { Scene } from "three";

export interface Trackable {
  trace: (scene: Scene) => void;
}
