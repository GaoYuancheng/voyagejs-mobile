<template>
  <u-row class="info">
    <Label v-bind="item">{{ item.label }}</Label>
    <Value v-bind="item" :valueCol="12" :valueStyle="{ display: 'block' }">
      <div class="fileList">
        <File
          style="padding: 12rpx 0"
          v-for="file in item.fileList"
          :key="file.fileUuid"
          :actions="item.actions"
          :fileInfo="file"
        />
      </div>
    </Value>
  </u-row>
</template>

<script setup lang="ts">
import { DescriptionItemType } from '../../type'
import File from '../File/index.vue'
import Label from '../../Label/index.vue'
import Value from '../../Value/index.vue'
const item = defineProps<DescriptionItemType>()
</script>

<style scoped>
.fileList {
  margin-top: 16rpx;
}
</style>
