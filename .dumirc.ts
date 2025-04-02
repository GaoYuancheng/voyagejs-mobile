import { defineConfig } from 'dumi'
import { getDemos } from './utils/getDemos'

const { NODE_ENV } = process.env
//development
//production

const pathPrefix = NODE_ENV === 'production' ? '/voyagejs-mobile/' : '/'
// const pathPrefix = '/gyc-components/';

const demos = getDemos()

export default defineConfig({
  outputPath: 'docs-dist',
  publicPath: `${pathPrefix}`,

  base: `${pathPrefix}`,
  resolve: {
    atomDirs: [
      { type: 'components', dir: 'src/components' },
      { type: 'others', dir: 'src/others' }
      // { type: 'hooks', dir: 'src/hooks' }
    ]
  },
  themeConfig: {
    name: 'gyc-components',
    nav: [
      { title: '介绍', link: '/guide' },
      { title: '组件', link: '/components/scroll-view-page' }, // components会默认自动对应到src文件夹
      { title: '其他', link: '/others/how-to-use-tsx' } // components会默认自动对应到src文件夹
      // { title: 'tools', link: '/tools/tool1' } // components会默认自动对应到src文件夹
    ]
  },
  styles: [
    `.dumi-default-header-left {
       width: 300px !important;
    }`
  ],
  define: {
    DEMOS: demos
  }
})
