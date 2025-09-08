import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import layouts from 'vite-plugin-vue-layouts'
import vueRouter from 'unplugin-vue-router/vite'
import presetUno from 'unocss/preset-uno'
import presetIcons from '@unocss/preset-icons'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vueRouter({
      extensions: ['.vue', '.md'],
      routesFolder: "src/pages"
    }),
    layouts({
      pagesDirs: 'src/pages',
      layoutsDirs: 'src/layouts',
      defaultLayout: 'default',
    }),
    vue(),
    vueDevTools(),
    UnoCSS({
      presets: [
        presetUno(),
        presetIcons(),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": {
        // target: "http://localhost:5000", // server backend của bạn
        target: "https://server.thongmai.id.vn", // server backend của bạn
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
        secure: false,
      },
    },
  },
})
