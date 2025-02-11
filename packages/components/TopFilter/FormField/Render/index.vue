<template>
  <div class="label" v-if="label">{{ label }}</div>
  <component
    :is="render()"
    v-bind="fieldProps"
    :modelValue="modelValueRef"
    @update:modelValue="update"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  label?: string
  fieldProps?: Record<string, any>
  modelValue?: any
  placeholder?: string
  render: any
}

const emits = defineEmits(['change', 'update:modelValue'])
const props = withDefaults(defineProps<Props>(), {
  fieldProps: () => ({})
})
const modelValueRef = ref(props.modelValue)

watch(
  () => props.modelValue,
  val => {
    console.log('watch ~ val:', val)
    modelValueRef.value = val
  }
)

const update = value => {
  emits('update:modelValue', value)
  emits('change', value)
}
</script>

<style scoped></style>
