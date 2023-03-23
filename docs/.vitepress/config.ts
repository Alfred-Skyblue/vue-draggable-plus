import { defineConfigWithTheme } from 'vitepress'
import { applyPlugins } from '@ruabick/md-demo-plugins'
import { genTemp } from '@ruabick/vite-plugin-gen-temp'

import { sidebar } from './sidebar'
import { resolve } from 'path'
import UnoCSS from 'unocss/vite'
function getBaseURL(lang: string) {
  return lang === 'zh-CN' ? '/vue-draggable-plus/' : '/vue-draggable-plus/en/'
}

export default defineConfigWithTheme({
  lang: 'zh-CN',
  lastUpdated: true,
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/vue-draggable-plus/logo.svg',
        type: 'image/svg+xml'
      }
    ]
  ],
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'vue-draggable-plus',
      description: 'vue3拖拽排序组件',
      label: '简体中文',
      // @ts-ignore
      base: getBaseURL('zh-CN')
    },
    '/en/': {
      lang: 'en-US',
      title: 'vue-draggable-plus',
      description: 'vue3拖拽排序组件',
      label: 'English',
      // @ts-ignore
      base: getBaseURL('en-US')
    }
  },
  themeConfig: {
    repo: 'vuejs/vitepress',
    editLinks: true,
    logo: '/vue-draggable-plus/logo.svg',
    sidebar,
    nav: [{ text: '指南', link: '/basic/' }],
    // localeLinks: {
    //   items: [
    //     {
    //       link: '/',
    //       text: '简体中文'
    //     },
    //     {
    //       link: '/en/',
    //       text: 'English'
    //     }
    //   ]
    // },
    locales: {
      '/': {
        label: '简体中文',
        lastUpdated: '上次更新',
        sidebar: sidebar['/'],
        nav: [
          { text: '指南', link: '/guide/', activeMatch: '^/guide/' },
          { text: '演示', link: '/demo/basic/', activeMatch: '^/demo/' },
          { text: 'API', link: '/api/', activeMatch: '^/api/' }
        ]
      },
      '/en/': {
        label: 'English',
        lastUpdated: 'Last Updated',
        sidebar: sidebar['/en/'],
        nav: [
          { text: 'Guide', link: '/en/guide/' },
          { text: 'Demo', link: '/en/demo/basic/' }
        ]
      }
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/Alfred-Skyblue/vue-draggable-plus'
      }
    ]
  },

  vue: {},
  vite: {
    server: {
      port: 8090
    },
    plugins: [genTemp(), UnoCSS()],
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
