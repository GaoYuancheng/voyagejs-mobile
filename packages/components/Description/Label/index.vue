<template>
  <u-col
    class="label"
    :style="{ ...item.labelStyle }"
    :span="labelCol || item.labelCol || 4"
    ><slot></slot
  ></u-col>
</template>

<script setup lang="ts">
type FileInfo = { fileName: string; fileUrl: string; fileSize: number }

interface LabelProps {
  labelCol?: number
  labelStyle?: object
}

interface ValueProps {
  valueCol?: number
  valueStyle?: object
}

type DescriptionItemType = {
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

const item = defineProps<DescriptionItemType>()
</script>

<style lang="scss" scoped>
.label {
  color: rgba(0, 0, 0, 0.85);
}
</style>
