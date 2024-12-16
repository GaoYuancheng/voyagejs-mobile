<template>
  <div class="filter">
    <div
      class="header"
      :class="sub ? 'hasSub' : ''"
      v-if="mainSearch || mainSearchSlot || dropdown || organization"
    >
      <div class="mainSearch">
        <slot name="mainSearch" v-if="mainSearchSlot"> </slot>
        <FormField
          v-else
          v-for="item in mainSearch"
          :key="item.name"
          @fieldChange="value => fieldChange(value, item)"
          :itemProps="item"
        />
      </div>

      <div v-if="organization && !isProjectModule" class="organizationIcon">
        <Organization
          :itemProps="organization"
          @change="value => organizationChange(value, organization)"
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
            @fieldChange="value => dropdownFieldChange(value, item)"
          />
          <div class="buttonArea">
            <div class="resetButton" @tap.stop="reset">重置</div>
            <div class="confirmButton" @tap.stop="confirm">确定</div>
          </div>
        </u-dropdown-item>
      </u-dropdown>
    </div>

    <div class="sub" v-if="sub">
      <u-dropdown :height="60">
        <FormField
          :key="item.name"
          v-for="item in sub"
          :itemProps="item"
          @fieldChange="value => fieldChange(value, item)"
        />
      </u-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide, ref, toRef, useSlots, watch } from 'vue'
import FormField from './FormField/index.vue'
import Organization from './Organization/index.vue'

const cdn = 'https://cdn-zz.pinming.cn/lib/front/mobile/zz/common'

const emits = defineEmits(['change'])

type optionItem = {
  label: string
  value: string
} & Record<string, any>

type FilterItem = {
  /** 筛选项类型 */
  type:
    | 'search'
    | 'input'
    | 'select'
    | 'date'
    | 'dateRange'
    | 'member'
    | 'organization'
    | 'tags'
  /** 表单项参数 会传入表单控件中 */
  fieldProps: any
  /** 表单label */
  label: string
  /** 表单options type为  select 时生效 */
  options?: optionItem[]
  name: string
}

type TopFilterProps = {
  // TODO: 后续使用泛型
  /** 初始值 */
  initialValues?: any
  filterConfig: {
    /** 主筛选 */
    mainSearch?: FilterItem[]
    /** 子筛选 */
    sub?: FilterItem[]
    /** 右侧组织选择 项目级自动隐藏 */
    organization?: FilterItem
    /** 右侧下拉筛选 */
    dropdown?: FilterItem[]
    /** 表单项事件 */
    fieldEvents?: Record<string, any>
  }
}

const props = defineProps<TopFilterProps>()

const { initialValues = {}, filterConfig = {} } = props

const { mainSearch, sub, dropdown, organization } = filterConfig

// const getDropdownFilter = () => {
//   const res = dropdown.reduce((prev, item) => {
//     prev[item.name] = filterRef.value[item.name]
//     return prev
//   }, {})
//   return res
// }

const dropdownRef = ref()
const dropdownShowRef = ref(false)
const filterRef = ref(initialValues)
// const dropdownFilterRef = ref(getDropdownFilter())

provide('filterRef', filterRef)

const { mainSearch: mainSearchSlot } = useSlots()

const isProjectModule = uni.$u.currentUser.isProjectModule()

const organizationChange = (value, item) => {
  filterRef.value[item.name] = value
  submit()
}

const fieldChange = (value, item) => {
  // const res = {
  //   ...filterRef.value,
  //   [item.name]: value
  // }
  // filterRef.value = res
  submit()
}

const dropdownFieldChange = (value, item) => {
  // const res = {
  //   ...filterRef.value,
  //   [item.name]: value
  // }
  filterRef.value[item.name] = value
  // dropdownFilterRef.value[item.name] = value
}

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
  filterRef.value = {}
}

// 点击确定
// dropdown外选择
const submit = () => {
  console.log('submit ~ change:')
  emits('change', { ...filterRef.value })
}
</script>

<style lang="scss" scoped>
.filter {
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 4;
  .header {
    padding: 16rpx;
    &.hasSub {
      // padding-bottom: 0;
    }
    display: flex;
    align-items: center;
    .mainSearch {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
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
