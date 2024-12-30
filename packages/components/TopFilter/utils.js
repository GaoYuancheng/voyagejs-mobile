export const getOptions = async config => {
  const { valueEnum, options, request, showAll = true } = config
  const initialOptions = showAll ? [{ label: '全部', value: undefined }] : []

  let resOptions = []

  if (options) {
    resOptions = options
  }
  if (valueEnum) {
    resOptions = Object.keys(valueEnum).map(key => {
      return {
        label: valueEnum[key],
        value: key
      }
    })
  }
  if (request) {
    const res = await request()
    resOptions = res
  }

  return initialOptions.concat(resOptions)
}

export const formatPickerTimeValue = value => {
  if (!value) return {}
  let res = {
    defaultTime: undefined,
    showText: undefined
  }
  const { year, month, day } = value

  if (year && month && day) {
    res.defaultTime = res.showText = `${year}-${month}-${day}`
  } else if (year && month) {
    res.defaultTime = res.showText = `${year}-${month}`
  } else if (year) {
    res.defaultTime = `${year}-01`
    res.showText = `${year}`
  }

  return res
}
