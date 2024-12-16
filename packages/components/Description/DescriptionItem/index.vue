<template>
  <Info v-if="type === 'info'" v-bind="item" />
  <CheckBox v-if="type === 'checkbox'" v-bind="item" />
  <File v-if="type === 'file'" v-bind="item" />
</template>

<script setup lang="ts">
import { Item } from '../type'
import Info from './Info/index.vue'
import CheckBox from './CheckBox/index.vue'
import File from './File/index.vue'

const item = defineProps<Item>()

const { type = 'info' } = item
</script>

<style lang="scss" scoped></style>
