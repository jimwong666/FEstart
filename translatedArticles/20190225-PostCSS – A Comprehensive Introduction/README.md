原文链接：[PostCSS – A Comprehensive Introduction](https://www.smashingmagazine.com/2015/12/introduction-to-postcss/ "PostCSS - 综合介绍") <br/>
作者：Drew Minns <br/>
作者创作时间：2015年12月8日

------------------------------------------------------------------------------------------------

# <img src="https://github.com/jimwong666/FEstart/blob/master/translatedArticles/images/publicFile/icon_teranlation.png" alt="译文">  PostCSS - 综合介绍
CSS的发展，像所有的语言一样，是一个不断迭代的过程。伴随着每一次重大的修改发布，我们都会有新的特性和语法来帮助我们去修改样式。CSS3的提出，使我们能够设计之前只可能用javascript来完成的交互特性。每过一段时间就会有让我们编写样式更简单且更灵活的新工具浮现。 <br/>
[PostCss](https://github.com/postcss/postcss "PostCss")是最近被推出的样式工具之一。PostCss目标是用一个用户插件和工具的生态系统彻底重构CSS。使用与Sass和LESS这样的预处理器相同的规则，他将拓展的CSS语法和特性转换为现代的、对浏览器友好的CSS。 <br/>
你会问如何实现的？——Javascript。 <br/>
Javascript有能力将我们的样式转化的比其他预处理器更块。使用诸如Gulp和Grunt的任务执行工具，我们可以将样式表在构建过程中转化，就像是Sass和LESS的编译。诸如React和AngularJS这样的javascript库或框架允许我们直接在javascript里面进行CSS的编写，为javascript转化我们的样式表开辟了途径。

## PostCSS的历史
PostCSS作为Autoprefixer的作者[Andrey Sitnik](https://sitnik.ru/en/ "Andrey Sitnik")开发出来的工具，被正式发布作为CSS编译过程中使用javascript的方法。PostCSS本身只有一个简单的API，这个API在使用浩瀚无边的插件生态系统时，展现出非常强大的能力。为了提供有帮助的查错方法，PostCSS会生成source maps，而且一个抽象语法树（AST）会帮助我们理解在代码何处和代码怎样被转化。

## 模块化思维的好处
没有开发者会从随意的开始一个工程。许多从一个拥有变量、mixin、函数和常规的公用组件的SASS样板开始。我们会为变量、mixin、函数和常规的公用组件分别构建样式表，从而使我们的生产变得更加容易。在这一天的末尾，我们以10个或者更多的样式表来保持代码的组织性。 <br/>
维护一个不断增加代码片段的Sass或是LESS库是一项不可避免的工作，同时也会让项目变得十分臃肿。许多包含了”以防万一”代码的项目拥有很多没有用到的mixin和函数。PostCss为我们提供了易安装的即插即用(plug-and-play)的插件模块，使得为项目特殊需要的开发过程更加灵活。 <br/>
PostCSS用我们所有生产环境的样式表来迁移所有需要用到的代码去生成函数、公用组件和mixin并且将他们包装成插件。现在，对每一个项目来说，我们可以通过在我们的构建工具引入插件来选取需要的工具。
[PostCSS FontPath](https://github.com/seaneking/postcss-fontpath "PostCSS FontPath")插件就是展现PostCSS神奇能力的一个例子。我们可以在允许用户使用的webfonts文件中用Sass引入一个mixin。因此我们写入了@font-face标签。

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

如果在我们的项目中使用PostCSS FontPath插件，我们就不再需要像上面那个例子一样引用Sass mixins。我们可以在我们的CSS中写入如下代码，PostCSS会通过Grunt或者Gulp来将它转化为我们需要的代码。

```css
@font-face {
  font-family: 'My Font';
  font-path: '/path/to/font/file';
  font-weight: normal;
  font-style: normal;
}
```

截至到这篇文章发表时，社区中已经有超过100个目前可用的插件，它们允许我们使用未来的CSS语法、缩写、工具和这门语言的拓展。它不仅仅是一个“很酷的工具”，而且在它的用户基数中正计入WordPress、Google和Twittter的团队。

## 添加PostCSS到你的工作流中
由于PostCSS是基于Javascript的，我们在项目中可以使用像Gulp和Grunt这样的构建工具去转化CSS。下面的教程演示了如何通过[Gulp](https://gulpjs.com/ "Gulp")或[Grunt](https://gruntjs.com/ "Grunt")在你的工作流中添加PostCSS。使用哪种构建工具并不重要，这仅仅取决于个人的偏向或哪种对于我们的项目来说是最好的。

> [在Github](https://github.com/drewminns/postCSS-starter "Gulp和Grunt完整版")可以找到可用于Gulp和Grunt这两者的完整版。可以将它作为一个初学者的模板随意使用，并且可以按需拓展。

## 开始在Gulp中使用PostCSS
> 如果你不熟悉Gulp,推荐你阅读Callum Macrae写的”[building-with-gulp](https://www.smashingmagazine.com/2014/06/building-with-gulp/ "building-with-gulp")”来开始使用这个构建工具。

在终端运行以下命令来安装PostCSS模块至你的项目：

```
npm i gulp-postcss -D
```

在你项目的Gulpfile.js中，我们需要去引入安装好的PostCSS模块然后在一个任务中使用它。确认更新你的开发文件路径和转化过的输出文件的目录。

```js
var postcss = require('gulp-postcss');
gulp.task('styles', function () {
    return gulp.src('path/to/dev/style.css')
        .pipe(postcss([]))
        .pipe(gulp.dest(path/to/prod))
});
```

在命令行输入gulp styles来运行这个任务。

## 开始在Grunt中使用PostCSS
> 如果你不熟悉Gulp,推荐你阅读Mike Cunsolo写的”[Get Up and Running With Grunt](https://www.smashingmagazine.com/2013/10/get-up-running-grunt/ "Get Up and Running With Grunt")”来开始使用这个构建工具。

在终端中运行以下命令来在你的项目中安装PostCSS模块：

```
npm i grunt-postcss -D
```

当插件在你的系统中安装完成后，像下面那样将它在Gruntfile中引入并且创建一个任务。确认以你的项目目录结构更新了你的cwd和dest目录值。

```js
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    styles: {
      options: {
        processors: []
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'dev/',
          src: ['**/*.css'],
          dest: 'prod/'
        }]
      }
    }
  });
  // Load post-css.
  grunt.loadNpmTasks('grunt-postcss');
};
```

在终端中输入grunt styles来执行这个任务。

## 安装插件
仅仅使用PostCSS本身并不能体现它的强大之处。它之所以强大是依靠它的插件。你可能已经注意到了在上面的Gulp和Grunt实现中任务声明是空数组。这些数组值就是我们想要在我们工具中引入的特性，也是我们能导入在社区成长起来的PostCSS插件的地方。 <br/>
已获支持的PostCSS插件列表可以在[PostCSS’ GitHub page](https://github.com/postcss/postcss "PostCSS’ GitHub page")找到。像所有的NPM包一样，插件可以通过命令行安装。许多插件只能用于PostCSS的拓展并且对于你正使用的构建工具是未知的。举个例子，我们安装一个[PostCSS Focus](https://github.com/postcss/postcss-focus "PostCSS Focus")插件，用来给每个鼠标悬浮状态添加一个:focus。 <br/>
下面所有的例子中的插件，我们都需要用命令行和NPM来在我们的项目中安装插件包。

## PostCSS插件安装示例
```
npm i postcss-focus -D
```

插件可以直接传递进之前写好的方法中。但是为了代码简洁，我们可以构造一个数组并把它当做一个参数传递。在这个数组中，我们可以引入必要的require声明，从而返回插件的值并立即调用。如果你想要对这个概念了解更多，浏览一下 Ryan Christiani所写的[Functions as First-Class Citizens in JavaScript](http://ryanchristiani.com/functions-as-first-class-citizens-in-javascript/ "javascript中函数是一等公民")。

```js
require('postcss-focus')()
```

以下是为Grunt改进过的代码，使用了我们最新构造的processorArray：

```js
var processorArray = [
    require('postcss-plugin')()
];
// Snipped for brevity
styles: {
      options: {
        processors: processorArray
      },
      dist: {
        src: 'path/to/dev/style.css',
        dest: 'path/to/prod/style.css'
      }
    }
```

这里是为Gulp改进过的代码：

```js
var processorArray = [
    require('postcss-plugin')()
];
gulp.task('styles', function () {
    gulp.src('path/to/dev/style.css')
        .pipe(postcss(processorArray))
        .pipe(gulp.dest('path/to/prod'))
});
```

## 插件
当我们已经安装好了一个插件并且我们的构建工具准备好去编译我们的代码时，我们可以用PostCSS和它插件的特色。首要任务是在保存我们开发代码的目录下创建一个带有扩展名为.css的文件。 <br/>
“等一下！你说一个CSS文件吗？”对哒，一个CSS文件。因为PostCSS转换的是CSS，我们不需要去用一个特殊的语法，传统的CSS就可以。如果你熟悉预处理器，那么对你来说将.sass，.scss，.stylor.less文件抛在一遍并且回到.css的怀抱是很不自然的。但是，事实上，这不是改变他的本质，只是形式上的转化。 <br/>
我们可以分别使用grunt styles和gulp styles的命令来运行我们的构建工具，从而使用我们新安装的PostCSS去处理我们的样式表。我们开发环境中的CSS文件会通过PostCSS插件和其它提供的插件进行处理，然后这些CSS文件会被输出到我们指定的生产目录中。 <br/>
底下是一些可能会在你开始使用PostCSS时有所帮助的插件小贴士。包括了插件安装说明和使用说明。

## 自动添加前缀
在整个广袤无垠的浏览器和设备圈子里写可以兼容样式非常令人痛苦，并且保持更新需要浏览器前缀的属性和值本身也是一个挑战。幸运的是，[Autoprefixer](https://github.com/postcss/autoprefixer "Autoprefixer")可以推算出在哪并且在什么情况下需要去添加浏览器前缀。插件可以关注到属性的浏览器的前缀和需要前缀的值，它将我们解放，可以让我们在写样式时只需要写出在脑子里的现代特性和属性。 <br/>
这是我们通过命令行安装插件的方式：

```
npm i autoprefixer -D
```

当我们将这个插件添加到之前构造好的数组中，我们可以提供一个包含了项目需要支持的浏览器范围的对象。配置项在[Browserslist Github Account](https://github.com/browserslist/browserslist "Browserslist Github Account")中提供。 <br/>
让我们把Autoprefixer插件添加到我们的处理器中：

```js
var processorsArray = [
  // snipped for brevity
  require('autoprefixer')({ browsers: ['last 2 versions', 'ie 6-8', 'Firefox > 20']  })
];
```

根据我们提供的浏览器范围，合适的浏览器前缀会被输出到我们样式中需要的所有CSS属性和值中。 <br/>
这是开发环境的CSS：

```css
.item {
  display: flex;
  flex-flow: row wrap;
}
```

这是转化后输出的CSS：

```css
.item {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -webkit-flex-flow: row wrap;
      -ms-flex-flow: row wrap;
          flex-flow: row wrap;
}
```

## CSSNEXT-使用未来的语法
CSS4在不久就会出现在我们身边，伴随它而来的是[原生变量](https://www.w3.org/TR/css-variables/ "原生变量")、[定制媒体查询](https://drafts.csswg.org/mediaqueries/#custom-mq "定制媒体查询")、[定制选择器](https://drafts.csswg.org/css-extensions/#custom-selectors "定制选择器")和新的[链接地址伪类](https://drafts.csswg.org/selectors-4/#negation "链接地址伪类")。截至我在写这篇文章的时候，所有的浏览器都不支持这些新特性，当新的规范得到批准后它们就会在现代浏览器中得到应用。 <br/>
[CSSNext](http://cssnext.io/ "CSSNext")是一个转化所有CSS4特点和属性至浏览器可以理解的CSS3的工具。这个工具可以独立使用也可以作为PostCSS的一个插件使用。再一次，我们可以可以将它添加到包含了我们其他PostCSS插件的processorsArray数组中。 <br/>
通过命令行安装CSSNext：

```
npm i cssnext -D
```

然后将插件添加到处理器中:

```js
var processorsArray = [
  // snipped for brevity
  require('cssnext')()
];
```

现在，在你的生产环境中可以写带有CSS4特性的代码了，PostCSS会通过构建工具将你的语法转化，从而支持现在的浏览器。当浏览器支持更新的语法时，你可以将生产环境的CSS替换为转化过的CSS。 <br/>
这是生产环境的CSS：

```css
// Custom Variables
:root {
  --linkColour: purple;
}
a {
  color: var(--linkColour);
}
// Custom media queries with ranges
@custom-media --only-medium-screen (width >= 500px) and (width <= 1200px);
@media (--only-medium-screen) {
  /* Medium viewport styles */
}
// Custom selectors
@custom-selector :--enter :hover, :focus;
@custom-selector :--input input, .input, .inputField;
a:--enter {
  /* Enter styles go here */
}
:--input {
  /* Input field styles go here */
}
```

这是转换过的输出：

```css
a {
  color: purple;
}
@media (min-width:500px) and (max-width:1200px){
  body{
    background:#00f;
  }
}
a:focus,a:hover{
  background:#00f;
}
.input, .inputField, input{
  background:red;
}
```

如果你想体验更多的CSSNext特性，这个网站有一个用CSSNext支持的CSS4特性供你玩耍的[场地](http://cssnext.io/playground/ "体验css4")。

## Sass语法
如果你的预处理器语言是Sass，不要怕：你可以用PostCSS来使用它的语法和它的工具。尽管传统的CSS暂时还不支持变量、嵌套和引入外部文件，像[PreCSS](https://github.com/jonathantneal/precss "PreCSS")这样的插件能够让我们使用这些特点并且在我们传统的CSS文件中使用Sass语法。 <br/>
如果我们将插件通过命令行添加到我们的构建工具中并在我们构造的数组中引入，我们就可以立即开始输入Sass的语法了。如果你想从Sass转投到PostCSS的怀抱中，你只需要把文件拓展名改为.css并且立即将它放入你构建工具的工作流中。 <br/>
通过命令行安装PreCSS：

```
npm i precss -D
```

在处理器中添加你的插件：

```js
var processorsArray = [
  // snipped for brevity
  require('precss')()
];
```

这里是开发环境的CSS：

```css
/*Variables*/
$blue: #0000ff;
$green: #00ff00;
$radius: 10px;
.square {
  background: $blue;
  border-radius: $radius;
}
/*Imports*/
@import "partials/_base.css";
/*Mixins*/
@define-mixin square $dimension {
    width: $dimension;
    height: $dimension;
}
/*Nesting, variables and mixins*/
.button {
  @mixin square 200px;
  background: $green;
  &:hover {
    background: $blue;
  }
}
```

这是输出后的CSS：

```css
.square {
  background: #0000ff;
  border-radius: 10px;
}
.button {
  width: 200px;
  height: 200px;
  background: #00ff00;
}
.button:hover {
  background: #0000ff;
}
```

## 使用社区中的插件拓展你的CSS
尽管可用的插件能够帮助我们更有效率的去编写代码，PostCSS的力量存在于社区中的插件。这些插件给我们提供了编写代码更为快速的途径，或者说至少是更简单的去实现有创造力的样式编写方式。使用PostCSS提供的API，这些插件允许我们在项目中定制属性、选择器和属性值，这让我们更有效的编写样式同时也会减少Google的使用。

## 数量查询
[数量查询](https://github.com/pascalduez/postcss-quantity-queries "数量查询")是非常强大的功能。它允许我们[用CSS给元素计数](https://www.smashingmagazine.com/2015/07/quantity-ordering-with-css/ "用CSS给元素计数")并且基于兄弟节点的数量来应用样式。它们相对你现在用到的CSS来说使用一些更高级的CSS选择器，你可以[在今天的CSS中使用它们](https://www.smashingmagazine.com/2015/07/constructing-css-quantity-queries-on-the-fly/ "使用数量查询例子")。 <br/>
尽管有像[QQ](http://quantityqueries.com/ "quantityqueries")这样的在线工具能帮我们去写这些查询，我们也可以运用PostCSS直接在我们的样式中使用定制的选择器。 <br/>
为了使用数量选择器，通过命令行在你的项目中安装数量选择插件像其他所有的插件一样：

```
npm i postcss-quantity-queries -D
```

添加插件到处理器中：

```js
var processors = [
  // Snipped for brevity
  require('postcss-quantity-queries')()
];
```

当插件安装完成后，你就可以使用定制的选择器来基于匹配到的元素来应用样式，但仅仅只能通过使用插件来支持。 <br/>
这是开发环境的CSS：

```css
// To apply styles if 'at least' number of sibling elements present
.container > .item:at-least(5) {
  background: blue;
}
// To apply styles if 'at most' number of sibling elements present
.item > a:at-most(10) {
  color: green;
}
// To apply styles if number of sibling items 'between' a range is present
.gallery > img:between(4, 7) {
  width: 25%;
}
// To apply styles if 'exactly' number of provided items is present
.profiles:exactly(4) {
  flex: 1 0 50%;
}
```

这是转化输出后的CSS：

```css
// To apply styles if 'at least' number of sibling elements present
.container > .item:nth-last-child(n+5), .container > .item:nth-last-child(n+5) ~ .item {
  background: blue;
}
// To apply styles if 'at most' number of sibling elements present
.item > a:nth-last-child(-n+10):first-child, .item > a:nth-last-child(-n+10):first-child ~ a {
  color: green;
}
// To apply styles if number of sibling items 'between' a range is present
.gallery > img:nth-last-child(n+4):nth-last-child(-n+7):first-child, .gallery > img:nth-last-child(n+4):nth-last-child(-n+7):first-child ~ img {
  width: 25%;
}
// To apply styles if 'exactly' number of provided items is present
.profiles:nth-last-child(4):first-child, .profiles:nth-last-child(4):first-child ~ .profiles {
      flex: 1 0 50%;
}
```

## 使用short插件来拓展简写属性

当你在写样式的时候，你可能有这样的遭遇，遇到一个属性的语法你会说：“这可以更简短一些的。”幸运的是，[Short插件](https://github.com/jonathantneal/postcss-short "short插件")帮助我们做了这样一件事：更有逻辑的编写样式。它让我们可以用简写的属性来写position和’size’，更像background和font被压缩成一个声明的方式。 <br/>
简写的声明会通过PostCSS的API被转换为浏览器可接受的样式，能使样式表在开发时更加简洁和有组织性。 <br/>
通过命令行安装Short:

```
npm i postcss-short -D
```

添加到你的处理器中：

```
var processors = [
  require('postcss-short')()
];
```

text属性包含了这些用于排版的属性：color, font-style, font-variant, font-weight, font-stretch, text-decoration, text-align, text-rendering, text-transform, white-space, font-size, line-height, letter-spacing, word-spacing and font-family. <br/>
这是开发环境的CSS：

```css
p {
  text: 300 uppercase dimgrey center 1.6rem 1.7 .05em;
}
```

这是转化后输出的CSS：

```
p {
  color: dimgrey;
  font-weight: 300;
  text-align: center;
  text-transform: uppercase;
  font-size: 25px;
  font-size: 1.6rem;
  line-height: 1.7;7
  letter-spacing: .05em;
}
```

position属性允许在一个声明中包含top,left,right,bottom。[这些值的顺序](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#Tricky_edge_cases "值的顺序")是按顺时针方向。如果有值不需要填写，只需要在该属性值的位置上写一个*即可。 <br/>
这是开发环境的css：

```css
section {
  position: absolute 10px * *;
}
.topNav {
  position: fixed 0 * * 0;
}
.modal {
  position: fixed 40% 25%;
}
```

这是转化后输出的css:

```css
section {
  position: absolute;
  top: 10px;
}
.topNav {
  position: fixed;
  top: 0;
  left: 0;
}
.modal {
  position: fixed;
  top: 40%;
  right: 25%;
  bottom: 40%;
  left: 25%;
}
```

## 这对我们的生产意味着什么？
而今使用PostCSS并且完全可以说出它的好处。你可以通过在你的构建工具中处理PostCSS来将其包含在你的工作流中，这更像是我们如何编译Sass和LESS。引入一个像PreCSS的插件能够让你写好的Sass项目可以在不需要任何语法转变的情况下投入PostCSS的怀抱。 <br/>
自我写这篇文章起，一个关于哪里是编写CSS的最好地方的讨论正在进行。当我们使用像[React](https://www.smashingmagazine.com/2016/04/consider-react-native-mobile-app/ "React")这样日渐流行的框架，[组件化编写样式](https://reactjs.org/docs/dom-elements.html "组件化编写样式")的想法势不可挡，它让我们直接使用javascript来转化样式。尽管这些现在更多的是一个讨论，这也确实是一个用PostCSS来转换样式的方法。 <br/>
另外一个在生产中兴风作浪的项目是[CSS模块化](https://github.com/css-modules/css-modules "CSS模块化")，它将样式范围拓展至本地文件并且可以按需加载。这个概念已经在javascript的圈子里很流行了。当前端语言诸如[React和JSX](https://reactjs.org/docs/jsx-in-depth.html "React和JSX")的界限持续变模糊，忽视CSS和javascript联合的力量是很难的。 <br/>
尽管PostCSS通过定制语法和属性这样全新的方式来拓展CSS，它对于想要顺畅的使用这种语言和它错综复杂的地方的初学者可能是一个挑战。如果你和一个新手开发者在一个项目中使用PostCSS，尝试去鼓励他们去深层次的理解这个语言并且理解PostCSS这样一个和Sass非常相像的生产工具是怎样让我们的样式更有效率的编写。

## 拥抱PostCSS
在将来的几年内，我们使用CSS的方式会有许多不同的方式。每个项目我们都会有不同的依赖，我们需要这些依赖去适配我们的生产方式。在一个像PostCSS这样模块化的生态系统中工作让我们可以选择我们想要完成项目所要用到的特性。 <br/>
我更乐意你去探索PostCSS的世界和所有已被支持的插件。因为这是一个社区项目，这个生态系统只能在人们使用它并且创造插件中成长。为了去探索更多的插件，可以查看NPM上的[可用包](https://www.npmjs.com/search?q=keywords:postcss-plugin "NPM上的可用包")，也可以在[PostCSS Playground](https://sneakertack.github.io/postcss-playground/ "PostCSS Playground")上测试插件的功能。