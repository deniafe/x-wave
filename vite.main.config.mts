import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      // ⚠️ CRITICAL: Native modules must be externalized
      external: ["better-sqlite3"],
    },
  },
});
