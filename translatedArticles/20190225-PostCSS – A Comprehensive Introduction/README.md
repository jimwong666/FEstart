原文链接：[PostCSS – A Comprehensive Introduction](https://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/ "https://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/")

------------------------------------------------------------------------------------------------

# <img src="https://github.com/jimwong666/FEstart/blob/master/translatedArticles/images/publicFile/icon_teranlation.png" alt="译文">  PostCSS - 综合介绍
CSS的发展，像所有的语言一样，是一个不断迭代的过程。伴随着每一次重大的修改发布，我们都会有新的特性和语法来帮助我们去修改样式。CSS3的提出，使我们能够设计之前只可能用javascript来完成的交互特性。每过一段时间就会有让我们编写样式更简单且更灵活的新工具浮现。
PostCss是相对最新的并且被样式使用的工具之一。PostCss目标是用一个用户插件和工具的生态系统彻底重构CSS。使用与Sass和LESS这样的预处理器相同的规则，他将延伸出来的CSS语法和特性转换为现代的、对浏览器友好的CSS。
你会问如何实现的？Javascript。
Javascript有能力将我们的样式转化的比其他预处理器更块。使用诸如Gulp和Grunt的任务执行工具，我们可以将样式表在构建过程中转化，就像是Sass和LESS的编译。诸如React和AngularJS这样的javascript库或框架允许我们直接在javascript里面进行CSS的编写，为javascript转化我们的样式表开辟了途径。

## PostCSS的历史
PostCSS作为Autoprefixer的作者Andrey Sitnik开发出来的工具，被正式发布作为CSS编译过程中使用javascript的方法。PostCSS本身只有一个简单的API，这个API在使用浩瀚无边的插件生态系统时，展现出非常强大的能力。为了提供有帮助的查错方法，PostCSS会生成source maps，而且一个抽象语法树（AST）会帮助我们理解在代码何处和代码怎样被转化。

## 模块化思维的好处
没有开发者会从随意的开始一个工程。许多从一个拥有变量、mixin、函数和常规的公用组件的SASS样板开始。我们会为变量、mixin、函数和常规的公用组件分别构建样式表，从而使我们的生产变得更加容易。在这一天的末尾，我们以10个或者更多的样式表来保持代码的组织性。
维护一个不断增加代码片段的Sass或是LESS库是一项不可避免的工作，同时也会让项目变得十分臃肿。许多包含了”以防万一”代码的项目拥有很多没有用到的mixin和函数。PostCss为我们提供了易安装的即插即用(plug-and-play)的插件模块，使得为项目特殊需要的开发过程更加灵活。
PostCSS用我们所有生产环境的样式表来迁移所有需要用到的代码去生成函数、公用组件和mixin并且将他们包装成插件。现在，对每一个项目来说，我们可以通过在我们的构建工具引入插件来选取需要的工具。
PostCSS FontPath插件就是展现PostCSS神奇能力的一个例子。我们可以在允许用户使用的webfonts文件中用Sass引入一个mixin。因此我们写入了@font-face标签。

```css
@mixin importfont($font-family, $font-filename, $font-weight : normal, $font-style :normal, $font-stretch : normal) {
  @font-face {
    font-family: '#{$font-family}';
    src: url('#{$font-filename}.eot');
    src: url('#{$font-filename}.woff') format('woff'),
    url('#{$font-filename}.ttf') format('truetype');
    font-weight: $font-weight;
    font-style: $font-style;
    font-stretch: $font-stretch;
  }
}
@include importfont('mission script', 'fonts/mission-script-webfont', 300);
```