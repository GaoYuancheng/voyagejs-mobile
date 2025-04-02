<template>
  <div class="demo">
    <div class="formItem">
      <DatePicker label="datePicker" v-model="formRef.datePicker" />
    </div>
    <div class="formItem">
      <DatePickerPicker
        label="dateRangePicker"
        v-model="formRef.dateRangePicker"
      />
    </div>
    <div class="formItem">
      <Input label="input" v-model="formRef.input" />
    </div>
    <div class="formItem">
      <Member label="member" v-model="formRef.member" />
    </div>
    <div class="formItem">
      <Organization label="organization" v-model="formRef.organization" />
    </div>
    <div class="formItem">
      <Picker label="picker" :isDropdown="true" v-model="formRef.picker" />
    </div>
    <div class="formItem">
      <PickerRange
        :isDropdown="true"
        label="pickerRange"
        v-model="formRef.pickerRange"
      />
    </div>
    <div class="formItem">
      <Select
        label="select"
        v-model="formRef.select"
        :options="[{ label: '1', value: '1' }]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import DatePicker from 'voyagejs-mobile/packages/components/TopFilter/FormField/DatePicker/index.vue'
import DatePickerPicker from 'voyagejs-mobile/packages/components/TopFilter/FormField/DateRangePicker/index.vue'
import Input from 'voyagejs-mobile/packages/components/TopFilter/FormField/Input/index.vue'
import Member from 'voyagejs-mobile/packages/components/TopFilter/FormField/Member/index.vue'
import Organization from 'voyagejs-mobile/packages/components/TopFilter/FormField/Organization/index.vue'
import Picker from 'voyagejs-mobile/packages/components/TopFilter/FormField/Picker/index.vue'
import PickerRange from 'voyagejs-mobile/packages/components/TopFilter/FormField/PickerRange/index.vue'
import Select from 'voyagejs-mobile/packages/components/TopFilter/FormField/Select/index.vue'
import { ref } from 'vue'

const formRef = ref({
  datePicker: '',
  dateRangePicker: [],
  input: '',
  member: '',
  organization: {},
  picker: '',
  pickerRange: '',
  search: '',
  select: '',
  tags: ''
})
</script>

<style scoped>
.demo {
  background-color: #fff;
  div + div {
    border-top: 1px solid #eee;
  }
}
.formItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 24rpx 36rpx;
}
</style>
