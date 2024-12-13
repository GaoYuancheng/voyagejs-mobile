<template>
  <div class="card">
    <div class="cardHeader">
      <div class="title">
        <slot v-if="slots.title" name="title"></slot>
        <span v-else> {{ title }}</span>
      </div>
      <div class="extra">
        <slot v-if="slots.extra" name="extra"></slot>
        <span v-else> {{ extra }}</span>
      </div>
    </div>
    <div class="cardBody">
      <slot v-if="slots.default"></slot>
      <slot v-if="slots.body" name="body"></slot>
    </div>

    <div v-if="slots.footer" class="cardFooter">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
import { useSlots } from 'vue'

defineProps({
  title: {
    type: String,
    default: () => ''
  },
  extra: {
    type: String,
    default: () => ''
  }
})

const slots = useSlots()
</script>

<style lang="scss" scoped>
.card {
  background-color: #fff;
  .cardHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24rpx;
    border-bottom: 1rpx solid #f2f2f2;
    .title,
    .extra,
    .footer {
      display: flex;
      align-items: center;
      gap: 8rpx;
    }
    // .header {
    //   padding: 24rpx;
    // }
    // .extra {
    //   padding: 24rpx;
    // }
  }
  .cardBody {
    padding: 24rpx;
  }

  .cardFooter {
    border-top: 1rpx solid #f2f2f2;
    padding: 24rpx;
  }
}
</style>
