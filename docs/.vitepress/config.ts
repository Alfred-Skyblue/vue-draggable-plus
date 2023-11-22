import { defineConfig } from 'vitepress'
import { applyPlugins } from '@ruabick/md-demo-plugins'
import { genTemp } from '@ruabick/vite-plugin-gen-temp'
import { sidebar } from './sidebar'
import { resolve } from 'path'
import UnoCSS from 'unocss/vite'
import { copyDocs } from './theme/plugins/copy-docs'

export default defineConfig({
  lang: 'zh-CN',
  lastUpdated: true,
  base: '/vue-draggable-plus/',
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/vue-draggable-plus/favicon.svg'
      }
    ]
  ],
  locales: {
    root: {
      lang: 'zh-CN',
      title: 'vue-draggable-plus',
      description: 'vue3拖拽排序组件',
      label: '简体中文',
      themeConfig: {
        nav: [
          { text: '指南', link: '/guide/', activeMatch: '^/guide/' },
          { text: '演示', link: '/demo/basic/', activeMatch: '^/demo/' },
          { text: 'API', link: '/api/', activeMatch: '^/api/' }
        ]
      }
    },
    en: {
      lang: 'en-US',
      title: 'vue-draggable-plus',
      description: 'vue3拖拽排序组件',
      label: 'English',
      // @ts-ignore
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/en/guide/' },
          { text: 'Demo', link: '/en/demo/basic/' },
          { text: 'API', link: '/en/api/', activeMatch: '^/api/' }
        ]
      }
    }
  },
  themeConfig: {
    repo: 'vuejs/vitepress',
    editLinks: true,
    logo: '/logo.svg',
    sidebar,
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/Alfred-Skyblue/vue-draggable-plus'
      }
    ]
  },
  ignoreDeadLinks: true,
  vue: {},
  vite: {
    server: {
      port: 8090
    },
    plugins: [genTemp(), UnoCSS(), copyDocs()],
    resolve: {
      alias: {
        'vue-draggable-plus': resolve('./src/')
      }
    }
  },
  markdown: {
    config: md => {
      applyPlugins(md)
    },
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  },
  buildEnd() {
    setTimeout(() => {
      process.exit(0)
    }, 2000)
  }
})
