
const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  lintOnSave: false,
  outputDir: process.env.outputDir,
  configureWebpack: {
    resolve: {
      alias: {
        'common': resolve('src/common')  // 配置别名
      }
    },
    devServer: {
      port: 8080, // 端口号
      host: "0.0.0.0", // 可以用IP地址访问
      proxy: {
        '/api': {
          target: 'http://192.168.1.102:8888',  // 内网服务器的IP地址或者外网服务器域名
          changeOrigin: true
        }
      },
      before(app){

      }
    }
  }

}
