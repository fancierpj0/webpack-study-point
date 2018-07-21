// import name from './name';
// import './index.css'
//如果使用下面这样引用，就无需在配置文件中统一配置loader
//!用来分隔loader
// import 'style-loader!css-loader!./index.css'
// import './testLess';
// import './testSass.scss';

//在resolve中配置了alias
// import 'bootstarp';

//?后是传参，expose-loader?jQuery!jquery，意思是window.jQuery = jquery
// require('expose-loader?jQuery!jquery');

// import jQuery from 'jquery';

if(1){
  console.log(123)
}

import moment from 'moment';

import log from './log';

// console.log('_:', _);
//直接通过CDN引用这里是能拿到的，但为了语法上更严谨（这里看不到我们引用了$）
// console.log('jQuery:', jQuery);
// alert(name);

//TODO url-loader
//有可能返回一个新的文件路径，也可能返回一个base64图片编码
//新的路径是相对于输出目录的路径（已经转换好的路径）
import logo from './images/logo.gif';

// let img = new Image();
// img.src = logo;
// document.body.appendChild(img);



// console.log('PRODUCTION:', PRODUCTION);
// console.log('VERSITION:', VERSITION);
// console.log('EXPRESSION:', EXPRESSION);
// console.log('COPYRIGHT:', COPYRIGHT);

// if (PRODUCTION) {
//
// } else {
//   console.log('我只会在开发环境打印日志')
// }

// log('我只会在开发环境打印日志');



// console.log(moment());



// document.querySelector('#play').addEventListener('mouseover', () => {
//   import('./video').then(video => {
//     console.log(video);
//   });
// });

