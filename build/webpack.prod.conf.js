/**
 * 生产环境配置
 * 
 */
const path = require('path')
    , webpackBase = require('./webpack.base.conf')
    , merge = require('webpack-merge')
    , ExtractTextPlugin = require('extract-text-webpack-plugin')
    , OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')
    , CleanWebpackPlugin = require('clean-webpack-plugin')
    , MiniCssExtractPlugin = require("mini-css-extract-plugin")
    , UglifyJsPlugin = require('uglifyjs-webpack-plugin')
    , glob = require('glob')
    , BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    , PurifyCSSPlugin = require('purifycss-webpack')
    , webpack = require('webpack')

const webpackConfig = merge(webpackBase, {
    mode: 'production',   //生产环境
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].js?[hash:8]',
        publicPath: './'
    },
    plugins: [
        //删除dist(需要放在插件列表前面)
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../'),
            verbose: false,  //开启在控制台输出信息
            dry: false       //启用删除文件 
        }),
        //提取CSS
        // new ExtractTextPlugin({
        //     filename: "css/[name].css?[hash:8]"
        // }),
        //CSS分离
        new MiniCssExtractPlugin({
            filename: "css/[name].css?[hash:8]"
        }),
        //消除冗余Class
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, "../src/pages/*/*.html"))
        }),
        //new BundleAnalyzerPlugin()
    ]
})

module.exports = webpackConfig