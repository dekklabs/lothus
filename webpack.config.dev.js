const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");

const devMode = true;

const URL = "https://lothus.dev";

module.exports = {
    entry: [
        'webpack-dev-server/client?' + URL + ':5001',
        './src/index.ts'
    ],
    output: {
        filename: 'bundle.js',
        chunkFilename: '[chunkhash:6].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: URL + ':5001/'
    },
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(scss|sass)$/,
                exclude: /module\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        context: path.resolve(__dirname, "src/"),
                        outputPath: '/images/',
                        publicPath: URL + ':5001/images/',
                        useRelativePaths: true
                    },
                }, ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        context: path.resolve(__dirname, "src/"),
                        outputPath: '/fonts/',
                        publicPath: URL + ':5001/fonts/',
                        useRelativePaths: true
                    }
                }]
            },
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        publicPath: URL + ':5001/',
        port: 3001,
        hot: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,OPTIONS,HEAD,PUT,POST,DELETE,PATCH',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, X-Request-With',
            'Access-Control-Allow-Credentials': 'true',
        },

    },
    plugins: [
        /*new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),*/
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            _: "underscore"
        }),
        new webpack.HotModuleReplacementPlugin(),
    ]
}