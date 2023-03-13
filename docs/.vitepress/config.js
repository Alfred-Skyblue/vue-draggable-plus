import { defineConfig } from 'vitepress'
import { applyPlugins } from '@ruabick/md-demo-plugins'
import { genTemp } from '@ruabick/vite-plugin-gen-temp'

import { sidebar } from './sidebar.js'
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
      description: 'vue3拖拽排序组件'
    },
    '/en/': {
      lang: 'en-US',
      title: 'vue-draggable-plus',
      description: 'vue3拖拽排序组件'
    }
  },
  themeConfig: {
    logo: '/logo.svg',
    localeLinks: {
      text: '',
      items: [
        { text: '简体中文', link: '/' },
        { text: 'English', link: '/en/' }
      ]
    },
    nav: [{ text: '指南', link: '/guide' }],
    sidebar,
    algolia: {},
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/Alfred-Skyblue/vue-draggable-plus'
      }
    ]
  },
  vue: {},
  vite: {
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
    process.exit(0)
  }
})
