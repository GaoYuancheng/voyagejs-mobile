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
import { onMounted, ref } from 'vue'
import { getOptions } from '../../utils'

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
  showAll?: boolean
}

const emits = defineEmits(['update:modelValue', 'change'])
const props = withDefaults(defineProps<Props>(), {
  showAll: true
})
const { name, label, options, request } = props

const valueRef = ref(props.modelValue)
const optionsRef = ref([])

const change = val => {
  emits('update:modelValue', val)
  emits('change', val)
}

onMounted(async () => {
  optionsRef.value = await getOptions(props)
})
</script>

<style lang="scss" scoped></style>
