<template>
  <div class="header">
    <div class="title" v-if="slots.title || title">
      <slot name="title" v-if="slots.title"></slot>
      <div class="titleText" v-else-if="title">
        {{ title }}
      </div>
    </div>
    <div class="extra" v-if="slots.extra || extra || collapse">
      <slot name="extra" v-if="slots.extra"></slot>
      <div class="extraText" v-else-if="extra">
        {{ extra }}
      </div>
      <div class="collapse" v-if="collapse" @click="collapseRef = !collapseRef">
        <template v-if="collapseRef">
          <u-icon name="arrow-down" />
        </template>
        <template v-else> <u-icon name="arrow-up" /> </template>
      </div>
    </div>
  </div>
  <view
    class="body"
    :style="{ 'grid-template-rows': collapseRef ? '0fr' : '1fr' }"
  >
    <div style="overflow: hidden">
      <slot name="body" v-if="slots.body"></slot>
      <div class="item" :key="item.label" v-else v-for="(item, index) in items">
        <DescriptionItem v-bind="item" v-if="getVisible(item.visible, {})" />
      </div>
    </div>
  </view>
</template>

<script setup lang="ts">
import { ref, useSlots } from 'vue'
import { getVisible } from '../../utils'
import DescriptionItem from './DescriptionItem/index.vue'
import type { DescriptionItemType } from './type'

type FileInfo = { fileName: string; fileUrl: string; fileSize: number }

interface LabelProps {
  labelCol?: number
  labelStyle?: object
}

interface ValueProps {
  valueCol?: number
  valueStyle?: object
}

type DescriptionProps = {
  /** 标题 */
  title?: string
  /** 标题右侧区域 */
  extra?: string
  /** 详情项 */
  items?: DescriptionItemType[]
  /** 是否折叠 */
  collapse?: boolean
} & ValueProps &
  LabelProps

const { title, items, collapse, extra } = withDefaults(
  defineProps<DescriptionProps>(),
  {
    collapse: false
  }
)

const slots = useSlots()

const collapseRef = ref(false)
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .extra {
    display: flex;
    align-items: center;
    gap: 8rpx;
  }
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
  display: grid;
  transition: 250ms grid-template-rows ease;
  overflow: hidden;
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
