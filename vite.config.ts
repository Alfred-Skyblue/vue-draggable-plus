import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import UnoCSS from 'unocss/vite'
export default defineConfig({
  plugins: [vue(), dts(), UnoCSS()],
  server: {
    port: 5230
  },
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'vue-draggable-plus',
      // the proper extensions will be added
      fileName: 'vue-draggable-plus'
    },
    rollupOptions: {
      // @ts-ignore
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
