type FileItem = {
  type?: 'file'
  fileInfo?: FileInfo
}

type CheckboxItem = {
  type: 'checkbox'
  options: {
    label: string
    value: string
  }[]
}

type FileInfo = { fileName: string; fileUrl: string; fileSize: number }

export interface LabelProps {
  labelCol?: number
  labelStyle?: object
}

export interface ValueProps {
  valueCol?: number
  valueStyle?: object
}

export type DescriptionItemType = {
  label?: string
  type?: 'info' | 'file' | 'checkbox'
  value?: string
  fileInfo?: FileInfo
  options?: {
    // 暂时先这么处理
    label: string
    value: string
  }[]
  visible?: boolean
  onClick?: (item: DescriptionItemType) => void
} & ValueProps &
  LabelProps
