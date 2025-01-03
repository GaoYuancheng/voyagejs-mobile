<template>
  <div class="label" v-if="isDropdown">{{ label }}</div>

  <div class="searchArea" @click="showRef = true">
    <span v-if="!isDropdown">{{ label }}</span>
    <span v-else-if="showInfo.showText">{{ showInfo.showText }}</span>
    <span v-else class="placeholder">{{ placeholder || '请选择' }}</span>
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

interface Props {
  name?: string
  label?: string
  placeholder?: string
  fieldProps?: Record<string, any>
  isDropdown?: boolean
  modelValue?: any
  showIcon?: boolean
}

const emits = defineEmits(['change', 'update:modelValue'])

const props = withDefaults(defineProps<Props>(), {
  showIcon: true
})
const { placeholder, isDropdown, label, fieldProps, showIcon } = props

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
  .placeholder {
    color: #ccc;
  }
  .icon {
    color: #ccc;
    margin-left: 16rpx;
  }
}
</style>
