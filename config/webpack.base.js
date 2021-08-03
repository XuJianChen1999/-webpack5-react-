const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
        alias: {
            '@src': path.resolve('./src'),
            '@utils': path.resolve('./src/utils'),
            '@views': path.resolve('./src/views'),
            '@components': path.resolve('./src/components'),
        },
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                exclude: /node_modules/, // 屏蔽不需要处理的文件（文件夹）
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env', // 处理ES6新语法兼容              
                            {useBuiltIns: 'usage',corejs: 3}  // core-js处理ES6新API兼容
                        ],
                        '@babel/preset-react', // 处理React兼容性
                    ],
                    plugins: [
                        ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], // 处理antd样式   
                        '@babel/plugin-proposal-class-properties', // 处理类属性定义  
                    ],
                },
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'css/built.css'
        })
    ]
}