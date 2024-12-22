<template>
  <u-page class="demo">
    <div class="header">
      <u-search
        :clearabled="false"
        @search="search"
        @custom="search"
      ></u-search>
    </div>

    <div>
      {{ selectedKeys }}
    </div>
    <ScrollView
      v-model:selectedKeys="selectedKeys"
      ref="scrollViewRef"
      :params="filter"
      :request="getData"
      v-slot="slotProps"
      class="scrollView"
      rowKey="date"
    >
      <Card :title="`${slotProps.item.date}`" :border="false" class="cardItem">
        <template #body>
          <div class="info" v-for="item in cardItemInfoList">
            <div class="label">{{ item.label }}</div>
            <div class="value">
              {{ slotProps.item[item.valueKey] }}
            </div>
          </div>
        </template>

        <template #foot>
          <div class="footer">
            <div class="refreshBtn" @click="deleteItem">点击后刷新列表</div>
          </div>
        </template>
      </Card>
    </ScrollView>
  </u-page>
</template>

<script setup>
import { Card, ScrollView } from 'voyagejs-mobile'
import { ref } from 'vue'

const scrollViewRef = ref()
const selectedKeys = ref([])

const mockData = {
  success: true,
  data: {
    total: 30,
    list: [
      {
        id: 9412,
        companyId: 11524,
        year: 2024,
        month: 9,
        date: 1,
        dutyDept: '1',
        dutyManager: '1',
        dutyMember: '1',
        dutyPhone: '1',
        dutyRoomPhone: '1'
      },
      {
        id: 9413,
        companyId: 11524,
        year: 2024,
        month: 9,
        date: 2,
        dutyDept: '1',
        dutyManager: '1',
        dutyMember: '1',
        dutyPhone: '1',
        dutyRoomPhone: '1'
      },
      {
        id: 9414,
        companyId: 11524,
        year: 2024,
        month: 9,
        date: 3,
        dutyDept: null,
        dutyManager: null,
        dutyMember: null,
        dutyPhone: null,
        dutyRoomPhone: null
      },
      {
        id: 9415,
        companyId: 11524,
        year: 2024,
        month: 9,
        date: 4,
        dutyDept: null,
        dutyManager: null,
        dutyMember: null,
        dutyPhone: null,
        dutyRoomPhone: null
      },
      {
        id: 9416,
        companyId: 11524,
        year: 2024,
        month: 9,
        date: 5,
        dutyDept: null,
        dutyManager: null,
        dutyMember: null,
        dutyPhone: null,
        dutyRoomPhone: null
      },
      {
        id: 9417,
        companyId: 11524,
        year: 2024,
        month: 9,
        date: 6,
        dutyDept: null,
        dutyManager: null,
        dutyMember: null,
        dutyPhone: null,
        dutyRoomPhone: null
      },
      {
        id: 9418,
        companyId: 11524,
        year: 2024,
        month: 9,
        date: 7,
        dutyDept: null,
        dutyManager: null,
        dutyMember: null,
        dutyPhone: null,
        dutyRoomPhone: null
      },
      {
        id: 9419,
        companyId: 11524,
        year: 2024,
        month: 9,
        date: 8,
        dutyDept: null,
        dutyManager: null,
        dutyMember: null,
        dutyPhone: null,
        dutyRoomPhone: null
      },
      {
        id: 9420,
        companyId: 11524,
        year: 2024,
        month: 9,
        date: 9,
        dutyDept: null,
        dutyManager: null,
        dutyMember: null,
        dutyPhone: null,
        dutyRoomPhone: null
      },
      {
        id: 9421,
        companyId: 11524,
        year: 2024,
        month: 9,
        date: 10,
        dutyDept: null,
        dutyManager: null,
        dutyMember: null,
        dutyPhone: null,
        dutyRoomPhone: null
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

const cardItemInfoList = [
  {
    label: '值班部门：',
    valueKey: 'dutyDept'
  },
  {
    label: '部门负责人：',
    valueKey: 'dutyManager'
  },
  {
    label: '值班人员：',
    valueKey: 'dutyMember'
  },
  {
    label: '联系电话：',
    valueKey: 'dutyPhone'
  },
  {
    label: '总部值班电话：',
    valueKey: 'dutyRoomPhone'
  }
]

const filter = ref({})

const deleteItem = () => {
  scrollViewRef.value.refresh()
}

const search = value => {
  filter.value.search = value
}

const getData = async ({ pageNum, pageSize }, params) => {
  const res = mockData
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        dataList: res?.data?.list || [],
        total: res?.data?.total || 0,
        pages: res?.data?.pages
      })
    }, 1500)
  })
  // const res = mockData
  // // 可以在这里格式化数据
  // return {
  //   dataList: res?.data?.list || [],
  //   total: res?.data?.total || 0,
  //   pages: res?.data?.pages
  // }
}
</script>

<style lang="scss" scoped>
.demo {
  display: flex;
  flex-direction: column;
  .header {
    background: #fff;
    padding: 24rpx;
  }

  .scrollView {
    flex: 1;
    .cardItem {
      // background-color: #fff;
      font-size: 32rpx;

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
        text-align: right;
        .refreshBtn {
          color: red;
        }
      }
    }
  }
}
</style>
