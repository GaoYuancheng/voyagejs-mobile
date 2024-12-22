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
    <view v-for="(item, index) in list || []" :key="item[rowKey]">
      <slot :item="item">无内容</slot>
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
import { onMounted, ref, watch } from 'vue'

type PageInfo = {
  pageNum: number
  pageSize: number
  pages?: number
  total?: number
}

interface ScrollViewProps {
  /** 高度 */
  height: string
  /** 行key */
  rowKey?: string
  /* 请求   */
  request?: (
    pageInfo: PageInfo,
    params: any
  ) => Promise<{
    pages: number
    total: number
    dataList: any[]
  }>
  /** 筛选参数 会带到request 中 */
  params: any
  /** 配置 */
  options?: {
    /*  默认分页size */
    defaultPageSize: PageInfo['pageSize']
  }
}

const props = defineProps<ScrollViewProps>()

const { options, request, rowKey = 'id', height } = props
const { defaultPageSize = 10 } = options || {}

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
  await getList(1)
  triggered.value = false
}

// 触底
const scrolltolower = async () => {
  if (loading) return
  const params = { ...pageInfo.value }
  if (params.pageNum < (params.pages || 0)) {
    params.pageNum++
    await getList(params.pageNum)
  }
}

watch(
  () => props.params,
  newValue => {
    getList(1, newValue)
  },
  {
    immediate: true,
    deep: true
  }
)

defineExpose({
  refresh: () => getList(1),
  refreshWithParams: () => getList(1, props.params),
  getList
})
</script>

<style lang="scss" scoped>
.scrollView {
  box-sizing: border-box;
}
</style>
