import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  build: {
    outDir: 'public',
  },
  resolve: {
    alias: {
      assets: "/src/assets",
      modules: "/src/modules",
      api: "/src/api",
      config: "/src/config",
      components: "/src/components",
    },
  },
  // ... 
})
