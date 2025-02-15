<template>
  <div class="filter">
    <div
      class="header"
      :class="sub ? 'hasSub' : ''"
      v-if="mainSearch || mainSearchSlot || dropdown || organization"
    >
      <div class="mainSearch" :style="mainSearchInfo?.style">
        <slot name="mainSearch" v-if="mainSearchSlot"> </slot>
        <FormField
          v-else
          v-for="item in mainSearchInfo?.list"
          :key="item.name"
          :itemProps="item"
          :class="item.type === 'search' ? 'mainSearchField' : ''"
          v-model="filterRef[item.name]"
          @change="submit"
        />
      </div>

      <div v-if="organization && organization.visible" class="organizationIcon">
        <Organization
          v-model="filterRef[organization.name]"
          :itemProps="organization"
          @change="submit"
        />
      </div>

      <div v-if="dropdown" class="dropdownIcon" @click="filterIconClick">
        <u-image
          width="44rpx"
          height="44rpx"
          :fade="false"
          :src="`${cdn}/${
            // dropdownShowRef ? 'icon_filter_blue.svg' : 'icon_filter.svg'
            'icon_filter.svg'
          }`"
        ></u-image>
      </div>
    </div>

    <!-- dropdown -->
    <div class="dropdownLine" v-if="dropdown">
      <u-dropdown :height="4" menu-icon="" ref="dropdownRef">
        <u-dropdown-item class="dropdownMenu" title=" " height="400rpx">
          <FormField
            :key="item.name"
            v-for="item in dropdown"
            :itemProps="item"
            :isDropdown="true"
            v-model="filterRef[item.name]"
          />
          <div class="buttonArea">
            <div class="resetButton" @tap.stop="reset">重置</div>
            <div class="confirmButton" @tap.stop="confirm">确定</div>
          </div>
        </u-dropdown-item>
      </u-dropdown>
    </div>

    <div class="sub" v-if="sub">
      <Sub :sub="sub" @change="submit" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  CSSProperties,
  provide,
  ref,
  toRef,
  useSlots,
  VNode,
  VueElement,
  watch
} from 'vue'
import FormField from './FormField/index.vue'
import Organization from './Organization/index.vue'
import Sub from './Sub/index.vue'

const cdn = 'https://cdn-zz.pinming.cn/lib/front/mobile/zz/common'

const emits = defineEmits(['change'])

type optionItem = {
  label: string
  value: string
} & Record<string, any>

export type FilterItem = {
  /** 筛选项类型 */
  type?:
    | 'search'
    | 'input'
    | 'select'
    | 'date'
    | 'dateRange'
    | 'member'
    | 'organization'
    | 'tags'
    | 'picker'
    | 'pickerRange'
    | 'custom'
  /** 表单项参数 会传入表单控件中 */
  fieldProps?: Record<string, any>
  /** 表单label */
  label?: string
  /** 表单options type为  select 时生效 */
  options?: optionItem[]
  valueEnum?: Record<string, string>
  request?: () => Promise<optionItem[]>
  /** 表单name */
  name: string
  /** 是否显示 */
  visible?: boolean
  /** 表单事件 */
  fieldEvents?: Record<string, Function>
  /** 自定义表单组件 type 为 custom 时使用*/
  render?: () => VNode
}

type MainSearch = {
  style?: CSSProperties
  list?: FilterItem[]
}

export type TopFilterProps = {
  // TODO: 后续使用泛型
  /** 初始值 */
  initialValues?: any
  filterConfig: {
    /** 主筛选 */
    mainSearch?: FilterItem[] | MainSearch
    /** 子筛选 */
    sub?: FilterItem[]
    /** 右侧组织选择  */
    organization?: FilterItem
    /** 右侧下拉筛选 */
    dropdown?: FilterItem[]
  }
}

const props = defineProps<TopFilterProps>()

const { initialValues = {}, filterConfig = {} } = props

const { mainSearch, sub, dropdown, organization } = filterConfig
const mainSearchInfo = Array.isArray(mainSearch)
  ? {
      list: mainSearch
    }
  : mainSearch

// const getDropdownFilter = () => {
//   const res = dropdown.reduce((prev, item) => {
//     prev[item.name] = filterRef.value[item.name]
//     return prev
//   }, {})
//   return res
// }

const dropdownRef = ref()
const dropdownShowRef = ref(false)
// 使用 JSON.stringify JSON.parse 兼容旧版浏览器
const filterRef = ref(JSON.parse(JSON.stringify(initialValues)))
// const dropdownFilterRef = ref(getDropdownFilter())

provide('filterRef', filterRef)

const { mainSearch: mainSearchSlot } = useSlots()

const filterIconClick = () => {
  if (dropdownShowRef.value) {
    dropdownShowRef.value = false
    dropdownRef.value.close()
  } else {
    dropdownShowRef.value = true
    dropdownRef.value.open(0)
  }
}

const confirm = () => {
  // filterRef.value = {
  //   ...filterRef.value,
  // ...dropdownFilterRef.value
  // }
  // 确定的时候保存下拉中的值
  // dropdownFilterRef.value = getDropdownFilter()
  submit()
  dropdownRef.value.close()
}

const reset = () => {
  // const resetObj = dropdown.reduce((prev, item) => {
  //   prev[item.name] = ''
  //   return prev
  // }, {})
  // filterRef.value = {
  //   ...filterRef.value,
  //   ...resetObj
  // }
  // dropdownFilterRef.value = {}
  filterRef.value = {
    ...initialValues
  }
}

// 点击确定
// dropdown外选择
const submit = () => {
  emits('change', { ...filterRef.value })
}

const dropdownNames = computed(() => {
  return (dropdown || []).map(item => item.name)
})
</script>

<style lang="scss" scoped>
.filter {
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 4;
  .header {
    padding: 16rpx;
    display: flex;
    align-items: center;
    .mainSearch {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      .mainSearchField {
        width: 100%;
      }
    }
    .dropdownIcon {
      width: 44rpx;
      margin-left: 16rpx;
    }
    .organizationIcon {
      width: 44rpx;
      margin-left: 16rpx;
    }
  }

  .sub {
    display: flex;
    justify-content: space-evenly;
  }

  .dropdownLine {
    height: 4rpx;
    width: 100%;
    background: #eee;
    z-index: 999;
    position: absolute;
    .dropdownMenu {
      background: #fff;
    }
    .buttonArea {
      font-size: 36rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24rpx;
      .resetButton {
        border-radius: 0.125rem;
        width: 10.625rem;
        height: 2.75rem;
        background-color: #ffffff;
        border: 1px solid #e5e5e5;
        color: rgb(0, 0, 0);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .confirmButton {
        border-radius: 0.125rem;
        width: 10.625rem;
        height: 2.75rem;
        background-color: #0d7edb;
        border: 1px solid #0d7edb;
        color: rgb(255, 255, 255);
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
