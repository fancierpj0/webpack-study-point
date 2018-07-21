## pre

Chunk：代码块
一个Chunk由多个模块组合而成，用于代码合并与分割

Webpack启动后会从 `Entry` 里配置的 `Module` 开始递归解析 Entry 依赖的所有 Module。每找到一个Module，就会根据配置的 `Loader` 去找出对应的转化规则，对 **Module** 进行转换后，再解析出当前的 **Module** 依赖的 **Module**。这些模块会以 **Entry** 为单位进行分组，一个 **Entry** 和其所有依赖的 **Module** 被分到一个组也就是一个 `Chunk`。 最后 **Webpack** 会把所有 **Chunk** 转换成文件输出。 在整个流程中 **Webpack** 会在恰当的时机执行 **Plugin** 里定义的逻辑。

## loader
模块代码转换的工作由loader来处理

## plugin
除了模块转化的工作

## 与webpack有关的各个包的作用
webpack 不安装webpack-cli，只能被require作为一个包来使用

webpack-cli 让webpack能在命令行中使用

webpack-dev-server 让webpack自动编译和刷新浏览器，由express编写

## 4.x自带功能
### mode
- `--production`：production的配置
- `--development`：development的配置
- `--none`：没有配置

```
(env,argv)=>{
  return argv.mode === 'development'?
    devConfig
    :proConfig
}
```
### tree shaking
4.x自带js tree shaking，包裹需要babel对es6的转译关闭
```
presets:[['env',{modules:false}],...]
```
### scope hoisting
4.x自带

功能如下
```
//xx.js
export default var name = hello;
//other.js
import name from './xx';

console.log(name);

//↓↓↓

console.log('hello');
```
### splitChunks

#### 配置项
```
,splitChunks:{
//cacheGroup里的key等同于这里的name
name:true

// 最小尺寸必须大于此值，默认30000B
// ,minSize:0

// 其他entry引用次数大于此值，默认1
// ,minChunks:1

//优先级，多个分组冲突时决定把代码放在哪块，是个数值，支持负数
// ,priority:1

//entry文件请求的chunks不应该超过此值
// ,maxInitialRequests:5

//异步请求的chunks不应该超过此值
// ,maxAsyncRequests:5

//自动命名连接符
// ,automaticNameDelimiter:'~'

//表示可以使用已经存在的块，即如果满足条件的块已经存在就使用已有的，不再创建一个新的块
// ,reuseExistingChunk:true

//cacheGroup
//之所以叫cacheGroup
//，是因为和浏览器缓存相关
// ，cacheGroups里抽离出来的代码应该是不经常变更的那种代码，这样就能放心享受浏览器缓存机制带来的福利
  ,cacheGroups:{
    preact:{

      test:/preact/

      //值为"initial", "async"（默认） 或 "all"
      //1. initial 入口chunk，对于异步导入的文件不处理
      //2. async 异步chunk，只对异步导入的文件处理（个人理解）
      //3. all 皆可
      ,chunks:'initial'
    }
  }
}
```
#### 其它注意事项
- cacheGroups 会继承和覆盖splitChunks的配置项，但是test、priorty和reuseExistingChunk只能用于配置缓存组。。
- cacheGroups 里的每一项最好都要加上chunks参数，不然可能打包不出来你想要的东西。
- minSize 默认是30KB（注意这个体积是压缩之前的）在小于30kb的情况下一定要设置一个值，否则也可能打包不出来你想要的东西，而且这东西要加在cacheGroups里面。
- priority 在某些情况下，还是挺有用的，可以设置打包chunks的优先级。

#### 【备忘】production模式下 splitChunksの默认配置
```
splitChunks: {
    chunks: "async",
    minSize: 30000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    automaticNameDelimiter: '~',
    name: true,
    cacheGroups: {
        vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
        },
        default: {//cacheGroups重写继承配置，设为false不继承
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
        }
    }
}
```
## FAQ
1. 动态链接库 适合 在生产环境中使用不？
可

2. 如何让热加载支持react/vue

3. types -> ArrowFunctionExpression 这种怎么来的 可以自定义吗
