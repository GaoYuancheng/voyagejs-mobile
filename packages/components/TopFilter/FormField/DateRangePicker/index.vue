<template>
  <div class="label" v-if="label">
    {{ label }}
  </div>

  <div class="searchArea" @click="showRef = true">
    <span class="valueText" :class="valueRef?.startDate ? '' : 'placeholder'">
      {{ valueRef?.startDate ?? '开始时间' }}
    </span>
    <span class="'placeholder">~</span>
    <span class="valueText" :class="valueRef?.endDate ? '' : 'placeholder'">
      {{ valueRef?.endDate ?? '结束时间' }}
    </span>
    <span>
      <u-icon class="icon" name="arrow-down"></u-icon>
    </span>
  </div>
  <Teleport to="body">
    <u-page style="height: 0">
      <u-calendar
        v-model="showRef"
        mode="range"
        @change="change"
        v-bind="fieldProps"
      ></u-calendar>
    </u-page>
  </Teleport>
</template>

<script setup>
import { computed, inject, ref, watch } from 'vue'

const showRef = ref(false)

const valueRef = ref({
  startDate: '',
  endDate: ''
})

const change = (value) => {
  valueRef.value = value
  emits('change', value)
}

const emits = defineEmits(['change'])

const { label, fieldProps, name } = defineProps({
  name: {
    type: String,
    default: () => ''
  },
  label: {
    type: String,
    default: () => ''
  },
  fieldProps: {
    type: Object,
    default: () => ({})
  },
  isDropdown: {
    type: Boolean,
    default: true
  }
})


</script>

<style lang="scss" scoped>
.searchArea {
  span + span {
    margin-left: 24rpx;
  }

  .valueText {
    color: #909399;
  }
  .placeholder,
  .icon {
    color: #ccc;
  }
}
</style>
