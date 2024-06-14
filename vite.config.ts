import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import glsl from "vite-plugin-glsl";
import path from "path";

export default defineConfig({
  plugins: [glsl(), react()],
  server: {
    port: 3000,
  },
  base: "/glsl-fun",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/components/default"),
    },
  },
});
