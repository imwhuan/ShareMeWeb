module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '十二米👻'
        return args
      })
  },
  //配置Vue代理
  devServer:{
    port:'8080',
    proxy:{
      '/images':{
        target:'http://www.localcpu.love',
        // pathRewrite:{
        //   '^/images':''
        // }
      }
    }
  }
}