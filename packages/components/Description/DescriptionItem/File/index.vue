<template>
  <u-row class="file">
    <div class="u-flex" @click="click(item)">
      <u-image width="80rpx" height="80rpx" :src="imgUrl"></u-image>
      <div class="text u-m-l-24">
        <div class="fileName">
          {{ fileName }}
        </div>
        <div class="fileSize">{{ fileSize }}M</div>
      </div>
    </div>
  </u-row>
</template>

<script setup lang="ts">
// './image/icon_' + getFileSuffix(fileInfo.fileName) + '.png'

import { getFileSuffix, previewFile } from '../../../../utils'
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

import { computed, ref, watch } from 'vue'

const item = defineProps<DescriptionItemType>()

const { fileInfo } = item
const { fileName, fileUrl, fileSize } = fileInfo || {}

const click = (item: DescriptionItem) => {
  item?.onClick?.(item)
}

const imgUrl = ref()
let defaultUrl = './image/icon_unknown.png'
watch(
  () => item.fileInfo,
  async newValue => {
    const res = await import(`./image/icon_${getFileSuffix(fileName)}.png`)
    imgUrl.value = res.default || defaultUrl
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.file {
  .fileName {
    color: #0064ff;
    margin-bottom: 16rpx;
  }
  .fileSize {
    color: #c0b099;
    font-size: 24rpx;
  }
}
</style>
