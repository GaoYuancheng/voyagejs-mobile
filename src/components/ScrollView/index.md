---
group:
  title: uniapp-mobile-components
  order: 1
---

# ScrollView

## 介绍

- uniapp 移动端列表组件
- 自带分页滚动逻辑 支持上拉加载更多 下拉刷新
- 内部组件自定义
- 支持开启选择模式

## 示例

<code src="./demos/Base.tsx" title="基础用法"></code>
<code src="./demos/SelectedMode.tsx" title="选择模式"></code>

## API

| 参数                 | 说明                                        | 类型                                                                                  | 默认值 |
| -------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------- | ------ |
| height               | 高度                                        | `string`                                                                              | 100%   |
| rowKey               | 每行数据的 key                              | `string`                                                                              | `id`   |
| request              | 列表请求                                    | `(pageInfo, params) =>` <br>`Promise<{pages?: number,total: number,dataList: any[]}>` | -      |
| params               | 筛选参数 会带到 request 中 改变后会重新请求 | `Record<string, any>`                                                                 | `{}`   |
| options              | 其他配置项                                  | `Options`                                                                             | -      |
| rowSelection         | 开启选中                                    | `RowSelection`                                                                        | -      |
| v-model:selectedKeys | 选中的值                                    | `any[]`                                                                               | -      |

### RowSelection 开启选中

| 参数     | 说明         | 类型                                                 | 默认值   |
| -------- | ------------ | ---------------------------------------------------- | -------- |
| type     | 多选 \| 单选 | `single` \| `multiple`                               | `single` |
| onChange | 多选 \| 单选 | `(selectedRowKeys: any, selectedRows: any) => void}` | -        |

### Options

| 参数            | 说明          | 类型     | 默认值 |
| --------------- | ------------- | -------- | ------ |
| defaultPageSize | 默认 pageSize | `number` | 10     |
