<template>
  <u-search
    v-bind="fieldProps"
    shape="square"
    :show-action="false"
    @search="change"
  />
</template>

<script setup lang="ts">
interface Props {
  fieldProps?: Record<string, any>
  modelValue?: any
}

const emits = defineEmits(['change', 'update:modelValue'])
const { fieldProps } = defineProps<Props>()

const change = value => {
  emits('update:modelValue', value)
  emits('change', value)
}
</script>

<style lang="scss" scoped></style>
