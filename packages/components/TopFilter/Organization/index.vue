<template>
  <div v-if="show">
    <u-image
      width="44rpx"
      height="44rpx"
      :fade="false"
      @click="organizationPopShow = true"
      src="./org.png"
    ></u-image>

    <Teleport to="body">
      <pm-organization-pop
        v-model="organizationPopShow"
        v-bind="fieldProps"
        @onItemClick="itemClick"
      />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, Teleport } from 'vue'
interface Props {
  show?: boolean
  itemProps?: Record<string, any>
  modelValue?: any
}

const emits = defineEmits(['change', 'update:modelValue'])
const props = withDefaults(defineProps<Props>(), {
  show: true
})
const { itemProps = {}, show = true } = props
const { fieldProps } = itemProps
const organizationPopShow = ref(false)

const itemClick = item => {
  emits('update:modelValue', item)
  emits('change', item)
}
</script>

<style lang="scss" scoped></style>
