import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2020",
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("three") ||
              id.includes("@react-three")
            ) {
              return "three";
            }
            if (id.includes("framer-motion")) {
              return "motion";
            }
            if (id.includes("lenis")) {
              return "lenis";
            }
          }
        },
      },
    },
  },
});
