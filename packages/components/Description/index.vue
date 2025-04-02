<template>
  <div class="header">
    <div class="title" v-if="slots.title || title">
      <slot name="title" v-if="slots.title"></slot>
      <div class="titleText" v-else-if="title">
        {{ title }}
      </div>
    </div>
    <div class="extra" v-if="slots.extra || extra">
      <slot name="extra" v-if="slots.extra"></slot>
      <div class="extraText" v-else-if="extra">
        {{ extra }}
      </div>
    </div>
  </div>
  <view class="body">
    <div class="item" :key="item.label" v-for="(item, index) in items">
      <DescriptionItem v-bind="item" v-if="getVisible(item.visible, {})" />
    </div>
  </view>
</template>

<script setup lang="ts">
import { useSlots } from 'vue'
import { getVisible } from '../../utils'
import DescriptionItem from './DescriptionItem/index.vue'

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

type DescriptionProps = {
  /** 标题 */
  title?: string
  /** 标题右侧区域 */
  extra?: string
  /** 详情项 */
  items?: DescriptionItemType[]
} & ValueProps &
  LabelProps

const { title, items, valueCol, labelCol, extra } =
  defineProps<DescriptionProps>()

const slots = useSlots()
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.title {
  font-size: 30rpx;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.85);
}
.body {
  background-color: white;
  border-radius: 16rpx;
  margin: 24rpx 0 24rpx 0;
  font-size: 30rpx;
  font-weight: 400;
  .item {
    padding: 24rpx;
    border-bottom: 1px solid #eee;
    // .value {
    //   color: rgba(0, 0, 0, 0.65);
    //   flex: 1;
    //   overflow: hidden;
    //   text-overflow: ellipsis;
    //   white-space: nowrap;
    //   display: flex;
    //   justify-content: flex-end;
    // }
    // .click-text {
    //   color: #1890ff;
    // }
    // .tips-text {
    //   color: rgba(0, 0, 0, 0.2);
    // }
  }
}
</style>
