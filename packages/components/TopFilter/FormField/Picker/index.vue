<template>
  <div class="label" v-if="isDropdown">{{ label }}</div>

  <div class="searchArea" @click="showRef = true">
    <span class="content" :style="textStyle">
      <span v-if="!isDropdown">{{ label }}</span>
      <span v-else-if="showInfo.showText">{{ showInfo.showText }}</span>
      <span v-else class="placeholder">{{ placeholder || '请选择' }}</span>
    </span>

    <u-icon v-if="showIcon" class="icon" name="arrow-down"></u-icon>
  </div>

  <Teleport to="body">
    <u-picker
      v-model="showRef"
      @confirm="confirm"
      v-bind="fieldProps"
      :defaultTime="showInfo.defaultTime"
    />
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, Teleport } from 'vue'
import { formatPickerTimeValue } from '../../utils'

export interface PickerProps {
  name?: string
  label?: string
  placeholder?: string
  fieldProps?: Record<string, any>
  isDropdown?: boolean
  modelValue?: any
  showIcon?: boolean
  textStyle?: Record<string, any>
}

const emits = defineEmits(['change', 'update:modelValue'])

const props = withDefaults(defineProps<PickerProps>(), {
  showIcon: true,
  textStyle: {}
})
const { placeholder, isDropdown, label, fieldProps, showIcon, textStyle } =
  props

const showRef = ref(false)

const showInfo = computed(() => {
  if (!props.modelValue) return {}
  return formatPickerTimeValue(props.modelValue)
}) as any

const confirm = val => {
  emits('update:modelValue', val)
  emits('change', val)
}
</script>

<style lang="scss" scoped>
.searchArea {
  display: flex;
  align-items: center;
  .placeholder {
    color: #ccc;
  }
  .icon {
    color: #ccc;
    margin-left: 16rpx;
  }
}
</style>
