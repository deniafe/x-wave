import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      // ⚠️ CRITICAL: Exclude Electron and Node built-ins from the bundle
      external: ["electron", /^node:/],
      output: {
        // Ensure it outputs CommonJS (required for preload scripts)
        format: "cjs",
        // Force the filename to be simple (no hash) so main.ts can find it
        entryFileNames: "[name].js",
        inlineDynamicImports: true,
      },
    },
  },
});
