import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import { dependencies } from "./package.json";
import { renderChunksWithStrategy } from "./splitChunks";

export default defineConfig({
  base: "/",
  plugins: [react()],

  define: {
    global: "window",
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "src"),
      },
      {
        find: "xbook",
        replacement: resolve(__dirname, "src/xbook"),
      },
    ],
  },
  build: {
    outDir: "dist/chatgpt/",
    rollupOptions: {
      input: {
        app: "index.html",
      },
      output: {
        manualChunks: renderChunksWithStrategy(dependencies),
      },
    },
  },
});
