import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: "dist",
    rollupOptions: {
      external: ["./react-bootstrap", "./react-icons/fa"],
    },
  },
  server: {
    port: 10000,
    proxy: {
      "/api": {
        target: "https://bmb-76h1.onrender.com",
        changeOrigin: true,
        secure: false, // Disable SSL verification if necessary
        cookieDomainRewrite: {
          "*": "", // Ensure the cookie domain is not rewritten incorrectly
        },
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
