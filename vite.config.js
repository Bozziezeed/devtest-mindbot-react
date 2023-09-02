import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: import.meta.env.VITE_PORT,
  },

  plugins: [react()],
});
