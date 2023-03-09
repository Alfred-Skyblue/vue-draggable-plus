import DefaultTheme from 'vitepress/theme'
import DemoBlock from '@ruabick/vitepress-demo-block'
import '@ruabick/vitepress-demo-block/dist/style.css'
import './var.css'
import 'uno.css'
import type { App } from 'vue'
interface EnhanceApp {
  app: App
}
export default {
  ...DefaultTheme,

  enhanceApp({ app }: EnhanceApp) {
    // app is the Vue 3 app instance from `createApp()`.
    // router is VitePress' custom router. `siteData` is
    // a `ref` of current site-level metadata.
    app.component('demo', DemoBlock)
  }
}
