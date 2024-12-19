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
    <u-page style="height: 0">
      <pm-member-list-pop
        v-model="showRef"
        @itemClick="change"
        v-bind="fieldProps"
      ></pm-member-list-pop>
    </u-page>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, Teleport } from 'vue'
import useFormFieldProps from '../../hooks/useFormFieldProps'
interface Props {
  name?: string
  label?: string
  placeholder?: string
  fieldProps?: Record<string, any>
  isDropdown?: boolean
  modelValue?: any
}

const showRef = ref(false)

const emits = defineEmits(['change', 'update:modelValue'])

const props = defineProps<Props>()

const { label, placeholder, fieldProps } = props

const change = val => {
  emits('update:modelValue', val)
  emits('change', val)
}

const showText = computed(() => {
  if (!props.modelValue) return ''
  return (props.modelValue || []).map(item => item.mName).join('，')
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
