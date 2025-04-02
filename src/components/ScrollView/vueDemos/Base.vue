<template>
  <u-page class="demo">
    <ScrollView
      ref="scrollViewRef"
      :params="filter"
      :request="getData"
      v-slot="slotProps"
      class="scrollView"
      rowKey="id"
    >
      <div class="item">
        {{ slotProps.item.value }}
      </div>
    </ScrollView>
  </u-page>
</template>

<script setup>
import { ScrollView, mockRequest } from 'voyagejs-mobile'
import { ref } from 'vue'

const scrollViewRef = ref()

const mockData = {
  success: true,
  data: {
    total: 30,
    list: [
      {
        id: 'value1',
        value: 'value1'
      },
      {
        id: 'value2',
        value: 'value2'
      },
      {
        id: 'value3',
        value: 'value3'
      },
      {
        id: 'value4',
        value: 'value4'
      },
      {
        id: 'value5',
        value: 'value5'
      },
      {
        id: 'value6',
        value: 'value6'
      },
      {
        id: 'value7',
        value: 'value7'
      },
      {
        id: 'value8',
        value: 'value8'
      }
    ],
    pageNum: 1,
    pageSize: 10,
    size: 10,
    startRow: 1,
    endRow: 10,
    pages: 3,
    prePage: 0,
    nextPage: 2,
    isFirstPage: true,
    isLastPage: false,
    hasPreviousPage: false,
    hasNextPage: true,
    navigatePages: 8,
    navigatepageNums: [1, 2, 3],
    navigateFirstPage: 1,
    navigateLastPage: 3
  }
}

const filter = ref({})

const getData = async ({ pageNum, pageSize }, params) => {
  const res = await mockRequest({}, mockData)

  return {
    dataList: res?.data?.list || [],
    total: res?.data?.total || 0,
    pages: res?.data?.pages
  }
}
</script>

<style lang="scss" scoped>
.demo {
  display: flex;
  flex-direction: column;
  padding: 16rpx;
  .header {
    background: #fff;
    padding: 24rpx;
  }

  .scrollView {
    flex: 1;

    .item {
      border-bottom: 1px solid #ddd;
      background-color: #fff;
      font-size: 32rpx;
      padding: 16rpx;
    }
  }
}
</style>
