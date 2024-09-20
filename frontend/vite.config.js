import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    rollupOptions: {
      external: ["./react-bootstrap", "./react-icons/fa"],
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target:
          "https://api.render.com/deploy/srv-crm9lhg8fa8c73afe8r0?key=XF_yccJj5z4",
        changeOrigin: true,
      },
    },
  },
});
