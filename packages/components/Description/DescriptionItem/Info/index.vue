<template>
  <u-row class="info">
    <Label v-bind="item">{{ item.label }}</Label>
    <Value v-bind="item">
      {{ item.value }}
    </Value>
  </u-row>
</template>

<script setup lang="ts">
import { DescriptionItem } from '../../type'
import Label from '../../Label/index.vue'
import Value from '../../Value/index.vue'

const item = defineProps<DescriptionItem>()
</script>

<style lang="scss" scoped>
.value {
  display: flex;
}
</style>
