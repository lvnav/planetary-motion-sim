/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ASSETS_FOLDER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
