<template>
  <u-row class="info">
    <Label v-bind="item">{{ item.label }}</Label>
    <Value>
      <u-checkbox
        v-for="item in options"
        class="checkbox"
        :modelValue="!!item.value"
        >{{ item.label }}</u-checkbox
      >
    </Value>
  </u-row>
</template>

<script setup lang="ts">
import { Item } from '../../type'
import Label from '../../Label/index.vue'
import Value from '../../Value/index.vue'

const item = defineProps<Item>()

const { options = [] } = item
</script>

<style lang="scss" scoped>
.value {
  display: flex;
  .checkbox {
    margin-left: 12rpx;
  }
}
:deep(.u-checkbox__label) {
  margin-right: 0;
}
</style>
