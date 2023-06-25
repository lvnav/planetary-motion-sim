interface Renderable {
  update: (time: number) => Promise<void>;
}
