const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  //项目打包后白屏问题
  publicPath: '/',
  devServer: {
    //项目的端口号
    port: 8080,
    //主机名称
    host: "localhost",
    //是否自动打开浏览器
    open: true,
    //是否开启https
    https: false,
    //配置跨域
    proxy: { //在 devServer 对象里设置跨域
      // [process.env.VUE_APP_BASE_API]: {
      //   target: process.env.VUE_APP_BASE_URL,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     ["^" + process.env.VUE_APP_BASE_API]: ''
      //   }
      // }
      '/dev-api': { // 代理标识, 如果出现了这个就代表需要代理
        //跨域地址
        target: 'http://localhost:3000/',
        // 开启跨越
        changeOrigin: true,
        pathRewrite: {
          '^/dev-api': '' // 重写路由, 把想替换掉的路由地址替换为空或者别的
        }
      }
    },
  },
  //关闭eslint
  lintOnSave: false
});
