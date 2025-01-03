import { defineConfig } from 'dumi';

const { NODE_ENV } = process.env;
//development
//production

const pathPrefix = NODE_ENV === 'production' ? '/gyc-components/' : '/';
// const pathPrefix = '/gyc-components/';

export default defineConfig({
  outputPath: 'docs-dist',
  publicPath: `${pathPrefix}`,
  base: `${pathPrefix}`,
  resolve: {
    atomDirs: [
      { type: 'components', dir: 'src/components' },
      { type: 'tools', dir: 'src/tools' },
      { type: 'hooks', dir: 'src/hooks' },
    ],
  },
  themeConfig: {
    name: 'gyc-components',
    nav: [
      { title: '介绍', link: '/guide' },
      { title: '组件', link: '/components/foo' }, // components会默认自动对应到src文件夹
      { title: 'hooks', link: '/hooks/use-hook1' }, // components会默认自动对应到src文件夹
      { title: 'tools', link: '/tools/tool1' }, // components会默认自动对应到src文件夹
    ],
  },
  styles: [
    `.dumi-default-header-left {
       width: 300px !important;
    }`,
  ],
});
