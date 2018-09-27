const ExtractTextPlugin = require('extract-text-webpack-plugin')
    , MiniCssExtractPlugin = require("mini-css-extract-plugin")
    , env = process.env.NODE_ENV === "development"
    , path = require('path')

const rules = [
    {
        test: /\.js$/,
        use: ['babel-loader'],
    },
    {
        test: /\.(css|scss|sass)$/,
        use: () => {
            let use = ['css-loader', 'sass-loader', 'postcss-loader']
            return env ? ['style-loader', ...use] : [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../',
                        minimize:true
                    },
                },
                ...use,
            ]
        }
        // use: () => {
        //     let use = ['css-loader', 'sass-loader', 'postcss-loader']
        //     return env ? ['style-loader', ...use] : ExtractTextPlugin.extract({
        //         fallback: "style-loader",
        //         use,
        //         //css文件中的基础路径
        //         publicPath: "../"
        //     })
        // }
    },
    {
        //需要安装url-loader和file-loader
        test: /\.(png|jpg|gif|svg)$/,
        use: [{
            loader: 'url-loader',
            options: {
                limit: 1024 * 5, //小于5k转base64
                name: 'imgs/[name].[ext]'
            }
        }]
    },
    {
        //处理html页面上的img标签
        test: /\.html$/,
        use: ["html-withimg-loader"]
    },
    {
        //处理svg等矢量图标 
        test: /\.(ttf|eot|svg|woff|otf||woff2)(\?[\s\S]+)?$/,
        loader: 'file-loader',
        query: {
            limit: 1024 * 5,
            name: 'font/[name].[ext]'
        }
    }
]

module.exports = rules
