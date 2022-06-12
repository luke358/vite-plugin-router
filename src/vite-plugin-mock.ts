import path from 'path'
import type { Plugin } from 'vite'
import type { PluginOption } from '../types'

const routeMap: any = {}
export default function (options: PluginOption = {}): Plugin {
  options.entry = options.entry || '../mock/index.ts'

  if (!path.isAbsolute(options.entry))
    // options.entry = path.resolve(process.cwd(), options.entry)
    options.entry = path.resolve(__dirname, options.entry)

  return {
    name: 'vite-plugin-mock',
    configureServer({ middlewares }) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const mockObj = require(options.entry!)
      createRoute(mockObj)

      const middleware = (req: any, res: any, next: any) => {
        const route = matchRoute(req)
        console.log(route, '111111')
        if (route) {
          // eslint-disable-next-line no-console
          console.log('mock route', route.method, route.path)
          res.send = send
          route.handler(req, res)
        }
        else { next() }
      }
      middlewares.use(middleware)
    },
  }
}

function createRoute(mockConfigs: []) {
  mockConfigs.forEach((mockConfig: { url: string; type: string; method: string; path: string; response: () => any }) => {
    const method = mockConfig.type || 'get'
    const path = mockConfig.url
    const handler = mockConfig.response

    const route = { path, method: method.toLowerCase(), handler }
    if (!routeMap[method])
      routeMap[method] = []

    // eslint-disable-next-line no-console
    console.log('create mock api: ', route.method, route.path)

    routeMap[method].push(route)
  })
}

function matchRoute(req: any) {
  const method = req.method.toLowerCase()
  const routes = routeMap[method]

  return routes && routes.find((item: any) => item.path === req.url)
}

function send(body: any) {
  let chunk: string | Buffer = JSON.stringify(body)

  if (chunk) {
    chunk = Buffer.from(chunk, 'utf-8')
    this.setHeader('Content-Length', chunk.length)
  }

  this.setHeader('Content-Type', 'application/json; charset=utf-8')

  this.statusCode = 200

  this.end(chunk, 'utf8')
}
