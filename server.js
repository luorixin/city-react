var express = require("express");
var webpack = require("webpack");
var webpackDevServer = require("webpack-dev-server");
var webpackDevMiddleware = require("webpack-dev-middleware");
var path = require('path')
var engines = require("consolidate");
var config=  require("./webpack.config");

var app = express();
var compiler = webpack(config);

app.use(express.static(path.join(__dirname,"dist")));

app.set('views', path.join(__dirname, 'dist'));
app.engine('html', engines.ejs);
app.set('view engine', 'html');

app.use(webpackDevMiddleware(compiler,{
	hot: true,
	historyApiFallback: true,
	inline: true,
	stats: {
		colors: true,
	}
}))

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});

app.get("*",function(req,res){
	res.render("index");
})

app.listen("3000",function(){
	console.log('正常打开3000端口')
})


