import App from "./App.svelte";

function loadUi() {
  // celestialObjectsStored.update(() => celestialObjects);

  return new App({
    target: document.getElementById("app"),
  });
}

export default loadUi;
