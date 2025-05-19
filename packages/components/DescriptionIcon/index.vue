<template>
  <span>
    <u-icon
      v-if="description"
      @click="descriptionModalShowRef = true"
      :name="icon"
      :size="size"
    ></u-icon>

    <u-modal
      v-model="descriptionModalShowRef"
      :content="description"
      :show-confirm-button="false"
      :show-cancel-button="false"
      :show-title="false"
      :mask-close-able="true"
    >
    </u-modal>
  </span>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const descriptionModalShowRef = ref(false)
const props = withDefaults(
  defineProps<{
    /** u-icon 的 name */
    icon?: string
    /** 图标的大小 */
    size?: number
    /** 需要在弹窗中展示的 描述 */
    description?: string
  }>(),
  {
    icon: 'question-circle',
    description: '',
    size: 16
  }
)
</script>

<style lang="scss" scoped></style>
