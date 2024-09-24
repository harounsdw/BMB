import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    rollupOptions: {
      external: ["./react-bootstrap", "./react-icons/fa", "/axios"],
    },
  },
  server: {
    port: 10000,
    proxy: {
      "/api": {
        target: "https://bmb-9bgg.onrender.com", // Use your Render API URL here
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Optional: Depending on how your API is set up
      },
    },
  },
});
