module.exports = {
  productionSourceMap: true,
  devServer: {
    host: "0.0.0.0",
    port: 2333,
    https: false,
    hotOnly: false,
    proxy: {
      "/chapterapi": {
        target: "http://chapterup.zhuishushenqi.com/chapter",
        changeOrigin: true,
        pathRewrite: {
          //需要rewrite重写的, 如果在服务器端做了处理则可以不要这段
          "^/chapterapi": ""
        }
      },
      "/api": {
        target: "http://api.zhuishushenqi.com",
        changeOrigin: true,
        pathRewrite: {
          //需要rewrite重写的, 如果在服务器端做了处理则可以不要这段
          "^/api": ""
        }
      }
    } // 设置代理
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
};
