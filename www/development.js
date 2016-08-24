var thinkjs = require('thinkjs');
var path = require('path');
var childProcess = require('child_process');

var rootPath = path.dirname(__dirname);
var instance = new thinkjs({
  APP_PATH: rootPath + path.sep + 'app',
  RUNTIME_PATH: rootPath + path.sep + 'runtime',
  ROOT_PATH: rootPath,
  RESOURCE_PATH: __dirname,
  env: 'development'
});

// Build code from src to app directory.
instance.compile({
  log: true
});

/**
 * 开启子进程，执行静态资源打包编译命令，
 * 由于有-w参数，所以子进程一直没有结束，所有回调函数不会执行，
 * 所以暂时只能这样了，
 *
 * 不知道会不会影响开发性能
 */

var p = childProcess.exec('webpack --config www/webpack.config.js --process --colors --display-error-details -w');
p.stdout.pipe(process.stdout);

instance.run();
