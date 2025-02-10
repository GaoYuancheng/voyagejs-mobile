<template>
  <u-search
    :modelValue="modelValue"
    @update:modelValue="value => emits('update:modelValue', value)"
    v-bind="props.fieldProps"
    shape="square"
    :show-action="false"
    @search="search"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
interface Props {
  fieldProps?: Record<string, any>
  modelValue?: any
}

const emits = defineEmits(['change', 'update:modelValue'])
const props = defineProps<Props>()

const search = value => {
  emits('change', value)
}
</script>

<style lang="scss" scoped></style>
