<template>
  <u-page>
    <TopFilter
      class="filter"
      @change="filterChange"
      v-bind="filterProps"
    ></TopFilter>

    <ScrollView
      ref="scrollViewRef"
      :params="filterRef"
      :request="request"
      v-slot="slotProps"
      rowKey="date"
      v-bind="scrollViewProps"
    >
      <slot></slot>
      <Card v-if="!slots.default" :border="false" class="cardItem">
        <template #title>
          <Item
            v-for="item in titleList"
            v-bind="getPropsFromOptions(item, slotProps.item)"
          />
        </template>
        <template #extra>
          <Item
            v-for="item in extraList"
            v-bind="getPropsFromOptions(item, slotProps.item)"
          />
        </template>
        <template #body>
          <div class="info" v-for="item in bodyList">
            <template v-if="getVisible(item.visible, item)">
              <div class="label">{{ item.label }}</div>
              <div class="value">
                <Item v-bind="getPropsFromOptions(item, slotProps.item)" />
              </div>
            </template>
          </div>
        </template>

        <template #footer>
          <div class="footer">
            <Item
              v-for="item in footerList"
              v-bind="getPropsFromOptions(item, slotProps.item)"
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
import { ref, useSlots } from 'vue'
import { getVisible } from '@/utils'

const slots = useSlots()

const { filterProps, request, cardConfig, scrollViewProps } = defineProps({
  filterProps: {
    type: Object,
    default: () => ({})
  },
  request: {
    type: Function,
    default: () => {}
  },
  scrollViewProps: {
    type: Object,
    default: () => ({})
  },
  cardConfig: {
    type: Object,
    default: () => ({})
  }
})
const { body = {}, header = {}, footer = {} } = cardConfig

const { list: bodyList = [] } = body
const { titleList = [], extraList = [] } = header
const { list: footerList = [] } = footer

const filterRef = ref({})
const filterChange = values => {
  filterRef.value = values
}

const getPropsFromOptions = (item, data) => {
  const {
    options = [],
    valueKey = '',
    text,
    formatter,
    visible,
    ...restItem
  } = item
  const obj = options.find(item1 => item1.value === data[valueKey]) || {}
  const { label, value, ...restObj } = obj
  return {
    type: item.type,
    ...restObj,
    ...restItem,
    text: formatter ? formatter(obj, data) : obj.label || data[valueKey] || text
  }
}
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
        flex: 1;
        text-align: right;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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
