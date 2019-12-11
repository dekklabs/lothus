const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
//const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
    /*entry: {
        vendor: './src/vendor.js',
        app: './src/index.js'
    },*/
    entry: './src/index.ts',
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name]-[chunkhash:6].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: { 
        contentBase: path.join(__dirname, "dist"), 
        compress: true, 
        port: 9001,
        hot: true,
        https: true,
        publicPath: path.join(__dirname, "dist"),
        watchOptions: {
            // Delay the rebuild after the first change
            aggregateTimeout: 300,
            // Poll using interval (in ms, accepts boolean too)
            poll: 1000,
        },
    },
    //devtool: 'inline-source-map',

    optimization: {
        namedModules: true,
        concatenateModules: true,
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: {
                    condition: /^\**!|@preserve|@license|@cc_on/i,
                    filename: (file, fileData) => {
                      return file.replace(/\.(\w+)($|\?)/, '.$1.LICENSE$2');
                    },
                    banner: (licenseFile) => {
                      return ``;
                    },
                },
                terserOptions: {
                    warnings: false,
                    ecma: '6',
                    compress: {
                        drop_console: true,
                        ecma: '6',
                        inline: false,

                    }
                }
            }),
        ],
        /*splitChunks: {
            chunks: 'initial',
            maxAsyncRequests: Infinity,
            maxInitialRequests: Infinity,
            name: true,
            cacheGroups: {
                bundle: {
                    name: 'commons',
                    chunks: 'all',
                    minChunks: 3,
                    reuseExistingChunk: false,
                },
                vendor: {
                    chunks: 'initial',
                    name: 'vendor',
                    test: function (module) {
                        return /\/node_modules\//.test(module.context)
                    }
                }
            }
        },
        runtimeChunk: {
            name: "manifest",
        }*/
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  /*options: {
                    presets: ['@babel/preset-env'],
                    comments: false
                  }*/
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                //loader: 'style-loader!css-loader!sass-loader',
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {

                    }
                }, 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/'
                        },
                    },
                ],
            },
            { 
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            },
            {
                test: /\.html$/,
                use: 'raw-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        //new LodashModuleReplacementPlugin,
        //new BundleAnalyzerPlugin(),
        new webpack.IgnorePlugin(/lodash$/),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            _: "underscore"
        }),
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /es/),
        new webpack.optimize.ModuleConcatenationPlugin(),


        new MiniCssExtractPlugin({
            filename: 'app.[chunkhash:6].css',
            chunkFilename: 'app.[chunkhash:6].css'
        }),
        new OptimizeCSSAssetsPlugin({
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
        }),
        new MinifyPlugin(),
        //new webpack.HotModuleReplacementPlugin(),

        new webpack.WatchIgnorePlugin([
            path.join(__dirname, "node_modules")
        ]),

        new ManifestPlugin({
            basePath: 'dist/',
            isAsset: false,
            isChunk: true,
            writeToFileEmit: true
        })
    ]
}