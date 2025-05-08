<template>
  <Info v-if="type === 'info'" v-bind="item" />
  <CheckBox v-if="type === 'checkbox'" v-bind="item" />
  <File v-if="type === 'file'" v-bind="item" />
  <Custom
    :is="item.render(item)"
    v-bind="item"
    v-if="!!item.render"
    @click="item.onClick"
  />
</template>

<script setup lang="ts">
import Info from './Info/index.vue'
import CheckBox from './CheckBox/index.vue'
import File from './File/index.vue'
import Custom from './Custom/index.vue'
import { DescriptionItemType } from '../type'

const item = defineProps<DescriptionItemType>()

const { type = 'info' } = item
</script>

<style lang="scss" scoped></style>
