const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//如果是同一个MiniCssExtractPlugin实例，那多个loader配置会打包到同一个css文件里
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//压缩js
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
//压缩css
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const bootstrapPath = path.resolve(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.css');

//两种导出方式
//module.exports
//module.exports = (env,argv)=>{}
//env环境变量 argv命令行参数对象
//argv.mode能拿到 "start": "webpack-dev-server --mode development" 中设置的mode
//另外也可以在各个模块中的process.env.NODE_ENV 拿到这个值
module.exports = (env, argv) => ({
  //最佳化，最优化
  optimization: {
    //minimize:使减少(或缩小)到最低限度，使减至最少，使缩到最小：
    minimizer: argv.mode == 'production' ? [
      new UglifyjsWebpackPlugin()
      , new OptimizeCssAssetsWebpackPlugin()
    ] : []
  },

  // entry: {main:'./src/index.js'}
  //main决定了[name]的值为main
  entry: './src/index.js'
  , output: {
    path: path.resolve(__dirname, 'dist')
    , filename: 'boundle-[hash].js'
    // 和每个loader里option的publicPath是一个意思，只是这里的是所有模块的路径都以'/'开头，而loader里的只是该loader接管的模块的路径
    // , publicPath: '/'
  }

  , resolve: {
    //指定extension之后可以不用在require或是import的时候加文件扩展名，会一次尝试添加扩展名进行匹配
    extensions: ['.js', '.jsx', '.json', '.css', '.less']

    //import 'bootstrap'(这里的bootstrap并不是写死的) 时其实是import bootstrapPath这个变量的值所表示的路径
    , alias: {
      bootstarp: bootstrapPath
    }

    //规定直接声明的模块(不是我们写的模块)的查找范围
    , modules: [
      path.resolve('node_modules')
      , path.resolve('src/loaders')
    ]

    //npm包查找是这样查找的
    //先在node_modules里找 文件夹 然后找package.json里main字段设置的 最后再找index.js，找不到就报错咯

    //配置package.json中的入口指向
    //现找style字段作为入口再找main字段作为入口
    //比如bootstrap的package.json中有一个style属性，这个属性就是css的路径位置，我们就可以这样设置
    // , mainFields: ['style','main']

    //配置package.json中main字段的值
    // , mainFiles: ['index','root']


    //上面是所有模块都遵循的，针对loader的查找，有单独的，字段都和外面是一样的
    // ,resolveLoaders:{
    //   modules:[]
    // }
  }

  //webpack-dev-server已经设置了如下
  // ,watch:true
  //只会分析entry依赖的
  // , watchOptions: {
  //   ignored:/node_modules/
  //   ,poll:1000 //一秒询问1000次
  //   ,aggregateTimeout:500 //500毫秒之内重复保存不会重新打包
  // }

  //内部就是使用express写的
  , devServer: {
    //静态文件根目录，从哪里找文件
    contentBase: './dist'
    , port: 8080
    , host: 'localhost'

    //多用于mock
    //本项目是http://localhost:8080，如果访问http://localhost:8080/api(api/user/xx/...也可以) 就会将请求转发给 http://localhost:3000/api
    // , proxy: {
    //   "/api":"http://localhost:3000"
    // }

    //本项目是http://localhost:8080，如果访问http://localhost:8080/api/user 就会将请求转发给 http://localhost:3000/user
    // , proxy: {
    //   "/api":{
    //     target:'http://localhost:3000'
    //     ,pathRewrite:{'^/api':""}
    //   }
    // }

    //app就是express的app,devServer内部使用的就是express
    // ,before(app){
    //   app.get('/api/users',(req,res)=>{
    //     res.send({id: 1, name: 'ahhh2'});
    //   })
    // }
  }

  , module: {
    //如果说这个模块不需要解析↓
    noParse: /jquery|loadash/
    //或则这么写
    // noParse(content){
    //   retrun noParse:/jquery|loadash/.test(content);
    // }
    //使用noParse进行忽略的模块文件中不能使用important、require、define等浏览器不能直接识别的导入机制，否则浏览器会报错

    , rules: [
      {
        test: /\.jsx?$/
        , use: [{
          loader: 'babel-loader'
          , options: {
            presets: ['env', 'stage-0', 'react']
            ,plugins:['transform-decorator-legacy']
          }
        }]
        , include: path.resolve(__dirname, 'src')

        //如果是css就不要排除掉，因为需要css-loader来解析第三方库的css引用路径
        , exclude: /node_modules/
      }

      , {
        test: /\.css$/

        //use从右往左执行
        //css-loader解析处理css引入的路径(url，背景图啊，外链的一些css文件啊)
        //style-loader用来把CSS代码转换成JS代码，在指定的时候会向页面中注入一个style标签
        , use: [{
          // loader:'style-loader'
          loader: MiniCssExtractPlugin.loader
          , options: {
            //在<header>底部插入还是顶部插入,默认是底部
            insertAt: 'top'
          }
        }, 'css-loader', 'postcss-loader']
        //等同于use，以前叫loader，现在推荐使用use
        // ,loader:['style-loader','css-loader']
      }

      , {
        test: /\.scss/
        , use: [{
          loader: MiniCssExtractPlugin.loader
          , options: {
            insertAt: 'top'
          }
        }, 'css-loader', 'sass-loader']
      }

      , {
        test: /\.less/
        , use: [{
          loader: MiniCssExtractPlugin.loader
          , options: {
            insertAt: 'top'
          }
        }, 'css-loader', 'less-loader']
      }

      , {
        test: /\.(gif|jpg|jpeg|png|bmp|eot|woff|woff2|ttf|svg)$/
        , use: [
          {
            loader: 'url-loader'
            , options: {
              limit: 4096
              , outputPath: 'images'
              , publicPath: '/images'
            }
          }
        ]
      }

      , {
        test: /\.html/
        , use: 'html-withimg-loader'
      }
    ]
  }

  , plugins: [
    new HtmlWebpackPlugin({
      //模板位置
      template: './src/index.html'
      //打包后的名字
      , filename: 'index.html'
      //压缩
      , minify: {
        //删除属性的双引号
        removeAttributeQuotes: true
      }
      //防止缓存
      , hash: true
    })

    , new MiniCssExtractPlugin({
      //[name]是entry的名字，默认为main
      filename: 'css/[name]-[hash].css'
    })

    //在打包的文件顶部插入文字
    , new webpack.BannerPlugin('ahhh')

    //创建一些全局常量,在所有模块中可使用
    , new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false)
      , VERSITION: "1" //使用时会得到数字 1
      , EXPRESSION: "1+2" // 使用时会得到  3，故需要stringify
      , COPYRIGHT: {
        AUTHOR: JSON.stringify('ahhhx5')
      }
    })

    //忽略moment文件夹下local文件夹
    // , new webpack.IgnorePlugin(/^\.\/local/,/moment$/)

    // , new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, 'src/assets')
    //     , to: path.resolve(__dirname, 'dist/')
    //   }
    // ])

    // , new CleanWebpackPlugin([path.resolve(__dirname, 'dist')])

    // ,new webpack.ProvidePlugin({
    //   //将lodash模块赋给_，这样我们在每个模块中都无需再手动引用lodash(import _ from 'lodash')
    //   //注意，这并不是设置在全局上的全局变量，只是webpack帮我们在每个需要的模块中都注入了import而已
    //   "_":"lodash"
    // })

    //如果你有一个第三方的插件，依赖全局对象下的属性，比如
    //jqueryui 它会依赖 window.jQuery
    //npm i expose-loader -D
    //使用见index.js

    //如果我们想引用一个库，但是又不想让webpack打包，并且又不影响我们在程序中以CMD、AMD或则window/global全局等方式进行使用，那就可以通过配置externals来实现
    //比如：通过加载CDN来引入第三方库
    // <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.js"></script>
  ]

  , externals: {
    //这个大写的jQuery是引入CDN注入的全局对象的名字(window.jQuery)
    //jquery是我们在模块中import $ from 'jquery'的jquery
    jquery: 'jQuery'
  }

  // , devtool: 'source-map' //在单独的文件中生成，可以映射到列
  // , devtool: 'cheap-module-source-map' //在单独的文件中生成（每个打包出来的css或则js文件都有一个），不能映射到列
  // , devtool: 'eval-source-map' //在打包的文件中生成，可以映射到列
  , devtool: 'cheap-module-eval-source-map' //在打包的文件中生成，不能映射到列
});
