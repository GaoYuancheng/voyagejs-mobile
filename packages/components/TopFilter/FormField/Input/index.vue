<template>
  <div class="label">{{ label }}</div>

  <div class="inputArea">
    <u-input
      v-model="inputValue"
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

const { label, fieldProps, name, modelValue } = defineProps<Props>()

const inputValue = ref(modelValue)

watch(
  () => inputValue.value,
  val => {
    emits('update:modelValue', val)
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
