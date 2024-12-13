<template>
  <div v-if="props.show">
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

<script setup>
import { ref, Teleport } from 'vue'

const emits = defineEmits(['change'])
const props = defineProps({
  show: {
    type: Boolean,
    default: true
  },
  itemProps: {
    type: Object,
    default: () => ({})
  }
})
const { itemProps } = props
const { fieldProps } = itemProps
const organizationPopShow = ref(false)

const itemClick = item => {
  emits('change', item)
}
</script>

<style lang="scss" scoped></style>
