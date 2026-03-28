import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "es2020",
    lib: {
      entry: "src/cb19-esphome-card.ts",
      formats: ["es"],
      fileName: () => "cb19-esphome-card.js",
    },
    outDir: "dist",
    emptyOutDir: true,
  },
});