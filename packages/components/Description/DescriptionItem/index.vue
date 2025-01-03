<template>
  <Info v-if="type === 'info'" v-bind="item" />
  <CheckBox v-if="type === 'checkbox'" v-bind="item" />
  <File v-if="type === 'file'" v-bind="item" />
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

import Info from './Info/index.vue'
import CheckBox from './CheckBox/index.vue'
import File from './File/index.vue'

const item = defineProps<DescriptionItemType>()

const { type = 'info' } = item
</script>

<style lang="scss" scoped></style>
