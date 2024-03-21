import { defineConfig } from 'vitepress'
import publicConfig from './public'
import en from './en'
import zh from './zh'

export default defineConfig({
 ...publicConfig,
  locales: {
    root: { label: '简体中文', ...zh},
    en: { label: 'English', ...en }
  },
})
