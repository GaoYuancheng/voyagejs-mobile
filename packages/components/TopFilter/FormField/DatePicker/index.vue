<template>
  <div class="label">
    {{ label }}
  </div>

  <div class="searchArea" @click="showRef = true">
    <div class="text">
      <span v-if="valueRef?.result">{{ valueRef?.result }}</span>
      <span v-else class="placeholder">{{ placeholder || '请选择' }}</span>
      <u-icon class="icon" name="arrow-down"></u-icon>
    </div>
  </div>

  <Teleport to="body">
    <u-page>
      <u-calendar
        v-model="showRef"
        mode="date"
        @change="change"
        v-bind="fieldProps"
      ></u-calendar>
    </u-page>
  </Teleport>
</template>

<script setup>
import { computed, inject, ref, watch } from 'vue'

const showRef = ref(false)

const emits = defineEmits(['change', 'fieldChange'])
const { label, fieldProps, name } = defineProps({
  label: {
    type: String,
    default: () => ''
  },
  fieldProps: {
    type: Object,
    default: () => ({})
  }
})

const { valueRef, change } = useFormFieldProps(name, emits)
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
