# hellothinkjs
在hellothinkjs的基础上，对前端资源传门配置webpack.config.js进行编译打包，流畅的书写scss/es6等  
原hellothinkjs项目地址：[https://github.com/fegg/hellothinkjs](https://github.com/fegg/hellothinkjs)

### ThinkJS 入门代码

#### 部署

1.数据库

- 修改 src/common/config/db.js
- 导入 sql 文件，创建数据库和数据表（db/food_2015-11-16.sql）

- 修改数据配置，对照自己的数据库配置自行修改
```js
export default {
  type: 'mysql',
  adapter: {
    mysql: {
      host: '127.0.0.1',	
      port: '3306',
      database: 'think_demo',
      user: 'thinkjs',
      password: '88888888',
      prefix: 'think_',
      encoding: 'utf8',
      log_sql: true,
      log_connect: true,
    },
    mongo: {

    }
  }
};
```

2.安装 node_module，项目根目录下执行：

	npm install

3.编译并运行后台 es6 代码（请勿修改 babel 版本）
	
	// 最新 thinkjs 2.0.6 自动会进行 complie 操作

	npm run start

4.前端代码编译过程，`www/development.js`, `www/webpack.config.js`

```js
var childProcess = require('child_process');
var p = childProcess.exec('webpack --config www/webpack.config.js --process --colors --display-error-details -w');
p.stdout.pipe(process.stdout);

```  
	
	此段代码会在执行npm start的时候，执行，输出控制台会输出相关前端资源编译信息

	[2016-08-24 11:08:09] [THINK] Server running at http://127.0.0.1:8360/
	[2016-08-24 11:08:09] [THINK] ThinkJS Version: 2.2.9
	[2016-08-24 11:08:09] [THINK] Cluster Status: closed
	[2016-08-24 11:08:09] [THINK] WebSocket Status: closed
	[2016-08-24 11:08:09] [THINK] File Auto Compile: true
	[2016-08-24 11:08:09] [THINK] File Auto Reload: true
	[2016-08-24 11:08:09] [THINK] App Enviroment: development

	Hash: 823addc26aea61f94632
	Version: webpack 1.13.2
	Time: 1612ms
	            Asset       Size  Chunks             Chunk Names
	      bgImg/1.jpg    34.3 kB          [emitted]
	      bgImg/2.jpg    51.2 kB          [emitted]
	  food/js/food.js    3.65 kB       0  [emitted]  food
	  test/js/test.js    3.69 kB       1  [emitted]  test
	food/css/food.css  951 bytes       0  [emitted]  food
	test/css/test.css  951 bytes       1  [emitted]  test
	   food/img/1.jpg    34.3 kB          [emitted]
	   food/img/2.jpg    51.2 kB          [emitted]
	   test/img/1.jpg    34.3 kB          [emitted]
	   test/img/2.jpg    51.2 kB          [emitted]
	    + 15 hidden modules
	Child extract-text-webpack-plugin:
	        + 2 hidden modules
	Child extract-text-webpack-plugin:
	        + 2 hidden modules
	Child extract-text-webpack-plugin:
	        + 3 hidden modules
	Child extract-text-webpack-plugin:
	        + 3 hidden modules
	[2016-08-24 11:08:16] [SOCKET] Connect mysql with mysql://thinkjs:88888888@127.0.0.1:3306/think_demo
	[2016-08-24 11:08:16] [SQL] SHOW COLUMNS FROM `think_food` 52ms
	[2016-08-24 11:08:16] [SQL] SELECT * FROM `think_food` LIMIT 0,10 3ms
	[2016-08-24 11:08:16] [HTTP] GET /food 200 293ms


5.浏览器打开：http://127.0.0.1:8360/food

6.设计思路

	待续。。。
	找时间补上
	交流QQ: 2237993760