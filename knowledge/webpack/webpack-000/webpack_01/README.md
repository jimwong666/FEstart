## webpack4学习心得

- **npx**：之前想运行nodeModules里面的文件，需要在package.json文件里面的scripts属性上写一些东西（不如："build": "webpack"）,或者直接到nodeModules里面找运行文件（比如../bin/..）；而现在可以直接在命令行中运行（比如：npx webpack）

- **更改webpack配置文件名**: npx webpack --config webpack.my.js(命令行中)，webpack --config webpack.my.js(package.json的scripts中)

- **scripts命令中的传参**：需要加"--"，后面跟参数。比如：npm run build --config webpack.my.js

#### webpack --- module(loader)

> loader特点：use后面跟字符串是使用单个loader，而后面跟数组可使用多个loader（数组中执行有顺序，**从右向左**/**从下向上**执行）

- **style-loader**：把 css 插入到 head 标签中
- **css-loader**：解析 @import 这种语法的
- **less-loader**：处理 less 语法，依赖 less，less-loader
- **sass-loader**：处理 sass 语法，依赖 node-sass，sass-loader
- **stylus**：处理 stylus 语法，依赖 stylus，stylus-loader
- **postcss-loader**：处理css浏览器兼容前缀等问题，依赖postcss-loader(postcss-loader一般在less,sass等loader之后执行，在style,css之前执行，即表面顺序看：style, css, postcss, less, sass...(loader思路：less,sass等变成css => postcss => 项目使用的css)，config可以设置设置postcss.config.js的路径，默认在外层)，autoprefixer
- **babel-loader**：高级语法转低级语法，依赖 @babel/core，babel-loader，@babel/preset-env(es6 -> es5)，@babel/plugin-proposal-class-properties(提案中的class语法)，@babel/plugin-proposal-decorators(提案中的装饰器语法)。。。等等

#### webpack --- plugin

> 插件都是类，都得new一下

- **抽离css插件（mini-css-extract-plugin）**：此插件还有一个loader属性，可用于与style-loader相同的功能（但一个实例只能用于一个文件哦，想抽离成多个文件就多个实例）
```js
{
	test: /\.css$/, 
	use: [
		MiniCssextractPlugin.loader, // 功能等同于下面的，都是生成style标签（但这是link形式的），但多了抽离css的功能
		// { // 生成style标签
		// 	loader:'style-loader',
		// 	// options: { // 可调整位置
		// 	// 	insert: 'head'
		// 	// }
		// },
		{
			loader: 'css-loader',
		}
	]
},
```



#### webpack --- 优化项

- **optimize-css-assets-webpack-plugin**: 压缩css(但是用了此插件，必须用uglifyjs-webpack-plugin手动压缩js，因为js原先是默认压缩的[有很多默认配置，直接导致连es6语法也不支持了。。。]，但用了这个插件，就不会默认压缩了~)
- **uglifyjs-webpack-plugin**：压缩js