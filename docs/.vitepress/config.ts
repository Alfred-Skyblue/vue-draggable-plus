import { defineConfigWithTheme } from 'vitepress'
import { applyPlugins } from '@ruabick/md-demo-plugins'
import { genTemp } from '@ruabick/vite-plugin-gen-temp'

import { sidebar } from './sidebar'
import { resolve } from 'path'
import UnoCSS from 'unocss/vite'

export default defineConfigWithTheme({
  lang: 'en-US',
  lastUpdated: true,
  base: process.env.NODE_ENV === 'production' ? '/vue-draggable-plus' : '/',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'vue-draggable-plus',
      description: 'vue3拖拽排序组件',
      label: '简体中文'
    },
    '/en/': {
      lang: 'en-US',
      title: 'vue-draggable-plus',
      description: 'vue3拖拽排序组件',
      label: 'English'
    }
  },
  themeConfig: {
    repo: 'vuejs/vitepress',
    editLinks: true,
    logo: '/logo.svg',
    sidebar,
    nav: [{ text: '指南', link: '/basic/' }],
    localeLinks: {
      items: [
        {
          link: '/',
          text: '简体中文'
        },
        {
          link: '/en/',
          text: 'English'
        }
      ]
    },
    locales: {
      '/': {
        label: '简体中文',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        sidebar: sidebar['/'],
        nav: [
          { text: '指南', link: '^/$|^/basic/' },
          { text: '演示', link: '/demo/', activeMatch: '^/demo/' }
        ]
      },
      '/en/': {
        label: 'English',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        sidebar: sidebar['/en/'],
        nav: [{ text: 'Guide', link: '/en/basic/' }]
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
  }
})
