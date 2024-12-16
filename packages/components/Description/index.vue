<template>
  <text class="title" v-if="title">{{ title }}</text>
  <view class="body">
    <div class="item" :key="item.label" v-for="(item, index) in items">
      <DescriptionItem v-bind="item" v-if="getVisible(item.visible, {})" />
    </div>
  </view>
</template>

<script setup lang="ts">
import { getVisible } from '../../utils'
import { type DescriptionItem, LabelProps, ValueProps } from './type'

export type { DescriptionItem, LabelProps, ValueProps }

export type DescriptionProps = {
  title: string
  items: DescriptionItem[]
} & ValueProps &
  LabelProps

const { title, items, valueCol, labelCol } = defineProps<DescriptionProps>()
</script>

<style lang="scss" scoped>
.title {
  font-size: 30rpx;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.45);
}
.body {
  background-color: white;
  border-radius: 16rpx;
  margin: 24rpx 0 24rpx 0;
  font-size: 30rpx;
  font-weight: 400;
  .item {
    padding: 24rpx;

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
