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
        target: "https://big-money-business.netlify.app/",
        changeOrigin: true,
      },
    },
  },
});
