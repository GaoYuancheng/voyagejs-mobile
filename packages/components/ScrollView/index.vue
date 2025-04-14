<template>
  <u-empty
    :style="{ height: height }"
    mode="data"
    v-if="list.length == 0"
    text="暂无数据"
  />
  <scroll-view
    v-else
    :class="`${$attrs.class} scrollView`"
    :style="{ height: height }"
    scroll-y="true"
    refresher-enabled
    @refresherrefresh="onRefresh"
    refresher-background="rgba(244, 246, 248, 1)"
    @scrolltolower="scrolltolower"
    :refresher-triggered="triggered"
  >
    <view
      v-for="(item, index) in list || []"
      :key="item[rowKey]"
      class="scrollViewItem"
    >
      <div class="itemContent">
        <div class="selectArea" v-if="rowSelection || selectedKeys">
          <u-checkbox
            :modelValue="(selectedKeys || []).includes(item[rowKey])"
            @update:modelValue="value => onSelect(value, item)"
          ></u-checkbox>
        </div>
        <div class="content">
          <slot :item="item">无内容</slot>
        </div>
      </div>

      <!-- 只能放里面 放外面布局会有问题 -->
      <u-loadmore
        @click="scrolltolower"
        v-if="index === list.length - 1"
        :status="status"
        :marginTop="16"
      ></u-loadmore>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'
import { onMounted, ref, watch } from 'vue'

type PageInfo = {
  pageNum: number
  pageSize: number
  pages?: number
  total?: number
}

export interface ScrollViewProps {
  /** 高度 */
  height?: string
  /** 行key */
  rowKey?: string
  /* 请求   */
  request?: (
    pageInfo: PageInfo,
    params: any
  ) => Promise<{
    pages?: number
    total: number
    dataList: any[]
  }>
  /** 筛选参数 会带到request 中 */
  params?: any
  /** 配置 */
  options?: {
    /*  默认分页size */
    defaultPageSize: PageInfo['pageSize']
  }
  /** 开启选中 pageNum 为 1 的时候会清空选中 */
  rowSelection?: {
    /**单选 多选 默认多选 */
    type: 'single' | 'multiple'
    onChange?: (selectedRowKeys: any, selectedRows: any) => void
  }
  /** v-model:selectedKeys 选中的值 */
  selectedKeys?: any[]
}

const props = defineProps<ScrollViewProps>()
const selectedKeys = defineModel('selectedKeys')

const { options, request, rowKey = 'id', height, rowSelection } = props
const { defaultPageSize = 10 } = options || {}
const { type = 'multiple', onChange: selectKeysOnChange } = rowSelection || {}

// 选中的行信息
const selectKeysInfo = ref<any>([])
const triggered = ref(false)
const status = ref('loadmore')
const list = ref<any[]>([])
const pageInfo = ref<PageInfo>({
  pageNum: 1,
  pageSize: defaultPageSize,
  pages: 0,
  total: 0
})

const loading = status.value === 'loading'

/** 选中相关 */
const onSelect = (checked, item) => {
  // 多选
  if (type === 'multiple') {
    selectKeysInfo.value = checked
      ? [...selectKeysInfo.value, item]
      : selectKeysInfo.value.filter(item1 => item1[rowKey] !== item[rowKey])
  } else if (type === 'single') {
    // 单选
    selectKeysInfo.value = checked ? [item] : []
  }
}

// 清空选中
const clearSelected = () => {
  selectKeysInfo.value = undefined
}

/** 分页请求 */

const getList = async (pageNum: PageInfo['pageNum'], params?: any) => {
  uni.showLoading({
    title: '加载中...'
  })
  if (loading) return

  if (!request) return

  const pageSize = pageInfo.value.pageSize
  status.value = 'loading'
  try {
    const res = await request({ pageNum, pageSize }, params)
    if (pageNum === 1) {
      list.value = res?.dataList || []
    } else {
      list.value = list.value.concat(res?.dataList || [])
    }

    const resPage = res?.pages || Math.ceil(res?.total / pageSize)

    pageInfo.value = {
      pageNum,
      pageSize,
      pages: resPage,
      total: res?.total
    }
  } finally {
    // 请求第一页时清空选中
    if (pageInfo.value.pageNum === 1) {
      clearSelected()
    }

    if (list.value.length === pageInfo.value.total) {
      status.value = 'nomore'
    } else {
      status.value = 'loadmore'
    }
    uni.hideLoading()
  }
}

// 上拉
const onRefresh = async () => {
  triggered.value = true
  await getList(1, props.params)
  triggered.value = false
}

// 触底
const scrolltolower = async () => {
  if (loading) return
  const params = { ...pageInfo.value }
  if (params.pageNum < (params.pages || 0)) {
    params.pageNum++
    await getList(params.pageNum, props.params)
  }
}

const refreshWithParams = () => getList(1, props.params)

// 监听参数变化
watch(
  () => props.params,
  newValue => {
    getList(1, newValue)
  },
  {
    deep: true
  }
)

// 选中值变化
watch(
  () => selectKeysInfo.value,
  () => {
    selectedKeys.value = selectKeysInfo.value
      ? selectKeysInfo.value.map(item => item[rowKey])
      : undefined
    selectKeysOnChange?.(selectedKeys.value, selectKeysInfo.value)
  }
)

onShow(() => {
  getList(1, props.params)
})

defineExpose({
  refresh: () => getList(1),
  refreshWithParams,
  clearSelected
})
</script>

<style lang="scss" scoped>
.scrollView {
  box-sizing: border-box;
  .scrollViewItem {
    .itemContent {
      .selectArea {
        display: flex;
        align-items: center;
        padding-right: 16rpx;

        :deep(.u-checkbox) {
          background-color: #fff;
        }

        :deep(.u-checkbox__label) {
          margin-right: 0;
          margin-left: 0;
        }
      }
      display: flex;
      .content {
        flex: 1;
        width: 100%;
      }
    }
  }
}
</style>
