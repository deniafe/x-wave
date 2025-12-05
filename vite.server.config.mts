import { defineConfig } from "vite";
import path from "path";
import pkg from "./package.json";

// Get keys of production dependencies to externalize
const externalDeps = Object.keys(pkg.dependencies || {});

// https://vitejs.dev/config
export default defineConfig({
  build: {
    lib: {
      // entry: "src/server.ts",
      entry: path.resolve(__dirname, "src/server.ts"),
      formats: ["cjs"],
      // fileName: "server",
      fileName: () => "server.js",
    },
    rollupOptions: {
      external: [
        // Only externalize things that MUST be external
        /^node:/, // Node built-ins
        "electron", // Don't bundle electron (shouldn't be imported anyway)
        ...externalDeps,
      ],
      output: {
        // Ensure it's proper CJS
        format: "cjs",
        exports: "auto",
      },
    },
    target: "node18",
    outDir: ".vite/build",

    // 👇 CHANGE THIS VALUE FROM 'true' TO 'false'
    emptyOutDir: false,

    minify: false, // Easier debugging
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
