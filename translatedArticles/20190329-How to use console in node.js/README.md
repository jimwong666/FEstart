原文链接：[How to use console in node.js](https://scotch.io/tutorials/how-to-use-console-in-nodejs "怎么在node.js中使用console") <br/>
作者：Elizabeth Mabishi <br/>
作者创作时间：2019年2月11日

------------------------------------------------------------------------------------------------

# <img src="https://github.com/jimwong666/FEstart/blob/master/translatedArticles/images/publicFile/icon_teranlation.png" alt="译文"> 怎么在node.js中使用console

<p align="center">
<img src="https://scotch-res.cloudinary.com/image/upload/w_1000,q_auto:good,f_auto/v1543945343/wvbr6pwmie37drrlr1xv.png" alt="How to use console in node.js">
</p>

 * [介绍](#介绍)
 * [console.log，console.info 和 console.debug](#consolelogconsoleinfo和consoledebug)
 * [console.table](#consoletable)
 * [console.dir](#consoledir)
 * [console.dirxml](#consoledirxml)
 * [console.assert](#consoleassert)
 * [console.error 和 console.warn](#consoleerror和consolewarn)
 * [console.trace(label)](#consoletrace(label))
 * [console.count(label)](#consolecount(label))
 * [console.countReset(label)](#consolecountReset(label))
 * [console.time(label) 和 console.timeEnd(label)](#consoletime(label)和consoletimeEnd(label))
 * [结论](#结论)
 * [反馈](#反馈)

------------------------------------------------------------------------------------------------


#基本用法
CSS的发展，像所有的语言一样，是一个不断迭代的过程。伴随着每一次重大的修改发布，我们都会有新的特性和语法来帮助我们去修改样式。CSS3的提出，使我们能够设计之前只可能用javascript来完成的交互特性。每过一段时间就会有让我们编写样式更简单且更灵活的新工具浮现。 <br/>
[PostCss](https://github.com/postcss/postcss "PostCss")是最近被推出的样式工具之一。PostCss目标是用一个用户插件和工具的生态系统彻底重构CSS。使用与Sass和LESS这样的预处理器相同的规则，他将拓展的CSS语法和特性转换为现代的、对浏览器友好的CSS。 <br/>
你会问如何实现的？——Javascript。 <br/>
Javascript有能力将我们的样式转化的比其他预处理器更块。使用诸如Gulp和Grunt的任务执行工具，我们可以将样式表在构建过程中转化，就像是Sass和LESS的编译。诸如React和AngularJS这样的javascript库或框架允许我们直接在javascript里面进行CSS的编写，为javascript转化我们的样式表开辟了途径。

## console.log,console.info和console.debug
PostCSS作为Autoprefixer的作者[Andrey Sitnik](https://sitnik.ru/en/ "Andrey Sitnik")开发出来的工具，被正式发布作为CSS编译过程中使用javascript的方法。PostCSS本身只有一个简单的API，这个API在使用浩瀚无边的插件生态系统时，展现出非常强大的能力。为了提供有帮助的查错方法，PostCSS会生成source maps，而且一个抽象语法树（AST）会帮助我们理解在代码何处和代码怎样被转化。

## console.table
没有开发者会从随意的开始一个工程。许多从一个拥有变量、mixin、函数和常规的公用组件的SASS样板开始。我们会为变量、mixin、函数和常规的公用组件分别构建样式表，从而使我们的生产变得更加容易。在这一天的末尾，我们以10个或者更多的样式表来保持代码的组织性。 <br/>
维护一个不断增加代码片段的Sass或是LESS库是一项不可避免的工作，同时也会让项目变得十分臃肿。许多包含了”以防万一”代码的项目拥有很多没有用到的mixin和函数。PostCss为我们提供了易安装的即插即用(plug-and-play)的插件模块，使得为项目特殊需要的开发过程更加灵活。 <br/>

## console.dir
PostCSS用我们所有生产环境的样式表来迁移所有需要用到的代码去生成函数、公用组件和mixin并且将他们包装成插件。现在，对每一个项目来说，我们可以通过在我们的构建工具引入插件来选取需要的工具。
[PostCSS FontPath](https://github.com/seaneking/postcss-fontpath "PostCSS FontPath")插件就是展现PostCSS神奇能力的一个例子。我们可以在允许用户使用的webfonts文件中用Sass引入一个mixin。因此我们写入了@font-face标签。


## console.dirxml
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
## console.assert
如果在我们的项目中使用PostCSS FontPath插件，我们就不再需要像上面那个例子一样引用Sass mixins。我们可以在我们的CSS中写入如下代码，PostCSS会通过Grunt或者Gulp来将它转化为我们需要的代码。

```css
@font-face {
  font-family: 'My Font';
  font-path: '/path/to/font/file';
  font-weight: normal;
  font-style: normal;
}
```
## console.error和console.warn
截至到这篇文章发表时，社区中已经有超过100个目前可用的插件，它们允许我们使用未来的CSS语法、缩写、工具和这门语言的拓展。它不仅仅是一个“很酷的工具”，而且在它的用户基数中正计入WordPress、Google和Twittter的团队。

## console.trace(label)
由于PostCSS是基于Javascript的，我们在项目中可以使用像Gulp和Grunt这样的构建工具去转化CSS。下面的教程演示了如何通过[Gulp](https://gulpjs.com/ "Gulp")或[Grunt](https://gruntjs.com/ "Grunt")在你的工作流中添加PostCSS。使用哪种构建工具并不重要，这仅仅取决于个人的偏向或哪种对于我们的项目来说是最好的。

> [在Github](https://github.com/drewminns/postCSS-starter "Gulp和Grunt完整版")可以找到可用于Gulp和Grunt这两者的完整版。可以将它作为一个初学者的模板随意使用，并且可以按需拓展。

## console.count(label)
> 如果你不熟悉Gulp,推荐你阅读Callum Macrae写的”[building-with-gulp](https://www.smashingmagazine.com/2014/06/building-with-gulp/ "building-with-gulp")”来开始使用这个构建工具。

在终端运行以下命令来安装PostCSS模块至你的项目：

```
npm i gulp-postcss -D
```

在你项目的Gulpfile.js中，我们需要去引入安装好的PostCSS模块然后在一个任务中使用它。确认更新你的开发文件路径和转化过的输出文件的目录。

## console.countReset(label)
```js
var postcss = require('gulp-postcss');
gulp.task('styles', function () {
    return gulp.src('path/to/dev/style.css')
        .pipe(postcss([]))
        .pipe(gulp.dest(path/to/prod))
});
```

在命令行输入gulp styles来运行这个任务。

## console.time(label)和console.timeEnd(label)
> 如果你不熟悉Gulp,推荐你阅读Mike Cunsolo写的”[Get Up and Running With Grunt](https://www.smashingmagazine.com/2013/10/get-up-running-grunt/ "Get Up and Running With Grunt")”来开始使用这个构建工具。

在终端中运行以下命令来在你的项目中安装PostCSS模块：

## 结论

## 反馈

