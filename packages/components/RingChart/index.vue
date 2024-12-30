<template>
  <div class="pie-box">
    <template v-if="chartData.length > 0">
      <div class="pie-box-left">
        <u-chart
          type="ring"
          :canvas2d="true"
          background="none"
          :opts="opts"
          :chartData="{
            series: chartData
          }"
        />
      </div>
      <LegendPie :legendData="chartData" />
    </template>
    <div class="empty">
      <u-empty v-if="chartData.length === 0" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import LegendPie from './LegendPie/index.vue'
import { STATUS_PIE_COLORS } from './LegendPie/data'
interface Props {
  chartData: {
    name: string
    data: number
    rate: number
  }[]
}
const props = defineProps<Props>()

const opts = computed(() => {
  return {
    type: 'ring',
    // color: ['#2478FF', '#FFCD00', '#49C292'],
    color: STATUS_PIE_COLORS,
    padding: [20, 20, 20, 20],
    rotate: false,
    dataLabel: false,
    legend: {
      show: false,
      position: 'right',
      margin: 15,
      lineHeight: 25
    },
    title: {
      name: '总数',
      fontSize: 15,
      color: 'rgba(0, 0, 0, 0.65)'
    },
    subtitle: {
      name: props.chartData.reduce((prev, cur) => {
        return prev + cur.data
      }, 0),
      fontSize: 28,
      color: '#000'
    },
    extra: {
      ring: {
        ringWidth: 10,
        activeOpacity: 0.5,
        activeRadius: 10,
        offsetAngle: 0,
        labelWidth: 15,
        radius: 60,
        border: true,
        borderWidth: 2,
        borderColor: '#FFFFFF'
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.empty {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.pie-box {
  height: 450rpx;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  .pie-box-left {
    width: 50%;

    .pie-bottom-title {
      width: 40%;
      position: absolute;
      bottom: 50rpx;
      left: 0;
      font-weight: 600;
    }
  }
}
</style>
