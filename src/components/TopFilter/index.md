---
group:
  title: uniapp-mobile-components
  order: 1
---

# TopFilter

## 介绍

- uniapp 移动端顶部筛选
- 内部提供多种表单类型 可单独使用

## 示例

<code src="./demos/Base.tsx" title="基础用法" ></code>

<code src="./demos/SingleFormItem.tsx" title="筛选项单独使用" ></code>

## API

| 参数          | 说明     | 类型           | 默认值 |
| ------------- | -------- | -------------- | ------ |
| initialValues | 初始值   | `any`          | -      |
| filterConfig  | 表单配置 | `FilterConfig` | -      |

### FilterConfig

| 参数         | 说明     | 类型                           | 默认值 |
| ------------ | -------- | ------------------------------ | ------ |
| mainSearch   | 主筛选   | `FilterItem[]` \| `MainSearch` | -      |
| sub          | 子筛选   | `FilterItem[]`                 | -      |
| organization | 组织筛选 | `FilterItem`                   | -      |
| dropdown     | 下拉筛选 | `FilterItem[]`                 | -      |

### FilterItem

#### 通用属性

| 参数        | 说明                                               | 类型                                                                                                                                               | 默认值 |
| ----------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| type        | 筛选类型                                           | `search` \| `input` \| `select` \| `date` \| `dateRange` \| <br> `member` \| `organization` \| `tags` \| `picker` \| <br>`pickerRange` \| `custom` | -      |
| name        | 表单名称                                           | `string`                                                                                                                                           | -      |
| label       | 组织筛选                                           | `string`                                                                                                                                           | -      |
| visible     | 是否隐藏                                           | `boolean`                                                                                                                                          | true   |
| valueEnum   | 组件列表                                           | `OptionItem[]`                                                                                                                                     | -      |
| fieldProps  | 表单项属性                                         | `Record<string,any>`                                                                                                                               | -      |
| fieldEvents | 表单项事件                                         | `Record<string, Function>`                                                                                                                         | -      |
| render      | 自定义表单组件 type 为 custom 时使用, 需要开启 tsx | `() => VNode`                                                                                                                                      | -      |

#### select

优先级为 options > valueEnum > request

| 参数      | 说明                         | 类型                                           | 默认值 |
| --------- | ---------------------------- | ---------------------------------------------- | ------ |
| valueEnum | value 键值对                 | `Record<string, any>`                          | -      |
| request   | 远程数据请求                 | `() => Promise<{label: string, value: any}[]>` | -      |
| options   | 下拉选项 Options             | `{label: string, value: any}[]`                | -      |
| showAll   | 下拉选中是否出现【全部】选项 | `boolean`                                      | true   |
