const webpack = require('webpack')

module.exports = {
  configureWebpack: {
    plugins: [
      // 支持 jquery
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ],
  },

  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true);

  },

  devServer: {
    proxy: {
      '/api': {
        target: 'http://116.63.180.133:8080/medical_waste-0.0.1', //接口域名
        changeOrigin: true,             //是否跨域
        ws: true,                       //是否代理 websockets
        secure: true,                   //是否https接口
        pathRewrite: {                  //路径重置
          '^/api': ''
        }
      }
    }
  }

}