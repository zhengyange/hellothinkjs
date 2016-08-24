var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

//一些文件夹的路径

var APP_PATH = path.resolve(process.cwd());
var BUILD_PATH = path.resolve(APP_PATH, 'www/static/dist/js/');
var copyPlugin = [];
var uglPlugin = [];
var prod = process.argv[process.argv.length-1]
if(prod.slice(2) === 'prod'){
  uglPlugin[0] = new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  });
}

//项目中的入口文件，应该会有好多
function getEntry() {
  var entry = {};
  glob.sync(process.cwd() + '/www/static/dev/*/js/*.js').forEach(function (name) {
    var n = name.match(/([^/]+?)\.js/)[1];
    // var res = name.match(/dev\/([^\/]*)\/js\/([^\/]*)\.js/);
    // var dirN = res[1];
    // var fileN = res[2]
    entry[n] = './www/static/dev/'+n+'/js/'+n+'.js';
    copyPlugin.push({from: 'www/static/dev/'+n+'/img', to: n+'/img'})
  });
  return entry;
}


module.exports = {
  entry: getEntry(),

  //输出的文件名 合并以后的js会命名为bundle.js
  output: {
    path: 'www/static/dist/',
    publicPath: '/static/dist/',
    filename: '[name]/js/[name].js',
    // chunkFilename: '/chunk/[name].js'
  },
  module: {
    //和loaders一样的语法，很简单
    loaders: [
        {
          test: /\.js?$/,
          loader: 'babel',
          // include: APP_PATH + '/dev',
          exclude: /node_modules/
        },
        {
          test: /\.(css)$/,
          // loader: 'style-loader!css-loader'
          loader: ExtractTextPlugin.extract("style-loader","css-loader")
        },
        {
          test: /\.scss$/,
          // loaders: ['style', 'css', 'sass'],
          loader: ExtractTextPlugin.extract('style', 'css!sass')
        },
        {
          test: /\.(png|jpg)$/,
          loader: 'url-loader',
          query: {
            limit: 10000,
            path:path.join(process.cwd()),
            name:'bgImg/[name].[ext]'
          }
        }

    ]
  },
  resolve: {
      // require时省略的扩展名，如：require('module') 不需要module.js
      extensions: ['', '.js'],
      // 别名，可以直接使用别名来代表设定的路径以及其他
      alias: {

      }
  },
  // resolveUrlLoader: {
  //     absolute: '/static/dist'
  // },
  //添加我们的插件 会自动生成一个html文件
  plugins: [
      //把入口文件里面的数组打包成verdors.js
    new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(true)
    }),
    new webpack.ProvidePlugin({
    }),
    new CopyWebpackPlugin(copyPlugin),
    new ExtractTextPlugin("[name]/css/[name].css")
  ].concat(uglPlugin),
};
