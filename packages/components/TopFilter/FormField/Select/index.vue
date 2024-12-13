<template>
  <div class="label">
    {{ label }}
  </div>

  <div class="searchArea" @click="showRef = true">
    <div class="text">
      <span v-if="valueRef">{{ inputValue }}</span>
      <span v-else class="placeholder">{{ placeholder || '请选择' }}</span>
      <u-icon class="icon" name="arrow-down"></u-icon>
    </div>
  </div>

  <Teleport to="body">
    <u-select
      v-model="showRef"
      mode="single-column"
      :list="optionsRef"
      @confirm="confirm"
      v-bind="fieldProps"
    />
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
  }
})

const { label, fieldProps, name } = props

const optionsRef = ref([])

const inputValue = computed(
  () =>
    optionsRef.value.find(item => item.value === valueRef.value)?.label || ''
)

const showRef = ref(false)

const confirm = val => {
  change(val[0].value)
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
