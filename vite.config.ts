import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import { dependencies } from "./package.json";
import { renderChunksWithStrategy } from "./splitChunks";
import eslint from 'vite-plugin-eslint';


console.log("dependencies", dependencies);
export default defineConfig({
  base: "/",
  plugins: [react(),
    // eslint()
  ],

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
      {
        find: "libs",
        replacement: resolve(__dirname, "libs"),
      },
    ],
  },
  build: {
    outDir: "dist/",
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
