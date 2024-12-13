<template>
  <div class="label" v-if="label">
    {{ label }}
  </div>
  <div class="fieldArea">
    <div
      class="tag"
      @click="change(item.value)"
      :class="valueRef === item.value ? 'selected' : ''"
      v-for="item in options"
      :key="item.value"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script setup>
import { watch, ref, computed } from 'vue'
import useFormFieldProps from '../../hooks/useFormFieldProps'

const emits = defineEmits(['fieldChange', 'change'])

const { label, fieldProps, name } = defineProps({
  name: {
    type: String,
    default: () => ''
  },
  label: {
    type: String,
    default: () => ''
  },
  fieldProps: {
    type: Object,
    default: () => ({})
  }
})

const { options } = fieldProps

const { valueRef, change } = useFormFieldProps(name, emits)
</script>

<style lang="scss" scoped>
.fieldArea {
  display: flex;
  align-items: center;
  gap: 8px;
  .tag {
    padding: 4rpx 8rpx;
    border: 1rpx solid #ccc;
    &.selected {
      color: #fff;
      background-color: rgb(0, 100, 255);
    }
  }
}
</style>
