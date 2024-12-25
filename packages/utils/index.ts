export const mockRequest = async (params, resData) => {
  await sleep(1000)
  return structuredClone(resData)
}

export const sleep = time => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

// 文件下载
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

// 预览文件
type PreviewFileParams = {
  fileName: string
  fileUrl: string
}

type PreviewFile = (file: PreviewFileParams, previewPageUrl?: string) => void
export const previewFile: PreviewFile = (file, previewPageUrl) => {
  const fileSuffix = getFileSuffix(file.fileName)
  if (['png', 'jpg', 'jpeg', 'webp', 'image', 'svg'].includes(fileSuffix)) {
    uni.previewImage({ urls: [file.fileUrl] })
    return
  }
  if (previewPageUrl) {
    download(file.fileUrl, file.fileName)
    // uni.navigateTo({
    //   url: previewPageUrl,
    //   params: {
    //     url: encodeURIComponent(file.fileUrl)
    //   }
    // })
  }
}

export const getVisible = (
  visible: Boolean | Function = true,
  data: any = {}
) => {
  if (typeof visible === 'function') return visible(data)
  return !!visible
}
