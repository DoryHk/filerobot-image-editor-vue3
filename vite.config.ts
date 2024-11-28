import { fileURLToPath, URL } from 'node:url'
import typescript2 from 'rollup-plugin-typescript2'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    typescript2({
      check: false,
      include: ['src/components/*.vue'],
      tsconfigOverride: {
        compilerOptions: {
          sourceMap: true,
          declaration: true,
          declarationMap: true,
        },
        exclude: ['vite.config.ts', 'main.ts'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    lib: {
      // entry: resolve(__dirname, '/src/components/FilerobotImageEditor.vue'),
      // name: 'FilerobotImageEditorVue3',
      // formats: ['es', 'cjs'],
      // fileName: (format: string) => (format === 'es' ? 'index.js' : 'index.cjs'),
      fileName: (format) => `filerobot-image-editor-vue3.${format}.js`,
      formats: ['es', 'cjs', 'umd'],

      entry: resolve(__dirname, '/src/components/index.ts'),
      name: 'FilerobotImageEditorVue3',
      // fileName: 'filerobot-image-editor-vue3',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
