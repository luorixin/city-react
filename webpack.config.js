var htmlWebpackPlugin = require("html-webpack-plugin");
var extracTextWebpackPlugin = require("extract-text-webpack-plugin");
var path = require("path");
var webpack = require("webpack")

var entryPath = path.join(__dirname,"src");
var outputPath = path.join(__dirname,"dist");
var tempPath = path.join(entryPath,"view")

module.exports = {
	// devtool: 'cheap-module-eval-source-map',
	entry : {
		app : [
            'webpack-hot-middleware/client',
             entryPath+"/index.js",
        ]
	},
	output : {
		publicPath : '/dist/',
		path : outputPath,
		filename : "js/[name].js",
		chunkFilename: 'js/[name].[chunkhash:5].min.js',
	},
	module : {
		loaders :[
			{
				test : /\.css$/,
				loader : extracTextWebpackPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
			},
			{
				test : /\.js$/,
				loader : "babel-loader",
				exclude : /node_modules/,
				query : {
					"presets" : ["es2015","react"]
				}
			}
		]
	},
	plugins : [
		new webpack.DefinePlugin({
	    	//process.argv：当前进程的命令行参数数组。
            //process.env：指向当前shell的环境变量，比如process.env.HOME。
            'process.env': {
                NODE_ENV: JSON.stringify('development') //定义编译环境
            }
		}),
		new htmlWebpackPlugin({
			filename: './index.html', //生成的html存放路径，相对于 path
			template: tempPath + "/index.temp.html",
			hash : false
		}),
		new extracTextWebpackPlugin("css/[name].css"),
		new webpack.HotModuleReplacementPlugin(),
	]


}