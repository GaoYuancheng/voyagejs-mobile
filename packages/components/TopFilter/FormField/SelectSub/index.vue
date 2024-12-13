<template>
  <u-dropdown-item
    :key="name"
    :options="optionsRef"
    :title="label"
    v-model="modelValue"
    @change="change"
  >
  </u-dropdown-item>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { getOptions } from '../../utils'
import useFormFieldProps from '../../hooks/useFormFieldProps'

const emits = defineEmits(['fieldChange', 'change'])
const props = defineProps({
  label: {
    type: String,
    default: () => ''
  },
  name: {
    type: String,
    default: () => ''
  },
  valueEnum: {
    type: Object,
    default: undefined
  },
  options: {
    type: Array,
    default: undefined
  },
  request: {
    type: Function,
    default: undefined
  }
})
const { name, valueEnum, options, request } = props

const { valueRef, change } = useFormFieldProps(name, emits)

const modelValue = computed({
  get() {
    return valueRef.value
  },
  set(value) {
    change(value)
  }
})
const optionsRef = ref([])

onMounted(async () => {
  optionsRef.value = await getOptions(props)
})
</script>

<style lang="scss" scoped></style>
