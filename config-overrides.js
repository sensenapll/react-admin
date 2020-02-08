const {
  override,
  fixBabelImports,
  addLessLoader,
  addDecoratorsLegacy,
  addWebpackAlias
} = require('customize-cra');

// 按需加载
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    // style: 'css',
    style: true,
  }),
  //   自定义主题
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#1DA57A'
    },
  }),
  //  ES7装饰器语法兼容
  // @babel/plugin-proposal-decorators
  addDecoratorsLegacy(),

  //  配置webpack路径名
  addWebpackAlias({
    // '$comp': resolve(__dirname, './src/Components'),
    // '$cont': resolve(__dirname, './src/containers'),
    // '$api': resolve(__dirname, './src/api'),
    // '$utils': resolve(__dirname, './src/utils'),
    // 'conf': resolve(__dirname, './src/config'),
    // 'redux': resolve(__dirname, './src/redux'),
  })
);