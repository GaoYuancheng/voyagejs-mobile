<template>
  <div class="label" v-if="isDropdown">{{ label }}</div>

  <div class="searchArea" @click="showRef = true">
    <div class="text">
      <span v-if="!isDropdown">{{ label }}</span>
      <span v-else-if="valueRef">{{ inputValue }}</span>
      <span v-else class="placeholder">{{ placeholder || '请选择' }}</span>
      <u-icon class="icon" name="arrow-down"></u-icon>
    </div>
  </div>

  <Teleport to="body">
    <u-picker v-model="showRef" @confirm="confirm" v-bind="fieldProps" />
  </Teleport>
</template>

<script setup>
import { computed, inject, onMounted, ref, Teleport, watch } from 'vue'
import { getOptions } from '../../utils'
import useFormFieldProps from '../../hooks/useFormFieldProps'

const emits = defineEmits(['fieldChange', 'change'])

const props = defineProps({
  name: {
    type: String,
    default: () => ''
  },
  label: {
    type: String,
    default: () => ''
  },
  placeholder: {
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
  },
  fieldProps: {
    type: Object,
    default: () => ({})
  },
  isDropdown: {
    type: Boolean,
    default: false
  }
})

const { label, fieldProps, name, isDropdown } = props

const optionsRef = ref([])

const showRef = ref(false)

const inputValue = computed(() => {
  if (!valueRef.value) return ''
  const { year, month, day } = valueRef.value
  let res = ''
  if (year) res += year
  if (month) res += `-${month}`
  if (day) res += `-${day}`
  return res
})

const confirm = val => {
  console.log('confirm ~ val:', val)
  change(val)
}

const { valueRef, change } = useFormFieldProps(name, emits)

onMounted(async () => {
  optionsRef.value = await getOptions(props)
})
</script>

<style lang="scss" scoped>
.searchArea {
  .placeholder {
    color: #ccc;
  }
  .icon {
    color: #ccc;
    margin-left: 16rpx;
  }
}
</style>
