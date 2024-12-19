<template>
  <div class="label">
    {{ label }}
  </div>

  <div class="searchArea" @click="showRef = true">
    <div class="text">
      <span v-if="modelValue?.result">{{ modelValue?.result }}</span>
      <span v-else class="placeholder">{{ placeholder || '请选择' }}</span>
      <u-icon class="icon" name="arrow-down"></u-icon>
    </div>
  </div>

  <Teleport to="body">
    <u-page style="height: 0">
      <u-calendar
        v-model="showRef"
        mode="date"
        @change="change"
        v-bind="fieldProps"
      ></u-calendar>
    </u-page>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
interface Props {
  label?: string
  fieldProps?: Record<string, any>
  modelValue?: any
  placeholder?: string
}

const showRef = ref(false)

const emits = defineEmits(['change', 'update:modelValue'])
const { label, fieldProps, modelValue, placeholder } = defineProps<Props>()

const change = value => {
  emits('update:modelValue', value)
  emits('change', value)
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
