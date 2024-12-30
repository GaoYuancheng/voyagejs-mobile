<template>
  <template v-if="!!item.visible">
    <span v-if="type === 'text'" @click="click">
      {{ text }}
    </span>

    <span v-if="type === 'tag'" class="tag" :style="style" @click="click">
      {{ text }}</span
    >
    <span
      v-if="type === 'button'"
      class="button"
      :class="buttonProps.type"
      @click="click"
    >
      {{ text }}</span
    >

    <span v-if="type === 'badge'" class="badge" @click="click"
      ><span
        class="badgeIcon"
        :style="{
          background: iconColor
        }"
      ></span>
      {{ text }}</span
    >
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Item {
  label: string
  valueKey: string
  visible?: boolean
  type: 'text' | 'tag' | 'button' | 'badge'
  text: string
}

const emits = defineEmits(['click'])

const item = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  text: {
    type: String,
    default: ''
  },
  style: {
    type: Object,
    default: () => ({})
  },
  badgeProps: {
    type: Object,
    default: () => ({})
  },
  buttonProps: {
    type: Object,
    default: () => ({})
  },
  onClick: {
    type: Function,
    default: () => {}
  },
  visible: {
    type: Boolean,
    default: true
  },
  options: {
    type: Array,
    default: () => []
  },
  label: {
    type: String,
    default: ''
  },
  tagProps: {
    type: Object
  },
  confirmText: {
    type: String,
    default: ''
  }
})

const { type, text, style, badgeProps, onClick, confirmText } = item

const click = () => {
  if (confirmText) {
    uni.showModal({
      title: '提示',
      content: confirmText,
      success: res => {
        onClick(item)
      }
    })
    return
  }

  onClick(item)
}

const { iconColor } = badgeProps
</script>

<style lang="scss" scoped>
.tag {
  padding: 6rpx 12rpx;
  border-radius: 8rpx;
  background: rgb(0, 100, 255);
  color: #fff;
}
.badge {
  display: flex;
  align-items: center;
  .badgeIcon {
    display: inline-block;
    width: 12rpx;
    height: 12rpx;
    border-radius: 50%;
    margin-right: 16rpx;
  }
}
</style>
