const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
const webpackConfigBase = require('./webpack.base.conf');
const webpackConfigDev = {
    mode: 'development', // 通过 mode 声明开发环境
    output: {
        path: path.resolve(__dirname, '../dist'),
        // 打包多出口文件
        // 生成 a.bundle.js  b.bundle.js
        filename: './js/[name].bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, "../src"),
        publicPath:'/',
        host: "localhost",
        port: "8089",
        overlay: true, // 浏览器页面上显示错误
        open: true, // 开启浏览器
        proxy: {
            '/api': {
                target: "http://helper.test-mmsay.com",
                changeOrigin: true
            }
        }
    },
    plugins: [
        //热更新
        new webpack.HotModuleReplacementPlugin(),
    ],
    // devtool: "source-map",  // 开启调试模式
    module: {
        rules: []
    },
}
module.exports = merge(webpackConfigBase, webpackConfigDev);