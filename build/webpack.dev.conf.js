/**
 * 开发环境配置
 */
const webpackBase = require('./webpack.base.conf')
    , webpack = require('webpack')
    , merge = require('webpack-merge')
    , path = require('path')

module.exports = merge(webpackBase, {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].bundle.js',
        //publicPath: './'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        host: "127.0.0.1",
        port: "8089",
        open: true,
        //overlay: true, // 浏览器页面上显示错误
        hot: true,       // 开启热更新
        hotOnly: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    performance: {
        hints: false
    }
})