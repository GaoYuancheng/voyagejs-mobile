export const getOptions = async config => {
  const { valueEnum, options, request } = config
  if (options) return options
  if (valueEnum) {
    return Object.keys(valueEnum).map(key => {
      return {
        label: valueEnum[key],
        value: key
      }
    })
  }
  if (request) {
    const res = await request()
    return res
  }
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
