<template>
  <u-col
    class="label"
    :style="{ ...item.labelStyle }"
    :span="labelCol || item.labelCol || 4"
    ><slot></slot
  ></u-col>
</template>

<script setup lang="ts">
import { DescriptionItem } from '../type'

const item = defineProps<DescriptionItem>()
</script>

<style lang="scss" scoped>
.label {
  color: rgba(0, 0, 0, 0.85);
}
</style>
