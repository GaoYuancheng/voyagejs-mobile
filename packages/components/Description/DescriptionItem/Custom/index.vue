<template>
  <u-row class="info">
    <Label v-bind="item">{{ item.label }}</Label>
    <Value v-bind="item">
      <component
        :is="
          typeof item.render === 'function' ? item.render(item) : item.render
        "
        v-bind="item"
      />
    </Value>
  </u-row>
</template>

<script setup lang="ts">
import Label from '../../Label/index.vue'
import { DescriptionItemType } from '../../type'
import Value from '../../Value/index.vue'

const item = defineProps<DescriptionItemType>()
</script>

<style lang="scss" scoped>
.value {
  display: flex;
}
</style>
