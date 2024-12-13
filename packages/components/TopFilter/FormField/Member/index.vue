<template>
  <template class="member">
    <div class="label">
      {{ label }}
    </div>

    <div class="searchArea" @click="showRef = true">
      <div class="text">
        <span v-if="valueRef">{{
          valueRef.map(item => item.mName).join('，')
        }}</span>
        <span v-else class="placeholder">{{ placeholder || '请选择' }}</span>
        <u-icon class="icon" name="arrow-down"></u-icon>
      </div>
    </div>

    <Teleport to="body">
      <u-page>
        <pm-member-list-pop
          v-model="showRef"
          @itemClick="change"
          v-bind="fieldProps"
        ></pm-member-list-pop>
      </u-page>
    </Teleport>
  </template>
</template>

<script setup>
import { onMounted, ref, Teleport } from 'vue'
import useFormFieldProps from '../../hooks/useFormFieldProps'

const emits = defineEmits(['fieldChange', 'change'])

const { name, label, fieldProps } = defineProps({
  name: {
    type: String,
    default: () => ''
  },
  label: {
    type: String,
    default: () => ''
  },
  placeholder: {
    type: String,
    default: () => ''
  },
  fieldProps: {
    type: Object,
    default: () => ({})
  }
})
const { valueRef, change } = useFormFieldProps(name, emits)

const showRef = ref(false)
</script>

<style lang="scss" scoped>
.member {
  .searchArea {
    .placeholder {
      color: #ccc;
    }
    .icon {
      color: #ccc;
      margin-left: 16rpx;
    }
  }
}
</style>
