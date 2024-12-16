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
import { ref } from 'vue'

const emits = defineEmits(['fieldChange'])

const { itemProps, isDropdown, show } = defineProps({
  type: {
    type: String,
    default: 'input'
  },
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
  }
})

const { fieldEvents = {}, type, ...restProps } = itemProps
console.log('type:', type)

const resFieldEvents = {
  ...fieldEvents,
  fieldChange: value => emits('fieldChange', value)
}

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
