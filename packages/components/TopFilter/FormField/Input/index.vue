<template>
  <div class="label">
    {{ label }}
  </div>

  <div class="inputArea">
    <u-input
      v-model="modelValue"
      placeholder="请输入"
      v-bind="fieldProps"
      inputAlign="right"
      :height="30"
    ></u-input>
  </div>
</template>

<script setup>
import { watch, inject, ref, computed } from 'vue'
import useFormFieldProps from '../../hooks/useFormFieldProps'

const emits = defineEmits(['change', 'fieldChange'])

const { label, fieldProps, name, isDropdown } = defineProps({
  isDropdown: {
    type: Boolean,
    default: () => false
  },
  name: {
    type: String,
    default: () => ''
  },
  label: {
    type: String,
    default: () => ''
  },
  fieldProps: {
    type: Object,
    default: () => ({})
  }
})

const { valueRef, change } = useFormFieldProps(name, emits)

const modelValue = computed({
  get() {
    return valueRef.value
  },
  set(value) {
    change(value)
  }
})
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
