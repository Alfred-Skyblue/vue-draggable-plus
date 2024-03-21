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