---
title: 如何使用tsx
---

```
1. 使用时 先修改 build\index.js 使其支持 tsx/jsx
+ import vueJsx from '@vitejs/plugin-vue-jsx'
-  const plugins = [uni()]
+ const plugins = [uni(), vueJsx()]

2. 对应组件中 lang="ts" => lang="tsx"

3. tsconfig.json 中添加
  "compilerOptions": {
    ...,
    "jsx": "preserve",
    "jsxImportSource": "vue",
  }

```
