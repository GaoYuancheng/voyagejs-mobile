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

// 获取文件后缀
export const getFileSuffix = fileName =>
  fileName ? fileName?.split('.')?.pop() : ''

// 预览文件
export const previewFile = async (file, previewPageUrl) => {
  const fileSuffix = getFileSuffix(file)
  if (['png', 'jpg', 'jpeg', 'webp', 'image', 'svg'].includes(fileSuffix)) {
    uni.previewImage({ urls: [file.fileUrl] })
    return
  }
  if (previewPageUrl) {
    uni.navigateTo({
      url: previewPageUrl,
      params: {
        url: encodeURIComponent(file.fileUrl)
      }
    })
  }
}

export const getVisible = (
  visible: Boolean | Function = true,
  data: any = {}
) => {
  if (typeof visible === 'function') return visible(data)
  return !!visible
}
