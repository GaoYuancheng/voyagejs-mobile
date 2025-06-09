<template>
  <span>
    <u-icon
      v-if="description"
      @click="clickDescription"
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
    /** 是否显示描述 */
    type?: 'modal' | 'tooltip'
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
    size: 16,
    type: 'tooltip'
  }
)

const clickDescription = () => {
  if (props.type === 'modal') {
    descriptionModalShowRef.value = true
    return
  }

  if (props.type === 'tooltip') {
    uni.showToast({
      title: props.description,
      icon: 'none',
      duration: 2000
    })
  }
}
</script>

<style lang="scss" scoped></style>
