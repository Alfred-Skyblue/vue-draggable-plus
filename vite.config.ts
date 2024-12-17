import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import UnoCSS from 'unocss/vite'
export default defineConfig({
  plugins: [
    vue(),
    dts({
      beforeWriteFile: (filePath, content) => {
        const _content = content.replace(/vue-demi/g, 'vue')
        return {
          filePath,
          content: _content
        }
      }
    }),
    UnoCSS()
  ],
  server: {
    port: 5230
  },
  build: {
    target: 'es2015',
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'VueDraggablePlus',
      fileName: 'vue-draggable-plus',
      formats: ['es', 'umd', 'cjs', 'iife']
    },
    rollupOptions: {
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
  },
  test: {
    coverage: {
      enabled: true,
      include: ['src/component.ts', 'src/useDraggable.ts', 'src/directive.ts']
    }
  }
})
