import App from "./App.svelte";

function loadUi() {
  return new App({
    target: document.getElementById("app"),
  });
}

export default loadUi;
