import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vitePluginRouter from '../src/index'
import vitePluginMock from '../src/vite-plugin-mock'
import vitePluginVueI18n from '../src/vite-plugin-vue-i18n'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vitePluginMock(),
    // vitePluginRouter(),
    vitePluginVueI18n(),
  ],

})
