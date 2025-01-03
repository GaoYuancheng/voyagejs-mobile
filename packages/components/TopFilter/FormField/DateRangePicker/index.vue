<template>
  <div class="label" v-if="label">
    {{ label }}
  </div>

  <div class="searchArea" @click="showRef = true">
    <span class="valueText" :class="modelValue?.startDate ? '' : 'placeholder'">
      {{ modelValue?.startDate ?? '开始时间' }}
    </span>
    <span class="'placeholder">~</span>
    <span class="valueText" :class="modelValue?.endDate ? '' : 'placeholder'">
      {{ modelValue?.endDate ?? '结束时间' }}
    </span>
    <span>
      <u-icon class="icon" name="arrow-down"></u-icon>
    </span>
  </div>
  <Teleport to="body">
    <u-page style="height: 0">
      <u-calendar
        v-model="showRef"
        mode="range"
        @change="change"
        v-bind="fieldProps"
      ></u-calendar>
    </u-page>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
interface Props {
  name?: string
  label?: string
  fieldProps?: Record<string, any>
  isDropdown?: boolean
  modelValue?: any
}

const showRef = ref(false)

const emits = defineEmits(['change', 'update:modelValue'])
const change = value => {
  emits('update:modelValue', value)
  emits('change', value)
}

const { label, fieldProps, name, modelValue } = defineProps<Props>()
</script>

<style lang="scss" scoped>
.searchArea {
  span + span {
    margin-left: 24rpx;
  }

  .valueText {
    color: #909399;
  }
  .placeholder,
  .icon {
    color: #ccc;
  }
}
</style>
