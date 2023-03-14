import { defineConfig } from 'vitepress'
import { applyPlugins } from '@ruabick/md-demo-plugins'
import { genTemp } from '@ruabick/vite-plugin-gen-temp'

import { sidebar } from './sidebar'
import { resolve } from 'path'
import UnoCSS from 'unocss/vite'
export default defineConfig({
  lang: 'zh-CN',
  lastUpdated: true,
  base: process.env.NODE_ENV === 'production' ? '/vue-draggable-plus' : '/',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'vue-draggable-plus',
      description: 'vue3拖拽排序组件',
      label: '简体中文'
    },
    '/en': {
      lang: 'en-US',
      title: 'vue-draggable-plus',
      description: 'vue3拖拽排序组件',
      label: 'English'
    }
  },
  themeConfig: {
    logo: '/logo.svg',
    sidebar,
    nav: [
      { text: '指南', link: '/basic/' },
      {
        text: '语言',
        items: [
          { text: '简体中文', link: '/' },
          { text: 'English', link: '/en/' }
        ]
      }
    ],
    // algolia: {
    //   apiKey: 'b3d9c3b0c0f3f1f3f3f3f3f3f3f3f3f3',
    //   indexName: 'vue-draggable-plus'
    // },
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
  }
})
