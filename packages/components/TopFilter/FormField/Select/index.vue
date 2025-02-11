<template>
  <div class="label">{{ label }}</div>

  <div class="searchArea" @click="showRef = true">
    <div class="text">
      <span v-if="showText">{{ showText }}</span>
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

<script setup lang="ts">
import { computed, inject, onMounted, ref, Teleport, watch } from 'vue'
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
}

const emits = defineEmits(['update:modelValue', 'change'])

const props = defineProps<Props>()

const { label, fieldProps, placeholder } = props

const optionsRef = ref<any>([])

const showText = computed(
  () =>
    optionsRef.value.find(item => item.value === props.modelValue)?.label || ''
)

const showRef = ref(false)

const confirm = val => {
  emits('update:modelValue', val[0].value, val)
  emits('change', val[0].value, val)
}

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
