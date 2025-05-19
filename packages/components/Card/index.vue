<template>
  <div class="card" :style="cardStyle">
    <div class="cardHeader" v-if="slots.title || slots.extra || title || extra">
      <div class="title">
        <slot v-if="slots.title" name="title"></slot>
        <span v-else>
          {{ title }}
          <DescriptionIcon
            style="margin-left: 8rpx"
            v-if="titleDescription"
            :description="titleDescription"
            :size="32"
          />
        </span>
      </div>
      <div class="extra">
        <slot v-if="slots.extra" name="extra"></slot>
        <span v-else> {{ extra }}</span>
      </div>
    </div>
    <div class="cardBody" :style="bodyStyle">
      <slot v-if="slots.default"></slot>
      <slot v-if="slots.body" name="body"></slot>
    </div>

    <div v-if="slots.footer" class="cardFooter">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, useSlots, CSSProperties } from 'vue'
import DescriptionIcon from '../DescriptionIcon/index.vue'

export type CardProps = {
  title?: string
  titleDescription?: string
  extra?: string
  bodyStyle?: CSSProperties
  cardStyle?: CSSProperties
}

const props = withDefaults(defineProps<CardProps>(), {
  bodyStyle: () => ({}),
  cardStyle: () => ({})
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
