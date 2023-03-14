import DefaultTheme from 'vitepress/theme'
import DemoBlock from '@ruabick/vitepress-demo-block'
import IconSort from './components/IconSort.vue'
import IconClose from './components/IconClose.vue'
import PreviewList from './components/PreviewList.vue'
import 'uno.css'

import '@ruabick/vitepress-demo-block/dist/style.css'
import './var.css'
import './styles'
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
    app.component('IconSort', IconSort)
    app.component('IconClose', IconClose)
    app.component('PreviewList', PreviewList)
  }
}
