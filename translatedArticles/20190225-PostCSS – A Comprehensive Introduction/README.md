原文链接：[PostCSS – A Comprehensive Introduction](https://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/ "https://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/")

------------------------------------------------------------------------------------------------

# <img src="https://github.com/jimwong666/FEstart/blob/master/translatedArticles/images/publicFile/icon_teranlation.png" alt="译文">  PostCSS - 综合介绍
CSS的发展，像所有的语言一样，是一个不断迭代的过程。伴随着每一次重大的修改发布，我们都会有新的特性和语法来帮助我们去修改样式。CSS3的提出，使我们能够设计之前只可能用javascript来完成的交互特性。每过一段时间就会有让我们编写样式更简单且更灵活的新工具浮现。
PostCss是相对最新的并且被样式使用的工具之一。PostCss目标是用一个用户插件和工具的生态系统彻底重构CSS。使用与Sass和LESS这样的预处理器相同的规则，他将延伸出来的CSS语法和特性转换为现代的、对浏览器友好的CSS。
你会问如何实现的？Javascript。
Javascript有能力将我们的样式转化的比其他预处理器更块。使用诸如Gulp和Grunt的任务执行工具，我们可以将样式表在构建过程中转化，就像是Sass和LESS的编译。诸如React和AngularJS这样的javascript库或框架允许我们直接在javascript里面进行CSS的编写，为javascript转化我们的样式表开辟了途径。

## PostCSS的历史
PostCSS作为Autoprefixer的作者Andrey Sitnik开发出来的工具，被正式发布作为CSS编译过程中使用javascript的方法。PostCSS本身只有一个简单的API，这个API在使用浩瀚无边的插件生态系统时，展现出非常强大的能力。为了提供有帮助的查错方法，PostCSS会生成source maps，而且一个抽象语法树（AST）会帮助我们理解在代码何处和代码怎样被转化。