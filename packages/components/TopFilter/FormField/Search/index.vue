<template>
  <u-search
    v-bind="fieldProps"
    shape="square"
    :show-action="false"
    @search="change"
  />
</template>

<script setup>
import { watch, ref } from 'vue'
import useFormFieldProps from '../../hooks/useFormFieldProps'

const emits = defineEmits(['fieldChange', 'change'])
const { label, name, fieldProps } = defineProps({
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
</script>

<style lang="scss" scoped></style>
