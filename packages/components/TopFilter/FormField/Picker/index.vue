<template>
  <div class="label" v-if="isDropdown">{{ label }}</div>

  <div class="searchArea" @click="showRef = true">
    <div class="text">
      <span v-if="!isDropdown">{{ label }}</span>
      <span v-else-if="inputValue">{{ inputValue }}</span>
      <span v-else class="placeholder">{{ placeholder || '请选择' }}</span>
      <u-icon class="icon" name="arrow-down"></u-icon>
    </div>
  </div>

  <Teleport to="body">
    <u-picker v-model="showRef" @confirm="confirm" v-bind="fieldProps" />
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, Teleport } from 'vue'

interface Props {
  name?: string
  label?: string
  placeholder?: string
  fieldProps?: Record<string, any>
  isDropdown?: boolean
  modelValue?: any
}

const emits = defineEmits(['change', 'update:modelValue'])

const props = defineProps<Props>()
const { placeholder, isDropdown, label, fieldProps } = props

const showRef = ref(false)

const inputValue = computed(() => {
  if (!props.modelValue) return ''
  const { year, month, day } = props.modelValue
  let res = ''
  if (year) res += year
  if (month) res += `-${month}`
  if (day) res += `-${day}`
  return res
})

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
