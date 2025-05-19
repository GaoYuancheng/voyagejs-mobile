<template>
  <u-row class="info">
    <Label v-bind="item">{{ item.label }}</Label>
    <Value
      v-bind="item"
      :valueStyle="{
        'justify-content': 'flex-start',
        'margin-top': '16rpx'
      }"
      :valueCol="12"
    >
      {{ item.value }}
    </Value>
  </u-row>
</template>

<script setup lang="ts">
import { DescriptionItemType } from '../../type'
import Label from '../../Label/index.vue'
import Value from '../../Value/index.vue'
const item = defineProps<DescriptionItemType>()
</script>

<style scoped></style>
