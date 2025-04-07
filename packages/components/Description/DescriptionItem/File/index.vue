<template>
  <u-row class="file">
    <div class="u-flex" @click="click(item)">
      <u-image width="80rpx" height="80rpx" :src="imgUrl"></u-image>
    </div>
    <div class="text u-m-l-24" @click="click(item)">
      <div class="fileName">
        {{ item.fileInfo?.fileName }}
      </div>
      <div class="fileSize" v-if="showFileSize">
        {{ fileSizeInfo?.fileSize }}{{ fileSizeInfo?.finalUnit }}
      </div>
    </div>
    <div class="actions">
      <span
        v-for="action in resActions"
        :key="action.icon"
        @click="action.onClick(item.fileInfo)"
      >
        <u-icon
          v-if="action.icon"
          :name="action.icon"
          :style="action.style"
        ></u-icon>
        <span v-if="action.text" :style="action.style">{{ action.text }}</span>
      </span>
    </div>
  </u-row>
</template>

<script setup lang="ts">
// './image/icon_' + getFileSuffix(fileInfo.fileName) + '.png'
import { computed, CSSProperties, ref, watch } from 'vue'
import { getFileSuffix, download, convertFileSize } from '../../../../utils'
type Unit = 'B' | 'K' | 'M' | 'G' | 'b' | 'k' | 'm' | 'g'
type FileInfo = {
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
  labelStyle?: CSSProperties
}

interface ValueProps {
  valueCol?: number
  valueStyle?: CSSProperties
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
} & ValueProps &
  LabelProps

const item = defineProps<DescriptionItemType>()

const fileSizeInfo = computed(() => {
  let fileSize = 0
  if (item.fileInfo?.fileSize?.fileSize) {
    fileSize = item.fileInfo?.fileSize?.fileSize
  } else {
    fileSize = item.fileInfo?.fileSize || 0
  }
  let unit = item?.fileInfo?.fileSize?.unit || 'B'
  let finalUnit = item?.fileInfo?.fileSize?.finalUnit || 'M'

  return {
    unit,
    finalUnit,
    fileSize: convertFileSize(fileSize, unit, finalUnit)
  }
})

const showFileSize = computed(() => {
  return item.fileInfo?.fileSize !== 0 && !!item.fileInfo?.fileSize
})

const typeMap = {
  download: {
    icon: 'download',
    style: {
      color: '#0064ff'
    },
    onClick: fileInfo => {
      download(fileInfo.fileUrl, fileInfo.fileName)
    }
  },
  preview: {
    icon: 'eye',
    style: {
      color: '#0064ff'
    }
  }
}

const resActions = computed(() => {
  return item.actions?.map(action => {
    return typeof action === 'string'
      ? typeMap[action || ''] || {}
      : { ...(typeMap[action.type || ''] || {}), ...action }
  })
})

const click = (item: DescriptionItem) => {
  item?.onClick?.(item)
}

const imgUrl = ref()
watch(
  () => item.fileInfo,
  async newValue => {
    const targetImgUrl = new URL(
      `./image/icon_${getFileSuffix(item.fileInfo?.fileName) || 'unknown'}.png`,
      import.meta.url
    ).href

    // const res = await import(`./image/icon_${getFileSuffix(fileName)}.png`)
    imgUrl.value = targetImgUrl
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.file {
  flex-wrap: nowrap;
  .fileName {
    color: #0064ff;
    margin-bottom: 16rpx;
  }
  .fileSize {
    color: #c0b099;
    font-size: 24rpx;
  }

  .actions {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 16rpx;
  }
}
</style>
