<template>
  <Card :title="title" v-bind="props.cardProps">
    <template #extra v-if="formItems.length > 0">
      <component
        v-model="formValuesRef[item.name]"
        v-for="item in formItems"
        :key="item.name"
        :is="item.children"
        v-bind="item.fieldProps"
      />
    </template>
    <template #body>
      <slot name="body" :data="dataRef"></slot>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card, { CardProps } from '../Card'
import { ref, VNode, watch } from 'vue'

export interface FormCardProps {
  title?: string
  description?: string
  cardProps?: CardProps
  params?: any
  formItems?: {
    name: string
    children: VNode
    initialValue?: any
    fieldProps?: Record<string, any>
  }[]
  request: (
    params: FormCardProps['params'] & Record<string, any>
  ) => Promise<any>
}

const props = withDefaults(defineProps<FormCardProps>(), {
  cardProps: () => ({}),
  formItems: () => []
})

const formValuesRef = ref<Record<string, any>>(
  props?.formItems?.reduce((acc, item) => {
    acc[item.name] = item.initialValue
    return acc
  }, {}) || {}
)
const dataRef = ref<any>(null)

const getData = async () => {
  const params = {
    ...props.params,
    ...formValuesRef.value
  }

  const data = await props.request(params)
  dataRef.value = data
}

watch(
  [
    () => JSON.stringify(props.params),
    () => JSON.stringify(formValuesRef.value)
  ],
  () => {
    getData()
  },
  {
    immediate: true
  }
)
</script>

<style scoped></style>
