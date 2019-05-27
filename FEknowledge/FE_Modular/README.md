
* [基本用法](#基本用法)
* [绘制形状](#绘制形状)
  * [绘制矩形](#-绘制矩形)
  * [绘制路径](#-绘制路径)
    * [移点命令](#--移点命令)
    * [直线命令](#--直线命令)
    * [圆弧命令](#--圆弧命令)
    * [椭圆命令](#--椭圆命令)
    * [贝塞尔曲线命令](#--贝塞尔曲线命令)
    * [矩形命令](#--矩形命令)
  * [Path2D对象](#-Path2D对象)
* [样式与颜色](#样式与颜色)
  * [颜色](#-颜色)
  * [整体透明度](#-整体透明度)
  * [线型](#-线型)
  * [渐变](#-渐变)
  * [图案](#-图案)
  * [阴影](#-阴影)
* [绘制文本](#绘制文本)
* [使用图片](#使用图片)
* [变形](#变形)
  * [移动](#-移动)
  * [旋转](#-旋转)
  * [缩放](#-缩放)
  * [变形](#-变形)
* [合成与裁剪](#合成与裁剪)
  * [合成](#-合成)
  * [裁剪](#-裁剪)
* [动画](#动画)
* [像素操作](#像素操作)
* [与SVG对比一下](#与SVG对比一下)

# 前言

我们在平常开发时，在代码中经常会碰到：
```js
  require('xxxxxx');
```
或者是:
```js
  import xxx form 'xxx';
```

大家都知道这是引入模块，是前端的模块化。但同样都是引入模块，它们为什么不一样呢？什么地方用 require 而什么地方有用 import 呢？

那么今天我们一起来探讨学习一下！

# 前端模块化

在JavaScript发展**初期**。

为了实现简单的页面交互逻辑，js代码寥寥数语即可；但是如今CPU、浏览器性能都得到了极大的提升，很多的页面逻辑处理都迁移到了客户端，这就造成了前端代码的逐渐庞大和复杂。

而当js项目的复杂度变大后，开发者就需要组织（复用、依赖等等）这些复杂的代码。遗憾的是当时的js并没有像Java的package这样的模块化，可是就连css都有@import...

所以js开发者急需模拟出类似的功能，来隔离、组织复杂的Javascript代码，即我们称为前端模块化。

<hr/>

> 在我们刚接触前端的时候，经常会听说 前端模块化，或许很多人都可以说出几个熟悉的名词，比如：

* **立即执行函数** （IIFE [Immediately Invoked Function Expression]）
* **Common.js**
* **AMD**
* **CMD**
* **ES6 Module**

现在就让我们从十年前开始，来看看模块化是怎么一步步完善的：

# IIFE

IIFE 即 立即执行函数，其实平常很多人都用过 IIFE，也知道它是怎么回事，但这里我们仍旧来认识解释一下它：


最开始，我们对于模块区分的概念，可能是从文件的区分开始的，在一个简易的项目中，编程的习惯是通过一个 HTML 文件加上若干个 JavaScript 文件来区分不同的模块，就像这样：

<p align="center">
    <img src="https://github.com/jimwong666/FEstart/blob/master/FEknowledge/FE_Modular/images/iife_0.jpg" alt="IIFE">
</p>

我们可以通过这样一个简单的项目来说明，来看看每个文件里面的内容：

**demo.html**

这个文件，只是简单的引入了其他的几个 JavaScript 文件：

```html
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>demo</title>
  </head>
  <script src="main.js"></script>
  <script src="header.js"></script>
  <script src="footer.js"></script>
  
  <body></body>
  
  </html>
```

**其他三个 JavaScript 文件**

在不同的 js 文件中我们定义了不同的变量，分别对应文件名：

```js
  var header = '这是一条顶部信息' //header.js
  var main_message = '这是一条内容信息'   //main.js
  var main_error = '这是一条错误信息'   //main.js
  var footer = '这是一条底部信息' //footer.js
```

像这样通过不同的文件来声明变量的方式，实际上无法将这些变量区分开来。

它们都绑定在全局的 window / Global(node 环境下的全局变量) 对象上，尝试去打印验证一下：

<p align="center">
    <img src="https://github.com/jimwong666/FEstart/blob/master/FEknowledge/FE_Modular/images/iife_1.png" alt="IIFE">
</p>

你可能没有意识到这会导致什么严重的结果，我们试着在 footer.js 中对 **header** 变量进行赋值操作，让我们在末尾加上这样一行代码：

```js
  header = 'nothing';
```

打印后你就会发现，window.header 的已经被更改了:

<p align="center">
    <img src="https://github.com/jimwong666/FEstart/blob/master/FEknowledge/FE_Modular/images/iife_2.jpg" alt="IIFE">
</p>

试想一下如果这是在一个团队中，这是一件多么可怕的事情啊...

现在我们知道，仅仅通过不同的文件，我们无法做到将这些变量分开，因为它们都被绑在了同一个 window 变量上。

那我们怎么去解决呢？

我们都知道，在 JavaScript 中，**函数拥有自己的作用域** 的，也就是说，如果我们可以用一个函数将这些变量包裹起来，那这些变量就不会直接被声明在全局变量 window 上了：

所以现在 main.js 的内容会被修改成这样：

```js
  function mainWarraper() {
    var main_message = '这是一条内容信息' //main.js
    var main_error = '这是一条错误信息' //main.js
    console.log('error:', main_error)
  }
  
  mainWarraper();
```

为了确保我们定义在函数 mainWarraper 的内容会被执行，所以我们必须在这里执行 mainWarraper() 本身，现在我们在 window 里面找不到 main_message 和 main_error 了，因为它们被隐藏在了 mainWarraper 中，但是 mainWarraper 仍旧污染了我们的 window（mainWarraper仍然挂在window对象下）：

<p align="center">
    <img src="https://github.com/jimwong666/FEstart/blob/master/FEknowledge/FE_Modular/images/iife_3.jpg" alt="IIFE">
</p>

这个方案还不够完美，怎么改进呢？

答案就是我们要说的 IIFE，我们可以定义一个 **立即执行的匿名函数** 来解决这个问题：

```js
  (function() {
    var main_message = '这是一条内容信息' //main.js
    var main_error = '这是一条错误信息' //main.js
    console.log('error:', main_error)
  })()
```

因为是一个匿名的函数，执行完后很快就会被释放，这种机制不会污染全局对象。

虽然看起来有些麻烦，但它确实解决了我们将变量分离开来的需求，不是吗？然而在今天，几乎没有人会用这样方式来实现模块化编程。

后来又发生了什么呢？

# CommonJS

在 2009 年的一个冬天， 一名来自 Mozilla 团队的的工程师 Kevin Dangoor 开始捣鼓了一个叫 ServerJS 的项目，他是这样描述的：

"What I’m describing here is not a technical problem. It’s a matter of people getting together and making a decision to step forward and start building up something bigger and cooler together."

"在这里我描述的不是一个技术问题。 这是一个关于大家齐心合力，做出决定向前迈进，并且开始一起建造一些更大更酷的东西的问题。"

这个项目在 2009 年的 8 月份更名为今日我们熟悉的 CommonJS 以显示 API 更广泛的适用性。我觉得那时他可能并没有料到，这一规则的制定会让整个前端发生翻天覆地的变化。

CommonJS 在 [Wikipedia](https://en.wikipedia.org/wiki/CommonJS "Wikipedia") 中是这样描述的：

> CommonJS is a project with the goal to establish conventions on module ecosystem for JavaScript outside of the web browser. The primary reason of its creation was a major lack of commonly accepted form of JavaScript scripts module units which could be reusable in environments different from that provided by a conventional web browser e.g. web server or native desktop applications which run JavaScript scripts.

> CommonJS 是一个旨在 Web 浏览器之外，为 JavaScript 建立模块生态系统的约定的项目。 其创建的主要原因是缺乏普遍接受的 JavaScript 脚本模块单元形式，而这一形式可以让 JavaScript 在不同于传统网络浏览器提供的环境中重复使用，例如， 运行 JavaScript 脚本的 Web 服务器或本机桌面应用程序。

通过上面这些描述，相信你已经知道 CommonJS 是诞生于怎样的背景，但是这里所说的 **CommonJS 是一套通用的规范，与之对应的有非常多不同的实现**：

<p align="center">
    <img src="https://github.com/jimwong666/FEstart/blob/master/FEknowledge/FE_Modular/images/commonjs_0.jpg" alt="CommonJS">
	CommonJS不同的实现
</p>

但是我们关注的是其中 [Node.js 的实现部分](https://nodejs.org/docs/latest/api/modules.html  'CommonJS的node.js的实现')。

### Node.js Modules

> 这里不会解释 Node.js Modules 的 API 基本用法，因为这些都可以通过阅读 [官方文档](https://nodejs.org/docs/latest/api/modules.html#modules_modules "Node.js Modules") 来了解，我们会讨论为什么会这样设计，以及大家比较难理解的点来展开。

在 Node.js 模块系统中，每个文件都被视为一个单独的模块，在一个Node.js 的模块中，本地的变量是私有的，而这个私有的实现，是通过把 Node.js 的模块包装在一个函数中，也就是 The module wrapper，我们来看看，在 [官方示例中](https://nodejs.org/docs/latest/api/modules.html#modules_the_module_wrapper "官方示例") 它长什么样：

```js
  (function(exports, require, module, __filename, __dirname) {
  // Module code actually lives in here
  // 实际上，模块内的代码被放在这里
  });
```

是的，在模块内的代码被真正执行以前，实际上，这些代码都被包含在了一个这样的函数中。

如果你真正阅读了上一节中关于 IIFE 的内容，你会发现，其实核心思想是一样的，Node.js 对于模块私有化的实现也还是通过了一个函数。但是这有哪些不同呢？

虽然这里有 5 个参数，但是我们把它们先放在一边，然后尝试站在一个模块的角度来思考这样一个问题：作为一个模块，你希望自己具备什么样的能力呢?

1. **暴露部分自己的方法或者变量的能力** ：这是我存在的意义，因为，对于那些想使用我的人而言这是必须的。[ exports:导出对象 , module:模块的引用 ] 
2. **引入其他模块的能力**：有的时候我也需要通过别人的帮助来实现一些功能，只把我的注意力放在我想做的事情（核心逻辑）上。[ require:引用方法 ]
3. **告诉别人我的物理位置**：方便别人找到我，并且对我进行更新或者修改。[ __filename:绝对文件名, __dirname:目录路径 ]

### Node.js Modules 中 require 的实现

为什么我们要了解 require 方法的实现呢？因为理解这一过程，我们可以更好地理解下面的几个问题：

1. 当我们引入一个模块的时候，我们究竟做了怎样一件事情？
2. **exports** 和 **module.exports** 有什么联系和区别？
3. 这样的方式有什么弊端？

在文档中，有简易版的 **require** 的实现：

```js
  function require(/* ... */) {
    const module = { exports: {} };
    ((module, exports) => {
      // Module code here. In this example, define a function.
      // 模块代码在这里，在这个例子中，我们定义了一个函数
      function someFunc() {}
      exports = someFunc;
      // At this point, exports is no longer a shortcut to module.exports, and
      // this module will still export an empty default object.
      // 当代码运行到这里时，exports 不再是 module.exports 的引用，并且当前的
      // module 仍旧会导出一个空对象(就像上面声明的默认对象那样)
      module.exports = someFunc;
      // At this point, the module will now export someFunc, instead of the
      // default object.
      // 当代码运行到这时，当前 module 会导出 someFunc 而不是默认的对象
    })(module, module.exports);
    return module.exports;
  }
```

**1. require 做了怎样一件事情?**
require 相当于把被引用的 module 拷贝了一份到当前 module 中

**2. exports 和 module.exports 的联系和区别？**
代码中的注释以及 require 函数第一行默认值的声明，很清楚的阐述了，exports 和 module.exports 的区别和联系:

exports 是 module.exports 的引用。作为一个引用，如果我们修改它的值，实际上修改的是它对应的引用对象的值。

就如:

```js
  exports.a = 1
  // 等同于
  module.exports = {
      a: 1
  }
```

但是如果我们修改了 exports 引用的地址，对于它原来所引用的内容来说，没有任何影响，反而我们断开了这个引用于原来的地址之间的联系：

```js
  exports = {
      a: 1
  }
  
  // 相当于
  
  let other = {a: 1} //为了更加直观，我们这样声明了一个变量
  exports = other
```

exports 从指向 module.exports 变为了 other。

**3. 弊端**

CommonJS 这一标准的是为了让 JavaScript 在多个环境下实现模块化。

> **插一句：**
> 
> 有人就会问require是为node.js设计的。需要依赖了 Node.js 的环境变量：module，exports，require，global。浏览器没法用啊！
> 
> 但是我们发现，前端代码中是见过require("xxx")的，这是为什么？？？
>
> 因为后来出现了 Browserify 这样的实现。有兴趣的同学可以读读阮一峰老师的 [这篇文章](http://www.ruanyifeng.com/blog/2015/05/commonjs-in-browser.html "Browserify")。
>
> 这样CommonJS就通吃啦~！

说完了**服务端的模块化**，接下来我们聊聊，在**浏览器端的模块化**，又经历了些什么呢？
