<template>
  <div v-if="show" :class="isDropdown ? 'dropdownFormItem' : ''">
    <!-- {{ JSON.stringify(itemProps) }} -->
    <Input v-if="type === 'input'" v-bind="fieldProps" v-on="resFieldEvents" />

    <template v-if="type === 'select'">
      <SelectSub v-if="!isDropdown" v-bind="fieldProps" v-on="resFieldEvents" />
      <Select v-else v-bind="fieldProps" v-on="resFieldEvents" />
    </template>

    <DatePicker
      v-if="type === 'date'"
      v-bind="fieldProps"
      v-on="resFieldEvents"
    />

    <DateRangePicker
      v-if="type === 'dateRange'"
      v-bind="fieldProps"
      v-on="resFieldEvents"
    />

    <Member
      v-if="type === 'member'"
      v-bind="fieldProps"
      v-on="resFieldEvents"
    />

    <Organization
      v-if="type === 'organization'"
      v-bind="fieldProps"
      v-on="resFieldEvents"
    />

    <Search
      v-if="type === 'search'"
      v-bind="fieldProps"
      v-on="resFieldEvents"
    />

    <Tags v-if="type === 'tags'" v-bind="fieldProps" v-on="resFieldEvents" />
    <Picker
      v-if="type === 'picker'"
      v-bind="fieldProps"
      v-on="resFieldEvents"
    />
  </div>
</template>

<script setup lang="ts">
import Input from './Input/index.vue'
import Select from './Select/index.vue'
import SelectSub from './SelectSub/index.vue'
import DateRangePicker from './DateRangePicker/index.vue'
import DatePicker from './DatePicker/index.vue'
import Member from './Member/index.vue'
import Organization from './Organization/index.vue'
import Search from './Search/index.vue'
import Tags from './Tags/index.vue'
import Picker from './Picker/index.vue'
import { computed, inject, ref } from 'vue'

const emits = defineEmits(['fieldChange', 'update:modelValue', 'change'])
const filterRef = inject('filterRef')

const props = defineProps({
  show: {
    type: Boolean,
    default: () => true
  },
  itemProps: {
    type: Object,
    default: () => ({})
  },
  isDropdown: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [String, Number, Array, Object],
    default: ''
  }
})

const { itemProps, isDropdown, show } = props

const { fieldEvents = {}, type = 'input', ...restProps } = itemProps
console.log('type:', type)

const resFieldEvents = {
  ...fieldEvents,
  change: value => {
    emits('change', value)
    fieldEvents?.change?.(value, filterRef)
  },
  'update:modelValue': value => emits('update:modelValue', value)
}

const fieldProps = computed(() => {
  return {
    ...restProps,
    isDropdown,
    modelValue: props.modelValue
  }
})

// defineExpose({
//   reset: () => {
//     formFieldRef.value.reset()
//   }
// })
</script>

<style lang="scss" scoped>
.dropdownFormItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 24rpx 36rpx;
}
</style>
