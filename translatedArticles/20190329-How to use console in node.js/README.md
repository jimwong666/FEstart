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
 * [console.trace(label)](#consoletracelabel)
 * [console.count(label)](#consolecountlabel)
 * [console.countReset(label)](#consolecountResetlabel)
 * [console.time(label) 和 console.timeEnd(label)](#consoletimelabel和consoletimeEndlabel)
 * [结论](#结论)
 * [反馈](#反馈)

------------------------------------------------------------------------------------------------


## 介绍

> 在本文中，我们将会学习更有效的使用nodeJS的console类中可用的大多数方法。为了演示，我们将使用版本为70.0.3538.77的Chrome浏览器和版本为8.11.3的nodeJS。<br/>
> 
> 好的，让我们开始吧~！<br/>


## console.log，console.info和console.debug

```js
  console.log(string, substitution)
```

尽管著名的console.log方法的确出名的不需要介绍，但你会很高兴认识在操作上与console.log相同的console.info和console.debug方法。<br/>
默认情况下，您可以在[Firefox](https://www.mozilla.org/en-US/firefox/?v=a "Firefox")浏览器控制台中使用console.debug，但要在[Chrome](https://www.google.com/chrome/ "Chrome")中使用它，您必须将日志级别设置为详细。<br/>

<p align="center">
<img src="https://scotch-res.cloudinary.com/image/upload/dpr_1,w_800,q_auto:good,f_auto/v1541946130/ria8tkpfa6xookpoqais.png" alt="chrome设置控制台console">
</p>

console.log方法打印到标准输出，无论是终端还是浏览器控制台。
它默认输出字符串，但可以与模板字符串结合使用来修改它返回的内容。<br/>

这是它的工作原理：<br/>

模板字符串中的参数传递给[util.format](https://nodejs.org/api/util.html#util_util_format_format_args "util.format")，然后[util.format](https://nodejs.org/api/util.html#util_util_format_format_args "util.format")通过用相应的转换值替换每个替换标记来处理参数。支持的替换tokens是：<br/>

### %s

```js
  const msg = `Using the console class`;
  console.log('%s', msg); // Using the console class
  console.log(msg); // Using the console class
```

％s是默认替换模式。

### %d, %f, %i, %o

```js
  const circle = (radius = 1) => {
    const profile = {};
    const pi = 22/7;
    profile.diameter = 2*pi*radius;
    profile.circumference = pi*radius*2;
    profile.area = pi*radius^2;
    profile.volume = 4/3*pi*radius^3;
  
    console.log('This circle has a radius of: %d cm', radius);
    console.log('This circle has a circumference of: %f cm',   profile.diameter);
    console.log('This circle has an area of: %i cm^2', profile.area);
    console.log('The profile of this cirlce is: %o', profile);
    console.log('Diameter %d, Area: %f, Circumference %i',   profile.diameter, profile.area, profile.circumference)
  }

  circle();
```

* ％d将被数字（整数或浮点数）代替。<br/>
* ％f将被浮点值替换。<br/>
* ％i将被整数替换。<br/>
* ％o将被Object替换。<br/>

％o特别方便，因为我们不必使用JSON.stringify来扩展我们的对象，因为它默认显示所有对象的属性。<br/>

请注意，您可以根据需要使用任意数量的令牌替换。它们将被替换为与您传递的参数相同的顺序。<br/>

### %c

此替换标记将css样式应用于替换文本。<br/>

```js
  console.log('LOG LEVEL: %c OK', 'color: green; font-weight: normal');
  console.log('LOG LEVEL: %c PRIORITY', 'color: blue; font-weight: medium');
  
  console.log('LOG LEVEL: %c WARN', 'color: red; font-weight: bold');
  console.log('ERROR HERE');
```

实际效果。

<p align="center">
<img src="https://scotch-res.cloudinary.com/image/upload/dpr_1,w_700,q_auto:good,f_auto/v1541949197/ilnhnn55xl0cksjthuri.png" alt="chrome设置控制台console内容颜色">
</p>

在上面，我们注意到在％c替换标记之后传递给console.log的文本受样式影响，但之前的文本保留原样而没有样式。

## console.table

传递给它的第一个参数是以表格形式返回的数据。第二个是要显示的选定列数组。

```js
  console.table(tabularData, [properties])
```

此方法将打印传递给它的输入格式化为表格，然后在表格表示后记录输入对象。

### Arrays

如果将数组作为数据传递给它，则数组中的每个元素都将是表中的一行。

```js
  const books = ['The Silmarillion', 'The Hobbit', 'Unfinished Tales'];
  console.table(books);
```

<p align="center">
<img src="https://scotch-res.cloudinary.com/image/upload/dpr_1,w_850,q_auto:good,f_auto/v1540842103/bpdc5kzcyyigccp3qovj.png" alt="chrome设置控制台console为table样式">
</p>

对于深度为1的简单数组，表中的第一列具有标题索引。在第一列中的索引标题下是数组索引，数组中的项列在值标题下的第二列中。<br/>

这就是嵌套数组的情况。<br/>

```js
  const authorsAndBooks = [['Tolkien', 'Lord of The Rings'],['Rutger', 'Utopia For Realists'], ['Sinek', 'Leaders Eat Last'], ['Eyal', 'Habit']];
  console.table(authorsAndBooks);
```

<p align="center">
<img src="https://scotch-res.cloudinary.com/image/upload/dpr_1,w_850,q_auto:good,f_auto/v1541950585/oh8q47fvdvvabmbzxmzl.png" alt="chrome设置控制台console为table样式">
</p>

### Objects

对于深度为1的对象，对象键将在索引标题下列出，对象中的值列在第二列标题下。

```js
  const inventory = { apples: 200, mangoes: 50, avocados: 300,   kiwis: 50 };
  console.table(inventory);
```

<p align="center">
<img src="https://scotch-res.cloudinary.com/image/upload/dpr_1,w_850,q_auto:good,f_auto/v1541950904/vy5iqptgmr6evf1xjov1.png" alt="chrome设置控制台console为table样式">
</p>

对于嵌套的对象：

```js
const forexConverter = { 
    asia: { 
      rupee: 1.39, 
      renminbi: 14.59, 
      ringgit: 24.26 
    }, 
    africa: { 
      rand: 6.49, 
      nakfa: 6.7 , 
      kwanza:0.33 
    }, 
    europe: {   
      swissfranc: 101.60, 
      gbp: 130, 
      euro: 115.73 
    } 
  };
console.table(forexConverter);
```

<p align="center">
<img src="https://scotch-res.cloudinary.com/image/upload/dpr_1,w_850,q_auto:good,f_auto/v1540842194/wa9eiu5vbndsj1cptvdl.png" alt="chrome设置控制台console为table样式">
</p>

更多的嵌套对象：

```js
const workoutLog = { 
    Monday: { 
        push: 'Incline Bench Press', 
        pull: 'Deadlift'
      },    
      Wednesday: { 
        push: 'Weighted Dips', 
        pull: 'Barbell Rows'
      }
  };
console.table(workoutLog);
```

<p align="center">
<img src="https://scotch-res.cloudinary.com/image/upload/dpr_1,w_850,q_auto:good,f_auto/v1540842251/jtmhrtv4fzt2kpmsgx0s.png" alt="chrome设置控制台console为table样式">
</p>

在这里，我们指定我们只想在名为“push”的列下查看数据。

```js
  console.table(workoutLog, 'push');
```

<p align="center">
<img src="https://scotch-res.cloudinary.com/image/upload/dpr_1,w_850,q_auto:good,f_auto/v1540842288/w4zbyeuf2tvy3f6lzy6p.png" alt="chrome设置控制台console为table样式">
</p>

要对列下的数据进行排序，只需单击列标题即可。非常方便，你说对不？<br/>

> 尝试给console.table传递一个将数组作为值的对象！

## console.dir

传递给此函数的第一个参数是要记录的对象，而第二个参数是包含选项的对象，这些选项将定义结果输出的填充方式或对象中的哪些属性将显示。<br/>
返回的是由node的[util.inspect](https://nodejs.org/api/util.html#util_util_inspect_object_options "util.inspect")函数格式化的对象。<br/>
输入console.dir内的对象、嵌套对象或子对象在点击露出的三角形是会下拉展开的。

```js
  console.dir(object, options);
  // where options = { showHidden: true ... }
```

让我们在实际应用中看一下：

```js
const user = {
  details: {
    name: {
      firstName: 'Immanuel',
      lastName: 'Kant'
    },
    height: `1.83m"`,
    weight: '90kg',
    age: '80',
    occupation: 'Philosopher',
    nationality: 'German',
    books: [
      {
        name: 'Critique of Pure Reason',
        pub: '1781',
      },
      {
        name: 'Critique of Judgement',
        pub: '1790',
      },
      {
        name: 'Critique of Practical Reason',
        pub: '1788',
      },
      {
        name: 'Perpetual Peace',
        pub: '1795',
      },
    ],
    death: '1804'
  }
}

console.dir(user);
```

这是在Chrome控制台中:

<p align="center">
<img src="https://scotch-res.cloudinary.com/image/upload/dpr_1,w_900,q_auto:good,f_auto/v1542389099/qn8hqajejxtxi7usaras.png" alt="chrome设置控制台console为可展开的对象">
</p>

## console.dirxml

此函数将呈现传递的XML / HTML的交互式树。如果无法呈现节点树，则默认为Javascript对象。

```js
  console.dirxml(object|nodeList);
```

与console.dir非常相似，可以通过单击显示三角形来展开渲染树，您可以在其中查看子节点。<br/>
它的输出类似于我们在浏览器的Elements选项卡下找到的输出。<br/>
下面这是我们从维基百科页面传入一些HTML时的样子。

<p align="center">
<img src="https://scotch-res.cloudinary.com/image/upload/dpr_1,w_900,q_auto:good,f_auto/v1542443423/wodvdxbi7e7bmoc4r8rp.png" alt="chrome设置控制台console为可展开的渲染树">
</p>

让我们从本网站的页面传递一些HTML。

<p align="center">
<img src="https://scotch-res.cloudinary.com/image/upload/dpr_1,w_900,q_auto:good,f_auto/v1542443650/pvcu0gj6oplqg1tlh0bn.png" alt="chrome设置控制台console为可展开的渲染树">
</p>

下面这是我们传入一个对象时的样子。

<p align="center">
<img src="https://scotch-res.cloudinary.com/image/upload/dpr_1,w_900,q_auto:good,f_auto/v1542443062/sn0tjtxmrsftuamr6wbu.png" alt="chrome设置控制台console为可展开的对象">
</p>

> 尝试在某些HTML上调用console.dir，看看会发生什么！

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

