<template>
  <div class="label" v-if="label">
    {{ label }}
  </div>
  <div class="fieldArea">
    <div
      class="tag"
      @click="change(item.value)"
      :class="modelValue === item.value ? 'selected' : ''"
      v-for="item in options"
      :key="item.value"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, computed } from 'vue'
import useFormFieldProps from '../../hooks/useFormFieldProps'

const emits = defineEmits(['fieldChange', 'change', 'update:modelValue'])

interface Props {
  name?: string
  label?: string
  fieldProps?: Record<string, any>
  isDropdown?: boolean
  modelValue?: any
}

const { label, fieldProps = {}, modelValue } = defineProps<Props>()
const { options } = fieldProps

const change = (value) => {
  emits('update:modelValue', value)
  emits('change', value)
}


</script>

<style lang="scss" scoped>
.fieldArea {
  display: flex;
  align-items: center;
  gap: 8px;
  .tag {
    padding: 4rpx 8rpx;
    border: 1rpx solid #ccc;
    &.selected {
      color: #fff;
      background-color: rgb(0, 100, 255);
    }
  }
}
</style>
