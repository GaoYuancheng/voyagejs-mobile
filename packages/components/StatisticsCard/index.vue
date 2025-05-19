<template>
  <FormCard class="statisticsCard" v-bind="props">
    <template #body="{ data }">
      <div class="content">
        <div v-if="getLeftList(data).length > 0" class="left">
          <div class="item">
            <img
              :src="getLeftList(data)[0].icon"
              width="24rpx"
              height="24rpx"
              alt=""
            />
            <div class="itemContent">
              <div class="itemLabel">
                {{ getLeftList(data)[0].label }}
                <DescriptionIcon
                  style="margin-left: 12rpx"
                  v-if="getLeftList(data)[0].description"
                  :description="getLeftList(data)[0].description"
                />
              </div>
              <div class="itemValue">
                {{ getLeftList(data)[0].value }}
                <span v-if="getLeftList(data)[0].unit" class="itemUnit">{{
                  getLeftList(data)[0].unit
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="right row">
          <div v-for="item in getRightList(data)" class="col-12">
            <div class="item">
              <img :src="item.icon" width="24rpx" height="24rpx" alt="" />
              <div class="itemContent">
                <div class="itemLabel">
                  {{ item.label }}
                  <DescriptionIcon
                    style="margin-left: 8rpx"
                    v-if="item.description"
                    :description="item.description"
                  />
                </div>
                <div class="itemValue">
                  {{ item.value }}
                  <span v-if="item.unit" class="itemUnit">{{ item.unit }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </FormCard>
</template>

<script setup lang="ts">
import FormCard, { FormCardProps } from '../FormCard/index.vue'
import DescriptionIcon from '../DescriptionIcon/index.vue'
interface Item {
  label: string

  icon: string
  value: number
  unit?: string
  description?: string
}

// icon
// 动态路径（需静态部分 + 变量）
// const getImageUrl = imageName => {
//   return new URL(
//     `./images/${imageName}`,
//     // @ts-ignore
//     import.meta.url
//   ).href
// }

interface Props extends FormCardProps {
  request: (...args: Parameters<FormCardProps['request']>) => Promise<Item[]>
}

const props = defineProps<Props>()

const getLeftList = (data: Item[]) => {
  return (data || []).length === 5 ? data.slice(0, 1) : []
}
const getRightList = (data: Item[]) => {
  return (data || []).length === 5 ? data.slice(1) : data
}
</script>

<style scoped lang="scss">
* {
  box-sizing: border-box;
}
.content {
  display: flex;

  .row {
    display: flex;
    gap: 16rpx;
    flex-wrap: wrap;
  }
  .col-12 {
    width: 48%;
  }

  .item {
    border: 1rpx solid #e8e8e8;
    border-radius: 4rpx;
    padding: 16rpx;
    align-items: center;
    background-color: #fff;

    img {
      width: 24px;
      height: 24px;
    }
    .itemContent {
      .itemLabel {
        font-size: 20rpx;
        color: rgba(0, 0, 0, 0.65);
      }
      .itemValue {
        font-size: 24rpx;
        color: rgba(0, 0, 0, 0.85);
      }
      .itemUnit {
        font-size: 16rpx;
        margin-left: 4rpx;
        color: rgba(0, 0, 0, 0.65);
      }
    }
  }

  .left {
    width: 160rpx;
    margin-right: 16rpx;
    .item {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      img {
        margin-bottom: 16rpx;
      }
    }
  }

  .right {
    flex: 1;
    .item {
      display: flex;
      img {
        margin-right: 16rpx;
        vertical-align: middle;
      }
    }
  }
}
</style>
