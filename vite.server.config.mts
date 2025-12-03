import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config
export default defineConfig({
  build: {
    lib: {
      entry: "src/server.ts",
      formats: ["cjs"],
      fileName: "server",
    },
    rollupOptions: {
      external: [
        // Only externalize things that MUST be external
        /^node:/, // Node built-ins
        "electron", // Don't bundle electron (shouldn't be imported anyway)
        "patchright", // Has native binaries - must be external
      ],
      output: {
        // Ensure it's proper CJS
        format: "cjs",
        exports: "auto",
      },
    },
    target: "node18",
    outDir: ".vite/build",
    emptyOutDir: false, // Don't delete main.js and preload.js
    minify: false, // Easier debugging
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
