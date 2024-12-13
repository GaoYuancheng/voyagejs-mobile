<template>
  <div v-if="show" :class="isDropdown ? 'dropdownFormItem' : ''">
    <!-- {{ JSON.stringify(itemProps) }} -->
    <Input v-if="type === 'input'" v-bind="fieldProps" v-on="resFieldEvents" />

    <template v-if="type === 'select'">
      <SelectSub v-if="isSub" v-bind="fieldProps" v-on="resFieldEvents" />
      <Select v-else v-bind="fieldProps" v-on="resFieldEvents" />
    </template>

    <DatePicker
      v-if="type === 'date'"
      v-bind="fieldProps"
      v-on="resFieldEvents"
    />

    <template v-if="type === 'dateRange'">
      <DateRangePicker v-bind="fieldProps" v-on="resFieldEvents" />
    </template>

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
  </div>
</template>

<script setup>
import Input from './Input/index.vue'
import Select from './Select/index.vue'
import SelectSub from './SelectSub/index.vue'
import DateRangePicker from './DateRangePicker/index.vue'
import DatePicker from './DatePicker/index.vue'
import Member from './Member/index.vue'
import Organization from './Organization/index.vue'
import Search from './Search'
import Tags from './Tags'
import { ref } from 'vue'

const emits = defineEmits(['fieldChange'])

const { itemProps, isSub, isDropdown, show } = defineProps({
  show: {
    type: Boolean,
    default: () => true
  },
  itemProps: {
    type: Object,
    default: () => ({})
  },
  isSub: {
    type: Boolean,
    default: false
  },
  isDropdown: {
    type: Boolean,
    default: false
  }
})

const { fieldEvents = {}, ...restProps } = itemProps

const resFieldEvents = {
  ...fieldEvents,
  fieldChange: value => emits('fieldChange', value)
}

const { type } = restProps
const fieldProps = {
  ...restProps,
  isDropdown
}

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
