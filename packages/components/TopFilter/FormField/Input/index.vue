<template>
  <div class="label">{{ label }}</div>
  <div class="inputArea">
    <u-input
      :modelValue="modelValue"
      @update:modelValue="value => emits('update:modelValue', value)"
      placeholder="请输入"
      v-bind="fieldProps"
      inputAlign="right"
      :height="30"
    ></u-input>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

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
const { label, fieldProps, name } = props

watch(
  () => props.modelValue,
  val => {
    emits('change', val)
  }
)
</script>

<style lang="scss" scoped>
.input {
  .inputArea {
    flex: 1;
    .placeholder {
      color: #ccc;
    }
  }
}
</style>
