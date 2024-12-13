<template>
  <span v-if="type === 'text'" @click="emits('click')">
    {{ text }}
  </span>

  <span
    v-if="type === 'tag'"
    class="tag"
    :style="style"
    @click="emits('click')"
  >
    {{ text }}</span
  >
  <span
    v-if="type === 'button'"
    class="button"
    :class="buttonProps.type"
    @click="emits('click')"
  >
    {{ text }}</span
  >

  <span v-if="type === 'badge'" class="badge"
    ><span
      class="badgeIcon"
      :style="{
        background: iconColor
      }"
    ></span>
    {{ text }}</span
  >
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Item {
  label: string
  valueKey: string
  visible: boolean
  type: 'text' | 'tag' | 'button' | 'badge'
  text: string
  events: Record<string, Function>
}

const emits = defineEmits(['click'])

const { type, text, events, style, badgeProps } = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  text: {
    type: String,
    default: ''
  },
  events: {
    type: Object,
    default: () => ({})
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
  }
})

const { iconColor } = badgeProps
</script>

<style lang="scss" scoped>
.tag {
  padding: 6rpx 12rpx;
}
.badge {
  .badgeIcon {
    display: inline-block;
    width: 12rpx;
    height: 12rpx;
    border-radius: 50%;
    margin-right: 8rpx;
  }
}
</style>
