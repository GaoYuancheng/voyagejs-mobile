<template>
  <div class="label" v-if="isDropdown">{{ label }}</div>

  <div class="searchArea">
    <div class="pickerItem">
      <Picker
        :fieldProps="fieldProps"
        :placeholder="startPlaceholder"
        :isDropdown="true"
        :modelValue="props.modelValue.start"
        @update:modelValue="startConfirm"
        :showIcon="false"
        v-bind="pickerProps"
      />
    </div>

    <span class="'placeholder">~</span>

    <div class="pickerItem">
      <Picker
        :fieldProps="fieldProps"
        :placeholder="endPlaceholder"
        :isDropdown="true"
        :modelValue="props.modelValue.end"
        @update:modelValue="endConfirm"
        :showIcon="false"
        v-bind="pickerProps"
      />
    </div>

    <span>
      <u-icon class="icon" name="arrow-down"></u-icon>
    </span>
  </div>
</template>

<script setup lang="ts">
import Picker from '../Picker/index.vue'
import { PickerProps } from '../Picker/index.vue'

interface Props {
  name?: string
  label?: string
  placeholder?: string | [string, string]
  fieldProps?: Record<string, any>
  isDropdown?: boolean
  modelValue?: any
  pickerProps?: PickerProps
}

const emits = defineEmits(['change', 'update:modelValue'])

const props = defineProps<Props>()
const { placeholder, isDropdown, label, fieldProps, pickerProps } = props

const [startPlaceholder, endPlaceholder] = Array.isArray(placeholder)
  ? placeholder
  : [placeholder, placeholder]

const startConfirm = val => {
  const resValue = {
    ...props.modelValue,
    start: val
  }
  emits('update:modelValue', resValue)
  emits('change', resValue)
}

const endConfirm = val => {
  const resValue = {
    ...props.modelValue,
    end: val
  }
  emits('update:modelValue', resValue)
  emits('change', resValue)
}
</script>

<style lang="scss" scoped>
.searchArea {
  display: flex;
  gap: 16rpx;
  align-items: center;
  .pickerItem {
    display: flex;
    align-items: center;
  }
  .placeholder {
    color: #ccc;
  }
  .icon {
    color: #ccc;
  }
}
</style>
