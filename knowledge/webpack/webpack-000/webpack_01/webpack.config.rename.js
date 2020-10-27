let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssextractPlugin = require('mini-css-extract-plugin');
let MiniCssextractPlugin2 = require('mini-css-extract-plugin');
let OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
let UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	devServer: {
		port: 8088,
		progress: true,
		contentBase: './build',
		open: true,
		compress: true, // g-zip压缩
	},
	mode: 'production', // production, development
	entry: './src/index.js',
	output: {
		filename: 'bundle.[hash:8].js',
		path: path.resolve(__dirname, 'build'),
	},
	optimization: { // 优化项
		minimizer: [ // 压缩
			new OptimizeCssAssetsWebpackPlugin(), // css
			new UglifyjsWebpackPlugin({
				cache: true, 
				parallel: true, // 并发打包
				sourceMap: true,
			}),
		]
	},
	plugins: [ //数组，放着所有的webpack插件
		new HtmlWebpackPlugin({ // new 插件类
			template: './index.html',
			filename: 'index.html',
			minify: {
				removeAttributeQuotes: true, // 去引号
				collapseWhitespace: true, // 去空格
			},
			hash: true, //无关紧要，加?[hash]
		}),
		new MiniCssextractPlugin({
			filename: 'main_1.[contenthash:8].css',
		}),
		new MiniCssextractPlugin2({
			filename: 'main_2.[contenthash:8].css',

		}),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options: { //
							presets: [ // babel处理库
								'@babel/preset-env',
							],
							plugins: [
								[
									"@babel/plugin-proposal-decorators",
									{
										"legacy": true
									}
								],
								[
									"@babel/plugin-proposal-class-properties",
									{
										"loose": true
									}
								],
							]
						}
					}
				]
			},
			{
				test: /\.css$/, 
				use: [
					MiniCssextractPlugin.loader, // 功能等同于下面的，都是引用css（但这是link形式的），但多了抽离css的功能
					// { // 生成style标签
					// 	loader:'style-loader',
					// 	// options: { // 可调整位置
					// 	// 	insert: 'head'
					// 	// }
					// },
					{
						loader: 'css-loader',
					},
					{
						loader: 'postcss-loader',
						// options: {

						// }
					},
				]
			},
			{ // 处理less
				test: /\.less$/, 
				use: [
					MiniCssextractPlugin2.loader, // 功能等同于下面的，都是引用css（但这是link形式的），但多了抽离css的功能
					// {
					// 	loader:'style-loader',
					// 	// options: {
					// 	// 	insert: 'head'
					// 	// }
					// },
					{
						loader: 'css-loader',
					},
					{
						loader: 'postcss-loader'
					},
					{
						loader: 'less-loader', // 依赖：less, less-loader
					},
				]
			},
			// { // 处理sass
			// 	test: /\.sass$/, 
			// 	use: [
			// 		{
			// 			loader:'style-loader',
			// 			// options: {
			// 			// 	insert: 'head'
			// 			// }
			// 		},
			// 		{
			// 			loader: 'css-loader',
			// 		},
			// 		{
			// 			loader: 'sass-loader', // 依赖：node-sass, sass-loader
			// 		},
					// {
					// 	loader: 'postcss-loader'
					// }
			// 	]
			// },
			// { // 处理stylus
			// 	test: /\.stylus$/, 
			// 	use: [
			// 		{
			// 			loader:'style-loader',
			// 			// options: {
			// 			// 	insert: 'head'
			// 			// }
			// 		},
			// 		{
			// 			loader: 'css-loader',
			// 		},
			// 		{
			// 			loader: 'stylus-loader', // 依赖：stylus，stylus-loader
			// 		},
					// {
					// 	loader: 'postcss-loader'
					// }
			// 	]
			// }
		]
	}
};