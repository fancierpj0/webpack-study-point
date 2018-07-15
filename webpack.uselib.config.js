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
    ]
  }

  ,plugins:[
    new DllReferencePlugin({
      manifest:path.resolve(__dirname,'dist/react.manifest.json')
    })
  ]
};
