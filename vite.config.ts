import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tspaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    watch: {
      usePolling: true,
    },
  },
  plugins: [react(), tspaths()],
});
