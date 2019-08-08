![![image]](https://github.com/MMS-Daniel/Webpack4Start/raw/master/src/images/logo.jpg)

webpack4 多入口，多页面项目构建案例。
=====================================

webpack4搭建纯静态页面型前端工程解决方案
- ES6语法转译
- 按需加载模块，按需进行懒加载，在实际用到某些模块的时候再增量更新
- 多入口文件，自动扫描入口。同时支持SPA和多页面型的项目
- 静态资源按需自动注入到html中，并可自动加上hash值
- 支持js、css、scss等代码检查 兼容、打包、压缩混淆、图片转base64等
- 组件抽离打公共的bundle文件


## 安装依赖 ##

  $ cd webpack-jquery
	$ npm install

## 目录结构 ##

``` js
    .
    ├── .babelrc    # babel配置
    ├── package.json              # 项目配置
    ├── README.md                 # 项目说明
    ├── build                     # 配置规则
    │   ├── create.js                   # 动态创建Node语法
    │   ├── webpack.base.conf.js        # 工程基础配置
    │   ├── webpack.dev.conf.js         # 开发环境webpack配置入口
    │   ├── webpack.prod.conf.js        # 生产环境webpack配置入口
    │   ├── webpack.rules.conf.js       # 打包规则配置
    ├── src                       # 源码目录
    │   ├── assets/                # 公共静态资源 不会进行压缩
    │   │   ├── css/            # 公共样式
    │   │   │   ├── common.css            # 样式文件例子
    │   ├── fonts/                # 字体文件
    │   ├── images/               # 图片资源
    │   ├── js                    # js资源
    │   │   ├── api.js              # 基于Axios封装的接口文件
    │   │   ├── mobile.js           # 移动端rem计算js
    │   ├── page/               #页面文件
    ├── postcss.config.js              #CSS自动兼容配置

```

## 配置页面 ##

    动态添加入口，自动化配置页面 page为页面名称 会自动加入js/sass/html文件
    npm run c page
#


## 编译（测试/dev环境） ##

    $ npm run dev

## 编译（生产环境） ##

生产环境会对js混淆压缩，对css、html进行压缩，字符替换等处理

    $ npm run build

You can build projects directly for development. If you can help, please click Star.
--------------------------------------------------------------------------------------