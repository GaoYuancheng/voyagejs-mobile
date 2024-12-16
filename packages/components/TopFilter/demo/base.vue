<template>
  <div>
    <TopFilter
      :filterConfig="filterConfig"
      @change="filterChange"
      :initialValues="initialValues"
    >
      <!-- <template #mainSearch> {{ filterOutRef.input1 }} </template> -->
    </TopFilter>
    <div @click="filterRefClick">
      {{ JSON.stringify(filterOutRef, null, 2) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TopFilter } from 'voyagejs-mobile'

const initialValues = {
  programmeGrade11: '2',
  input1: '1'
}

const filterOutRef = ref(initialValues)

const filterRefClick = () => {
  console.log(filterOutRef.value)
}

const filterConfig = {
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
  mainSearch: [
    // {
    //   type: 'tags',
    //   name: 'tags',
    //   fieldEvents: {
    //     change: (value, filterRef) => {
    //       if (value === 'year') {
    //         filterRef.value.dateRange = {
    //           startDate: '2022-01-01',
    //           endDate: '2022-12-31'
    //         }
    //       }
    //     }
    //   },
    //   fieldProps: {
    //     options: [
    //       {
    //         label: '本年',
    //         value: 'year'
    //       },
    //       {
    //         label: '本季',
    //         value: 'quarter'
    //       },
    //       {
    //         label: '本月',
    //         value: 'month'
    //       }
    //     ]
    //   }
    // }
    {
      name: 'picker',
      type: 'picker',
      label: 'picker',
      fieldProps: {
        params: {
          year: true,
          month: true,
          day: true,
          hour: false,
          minute: false,
          second: false,
          province: true,
          city: true,
          area: true,
          timestamp: true
        }
      }
    }
  ],
  dropdown: [
    {
      name: 'picker1',
      type: 'picker',
      label: 'picker1',
      fieldProps: {
        params: {
          year: true,
          month: true,
          day: false,
          hour: false,
          minute: false,
          second: false,
          province: true,
          city: true,
          area: true,
          timestamp: true
        }
      }
    },
    {
      name: 'input1',
      type: 'input',
      label: 'input111',
      fieldProps: {
        placeholder: '请输入'
      },
      fieldEvents: {
        change: (value, filterRef) => {
          if (value === 'aa') {
            filterRef.value.programmeGrade11 = '1'
          }
        }
      }
    },
    {
      name: 'dropdownTags',
      label: '预设时间',
      type: 'tags',
      fieldProps: {
        options: [
          {
            label: '本年',
            value: 'year'
          },
          {
            label: '本季',
            value: 'quarter'
          },
          {
            label: '本月',
            value: 'month'
          }
        ]
      },
      fieldEvents: {
        change: (value, filterRef) => {
          if (value === 'year') {
            filterRef.value.dateRange = {
              startDate: '2022-01-01',
              endDate: '2022-12-31'
            }
          }
        }
      }
    },

    {
      name: 'dateRange',
      type: 'dateRange',
      label: '计划到场时间'
    },
    {
      name: 'programmeGrade11',
      type: 'select',
      label: '项目状态',
      fieldEvents: {
        change: (value, filterRef) => {
          console.log('change ~ value:', value)
          filterRef.value.programmeGrade1122 = value
        }
      },
      valueEnum: {
        0: '特级',
        1: '一级',
        2: '二级',
        3: '三级'
      }
    },

    {
      name: 'dropdownOrganization',
      type: 'organization',
      label: '选择单位',
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
    {
      name: 'dropdownMember',
      type: 'member',
      label: '选择人员',
      fieldProps: {
        // single: true
      }
    }
  ],
  sub: [
    {
      name: '项目状态Sub',
      type: 'select',
      label: '项目状态',
      valueEnum: {
        0: '特级',
        1: '一级',
        2: '二级',
        3: '三级'
      }
    }
  ]
}
const filterChange = value => {
  console.log('filterChange ~ value:', value)
  filterOutRef.value = value
}
</script>

<style lang="scss" scoped></style>
