---
group:
  title: uniapp-mobile-components
  order: 1
---

# ScrollViewPage

## 介绍

- uniapp 移动端页面级组件
- 内部使用 TopFilter 和 ScrollView
- 快速构建卡片列表页面

## 示例

<code src="./demos/Base.tsx" title="基础用法" ></code>

## API

| 参数            | 说明                                                     | 类型                                                                                  | 默认值 |
| --------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------ |
| filterProps     | 头部筛选 同 [TopFilterProps](/components/top-filter#api) | `string`                                                                              | `{}`   |
| request         | 列表请求 同 scrollList request                           | `(pageInfo, params) => `<br>`Promise<{pages?: number,total: number,dataList: any[]}>` | -      |
| cardConfig      | 卡片内容配置                                             |                                                                                       | -      |
| scrollViewProps | [ScrollViewProps](/components/scroll-view#api)           |                                                                                       | -      |
| @filterChange   | 筛选改变回调                                             | `(values: any) => void`                                                               | -      |

### CardConfig

```tsx | pure
interface ItemProps {
  type: 'text' | 'tag' | 'button' | 'badge' | 'custom'
  style?: CSSProperties
  badgeProps?: {
    iconColor?: string
  }
  buttonProps?: {
    type: string
  }
  onClick?: (item: ItemProps) => void
  valueKey?: string
  visible?: boolean | ((data: any) => boolean)
  text?: string | ((data: any) => string)
  options?: {
    label: string
    value: string
  }[]
  label?: string
  tagProps?: {
    type: string
  }
  confirmText?: string
  data?: any
  render?: any
}

interface CardConfig {
  header?: {
    titleList?: ItemProps[]
    extraList?: ItemProps[]
  }
  body?: {
    list?: ItemProps[]
  }
  footer?: {
    list?: ItemProps[]
  }
}
```
