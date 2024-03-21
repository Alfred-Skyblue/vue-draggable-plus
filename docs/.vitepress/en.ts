import { defineConfig, type DefaultTheme } from 'vitepress'

export default defineConfig({
    lang: 'en-US',
    title: 'vue-draggable-plus',
    description: 'vue3拖拽排序组件',
    label: 'English',
    // @ts-ignore
    link: '/en/',
    themeConfig: {
        nav: nav()
    }
})

function nav(): DefaultTheme.NavItem[] {
    return [
        { text: 'Guide', link: '/en/guide/' },
        { text: 'Demo', link: '/en/demo/basic/' },
        { text: 'API', link: '/en/api/', activeMatch: '^/api/' },
        { text: 'FAQ', link: '/en/faq/', activeMatch: '^/faq/' }
    ]
}