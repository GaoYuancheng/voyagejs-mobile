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
import { ref, watch } from 'vue'
import { TopFilter, TopFilterProps } from 'voyagejs-mobile'

const initialValues = {
  select: '2',
  input1: '1',
  tags1: 'year'
}

const filterOutRef = ref(initialValues)

const filterRefClick = () => {
  console.log(filterOutRef.value)
}

const filterChange = value => {
  console.log('filterChange ~ value:', value)
  filterOutRef.value = value
}

const filterConfig: TopFilterProps['filterConfig'] = {
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
  mainSearch: {
    style: {
      justifyContent: 'start'
    },
    list: [
      // {
      //   type: 'tags',
      //   name: 'tags',
      //   visible: true,
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
        name: 'search',
        type: 'search',
        label: 'search'
      }
      // {
      //   name: 'picker',
      //   type: 'picker',
      //   label: 'picker',
      //   fieldProps: {
      //     params: {
      //       year: true,
      //       month: true,
      //       day: true,
      //       hour: false,
      //       minute: false,
      //       second: false,
      //       province: true,
      //       city: true,
      //       area: true,
      //       timestamp: true
      //     }
      //   }
      // }
    ]
  },
  // mainSearch: [
  //   // {
  //   //   type: 'tags',
  //   //   name: 'tags',
  //   //   fieldEvents: {
  //   //     change: (value, filterRef) => {
  //   //       if (value === 'year') {
  //   //         filterRef.value.dateRange = {
  //   //           startDate: '2022-01-01',
  //   //           endDate: '2022-12-31'
  //   //         }
  //   //       }
  //   //     }
  //   //   },
  //   //   fieldProps: {
  //   //     options: [
  //   //       {
  //   //         label: '本年',
  //   //         value: 'year'
  //   //       },
  //   //       {
  //   //         label: '本季',
  //   //         value: 'quarter'
  //   //       },
  //   //       {
  //   //         label: '本月',
  //   //         value: 'month'
  //   //       }
  //   //     ]
  //   //   }
  //   // }
  //   {
  //     name: 'search',
  //     type: 'search',
  //     label: 'search'
  //   }
  //   // {
  //   //   name: 'picker',
  //   //   type: 'picker',
  //   //   label: 'picker',
  //   //   fieldProps: {
  //   //     params: {
  //   //       year: true,
  //   //       month: true,
  //   //       day: true,
  //   //       hour: false,
  //   //       minute: false,
  //   //       second: false,
  //   //       province: true,
  //   //       city: true,
  //   //       area: true,
  //   //       timestamp: true
  //   //     }
  //   //   }
  //   // }
  // ],
  dropdown: [
    {
      name: 'date',
      type: 'date',
      label: 'date'
    },
    {
      name: 'picker',
      type: 'picker',
      label: 'picker',
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
      name: 'input',
      type: 'input',
      label: 'input',
      fieldProps: {
        placeholder: '请输入'
      },
      fieldEvents: {
        change: (value, filterRef) => {
          if (value === 'aa') {
            filterRef.value['select-valueEnum'] = '1'
          }
        }
      }
    },
    {
      name: 'tags1',
      label: 'tags1',
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
          console.log('🚀 ~ value:', value, filterRef)
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
      label: 'dateRange'
    },
    {
      name: 'select-valueEnum',
      type: 'select',
      label: 'select-valueEnum',
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
      name: 'select-request获取',
      type: 'select',
      label: 'select-request获取',
      request: async () => {
        return [
          {
            label: '1111',
            value: '111'
          }
        ]
      }
    },

    {
      name: 'organization',
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
      name: 'member',
      type: 'member',
      label: '选择人员',
      fieldProps: {
        // single: true
      }
    }
  ],
  sub: [
    {
      name: 'select',
      type: 'select',
      label: 'select',
      valueEnum: {
        0: '特级',
        1: '一级',
        2: '二级',
        3: '三级'
      }
    },
    {
      name: 'picker',
      type: 'picker',
      label: 'picker',
      fieldProps: {
        params: {
          year: true,
          month: true,
          day: false
        }
      }
    }
  ]
}
</script>

<style lang="scss" scoped></style>
