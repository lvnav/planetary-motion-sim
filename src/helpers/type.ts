import type CelestialObject from "../objects/CelestialObject";
import type Planet from "../objects/Planet";

export function isPlanet(planet: CelestialObject | Planet): planet is Planet {
  if (planet.type === "planet") return true;
}
