//TODO 项目不是灰常大那种。。。反而更慢

const path = require('path');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
const HappyPack = require('happypack')

module.exports = {
  entry: './scr/testdll.js'

  , output: {
    path: path.resolve('dist')
    , filename: 'bundle.js'
  }

  ,module:{
    rules:[
      {
        test:/\.jsx?$/
        //id对应下面 new HappyPack时的 id
        ,use:[{loader:'happypack/loader?id=babel'}]
      }
      ,{
        test:/\.css?$/
        ,user:[{loader:'happypack/loader?id=css'}]
      }
    ]
  }

  ,plugins:[
    new DllReferencePlugin({
      manifest:path.resolve(__dirname,'dist/react.manifest.json')
    })

    ,new HappyPack({
      id:'babel'
      , use:[
        {
          loader: 'babel-loader'
          , options: {
            presets: ['env', 'stage-0', 'react']
            ,plugins:['transform-decorator-legacy']
          }
      }]
    })

    ,new HappyPack({
      id:'css'
      , use:['style-loader','css-loader']
      ,threads:3 //代表开启几个子进程去处理这一类型的文件
    })
  ]
};
