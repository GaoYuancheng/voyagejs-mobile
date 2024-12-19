<template>
  <u-dropdown-item
    :key="name"
    :options="optionsRef"
    :title="label"
    v-model="valueRef"
    @change="change"
  >
  </u-dropdown-item>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getOptions } from '../../utils'
import useFormFieldProps from '../../hooks/useFormFieldProps'

interface Props {
  name?: string
  label?: string
  placeholder?: string
  fieldProps?: Record<string, any>
  isDropdown?: boolean
  modelValue?: any
  valueEnum?: Record<string, any>
  options?: Array<any>
  request?: Function
}

const emits = defineEmits(['update:modelValue', 'change'])
const props = defineProps<Props>()
const { name, label, options, request } = props

const valueRef = ref(props.modelValue)
const optionsRef = ref([])

const change = val => {
  emits('update:modelValue', val[0].value, val)
  emits('change', val[0].value, val)
}

onMounted(async () => {
  optionsRef.value = await getOptions(props)
})
</script>

<style lang="scss" scoped></style>
