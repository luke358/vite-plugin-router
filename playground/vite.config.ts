import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vitePluginRouter from '../src/index'
import vitePluginMock from '../src/vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vitePluginMock(),
    // vitePluginRouter(),
  ],

})
