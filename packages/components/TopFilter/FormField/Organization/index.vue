<template>
  <div class="label">
    {{ label }}
  </div>

  <div class="searchArea" @click="showRef = true">
    <div class="text">
      <span v-if="showText">{{ showText }}</span>
      <span v-else class="placeholder">{{ placeholder || '请选择' }}</span>
      <u-icon class="icon" name="arrow-down"></u-icon>
    </div>
  </div>

  <Teleport to="body">
    <pm-organization-pop
      v-model="showRef"
      v-bind="fieldProps"
      @onItemClick="change"
    />
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, Teleport } from 'vue'

interface Props {
  name?: string
  label?: string
  placeholder?: string
  fieldProps?: Record<string, any>
  isDropdown?: boolean
  modelValue?: any
}

const emits = defineEmits(['change', 'update:modelValue'])

const props = defineProps<Props>()
const { label, fieldProps, placeholder } = props
const showRef = ref(false)

const showText = computed(() => {
  if (!props.modelValue) return ''
  return props.modelValue.departmentName
})

const change = val => {
  emits('update:modelValue', val)
  emits('change', val)
}
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
