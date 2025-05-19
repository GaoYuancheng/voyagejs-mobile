<template>
  <Info v-if="item.type === 'info'" v-bind="item" />
  <CheckBox v-if="item.type === 'checkbox'" v-bind="item" />
  <File v-if="item.type === 'file'" v-bind="item" />
  <FileList v-if="item.type === 'fileList'" v-bind="item" />
  <TextArea v-if="item.type === 'textArea'" v-bind="item" />
  <Link v-if="item.type === 'link'" v-bind="item" />
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
import FileList from './FileList/index.vue'
import TextArea from './TextArea/index.vue'
import Link from './Link/index.vue'
import Custom from './Custom/index.vue'
import { DescriptionItemType } from '../type'

const item = withDefaults(defineProps<DescriptionItemType>(), {
  type: 'info',
  visible: true
})
</script>

<style lang="scss" scoped></style>
