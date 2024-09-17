import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cesium from 'vite-plugin-cesium'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), cesium()],
  // server: {
  //   headers: {
  //     "Cross-Origin-Embedder-Policy": "require-corp",
  //     "Cross-Origin-Opener-Policy": "same-origin",
  //   },
  // },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  build: {
    sourcemap: true
  }
})
