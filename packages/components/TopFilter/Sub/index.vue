<template>
  <u-dropdown ref="subDropdown" :height="60" @open="open">
    <template v-for="item in props.sub">
      <SelectSub
        v-if="item.type === 'select'"
        v-bind="item.fieldProps"
        v-model="filterRef[item.name]"
        :label="item.label"
        :options="item.options"
        :request="item.request"
        :valueEnum="item.valueEnum"
        @change="change"
      />
      <u-dropdown-item v-else :key="item.name" :title="item.label">
      </u-dropdown-item>
    </template>
  </u-dropdown>

  <!-- 全部sub picker 用一只 u-picker -->
  <Teleport to="body">
    <u-picker
      v-model="popInfo.picker.show"
      @confirm="change"
      v-bind="popInfo.picker.fieldProps"
    />
  </Teleport>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import SelectSub from '../FormField/SelectSub/index.vue'
import { formatPickerTimeValue } from '../utils'

const filterRef = inject<any>('filterRef')

interface Props {
  sub: any[]
}

const props = defineProps<Props>()
const emits = defineEmits(['change'])

let currentItem: any = {}

// 弹窗信息
const popInfo = ref({
  picker: {
    show: false,
    fieldProps: {}
  }
})

const subDropdown = ref()

const change = value => {
  filterRef.value[currentItem.name] = value
  emits('change')
}

const open = index => {
  const item = props.sub[index]
  const { type, fieldProps, name } = item
  currentItem = item
  if (type === 'picker') {
    close()
    popInfo.value.picker.show = true
    popInfo.value.picker.fieldProps = {
      ...fieldProps,
      defaultTime: formatPickerTimeValue(filterRef.value[name]).defaultTime
    }
  }
}

const close = () => {
  subDropdown.value.close()
}
</script>

<style scoped></style>
