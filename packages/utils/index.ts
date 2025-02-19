export * from './file'
export * from './mock'

export const getVisible = (
  visible: boolean | ((data: any) => boolean) = true,
  data: any = {}
) => {
  if (typeof visible === 'function') return visible(data)
  return !!visible
}
