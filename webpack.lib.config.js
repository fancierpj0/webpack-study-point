const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// module.exports = {
//   entry: './src/ilib.js'
//   , output: {
//     path: path.resolve('dist')
//     , filename: 'bound.js'
//
//     //决定导出方式 是以var变量导出，还是exports对象,还是挂载在window上什么的
//     , libraryTarget: 'var' //打包出来的模块是以var导出的 var ahhh = ...，可以直接在全局使用
//     // , libraryTarget: 'commonjs' //exports['ahhh'] = ....
//     // , libraryTarget: 'commonjs2' //module.exports = ....
//     // , libraryTarget: 'this' //this.ahhh = ...，如果在node中用指向模块，如果是浏览器指向window
//     // , libraryTarget: 'window' //window.ahhh = ... ，和var差不多
//     // , libraryTarget: 'global' //global.ahhh = ...
//
//     , library: 'ahhh' //设置var的变量名 var ahhh = ....
//   }
// };

module.exports = {
  entry: {
    react: ['react', 'react-dom']
  }

  , output: {
    path: path.resolve('dist')
    , filename: '[name]_dll.js'
    //libraryTarget 默认就为var
    , library: '_dll_[name]' //var _dll_react = xx
  }

  ,plugins:[

    //生成一个.manifest.json文件,DllReferencePlugin时会用到
    new DllPlugin({
      //这个name必须和ouput时设置的library字段的值一样
      name:'_dll_[name]' //manifest.json中就会有_dll_react这个字段
      ,path:path.resolve(__dirname,'dist','[name].manifest.json')
    })

    ,new CleanWebpackPlugin([path.resolve(__dirname,'dist')])
  ]
};
