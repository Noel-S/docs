import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import preload from "vite-plugin-preload"
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: '/edit/',
  build: {
    // outDir: '../base/dist/edit',
    emptyOutDir: true,
  }
})
