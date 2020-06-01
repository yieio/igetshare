module.exports = {
    chainWebpack: config => {
      config
      .plugin('html')
      .tap(args => {
        args[0].title = '学习分享'
        return args
      })
    }
  }