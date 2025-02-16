import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: '/',  // Ensure base is set correctly
  build: {
    outDir: 'dist',  // Ensure correct output directory
  }
})
