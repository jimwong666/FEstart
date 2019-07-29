1. webpack 4.x 已经废弃 webpack 3.x 的 extract-text-webpack-plugin（用于提取css为单独css文件）。可以继续用 extract-text-webpack-plugin，但必须用对应的beta版本（npm install --save-dev extract-text-webpack-plugin@next），但这个beta版本不支持生成hash。所以最好用 mini-css-extract-plugin。但这个插件不能 style-loader 混用，会有冲突。（根本原因我才猜是style-loader是将css插入到html页面的style中的，而mini-css-extract-plugin是用于提取css为单独css文件，功能就是对立的）

2. 区分好 dev 与 prod 的区别。比如：HMR是在开发环境使用，它利于css调试、部分更新、保留状态等。所以不会再生产环境用，与mini-css-extract-plugin也是有冲突的。还有等等其他的

3. devServer 的 publicPath 要确保都是以"/"开头和结尾。意义即为开发是服务器访问的位置

