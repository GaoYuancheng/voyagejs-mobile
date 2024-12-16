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
import { Item } from '../../type'
import { computed, ref, watch } from 'vue'

const item = defineProps<Item>()

const { fileInfo } = item
const { fileName, fileUrl, fileSize } = fileInfo || {}

const click = (data: Item) => {
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
