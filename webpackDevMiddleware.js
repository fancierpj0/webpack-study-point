/**
 * mock的写法
 * 1. 在webpack中继承一个express服务器 webpack-dev-server
 * 2. 向下面这样，但是注意需要将config中的watch置为true
 */

//TODO 浏览器自动刷新

const express = require('express');
const morgan = require('morgan');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();

app.get('/api/user', function (req, res) {
  res.send('测试接口:/api/user');
});

app.use(morgan('dev'));

const webpackConfig = require('./webpack.config.js');
//将mode置为development
webpackConfig.mode = 'development';
//compiler，webpack开始运行时产出的对象，代表整个webpack编译
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler));

app.listen(3000);
