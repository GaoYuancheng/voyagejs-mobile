<template>
  <view
    class="statisticsCard"
    :class="isChecked ? 'active' : ''"
    :style="style"
    @click="handleClick"
  >
    <div class="left">
      <view class="image"
        ><u-image width="80" height="80" :src="iconPath"></u-image
      ></view>
      <view class="indicator">
        <text class="title">{{ title }}</text>
        <text class="value"
          >{{ text || 0 }} <text class="subTitle">{{ subTitle }}</text></text
        >
      </view>
    </div>

    <div class="right" v-if="rightList.length" :style="rightStyle">
      <div class="item" v-for="item in rightList">
        <text class="title">{{ getValue(item, 'label') }}</text>
        <text class="value">{{ getValue(item, 'value') }}</text>
      </div>
    </div>
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
  'subTitle',
  'right'
])

const iconPath = computed(() => `/static/${props.icon}.svg`)
const { style: rightStyle = {} } = props.right || {}

const rightList = computed(() => {
  return Array.isArray(props.right) ? props.right : props.right?.list || []
})

const getValue = (item, key) => {
  return typeof item[key] === 'function' ? item[key](item) : item[key]
}

const handleClick = () => {
  // props.clickCb(props.type)
}
</script>

<style scoped lang="scss">
.statisticsCard {
  display: flex;
  width: calc(50% - 8rpx);
  border-radius: 4rpx;
  background: #fff;
  gap: 16rpx;
  padding: 16rpx;
  justify-content: space-between;
}

.statistics-card.active {
  box-shadow: 0 0 6rpx 3rpx #1890ff, 0 0 6rpx 3rpx #1890ff;
}

.image {
  width: 90rpx;
}

.left {
  display: flex;
  gap: 16rpx;

  .indicator {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 8rpx;
    .title {
      color: rgba(0, 0, 0, 0.65);
    }

    .value {
      font-size: 42rpx;
      .subTitle {
        font-size: 30rpx;
        color: #666;
      }
    }
  }
}

.right {
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}
</style>
