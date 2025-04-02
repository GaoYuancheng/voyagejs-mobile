<template>
  <u-page class="demo">
    <Description title="基本信息" :items="basicInfoItems">
      <template #extra>
        <div class="extra">审批日志</div>
      </template>
    </Description>

    <Description
      v-if="dataRef.fileList?.length > 0"
      title="文件"
      :items="fileInfoItems"
    />
  </u-page>
</template>

<script setup lang="ts">
import { Description, mockRequest } from 'voyagejs-mobile'
import { computed, onMounted, ref } from 'vue'

const mockData = {
  success: true,
  data: {
    label1: 'value1',
    label2: 'value2',
    label3: 'value3',
    label4: 'value4',
    label5: 'value5',
    fileList: [
      {
        fileName: '文件1.txt',
        fileSize: 1000,
        fileUrl: '文件1.png'
      },
      {
        fileName: '文件1.doc',
        fileSize: 1000,
        fileUrl: '文件1.png'
      }
    ]
  }
}

const dataRef = ref<any>({})

const getData = async ({ pageNum, pageSize }, params) => {
  const res = await mockRequest({}, mockData)

  dataRef.value = res.data
}

const basicInfoItems = computed(() => [
  {
    label: 'label1',
    value: dataRef.value.label1
  },
  {
    label: 'label2',
    value: dataRef.value.label2
  },
  {
    label: 'label3',
    value: dataRef.value.label3
  }
])

const formatFileItems = (fileList: any[]) => {
  return fileList.map(
    item =>
      ({
        type: 'file',
        fileInfo: {
          fileName: item.fileName,
          fileUrl: item.fileUrl,
          fileSize: (item.fileSize / 1024 / 1024).toFixed(2)
        },

        actions: [
          {
            type: 'preview',
            onClick: fileInfo => {
              console.log(' formatFileItems ~ fileInfo:', fileInfo)
            }
          },
          {
            type: 'download',
            onClick: fileInfo => {
              console.log(' formatFileItems ~ fileInfo:', fileInfo)
            }
          }
        ]
      } as any)
  )
}

const fileInfoItems = computed(() => formatFileItems(dataRef.value.fileList))

onMounted(() => {
  getData({ pageNum: 1, pageSize: 10 }, {})
})
</script>

<style lang="scss" scoped>
.demo {
  display: flex;
  flex-direction: column;
  padding: 16rpx;
  .extra {
    color: #0064ff;
  }
}
</style>
