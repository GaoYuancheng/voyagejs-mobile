export const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp']
export const videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv']
export const audioExtensions = ['mp3', 'wav', 'ogg', 'aac']
export const zipExtensions = ['zip', 'rar', 'tar', 'gz']
export const wordExtensions = ['doc', 'docx']
export const excelExtensions = ['xls', 'xlsx']
export const pdfExtensions = ['pdf']
export const pptExtensions = ['ppt', 'pptx']

/**
 * 下载文件
 * @param url 文件的 URL 地址
 * @param name 下载后的文件名
 */
export function download(url, name) {
  fetch(url)
    .then(re => re.blob())
    .then(re => {
      const _url = URL.createObjectURL(re)
      const a = document.createElement('a')
      a.href = _url
      a.download = name
      a.click()
    })
}

// 获取文件后缀
export const getFileSuffix = fileName =>
  fileName ? fileName?.split('.')?.pop() : ''

/**
 * 获取文件的扩展名
 * @param fileName 文件名
 * @returns 文件的扩展名（小写），如果没有扩展名则返回空字符串
 */
export const getFileExtension = (fileName?: string): string => {
  if (!fileName) {
    return ''
  }
  const parts = fileName.split('.')
  return parts.length > 1 ? parts.pop()?.toLowerCase() || '' : ''
}

export type Unit = 'B' | 'K' | 'M' | 'G' | 'b' | 'k' | 'm' | 'g'

// 转换单位 K M G B
export const convertFileSize = (
  fileSize: number,
  unit: Unit = 'B',
  finalUnit: Unit = 'M'
) => {
  // 将文件大小从 unit 单位转换到 finalUnit 单位
  const units: Unit[] = ['B', 'K', 'M', 'G']
  const unitIndex = units.indexOf(unit.toUpperCase() as Unit)
  const finalUnitIndex = units.indexOf(finalUnit.toUpperCase() as Unit)
  const diff = finalUnitIndex - unitIndex

  if (diff === 0) return fileSize

  // 如果是向上转换(B->K->M->G)则除以1024
  // 如果是向下转换(G->M->K->B)则乘以1024
  const res =
    diff > 0
      ? fileSize / Math.pow(1024, diff)
      : fileSize * Math.pow(1024, -diff)
  return res.toFixed(2)
}
