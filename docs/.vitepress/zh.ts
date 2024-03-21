import { defineConfig, type DefaultTheme } from 'vitepress'

export default defineConfig({
    lang: 'zh-CN',
    title: 'vue-draggable-plus',
    description: 'vue3拖拽排序组件',
    label: '简体中文',
    themeConfig: {
        nav: nav(),
        outline: {
            label: '页面导航'
        },      
    }
})

function nav(): DefaultTheme.NavItem[] {
    return [
        { text: '指南', link: '/guide/', activeMatch: '^/guide/' },
        { text: '演示', link: '/demo/basic/', activeMatch: '^/demo/' },
        { text: 'API', link: '/api/', activeMatch: '^/api/' },
        { text: '常见问题', link: '/faq/', activeMatch: '^/faq/' },
        { text: '联系我', link: '/contact-me/', activeMatch: '^/contact-me/' }
    ]
}