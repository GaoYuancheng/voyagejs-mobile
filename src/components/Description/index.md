---
group:
  title: uniapp-mobile-components
  order: 1
---

# Description

## 介绍

- uniapp 移动端详情页组件
- 支持文件列表展示

## 示例

<code src="./demos/Base.tsx" title="基础用法" ></code>

## API

| 参数       | 说明         | 类型                    | 默认值 |
| ---------- | ------------ | ----------------------- | ------ |
| title      | 标题         | `string`                | -      |
| extra      | 标题右侧区域 | `string`                | -      |
| items      | 详情项       | `DescriptionItemType[]` | -      |
| valueCol   | col          | `DescriptionItemType`   | -      |
| valueStyle | value 样式   | `CSSProperties`         | -      |
| labelCol   | col          | `DescriptionItemType`   | -      |
| labelStyle | value 样式   | `CSSProperties`         | -      |

### DescriptionItemType

#### 通用属性

| 参数       | 说明       | 类型                       | 默认值 |
| ---------- | ---------- | -------------------------- | ------ |
| label      | 名称       | `string`                   | -      |
| type       | 类型       | `info \| file \| checkbox` | info   |
| value      | 值         | `string`                   | -      |
| visible    | 是否隐藏   | `boolean`                  | false  |
| onClick    | 点击事件   | `DescriptionItemType`      | -      |
| valueCol   | col        | `DescriptionItemType`      | -      |
| valueStyle | value 样式 | `CSSProperties`            | -      |
| labelCol   | col        | `DescriptionItemType`      | -      |
| labelStyle | value 样式 | `CSSProperties`            | -      |

#### type file 独有属性

| 参数     | 说明       | 类型                                                                                                                 | 默认值 |
| -------- | ---------- | -------------------------------------------------------------------------------------------------------------------- | ------ |
| fileInfo | 文件信息   | `{fileName: string, fileUrl: string,`<br> `fileSize: number \| {fileSize: number, unit: string, finalUnit: string}}` | -      |
| actions  | 操作区设置 | `info \| file \| checkbox`                                                                                           | info   |

actions 可以简写 ['download', 'preview'] 也可以细化配置

```ts
type Actions =
  | {
      /** 点击事件 */
      onClick: (item: DescriptionItemType['fileInfo']) => void
      /** 同u-icon的name */
      icon?: string
      /** 按钮文字 */
      text?: string
      /** 按钮样式 */
      style?: CSSProperties
      /** 内置类型 */
      type?: 'download' | 'preview'
    }[]
  | ('download' | 'preview')[]
```
