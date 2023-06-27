import type { Line } from "three";

export interface Movable {
  move: (time: number) => void;
  buildPathway: () => Line;
  refreshPathway: () => void;
}
