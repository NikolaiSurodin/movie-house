import { fileURLToPath, URL } from 'node:url'
import { resolve, dirname } from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

export default defineConfig( {
  build: {
    chunkSizeWarningLimit: 2000,
  },
  plugins: [
    vue(),
    VueI18nPlugin({
      runtimeOnly: false,
      include: resolve(dirname(fileURLToPath(import.meta.url)), './src/i18n/locales/**'),
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath( new URL( './src', import.meta.url ) ),
      '@assets': fileURLToPath( new URL( './src/assets', import.meta.url ) ),
      '@store': fileURLToPath( new URL( './src/stores', import.meta.url ) ),
      '@classes': fileURLToPath( new URL( './src/classes', import.meta.url ) ),
    }
  }
} )
