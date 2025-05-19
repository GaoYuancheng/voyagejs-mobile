import { CSSProperties } from 'vue'
type Unit = 'B' | 'K' | 'M' | 'G' | 'b' | 'k' | 'm' | 'g'

export type FileInfo = {
  fileName: string
  fileUrl: string
  fileSize:
    | number
    | {
        unit: Unit
        finalUnit: Unit
        fileSize: number
      }
}

interface LabelProps {
  labelCol?: number
  labelStyle?: object
}

interface ValueProps {
  valueCol?: number
  valueStyle?: object
}

export type DescriptionItemType = {
  label?: string
  type?:
    | 'info'
    | 'file'
    | 'checkbox'
    | 'custom'
    | 'link'
    | 'fileList'
    | 'textArea'
  value?: string
  fileInfo?: FileInfo
  fileList?: FileInfo[]
  options?: {
    // 暂时先这么处理
    label: string
    value: string
  }[]
  visible?: boolean
  onClick?: (item: DescriptionItemType) => void
  actions?: (
    | {
        /** 点击事件 */
        onClick: (item: DescriptionItemType['fileInfo']) => void
        /** 同u-icon的name */
        icon?: string
        /** 按钮文字 */
        text?: string
        /** 按钮样式 */
        style?: CSSProperties
        /** 内置类型 */
        type?: 'download' | 'preview'
      }
    | string
  )[]
  link?: string
  render?: (data: any) => any
} & ValueProps &
  LabelProps
