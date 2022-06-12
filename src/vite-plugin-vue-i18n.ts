import type { Plugin } from 'vite'

export default function (): Plugin {
  return {
    name: 'vite-plugin-vue-i18n',
    transform(code, id) {
      if (!/vue&type=i18n/.test(id))
        return

      return `export default Comp => {
          Comp.i18n = ${code}
        }`
    },
  }
}
