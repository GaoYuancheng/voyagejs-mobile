<template>
  <template v-if="!!props.visible">
    <span v-if="resType === 'text'" @click="click">
      {{ text }}
    </span>

    <span v-if="resType === 'tag'" class="tag" :style="style" @click="click">
      {{ text }}</span
    >
    <span
      v-if="resType === 'button'"
      class="button"
      :class="props.buttonProps?.type"
      @click="click"
    >
      {{ text }}</span
    >

    <span v-if="resType === 'badge'" class="badge" @click="click"
      ><span
        class="badgeIcon"
        :style="{
          background: iconColor
        }"
      ></span>
      {{ text }}</span
    >

    <component
      :is="props.render(props.data)"
      v-bind="props"
      v-if="!!props.render"
      @click="click"
    />
  </template>
</template>

<script setup lang="tsx">
import { computed, CSSProperties } from 'vue'

export interface ItemProps {
  type: 'text' | 'tag' | 'button' | 'badge' | 'custom'
  style?: CSSProperties
  badgeProps?: {
    iconColor?: string
  }
  buttonProps?: {
    type: string
  }
  onClick?: (item: ItemProps) => void
  valueKey?: string
  visible?: boolean | ((data: any) => boolean)
  text?: string | ((data: any) => string)
  options?: {
    label: string
    value: string
  }[]
  label?: string
  tagProps?: {
    type: string
  }
  confirmText?: string
  data?: any
  render?: any
}

const emits = defineEmits(['click'])

const props = withDefaults(defineProps<ItemProps>(), {
  type: 'text',
  text: '',
  style: () => ({}),
  badgeProps: undefined,
  buttonProps: undefined,
  onClick: () => {},
  visible: true,
  options: () => [],
  label: '',
  tagProps: undefined,
  confirmText: '',
  data: undefined
})

const { type, text, style, badgeProps, onClick, confirmText } = props
const resType = !!props.render ? 'custom' : type

const click = () => {
  if (confirmText) {
    uni.showModal({
      title: '提示',
      content: confirmText,
      success: res => {
        if (res?.confirm) {
          onClick(props)
        }
      }
    })
    return
  }

  onClick(props)
}

const { iconColor } = badgeProps || {}
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
