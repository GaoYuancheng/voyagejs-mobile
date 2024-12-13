<template>
  <div class="label">
    {{ label }}
  </div>

  <div class="searchArea" @click="showRef = true">
    <div class="text">
      <span v-if="valueRef">{{ valueRef.departmentName }}</span>
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

<script setup>
import { ref, Teleport } from 'vue'
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
  placeholder: {
    type: String,
    default: () => ''
  },
  fieldProps: {
    type: Object,
    default: () => ({})
  }
})

const showRef = ref(false)

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
