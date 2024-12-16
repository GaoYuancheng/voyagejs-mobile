<template>
  <u-col
    class="value"
    :style="{ 'justify-content': 'end', ...item.valueStyle }"
    :span="valueCol || item.valueCol || 8"
  >
    <slot></slot>
  </u-col>
</template>

<script setup lang="ts">
import { DescriptionItem } from '../type'

const item = defineProps<DescriptionItem>()
</script>

<style lang="scss" scoped>
.value {
  display: flex;
}
</style>
