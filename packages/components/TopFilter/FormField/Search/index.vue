<template>
  <u-search
    v-model="inputValue"
    v-bind="props.fieldProps"
    shape="square"
    :show-action="false"
    @search="change"
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

const inputValue = ref(props.modelValue)

const change = value => {
  emits('update:modelValue', value)
  emits('change', value)
}
watch(
  () => props.modelValue,
  val => {
    inputValue.value = val
  }
)
</script>

<style lang="scss" scoped></style>
