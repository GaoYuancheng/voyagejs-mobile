<template>
  <u-row class="info">
    <Label v-bind="item">{{ item.label }}</Label>
    <Value v-bind="item">
      <u-icon name="arrow-right" @click="click" />
    </Value>
  </u-row>
</template>

<script setup lang="ts">
import Label from '../../Label/index.vue'
import { DescriptionItemType } from '../../type'
import Value from '../../Value/index.vue'

const item = defineProps<DescriptionItemType>()

const click = () => {
  if (item?.link) {
    uni.navigateTo({
      url: item.link
    })
  } else {
    item.onClick?.(item)
  }
}
</script>

<style lang="scss" scoped>
.value {
  display: flex;
}
</style>
