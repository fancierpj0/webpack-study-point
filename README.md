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

## FAQ
1. 动态链接库 适合 在生产环境中使用不？

2. 如何让热加载支持react/vue
