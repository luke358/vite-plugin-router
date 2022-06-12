import type { Plugin } from 'vite'

export default function (_options?): Plugin {
  /**
   * 加载配置
   * onfig -> configResolved -> options: rollUp -> configure Server -> buildStart: rollup -> vite dev ready: repeat ->
   * 每次请求都会执行一次
   * transformIndexHtml -> resolvedId: rollup -> load: rollup -> transform: rollup
   */
  return {
    name: 'vite-plugin-router',
    enforce: 'post', // pre | post | undefined
    options(opts) {

    },
    buildStart() {

    },
    config(cfg) {
      return {} // 默认配置，会进行合并
    },
    configResolved(configResolved) {

    },
    configureServer(server) {
      // server.middlewares.use(async (ctx, next) => {})
    },
    transformIndexHtml(indexHtml) {
      // return indexHtml
      return indexHtml.replace(/<title>(.*?)<\/title>/, '<title>Replaced Title</title>')
    },
    resolveId(id) {
      if (id === 'virtual-module')
        return id // 命中， 其他模块不处理
      return null // 其他模块处理
    },
    load(id) {
      console.log(id)
      if (id === 'virtual-module') {
        return `
          export default 'hello world'
        `
      }
      return null // 其他模块继续处理
    },
    transform(code, id) {
      if (id === 'virtual-module')
        console.log('vitual-module transform')
      return code
    },
  }
}
