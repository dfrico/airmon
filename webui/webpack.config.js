    /* eslint-disable */
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");

if(process.env.NODE_ENV !== 'production') {
    console.log("If you want to build in production do:\n\t NODE_ENV='production' webpack -p");
}

var config = {
    mode: process.env.NODE_ENV=='production'? 'production' : 'development', 
    entry: {
        app: "./src/main.js",
        vendor: [
            "react", "react-dom"
        ]
    },
    output: {
        path: path.resolve(__dirname, "./build/js/"),
        filename: "[name].bundle.js",
        chunkFilename: '[name].bundle.js',
        libraryTarget: "var",
        library: "[name]"
    },
    devtool: 'source-map',
    resolve: {
        extensions: [".webpack.js", ".js", ".jsx"]
    },
    /*plugins: [
        new config.optimization.splitChunks(["vendor"], "vendor.bundle.js")
    ],*/
    optimization: {
        minimize: false,
        splitChunks: {
            chunks: 'all',
            name: "other",
            cacheGroups: {
                react: {test:/react/, name: "vendor"}
            }
        }
    },
    module: {
        /*loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader"}
        ]*/
        rules: [{
            test: /\.(js|jsx)$/,
            include: path.resolve(__dirname, 'src'),
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["es2015", "react"]
                }
            }
        }]
    }
};

if(process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        })
    )
}

module.exports = config;
