const webpack = require('webpack')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const CompressionWebpackPlugin = require('compression-webpack-plugin');
// const productionGzipExtensions = ['js', 'css'];
// const env = process.env.NODE_ENV;

//打包报错console.log()
configureWebpack: (config) => {
  if (env !== 'development' || env !== 'test') {
    config.plugins.push(new CompressionWebpackPlugin({
      algorithm: 'gzip',
      test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
      threshold: 10240,
      minRatio: 0.8,
    }));
    config.plugins.push(
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_debugger: true, // console
            drop_console: true,   // 注释console
            // pure_funcs: ['console.log'] // 移除console
          },
        },
        sourceMap: false,
        parallel: true,
      }),
    );
  }

}
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
  //修复打包后白屏
  // publicPath: './',

  // 设置代理
  devServer: {
    proxy: {
      '/api': {
        target: 'http://116.63.180.133:8080/medical_waste-0.0.1', //接口域名
        changeOrigin: true,             //是否跨域
        // ws: true,                       //是否代理 websockets
        // secure: true,                   //是否https接口
        pathRewrite: {                  //路径重置
          '^/api': ''
        }
      }
    }
  }

}