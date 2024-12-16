<template>
  <view
    class="statistics-card"
    :class="isChecked ? 'active' : ''"
    :style="style"
    @click="handleClick"
  >
    <view class="statistics-left"
      ><u-image width="80" height="80" :src="iconPath"></u-image
    ></view>
    <view class="statistics-right">
      <text class="title">{{ title }}</text>
      <text class="value"
        >{{ text || 0 }} <text class="subTitle">{{ subTitle }}</text></text
      >
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps([
  'title',
  'icon',
  'text',
  'style',
  'clickCb',
  'isChecked',
  'type',
  'subTitle'
])

const iconPath = computed(() => `/static/${props.icon}.svg`)

const handleClick = () => {
  // props.clickCb(props.type)
}
</script>

<style scoped lang="scss">
.statistics-card {
  display: flex;
  width: calc(50% - 8rpx);
  border-radius: 4rpx;
  background: #fff;
  gap: 16rpx;
  padding: 16rpx;
}

.statistics-card.active {
  box-shadow: 0 0 6rpx 3rpx #1890ff, 0 0 6rpx 3rpx #1890ff;
}

.statistics-left {
  width: 90rpx;
}

.statistics-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8rpx;

  .title {
    color: rgba(0, 0, 0, 0.65);
  }

  .value {
    font-size: 42rpx;
  }

  .subTitle {
    font-size: 30rpx;
    color: #666;
  }
}
</style>
