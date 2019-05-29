- [前言](#%E5%89%8D%E8%A8%80)
- [前端模块化](#%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96)
- [IIFE](#iife)
- [CommonJS](#commonjs)
    - [Node.js Modules](#nodejs-modules)
    - [Node.js Modules 中 require 的实现](#nodejs-modules-%E4%B8%AD-require-%E7%9A%84%E5%AE%9E%E7%8E%B0)
- [RequireJS & AMD（Asynchronous Module Definition）](#requirejs--amdasynchronous-module-definition)
    - [优势](#%E4%BC%98%E5%8A%BF)
    - [新的问题](#%E6%96%B0%E7%9A%84%E9%97%AE%E9%A2%98)
- [SeaJS & CMD（Common Module Definition）](#seajs--cmdcommon-module-definition)
    - [闪光点](#%E9%97%AA%E5%85%89%E7%82%B9)
    - [仍然存在的问题](#%E4%BB%8D%E7%84%B6%E5%AD%98%E5%9C%A8%E7%9A%84%E9%97%AE%E9%A2%98)
- [ECMAScript6 Module](#ecmascript6-module)
    - [特点：](#%E7%89%B9%E7%82%B9)
- [总结](#%E6%80%BB%E7%BB%93)

<hr/>  

# 前言

我们在平常开发时，在代码中经常会碰到：
```js
  require('xxxxxx');
```
或者是:
```js
  import xxx form 'xxx';
```

大家都知道这是引入模块，是前端的模块化。但同样都是引入模块，require 和 import 有啥不一样？

那么今天我们一起来探讨学习一下！

<hr/>  

# 前端模块化

在JavaScript发展**初期**。

为了实现简单的页面交互逻辑，js代码寥寥数语即可；但是如今CPU、浏览器性能都得到了极大的提升，很多的页面逻辑处理都迁移到了客户端，这就造成了前端代码的逐渐庞大和复杂。

而当js项目的复杂度变大后，开发者就需要组织（代码块之间相互依赖等等）这些复杂的代码。遗憾的是当时的js并没有像 Ruby 的require、Python 的import这样的东西。可是连 CSS 都有@import啊！！可怜的js...

所以js开发者急需模拟出类似的功能，来隔离、组织复杂的Javascript代码，即我们称为前端模块化。

<hr/>

> 在我们刚接触前端的时候，经常会听说 前端模块化，或许很多人都可以说出几个熟悉的名词，比如：

* **立即执行函数** （IIFE [Immediately Invoked Function Expression]）
* **Common.js**
* **AMD**
* **CMD**
* **ES6 Module**

现在就让我们来看看前端模块化是怎么一步步完善的：

<hr/>  

# IIFE

IIFE 即 立即执行函数，其实平常很多人都用过 IIFE，也知道它是怎么回事，但这里我们仍旧来认识一下它：


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

试想一下如果这是在一个团队中，哦豁，完球了！

现在我们知道，仅仅通过不同的文件，我们无法做到将这些变量分开，因为它们都被绑在了同一个 window 变量上。
那我们怎么去解决呢？

我们都知道，在 JavaScript 中，**函数拥有自己的作用域** 的，也就是说，如果我们可以用一个函数将这些变量包裹起来，那这些变量就不会直接被声明在全局变量 window 上了：

所以现在 main.js 的内容会被修改成这样：

```js
  function main() {
    var main_message = '这是一条内容信息' //main.js
    var main_error = '这是一条错误信息' //main.js
    console.log('error:', main_error)
  }
  
  main();
```

为了确保我们定义在函数 main 的内容会被执行，所以我们必须在这里执行 main() 本身，现在我们在 window 里面找不到 main_message 和 main_error 了，因为它们被隐藏在了 main 中，但是 main 仍旧污染了我们的 window（main仍然挂在window对象下啊！）：

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

优点：

* 就是简单，用就完事了

然而在今天，几乎没有人会用这样方式来实现模块化编程。
后来又发生了什么呢？

<hr/>  

# CommonJS

在 2009 年的一个冬天， 一名来自 Mozilla 团队的的工程师 Kevin Dangoor 开始捣鼓了一个叫 ServerJS 的项目，他是这样描述的：

"What I’m describing here is not a technical problem. It’s a matter of people getting together and making a decision to step forward and start building up something bigger and cooler together."

"在这里我描述的不是一个技术问题。 这是一个关于大家齐心合力，做出决定向前迈进，并且开始一起建造一些更大更酷的东西的问题。"

这个项目在 2009 年的 8 月份更名为今日我们熟悉的 CommonJS 以显示 API 更广泛的适用性。我觉得那时他可能并没有料到，这一规则的制定会让整个前端发生翻天覆地的变化。

CommonJS 在 [Wikipedia](https://en.wikipedia.org/wiki/CommonJS "Wikipedia") 中是这样描述的：

> CommonJS is a project with the goal to establish conventions on module ecosystem for JavaScript outside of the web browser. The primary reason of its creation was a major lack of commonly accepted form of JavaScript scripts module units which could be reusable in environments different from that provided by a conventional web browser e.g. web server or native desktop applications which run JavaScript scripts.

> CommonJS 是一个旨在 **Web 浏览器之外**，为 JavaScript 建立模块生态系统的约定的项目。 其创建的主要原因是缺乏普遍接受的 JavaScript 脚本模块单元形式，而这一形式可以让 JavaScript 在不同于传统网络浏览器提供的环境中重复使用，例如， 运行 JavaScript 脚本的 Web 服务器或本机桌面应用程序。

通过上面这些描述，相信你已经知道 CommonJS 是诞生于怎样的背景，但是这里所说的 **CommonJS 是一套通用的规范，与之对应的有非常多不同的实现**：

<p align="center">
    <img src="https://github.com/jimwong666/FEstart/blob/master/FEknowledge/FE_Modular/images/commonjs_0.jpg" alt="CommonJS"> 
</p>

但这其中**最受关注**的是其中 [Node.js 的实现部分](https://nodejs.org/docs/latest/api/modules.html  'CommonJS的node.js的实现')。下面我们来看看。

<hr/>

### Node.js Modules

在 [Node.js 模块系统](https://nodejs.org/docs/latest/api/modules.html#modules_modules "Node.js 模块系统")中，每个文件都被视为一个单独的模块，在一个Node.js 的模块中，本地的变量是私有的，而这个私有的实现，是通过把 Node.js 的模块包装在一个函数中，也就是 The module wrapper，我们来看看，在 [官方示例中](https://nodejs.org/docs/latest/api/modules.html#modules_the_module_wrapper "官方示例") 它长什么样：

```js
  (function(exports, require, module, __filename, __dirname) {

  // 从参数 exports, require, module, __filename, __dirname 可以看出，这玩意儿是服务于nodejs的...

  // 实际上，模块内的代码被放在这里

  });
```

用的时候：

```js
// a.js
module.exports = "xxx";

// b.js
const a = require("./a");
```

在模块内的代码被真正执行以前，实际上，这些代码都被包含在了一个这样的函数中。

如果你真正阅读了上一节中关于 IIFE 的内容，你会发现，其实核心思想是一样的，Node.js 对于模块私有化的实现也还是通过了一个函数。但是这有哪些不同呢？

虽然这里有 5 个参数，但是我们把它们先放在一边，然后尝试站在一个模块的角度来思考这样一个问题：作为一个模块，你希望自己具备什么样的能力呢?

1. **暴露部分自己的方法或者变量的能力** ：这是我存在的意义，因为，对于那些想使用我的人而言这是必须的。**（exports:导出对象 , module:模块的引用）**
   
2. **引入其他模块的能力**：有的时候我也需要通过别人的帮助来实现一些功能，只把我的注意力放在我想做的事情（核心逻辑）上。**（require:引用方法 ）**
   
3. **告诉别人我的物理位置**：方便别人找到我，并且对我进行更新或者修改。**（__filename:绝对文件名, __dirname:目录路径）**

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

      // 当代码运行到这里时，exports 不再是 module.exports 的引用，并且当前的
      // module 仍旧会导出一个空对象(就像上面声明的默认对象那样)

      module.exports = someFunc;

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

就如这样:

```js
  var a = {
    key: 1
  }

  ;(function(b){
    b.key = 2
  })(a)

  a //{ key: 2 }
```

与这样：

```js
  var a = {
    key: 1
  }

  ;(function(b){
    b = {
      value: 3
    }
  })(a)

  a //{ key: 1 }
```

exports 从指向 module.exports 变为了 other。

**3. 不足**

* CommonJS 这一标准的是为了让 JavaScript 在多个环境下实现模块化。它服务于node.js，所以需要依赖 Node.js 的环境变量：module，exports，require，global。这样的话浏览器根本没法用啊！真可惜...
* 就算浏览器能用。但是你看到代码 ``exports = someFunc;  module.exports = someFunc;`` 了吗？他实际上是做了复制，但是在我们还没有完成复制的时候，无法使用被引用的模块中的方法和属性。这种同步的方式也不适合浏览器啊！而且一次只能加载一个，不能并行加载。

> **插一句：**
> 
> 幸运的时我们发现，前端代码中是见过require("xxx")的，这是为什么？？？
>
> 因为后来出现了 Browserify 这样的实现。有兴趣的同学可以读读阮一峰老师的 [这篇文章](http://www.ruanyifeng.com/blog/2015/05/commonjs-in-browser.html "Browserify")。
>
> 这样CommonJS就通吃啦~！（那么问题来了！它是怎么处理同步问题的...？     好吧...Browserify 是需要打包的，又不是直接用的...）
>
> **那我们来看一下Browserify的小例子吧！（见/CommonJS-browserify/文件夹下面的代码）**

说完了**服务端的模块化**，接下来我们聊聊，在**浏览器端的模块化**，又经历了些什么呢？

<hr/>  

# RequireJS & AMD（Asynchronous Module Definition）

> 试想一下，假如我们现在是在浏览器环境下，使用类似于 Node.js Module 的方式来管理我们的模块（例如 Browserify)，会有什么样的问题呢？

因为我们已经了解了 require() 的实现，所以你会发现这其实是一个复制的过程，将被 require 的内容，赋值到一个 module 对象的属性上，然后返回这个对象的 exports 属性。

这样做会有什么问题呢？在我们还没有完成复制的时候，无法使用被引用的模块中的方法和属性。在服务端可能这不是一个问题(因为服务器的文件都是存放在本地，并且是有缓存的)，但在浏览器环境下（网络请求文件有延迟），这会导致阻塞，使得我们后面的步骤无法进行下去，还可能会执行一个未定义的方法而导致出错。

相对于服务端的模块化，浏览器环境下，模块化的标准必须满足一个新的需求：**异步的模块管理**

在这样的背景下，[RequireJS](https://requirejs.org/docs/api.html "RequireJS") 出现了，我们简单的了解一下它最核心的部分：

* 引入其他模块：require()
* 定义新的模块：define()

看一个AMD简单的例子：

```js
  define('math',['jquery'], function ($) {
    // 其他代码
  
    return {
      add: function(x,y){
        return x + y;
      }
    };
  });
  
  require(['jquery','math'], function ($,math) {
    console.log(math.add(10,100));//110
  });
```

### 优势

RequireJS 是基于 [AMD 规范](https://github.com/amdjs/amdjs-api/wiki/AMD "AMD规范") 实现的，那么相对于 Node.js 的 Module 它有什么优势呢?

* 以函数的形式返回模块的值，尤其是构造函数，可以更好的实现API 设计，Node 中通过 module.exports 来支持这个，但使用 "return function (){}" 会更清晰。这意味着，我们不必通过处理 “module” 来实现 “module.exports”，它是一个更清晰的代码表达式。
* **动态代码加载**（在AMD系统中通过require（['xx1','xx2']，function（xxx,xxx）{}），并且可以并行加载多个模块（不过由于异步加载，xx1和xx2模块加载顺序不一定哦）。
* 等等

**那我们来看一下 RequireJS 的小例子吧！（见/AMD-requirejs/文件夹下面的代码）**

### 新的问题

通过上面的语法说明，我们会发现一个很明显的问题，在使用 RequireJS 声明一个模块时，必须指定所有的依赖项 ，这些依赖项会被当做形参传到 factory 中，对于依赖的模块会提前执行（在 RequireJS 2.0 也可以选择延迟执行），这被称为：依赖前置。

这会带来什么问题呢？

加大了开发过程中的难度，无论是阅读之前的代码还是编写新的内容，也会出现这样的情况：引入的另一个模块中的内容是条件性执行的（就是事先引入的模块不一定执行，这不是浪费嘛!）。

<hr/>  

# SeaJS & CMD（Common Module Definition）

针对 AMD 规范中可以优化的部分，[CMD 规范](https://github.com/cmdjs/specification/blob/master/draft/module.md "CMD规范") 出现了，而 SeaJS 则作为它的具体实现之一，与 AMD 十分相似：

```js
// AMD 的一个例子，当然这是一种极端的情况
  define('amd',["header", "main", "footer"], function(header, main, footer) { 
      if (xxx) {
        header.setHeader('new-title')
      }
      if (xxx) {
        main.setMain('new-content')
      }
      if (xxx) {
        footer.setFooter('new-footer')
      }
  });
  
   // 与之对应的 CMD 的写法
  define(function(require, exports, module) {
      if (xxx) {
        var header = require('./header')
        header.setHeader('new-title')
      }
      if (xxx) {
        var main = require('./main')
        main.setMain('new-content')
      }
      if (xxx) {
        var footer = require('./footer')
        footer.setFooter('new-footer')
      }
  });
```

看一个CMD简单的例子：

```js
  // 定义模块  myModule.js
  define(function(require, exports, module) {
    var $ = require('jquery.js')
    $('div').addClass('active');
    module.exports = {
      data: 1
    };
    
    // exports = { // seajs可以有多种方式导出
    //   data: 1
    // };
    // return {
    //   data: 1
    // };
  });
  
  // 加载模块
  seajs.use(['myModule.js'], function(my){
      var star= my.data;
      console.log(star);  //1
  });
```

### 闪光点
* **依赖就近-延迟执行** 这正是CMD所推崇的。只有当我们用到了某个外部模块的时候，它才会去引入。这解决了我们上一小节中遗留的问题。
* 当你看到 ``require();  module.exports = {};`` 的时候，是不是有一种似曾相识的感觉，对！没错！与 requirejs 怎么这么像啊！！所以它与 CommonJS 的 Node.js Modules 规范保持了很大的兼容性。

**那我们来看一下 SeaJS 的小例子吧！（见/CMD-seajs/文件夹下面的代码）**

### 仍然存在的问题

我们能够看到，按照 CMD 规范的依赖就近的规则定义一个模块，会导致模块的**加载逻辑偏重**，有时你并不知道当前模块具体依赖了哪些模块或者说这样的**依赖关系并不直观**。
而且对于 AMD 和 CMD 来说，都只是适用于**浏览器端**的规范，而 Node.js module 仅仅适用于**服务端**，都有各自的局限性。

<hr/>  

# ECMAScript6 Module

ECMAScript6 标准增加了 JavaScript 语言层面的模块体系定义，作为浏览器和服务器通用的模块解决方案它可以取代我们之前提到的 AMD ，CMD ,CommonJS。适用于前后端。

关于 ES6 的 Module 相信大家每天的工作中都会用到，对于使用上有疑问可以看看 [ES6 Module 入门，阮一峰](http://es6.ruanyifeng.com/#docs/module "ES6 Module 入门")

示例：

```js
  // a.js
  export function show() {
    // balabala
  }

  // b.js
  import {show} from "./a" ;
  show();
  // 或者
  import * as all from "./a" ;
  all.show();
```

**那我们来看一下 ES6 模块化 的小例子吧！（见/ES6/文件夹下面的代码）**

### 特点：

* 以后浏览器会大规模支持，再也不要引入什么插件、模块的了！！！
* 与 CommonJS 一样，具有紧凑的语法
* 与 AMD 一样，直接支持异步加载和可配置模块加载
* 结构可以静态分析（用于静态检查，优化等；只读）
* 可动态加载(import(`xxx/${xxx}/xxx`).then(xxx))
* 等等

<hr/>  

# 总结

这篇文章知识大致的介绍了 前端模块化的发展 历程，但是缺少详细使用说明等等，大家感兴趣可以自行了解。

* [Node.js Modules 官方文档](https://nodejs.org/docs/latest/api/modules.html#modules_modules "Node.js Modules 官方文档")
* [浏览器加载 CommonJS 模块的原理与实现](http://www.ruanyifeng.com/blog/2015/05/commonjs-in-browser.html "阮一峰-浏览器加载 CommonJS 模块的原理与实现")
* [browserify](http://browserify.org/ "browserify")
* [AMD规范](https://github.com/amdjs/amdjs-api/wiki/AMD "AMD规范")
* [requirejs](https://requirejs.org/docs/api.html "requirejs")
* [CMD规范](https://github.com/cmdjs/specification/blob/master/draft/module.md "CMD规范")
* [seajs](https://github.com/seajs/seajs "seajs")
* [ECMAScript®2015语言规范](https://www.ecma-international.org/ecma-262/6.0/index.html "ECMAScript®2015语言规范")
* [阮一峰-ES6 Module](http://es6.ruanyifeng.com/#docs/module "阮一峰-ES6 Module")
* [张鑫旭-万岁，浏览器原生支持ES6 export和import模块啦！](https://www.zhangxinxu.com/wordpress/2018/08/browser-native-es6-export-import-module/ "张鑫旭-万岁，浏览器原生支持ES6 export和import模块啦！")

