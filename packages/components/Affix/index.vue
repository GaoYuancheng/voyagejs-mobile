<template>
  <div ref="affix" class="affix">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'

const affix = ref<HTMLElement | null>(null)

// onUnmounted(() => {
//   console.log('unmounted')
// })

// onMounted(() => {
//   console.log('mounted')

//   const intersectionObserver = new IntersectionObserver(entries => {
//     // 如果 intersectionRatio 为 0，则目标在视野外，
//     // 我们不需要做任何事情。

//     console.log('Loaded new items')
//   })
//   intersectionObserver.observe(affix.value as HTMLElement)
// })
</script>

<style lang="scss" scoped>
.affix {
  position: sticky;
  transition: all 0.7s;
  bottom: 0;
  box-shadow: 0 -5px 22px 0 #00000033;
  border-radius: 16px 16px 0 0;
  padding: 24rpx;
  background-color: #fff;
}
</style>
