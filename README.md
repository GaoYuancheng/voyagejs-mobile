## voyagejs 移动端组件库

#### 调试

创建组件库的 软链接到 目标库的目录下 确保两边修改同步

目标库 通过 修改 alias 来引用当前目录下的组件库

1. windows 下执行 （参考 scripts/link.bat）

   > cd ../ && mklink [对应目录] voyagejs-mobile

2. 修改 alias
   'voyagejs-mobile': path.resolve(\_\_dirname, './voyagejs-mobile')
