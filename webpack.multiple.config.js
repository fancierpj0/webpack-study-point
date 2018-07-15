const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    pageA: './src/pageA'
    , pageB: './src/pageB'
  }

  , output: {
    path: path.resolve('dist')
    //这里的name是指entry的key值
    , filename: '[name].js'
  }

  , plugins: [
    new HtmlWebpackPlugin({
      template:'./src/index.html'
      ,filename:'pageA.html'
      //每个入口会将它自己和它的依赖打包成一个chunk
      ,chunks:['pageA']
    })
    ,new HtmlWebpackPlugin({
      template:'./src/index.html'
      ,filename:'pageB.html'
      ,chunks:['pageB']
    })
  ]
};
