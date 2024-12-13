<template>
  <ScrollViewPage
    :request="getData"
    :filterProps="filterProps"
    :cardConfig="cardConfig"
    :scrollViewProps="{
      rowKey: 'id',
      height: 'calc(100% - 130rpx)'
    }"
  />
</template>

<script setup lang="ts">
import { mockRequest } from '@/api'
import ScrollViewPage from '@/components/ScrollViewPage'
// import { schemePlanStatusOptions, schemeTypeOptions } from '@/constants'
import { ref } from 'vue'

const mockData = {
  records: [
    {
      id: 'baead3c810503bacd81476284e67f133',
      name: '测试方案库一',
      status: 'COMMIT',
      projectType: 1,
      schemeType: 'B类',
      professionalType: 719,
      professionalTypeDesc: '专业类型二',
      applicableProvince: '浙江省',
      applicableCity: '杭州市',
      evaluationStandard: '评判标准2',
      applicableProvinceId: null,
      applicableCityId: null,
      operateCodeList: ['DELETE', 'EDIT']
    },
    {
      id: 'e5c3b8d8c4bb16d4193ad22bb4279575',
      name: '方案名称2',
      status: 'PASS',
      projectType: 1,
      schemeType: 'B类',
      professionalType: 720,
      professionalTypeDesc: '汽机',
      applicableProvince: '浙江省',
      applicableCity: '杭州市',
      evaluationStandard: '方案名称2',
      applicableProvinceId: null,
      applicableCityId: null,
      operateCodeList: ['DELETE', 'EDIT']
    },
    {
      id: 'c46368fb9d0a2e35eb9e068d228836f1',
      name: '方案名称3',
      status: 'REJECT',
      projectType: 1,
      schemeType: 'B类',
      professionalType: 720,
      professionalTypeDesc: '汽机',
      applicableProvince: '浙江省',
      applicableCity: '杭州市',
      evaluationStandard: '方案名称3',
      applicableProvinceId: null,
      applicableCityId: null,
      operateCodeList: ['DELETE', 'EDIT']
    },
    {
      id: 'a01ad3fa19206109214c04a7c9a6104f',
      name: '方案名称43',
      projectType: 1,
      schemeType: 'A类',
      professionalType: 720,
      professionalTypeDesc: '汽机',
      applicableProvince: '浙江省',
      applicableCity: '杭州市',
      evaluationStandard: '方案名称4',
      applicableProvinceId: null,
      applicableCityId: null,
      operateCodeList: ['DELETE', 'EDIT']
    },
    {
      id: 'ebcf1cef405b3113e2ece094109adee0',
      name: '方案名称51',
      projectType: 1,
      schemeType: 'C类',
      professionalType: 721,
      professionalTypeDesc: '锅炉',
      applicableProvince: '浙江省',
      applicableCity: '杭州市',
      evaluationStandard: '方案名称5',
      applicableProvinceId: null,
      applicableCityId: null,
      operateCodeList: ['DELETE', 'EDIT']
    },
    {
      id: '9ab9abba17046df51fc30cf8532f179d',
      name: '8',
      projectType: 1,
      schemeType: 'C类',
      professionalType: 719,
      professionalTypeDesc: '专业类型二',
      applicableProvince: '浙江省',
      applicableCity: '杭州市',
      evaluationStandard: null,
      applicableProvinceId: 5,
      applicableCityId: 5,
      operateCodeList: ['DELETE', 'EDIT']
    }
  ],
  total: 6,
  size: 10,
  current: 1,
  pages: 1
}

const schemePlanStatusOptions = [
  {
    label: '提交',
    value: 'COMMIT',
    badgeProps: {
      iconColor: 'blue'
    }
  },
  {
    label: '待提交',
    value: 'WAIT_COMMIT',
    badgeProps: {
      iconColor: 'blue'
    }
  },
  {
    label: '待审核',
    value: 'APPROVE',
    badgeProps: {
      iconColor: 'blue'
    }
  },
  {
    label: '审核通过',
    value: 'PASS',
    badgeProps: {
      iconColor: 'green'
    }
  },
  {
    label: '审核驳回',
    value: 'REJECT',
    badgeProps: {
      iconColor: 'red'
    }
  }
]

const schemeTypeOptions = [
  {
    label: 'A类',
    value: 'A类',
    style: {
      color: '#fff',
      background: 'rgb(245,154,35)'
    }
  },
  {
    label: 'B类',
    value: 'B类',
    style: {
      color: '#fff',
      background: 'rgb(112,182,3)'
    }
  },
  {
    label: 'C类',
    value: 'C类',
    style: {
      color: '#fff',
      background: 'rgb(236,245,255)'
    }
  }
]
const filterProps = {
  filterConfig: {
    mainSearch: [
      {
        type: 'search',
        name: 'name',
        label: '方案名称'
      }
    ],
    organization: {
      name: 'organizationInfo',
      fieldProps: {
        param: {
          depart: false,
          company: false,
          project: true,
          subCompany: false
        },
        isSearch: true
      }
    },
    sub: [
      {
        type: 'select',
        name: '方案分类',
        label: '方案分类',
        options: schemeTypeOptions
      },
      {
        type: 'select',
        name: '方案状态',
        label: '方案状态',
        options: schemePlanStatusOptions
      }
    ]
  }
}

const cardConfig = {
  header: {
    titleList: [
      {
        valueKey: 'schemeType',
        type: 'tag',
        options: schemeTypeOptions
      },
      {
        valueKey: 'name',
        type: 'text'
      }
    ],
    extraList: [
      {
        valueKey: 'status',
        type: 'badge',
        options: schemePlanStatusOptions
      }
    ]
  },
  body: {
    list: [
      {
        label: '值班部门：',
        valueKey: 'dutyDept',
        visible: false
      },
      {
        label: 'applicableProvince：',
        valueKey: 'applicableProvince'
      },
      {
        label: 'evaluationStandard：',
        valueKey: 'evaluationStandard'
      },
      {
        label: 'projectType：',
        valueKey: 'projectType',
        options: [
          {
            label: 'label1',
            value: 1
          }
        ]
      },
      {
        label: '总部值班电话：',
        valueKey: 'schemeType'
      }
    ]
  },
  footer: {
    list: [
      {
        type: 'tag',
        text: '详情',
        visible: true,
        style: {
          background: 'rgb(0,100,255)',
          color: '#fff'
        },
        events: {
          click: item => {
            console.log('button', item)
          }
        }
      },
      {
        type: 'tag',
        text: '盖章',
        visible: true,
        style: {
          background: 'rgb(0,100,255)',
          color: '#fff'
        },
        events: {
          click: item => {
            console.log('button', item)
          }
        }
      }
    ]
  }
}

const getData = async ({ pageNum, pageSize }, params) => {
  const res = await mockRequest({ pageNum, pageSize, ...params }, mockData)
  return {
    dataList: res?.records,
    total: res?.total
  }
  // const res = mockData
  // // 可以在这里格式化数据
  // return {
  //   dataList: res?.data?.list || [],
  //   total: res?.data?.total || 0,
  //   pages: res?.data?.pages
  // }
}
</script>

<style lang="scss" scoped></style>
