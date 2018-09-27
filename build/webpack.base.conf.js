const rules = require('./webpack.rules.conf')
    , path = require('path')
    , webpack = require('webpack')
    , glob = require('glob')
    , HtmlWebpackPlugin = require('html-webpack-plugin')
    , PurifyCSSPlugin = require('purifycss-webpack')
    , env = process.env.NODE_ENV === "development"
    , OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')
    , CopyWebpackPlugin = require("copy-webpack-plugin")

const htmls = [{
    title: '首页',
    name: 'index',
    chunks: ['index','vendor','common']
}, {
    title: '新闻',
    name: 'news',
    chunks: ['news','vendor','common']
}]

const getHtmlConfig = ({ title, name, chunks }) => new HtmlWebpackPlugin({
    filename: `${name}.html`,
    template: `./src/pages/${name}/index.html`,
    title,
    chunks,
    hash: true,
    // minify: env ? false : {
    //     removeComments: true,        //移除HTML中的注释
    //     collapseWhitespace: true,    //压缩代码
    //     removeAttributeQuotes: true, //去除属性引用
    // }
})

module.exports = {
    entry: {
        index: './src/pages/index/index.js',
        news: './src/pages/news/index.js'
    },
    module: {
        rules: [...rules]
    },
    plugins: [
        // //清除冗余CSS
        // new PurifyCSSPlugin({
        //     paths: glob.sync(path.join(__dirname, "../src/pages/*/*.html")),
        // })
        // new CopyWebpackPlugin([{
        //     from: path.resolve(__dirname, "../src/assets"),
        //     to: './assets',
        //     ignore: ['.*']
        // }]),
    ],
    optimization: {
        //minimize: env ? false : false, //是否进行代码压缩
        minimizer:[
            // 用于优化css文件
            new OptimizeCssPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessorOptions: {
                    safe: true,
                    autoprefixer: { disable: true }, // 这里是个大坑，稍后会提到
                    mergeLonghand: false,
                    discardComments: {
                        removeAll: true // 移除注释
                    }
                },
                canPrint: true
            })
        ],
        splitChunks: {
            chunks: "async",       //表示显示块的范围：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
            minChunks: 2,          //代码出现2次就会被抽离到公共模块，如果设置为1，将重复提取相同代码
            minSize: 30000,        //模块大于30k会被抽离到公共模块
            maxAsyncRequests: 5,   //异步模块，一次最多只能被加载5个
            maxInitialRequests: 3, //入口模块最多只能加载3个
            name: true,
            cacheGroups: {
                //第三方插件
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    priority: 10
                },
                //公共JS和CSS
                common: {
                    test: /\.(js|scss)$/,
                    name: "common",
                    chunks: "all",
                    minSize: 1,
                    priority: 1
                },
            }
        }
    },
    //不需要打包的库
    externals: {
        'jquery': 'window.jQuery'
    },
    resolve: {
        //模块引入时可省略后缀
        extensions: ['.js', '.scss', '.json'],
        //设置文件夹别名
        alias: {
            '@': path.resolve(__dirname, '../src'),
            '@assets': '@/assets',
            '@pages': '@/pages'
        }
    },
    //不显示打包时的警告提示
    performance: {
        hints: false
    }
}

htmls.forEach((html) => module.exports.plugins.push(getHtmlConfig(html)))