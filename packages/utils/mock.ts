export const sleep = time => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

export const mockRequest = async (params, resData) => {
  await sleep(1000)
  return JSON.parse(JSON.stringify(resData))
}
