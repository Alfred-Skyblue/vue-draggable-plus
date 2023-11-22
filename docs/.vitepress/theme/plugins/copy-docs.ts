/**
 * 该文件用于处理 @ruabick/vite-plugin-gen-temp 和 vitepress 不兼容问题，后续会删除，仅开发过程中生效
 */
import fse from 'fs-extra'
import path from 'path'
const sourceDir = path.resolve(__dirname, '../../../root')
const destinationDir = path.resolve(__dirname, '../../../')
function copyDirectoryContents(source, destination) {
  fse.copySync(source, destination, {
    overwrite: true,
    errorOnExist: false,
    recursive: true
  })
}

export function copyDocs() {
  return {
    name: 'copy-docs',
    config: async (config: any) => {
      copyDirectoryContents(sourceDir, destinationDir)
    }
  }
}
