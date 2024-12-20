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
  if (!value) return ''
  const { year, month, day } = value
  let res = ''
  if (year) res += year
  if (month) res += `-${month}`
  if (day) res += `-${day}`
  return res
}
