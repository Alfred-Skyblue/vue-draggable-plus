import { type DefaultTheme, defineConfig } from 'vitepress'
import { applyPlugins } from '@ruabick/md-demo-plugins'
import { genTemp } from '@ruabick/vite-plugin-gen-temp'
import { sidebar } from './sidebar'
import { resolve } from 'path'
import UnoCSS from 'unocss/vite'
import { copyDocs } from './theme/plugins/copy-docs'

const socialLinks: DefaultTheme.SocialLink[] = [
  {
    icon: 'github',
    link: 'https://github.com/Alfred-Skyblue/vue-draggable-plus'
  }
]

export default defineConfig({
  lang: 'zh-CN',
  lastUpdated: true,
  // base: '/vue-draggable-plus/',
  head: [
    [
      'meta',
      {
        name: 'baidu-site-verification',
        content: 'codeva-zuShuqZc3x'
      }
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/favicon.svg'
      }
    ],
    // <!-- Cloudflare Web Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "7438b3c21281453e968baacf26657f54"}'></script>
    [
      'script',
      {
        defer: 'true',
        src: 'https://static.cloudflareinsights.com/beacon.min.js',
        'data-cf-beacon': '{"token": "7438b3c21281453e968baacf26657f54"}'
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
          { text: 'vue源码学习', link: '/vueer/', activeMatch: '^/vueer/' },
          { text: '演示', link: '/demo/basic/', activeMatch: '^/demo/' },
          { text: 'API', link: '/api/', activeMatch: '^/api/' },
          { text: '常见问题', link: '/faq/', activeMatch: '^/faq/' },
          { text: '社区群', link: '/contact-me/', activeMatch: '^/contact-me/' }
        ],
        socialLinks: [
          {
            icon: {
              svg: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M937.4 423.9c-84 0-165.7-27.3-232.9-77.8v352.3c0 179.9-138.6 325.6-309.6 325.6S85.3 878.3 85.3 698.4c0-179.9 138.6-325.6 309.6-325.6 17.1 0 33.7 1.5 49.9 4.3v186.6c-15.5-6.1-32-9.2-48.6-9.2-76.3 0-138.2 65-138.2 145.3 0 80.2 61.9 145.3 138.2 145.3 76.2 0 138.1-65.1 138.1-145.3V0H707c0 134.5 103.7 243.5 231.6 243.5v180.3l-1.2 0.1"></path></svg>'
            },
            link: 'https://www.douyin.com/user/MS4wLjABAAAAGUvGqSgUb8n2mLUU9SOa5wmdZy-Sj5_FUt-DK5Iu6PpxO1QgrJ1_vXy6ikzz_Q4h'
          },
          {
            icon: {
              svg: '<svg viewBox="0 0 1049 1024" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M363.822 162.086l-96.96-93.983S251.714 49.46 277.346 28.36c25.76-20.972 27.056-11.651 35.73-5.826 8.672 5.826 144.21 139.551 144.21 139.551h-93.464z m322.08 3.496l96.962-93.984s15.146-18.641-10.486-39.742c-25.632-20.972-27.056-11.651-35.73-5.826-8.672 5.826-144.211 139.552-144.211 139.552h93.466z" ></path><path d="M1049.798 339.568c-3.495-147.19-131.396-175.152-131.396-175.152s-655.295-5.307-791.998 0C-10.3 202.994 0.186 339.568 0.186 339.568s1.813 292.565-0.13 440.66c14.759 148.096 128.938 171.656 128.938 171.656s45.567 0.906 78.837 0.906c3.495 9.58 6.084 56.054 57.866 56.054 51.652 0 57.866-56.054 57.866-56.054s378.523-1.812 409.98-1.812c1.812 15.793 9.58 58.643 61.36 57.866 51.653-0.906 55.149-61.361 55.149-61.361s17.476-1.813 70.034 0c122.593-22.784 129.713-166.478 129.713-166.478s-1.683-294.248 0-441.437zM944.292 808.06c0 23.172-18.382 42.072-41.037 42.072H157.214c-22.655 0-41.037-18.77-41.037-42.072V313.936c0-23.173 18.382-42.073 41.037-42.073h746.042c22.655 0 41.037 18.771 41.037 42.073V808.06z" ></path><path d="M194.755 453.487l219.037-42.073 16.57 82.333-217.223 42.073z m681.575 0l-219.036-42.073-16.7 82.333 217.353 42.073zM430.36 657.636s48.158 86.734 101.623-28.092c51.652 112.107 108.61 29.774 108.61 29.774l32.365 21.101s-60.455 97.22-140.2 23.69c-67.444 73.53-138.385-23.43-138.385-23.43l35.988-23.043z" ></path></svg>'
            },
            link: 'https://space.bilibili.com/423876881'
          },
          ...socialLinks
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
          { text: 'API', link: '/en/api/', activeMatch: '^/api/' },
          { text: 'FAQ', link: '/en/faq/', activeMatch: '^/faq/' }
        ],
        socialLinks
      }
    }
  },
  // sitemap: {
  //   hostname: 'https://vue-draggable-plus.pages.dev/',
  //   transformItems(items) {
  //     return items.filter(item => !item.url.includes('__docs__'))
  //   }
  // },
  themeConfig: {
    // @ts-ignore
    repo: 'vuejs/vitepress',
    editLinks: true,
    logo: '/logo.svg',
    sidebar
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
