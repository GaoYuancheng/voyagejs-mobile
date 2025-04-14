<template>
  <u-page>
    <TopFilter class="filter" @change="filterChange" v-bind="filterProps">
      <template #mainSearch>
        <slot name="topFilterMainSearch"></slot>
      </template>
    </TopFilter>

    <slot name="header"></slot>

    <ScrollView
      ref="scrollViewRef"
      :params="filterRef"
      :request="request"
      v-slot="slotProps"
      rowKey="id"
      v-bind="scrollViewProps"
    >
      <slot></slot>
      <Card v-if="!slots.default" :border="false" class="cardItem">
        <template #title v-if="getAreaVisible(titleList, slotProps.item)">
          <Item
            v-for="item in formatList(titleList, slotProps.item)"
            v-bind="item"
            :key="item.text"
          />
        </template>
        <template #extra v-if="getAreaVisible(extraList, slotProps.item)">
          <Item
            v-for="item in formatList(extraList, slotProps.item)"
            v-bind="item"
            :key="item.text"
          />
        </template>
        <template #body>
          <div
            class="info"
            v-for="item in formatList(bodyList, slotProps.item)"
          >
            <template v-if="item.visible">
              <div class="label">{{ item.label }}</div>
              <div class="value">
                <Item v-bind="item" :key="item.text" />
              </div>
            </template>
          </div>
        </template>

        <template
          #footer
          v-if="getAreaVisible(footerList, slotProps.item)"
          :key="item.text"
        >
          <div class="footer">
            <Item
              v-for="item in formatList(footerList, slotProps.item)"
              v-bind="item"
            />
          </div>
        </template>
      </Card>
    </ScrollView>
  </u-page>
</template>

<script setup lang="ts">
import TopFilter from '../TopFilter//index.vue'
import ScrollView from '../ScrollView/index.vue'
import Card from '../Card/index.vue'
import Item from '../Item/index.vue'
import { CSSProperties, ref, useSlots } from 'vue'
import { getVisible } from '../../utils'

const slots = useSlots()

import { TopFilterProps } from '../TopFilter/index.vue'
import { ScrollViewProps } from '../ScrollView/index.vue'
import { ItemProps } from '../Item/index.vue'

export interface CardConfig {
  header?: {
    titleList?: ItemProps[]
    extraList?: ItemProps[]
  }
  body?: {
    list?: ItemProps[]
  }
  footer?: {
    list?: ItemProps[]
  }
}

export interface ScrollViewPageProps {
  /** 头部筛选 同 TopFilter */
  filterProps?: TopFilterProps
  /** 列表请求 同 scrollList request */
  request: ScrollViewProps['request']
  cardConfig?: CardConfig
  scrollViewProps?: ScrollViewProps
}

const { filterProps, request, cardConfig, scrollViewProps } =
  defineProps<ScrollViewPageProps>()

const emits = defineEmits(['filterChange'])

const { initialValues = {} } = filterProps
const { body = {}, header = {}, footer = {} } = cardConfig || {}

const { list: bodyList = [] } = body
const { titleList = [], extraList = [] } = header
const { list: footerList = [] } = footer

const scrollViewRef = ref<any>(null)
const filterRef = ref(initialValues)

const filterChange = values => {
  filterRef.value = values
  emits('filterChange', values)
}

const formatList = (list, data) =>
  list.map(item => getPropsFromOptions(data, item))

const getAreaVisible = (list, item) =>
  formatList(list, item).filter(({ visible }) => Boolean(visible)).length > 0

const getPropsFromOptions = (data, item) => {
  const {
    options = [],
    valueKey = '',
    text,
    // label: itemLabel,
    visible,
    ...restItem
  } = item
  const obj = options.find(item1 => item1.value === data[valueKey]) || {}
  const { label, value, ...restObj } = obj
  return {
    type: item.type,
    ...restObj,
    ...restItem,
    visible: getVisible(visible, data),
    text:
      typeof text === 'function'
        ? text(data, obj)
        : obj.label ?? data[valueKey] ?? text,
    onClick: () => {
      item.onClick?.(data, obj)
    },
    data
  }
}

defineExpose({
  scrollViewRef
})
</script>

<style lang="scss" scoped>
.scrollView {
  padding: 24rpx;
  .cardItem {
    // background-color: #fff;
    font-size: 24rpx;
    margin-bottom: 24rpx;

    .info {
      display: flex;
      width: 100%;
      margin-bottom: 16rpx;
      .label {
        width: 240rpx;
      }
      .value {
        // flex: 1;
        text-align: right;
        width: calc(100% - 240rpx);
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    }

    .footer {
      display: flex;
      justify-content: end;
      gap: 8rpx;
    }
  }
}
</style>
