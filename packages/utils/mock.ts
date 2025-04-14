export const sleep = time => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

export const mockRequest = async <T extends any>(
  params: any,
  resData: T
): Promise<T> => {
  await sleep(1000)
  return structuredClone(resData)
}
