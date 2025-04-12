import fs from 'fs'
import path from 'path'

const rootPath = 'src/components'

export const getDemos = () => {
  const demos: any = {}

  // 读取 packages/components 目录下的所有文件和文件夹
  const files = fs.readdirSync(rootPath)

  files.forEach(file => {
    const filePath = path.join(rootPath, file)
    const stats = fs.statSync(filePath)

    // 如果是文件夹，检查是否包含 demos 文件夹
    if (stats.isDirectory()) {
      const demosPath = path.join(filePath, 'vueDemos')
      if (fs.existsSync(demosPath)) {
        // 读取 demos 文件夹中的所有文件
        const demoFiles = fs.readdirSync(demosPath)

        demoFiles.forEach(demoFile => {
          if (!demoFile.endsWith('.vue')) return
          const demoFilePath = path.join(demosPath, demoFile)
          const demoFileContent = fs.readFileSync(demoFilePath, 'utf8')
          // 将文件内容放入对象中，键为文件的相对路径，值为文件内容
          // 统一路径分隔符为-
          const relativePath = path
            .relative(rootPath, demoFilePath)
            .replace(/[\\/]/g, '/')
          demos[relativePath] = demoFileContent
        })
      }
    }
  })

  return demos
}
