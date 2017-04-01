var htmlWebpackPlugin = require("html-webpack-plugin");
var extracTextWebpackPlugin = require("extract-text-webpack-plugin");
var path = require("path");

var entryPath = path.join(__dirname,"src");
var outputPath = path.join(__dirname,"dist");
var tempPath = path.join(entryPath,"view")

module.exports = {
	entry : {
		index : entryPath+"/index.js",
	},
	output : {
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
		new htmlWebpackPlugin({
			filename: './index.html', //生成的html存放路径，相对于 path
			template: tempPath + "/index.temp.html"
		}),
		new extracTextWebpackPlugin("css/[name].css")
	]


}