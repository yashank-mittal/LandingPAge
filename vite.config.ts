import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import path from "node:path";

// https://vite.dev/config/
// Run with `--mode artifact` to emit a single, self-contained dist/index.html
// (all JS + CSS inlined). The normal `build` stays code-split and unaffected.
export default defineConfig(({ mode }) => {
  const isArtifact = mode === "artifact";

  return {
    plugins: [
      react(),
      tailwindcss(),
      ...(isArtifact ? [viteSingleFile()] : []),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: isArtifact
      ? {
          // One file, no separate chunks/assets.
          assetsInlineLimit: 100_000_000,
          cssCodeSplit: false,
          rollupOptions: {
            output: { inlineDynamicImports: true },
          },
        }
      : {},
  };
});
