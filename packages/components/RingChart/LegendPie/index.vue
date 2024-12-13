<template>
  <view class="pie-legend-box-wrap">
    <view class="pie-legend-box">
      <view
        class="pie-legend-item"
        v-for="(item, index) in legends"
        :key="item.name"
      >
        <div class="pie-legend-name">
          <div
            class="pieLegendIcon"
            :style="{
              background: getColor(index)
            }"
          ></div>
          <span>{{ item.name }}</span>
        </div>
        <!-- <div class="percent">{{ item.percent || 0 }}%</div> -->
        <div class="legend-value">{{ item.data }}</div>
      </view>
    </view>
  </view>
</template>
<script setup>
import { watch, ref } from 'vue'
import { STATUS_PIE_COLORS } from './data'
import { getPercentWithPrecision } from './util.js'

const legends = ref([])
const props = defineProps({
  legendData: Array,
  color: Array
})

let colorIndex = 0

const getColor = index => {
  const resColors = props.color || STATUS_PIE_COLORS || []
  if (resColors.length - 1 > colorIndex) {
    colorIndex++
  } else {
    colorIndex = 0
  }
  return resColors[colorIndex]
}

watch(
  [props],
  () => {
    if (props?.legendData?.length) {
      const arr = props?.legendData?.map(item => item.value) // 生成 value 数组
      // 计算每个成员的占比
      legends.value = props?.legendData?.map((item, index) => {
        let percent = 0
        if (item.rate) {
          percent = item.rate
        } else {
          percent = getPercentWithPrecision(arr, index, 2)
        }

        return {
          percent,
          ...item
        }
      })
    }
  },
  { immediate: true }
)
</script>
<style lang="scss" scoped>
.pie-legend-box-wrap {
  height: 100%;
  width: 45%;
  padding-left: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.pie-legend-box {
  width: 100%;
  overflow-y: auto;

  .pie-legend-item {
    width: 100%;
    gap: 16rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .pie-legend-name {
    display: flex;
    align-items: center;
    gap: 8rpx;
    width: 420rpx;

    .pieLegendIcon {
      height: 20rpx;
      width: 20rpx;
    }
  }

  .percent {
    width: 160rpx;
    text-align: right;
  }

  .legend-value {
    width: 100rpx;
    text-align: right;
  }
}
</style>
