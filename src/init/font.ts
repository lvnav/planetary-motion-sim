import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";

export async function loadFont() {
  const loader = new FontLoader();

  const font = loader.loadAsync("assets/roboto-regular.json");
  return new TextGeometry("Hello three.js!", {
    font: await font,
    size: 80,
    height: 5,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 10,
    bevelSize: 8,
    bevelOffset: 0,
    bevelSegments: 5,
  });
}
