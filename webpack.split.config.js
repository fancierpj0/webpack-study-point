const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    pageA: './src/pageA'
    , pageB: './src/pageB'
    , pageC: './src/pageC'
  }

  , output: {
    path: path.resolve(__dirname, 'dist')
    , filename: '[name].js'
  }

  , optimization: {
    //分隔代码块
    splitChunks: {
      cacheGroups:{
        //TODO 生成文件查看图例
        //因为minChunk为2,故被引用两次以上的都会被抽离成一个文件
        //命名为 commons~引用该文件的文件名~引用该文件的文件名2...
        commons:{
          chunks:'initial'
          ,minChunks:2 //重复两次才提取
          ,minSize:0 //大小大于0才提取
        }
        ,vendor:{
          test:/node_modules/
          ,chunks:'initial'
          ,name:'vendor'
        }
      }
    }
  }

  , plugins: [
    new HtmlWebpackPlugin({
      //模板位置
      template: './src/index.html'
      //打包后的名字
      , filename: 'pageA.html'
      ,chunks:['pageA']
    })
    ,new HtmlWebpackPlugin({
      //模板位置
      template: './src/index.html'
      //打包后的名字
      , filename: 'pageB.html'
      ,chunks:['pageB']
    })
    ,new HtmlWebpackPlugin({
      //模板位置
      template: './src/index.html'
      //打包后的名字
      , filename: 'pageC.html'
      ,chunks:['pageC']
    })
  ]
}
