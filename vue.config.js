module.exports = {
  // 基本路径
  // publicPath: process.env.NODE_ENV === 'development' ? '/' : process.env.NODE_ENV === 'product' ? 'https://market.pd-unixe.com/index.php' : '',
  publicPath: '',
  // 输出文件目录
  outputDir: 'dist',
  // 静态资源打包地址
  assetsDir: './design',
  // 保存时是不是用eslint-loader 来lint 代码
  lintOnSave: true,
  indexPath: 'index.html',
  // 页面配置
  // pages: {
  //   index: {
  //     // 入口文件
  //     entry: './src/main.js',
  //     // 模版文件
  //     template: 'public/saas.html',
  //     // 输出文件名
  //     filename: 'saas.html'
  //   }
  // },
  devServer: {
  // 设置主机地址
    host: 'localhost',
    // 设置默认端口
    port: 8080,
    open: true,
    // 设置代理
    proxy: {
      '/': {
        // 目标 API 地址
        target: 'https://market.pd-unixe.com/index.php',
        // 如果要代理 websockets
        ws: false,
        // 将主机标头的原点更改为目标URL
        changeOrigin: true
      }
    }
  }
}
