<template>
  <u-row class="info">
    <Label v-bind="item">{{ item.label }}</Label>
    <Value>
      <u-checkbox
        v-for="item in options"
        class="checkbox"
        :modelValue="!!item.value"
        >{{ item.label }}</u-checkbox
      >
    </Value>
  </u-row>
</template>

<script setup lang="ts">
import Label from '../../Label/index.vue'
import Value from '../../Value/index.vue'

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

const { options = [] } = item
</script>

<style lang="scss" scoped>
.value {
  display: flex;
  .checkbox {
    margin-left: 12rpx;
  }
}
:deep(.u-checkbox__label) {
  margin-right: 0;
}
</style>
