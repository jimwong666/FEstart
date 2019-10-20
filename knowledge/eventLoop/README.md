# event loop (事件循环)

### event loop 是什么（浏览器端）

在 W3C文档 中我们可以找到关于它的描述：

> 客户端必须使用本章节中所描述的事件循环，来协调事件，用户交互，脚本，呈现，网络等等。事件循环有两种：用于浏览上下文的事件循环和用于 worker 的事件循环。

##### 假如有这样一个例子：

```js
  // 实在找不到好例子了
  let a = {
	  b: 1
  };

  console.log(a.b); // 1

  a.b = 2;
```

*现在会立即打印出 **1**，那怎么样在不改变顺序的情况下怎么才能在赋值2后“立即”打印出 **2** 呢？？？*


##### 我相信小伙伴们都知道，像下面这样就行了：

```js
  let a = {
	  b: 1
  };

  settimeout(function(){
	  console.log(a.b); // 2
  }, 0);

  a.b = 2;
```

> 这其实就是利用的 event loop，上述例子最直观的感受就是**js代码的执行顺序是有规则**，而我们就是利用了这个规则。所以说你可以**通俗**的理解 event loop 就是 js 代码执行的规则。

<hr/>

### event loop 为什么出现?

我们都知道浏览器里面JS代码是**JS引擎**处理的。而 JS引擎 是属于 浏览器内核 这个进程的。如图：

<p align="center">
<img src="https://user-images.githubusercontent.com/20440496/42146675-c35e6bdc-7dfb-11e8-920b-2c626c9845f5.png" alt="浏览器">
</p>

浏览器本身是多进程的，比如：浏览器本身是个进程、浏览器GPU也是个进程、chrome的扩展程序会增加进程、每增加一个标签页也会增加一个**浏览器内核进程**（如图）。

###### 浏览器内核进程 包括：
* GUI渲染线程：
  * 负责渲染页面，布局和绘制。
  * 页面需要重绘和回流时，该线程就会执行
  * 与js引擎线程互斥，防止渲染结果不可预期
* JS引擎线程
  * 负责处理解析和执行javascript脚本程序
  * 只有一个JS引擎线程（单线程）
  * 与GUI渲染线程互斥，防止渲染结果不可预期
* 事件触发线程
  * 用来控制事件循环（鼠标点击、setTimeout、ajax等）
  * 当事件满足触发条件时，将事件放入到JS引擎所在的执行队列中
* 定时触发器线程
  * setInterval与setTimeout所在的线程
  * 定时任务并不是由JS引擎计时的，是由定时触发线程来计时的
  * 计时完毕后，通知事件触发线程
* 异步http请求线程
  * 浏览器有一个单独的线程用于处理AJAX请求
  * 当请求完成时，若有回调函数，通知事件触发线程

> **Tips**: JavaScript 的执行和运行是两个不同概念的

上述文中有一个很重要的信息：浏览器的 **JS引擎** 是单线程的！(虽然 HTML5 中提出了 Web-Worker 等特性，主要是为了解决页面阻塞问题，但是并没有改变 JavaScript 是单线程的本质。)

**回到一开始的问题，event loop 为什么会出现？**
###### 根据上面的信息就好解释多了，既然JS引擎是单线程，那么代码执行的时候总得有先有后吧~ 所以就得制定一个规则吧~ 这样event loop就应运而生了！

> 思考1:为什么**JS引擎**要设计成单线程呢？
> 1. 首先是历史原因，在创建 javascript 这门语言时，多进程多线程的架构并不流行，硬件支持并不好。
> 2. 其次是因为多线程的复杂性，多线程操作需要加锁，编码的复杂性会增高。
> 3. 如果同时操作 DOM ，在多线程不加锁的情况下，最终会导致 DOM 渲染的结果不可预期。
> 
> 这样就导致了 JS引擎 的单线程特性。
>
> 思考2:那为什么**GUI渲染**与**JS引擎**两个线程互斥呢？
> * 这是由于 JS 是可以操作 DOM 的，如果同时修改元素属性并同时渲染界面，那渲染结果将不可预期。
> 
> 因此，为了防止渲染出现不可预期的结果，浏览器设定 GUI渲染线程和 JS引擎线程为互斥关系，当 JS引擎线程执行时 GUI渲染线程会被挂起，GUI更新则会被保存在一个队列中等待 JS引擎线程空闲时立即被执行。

### event loop 是怎么样控制JS代码的执行顺序的呢?

> 任务（task）：我们可以通俗的理解为每一个语句就是一个任务。javascript就是由一个个任务组成的。
> ```js
> // 这里有2个任务
> console.log(1);
> console.log(2);
> ```
> 
> 主线程（main thread）：就相当于执行 任务 的唯一执行者。
> 
> 执行栈（call-stack）：执行者执行 任务 的地方，js任务 最终都会在此地进行执行。
> 
> 任务队列（task queue）：异步函数任务 等待、排队的地方。

##### 广义上来说：

JavaScript 单线程中的**任务**（tesk）可以分为**同步任务**和**异步任务**。同步任务会在**执行栈**（call-stack）中按顺序等待**主线程**（main thread）执行，异步任务则会在异步有了结果或者达到某个条件后将回调函数添加到**任务队列**（task queue）中等待主线程（main thread）空闲的时再放入到执行栈（call-stack）中顺序执行。

<p align="center">
<img src="https://mmbiz.qpic.cn/mmbiz_png/udZl15qqib0NPJYm99fCKh9SUq52nkiaF0YZKYdpHN1PcmSictWzLxPJFddfY5M5dEBicZhDicognupcPywsN9ajhibw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1" alt="同步任务和异步任务">
</p>

> 这里涉及到2个有趣的概念：
> * 执行栈 (stack)
>   * 先进后出（有意思~）
> * 任务队列 (queue)
>   * 先进先出（这个好理解~）
>
>   ```js
>     // -----------理解“执行栈”小例子-----------
>     // 基本概念：所有的 JS 代码执行时都依赖于环境、上下文等等。比如浏览器端的js执行时都依赖于浏览器环境，而且都是在执行上下文中（Execution context，简称EC）进行的。执行上下文是一个抽象的概念，JS 中有三种执行上下文：
>     // 1. 全局执行上下文，默认的，在浏览器中是 window 对象，并且 this 在非严格模式下指向它。
>     // 2. 函数执行上下文，JS 的函数每当被调用时会创建一个上下文。
>     // 3. Eval 执行上下文，eval 函数会产生自己的上下文，这里不讨论。
>     function foo() {
>       console.log('1');
>       bar();
>       console.log('3');
>     }
>     function bar() {
>       console.log('2');
>     }
>     foo();
>     // 所以：“进”是指进栈执行，“出”是指出栈释放~
>   ```

###### 回到刚才的话题，所以广义上JS代码的执行顺序：
1. 先执行同步代码
2. 再执行异步代码

> 小高：跟个鬼一样！不是跟没说一样嘛，这个我不知道？
> 
> 波儿：对啊！那异步代码还分好多种呢？哪个先哪个后？

##### 狭义上来说：

JavaScript 的任务不仅仅分为同步任务和异步任务，同时从另一个维度，也分为了**宏任务**(MacroTask)和**微任务**(MicroTask)。

先说说 MacroTask，MacroTask包括：script(整体代码), setTimeout, setInterval, setImmediate, I/O, UI rendering等等。

再说说 MicroTask，其实很少，只要记住几个：Process.nextTick、Promise.then catch finally(注意不是 Promise)、MutationObserver。

<p align="center">
<img src="https://mmbiz.qpic.cn/mmbiz_png/nLOS7RCOmU4rnju6mMCibV5lp08m6BoVic5afL1ywWbpJRuv2NzXIYPicdKmZQkuDvHlfFPQzInOMFrLfGMBIOhRQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1" alt="宏任务和微任务">
</p>

顺序：先执行**宏任务**（其实第一个任务中js会把 script代码块 当成一个宏任务从头到尾执行一次）。如果在宏任务执行期间遇到**微任务**，那么它会被放在一个微任务队列，等待本次宏任务执行完毕后在执行这个微任务队列。如果在宏任务执行期间遇到其他的**宏任务**，那么遇到的这些宏任务就会由**事件触发线程**或者和**定时器触发线程**一起负责“筛选”，达到某个条件后将它放入到任务队列（task queue）进行排队等待（！！所以setTimeout和setInterval的定时还准确吗？）主线程（main thread）空闲时依次执行它们。然后这样往复循环~

```js
  // 小试牛刀
  console.log(1);

  setTimeout(() => {
    console.log(2);
  },20)

  setTimeout(() => {
    console.log(3)
  },0)

  Promise.resolve().then(function(){
    console.log(4)
  })

  console.log(5);
```

> 小Tips：
> 上面我们提到了 宏任务 中有一个：UI rendering（ui渲染）。这是什么呢？
> 据我不知道对不对的猜测：因为 UI渲染进程 是与 js引擎进程 是互斥的，所以 UI要想渲染怎么办呢？总不能等到所有js执行结束之后再渲染吧，黄花菜都凉了。那只能等 主线程执行js 的间隙渲染喽~ 那么间隙在哪里？？对！就是宏任务之间的间隙。所以是这样执行的：宏任务（当然肯定包括其中的微任务）-->渲染-->宏任务-->渲染-->渲染．．．
> <p align="center">
><img src="https://mmbiz.qpic.cn/mmbiz_gif/RrlicwKU9Ad5SrGeicicbSz3ev9ACt9XVPvsqmZ5Em6oSgy91nGFCnzSLxD3VRzWLwgWRmXj981bibC08RegYhyXkg/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1" alt="宏任务和渲染">
></p>
> 所以，从某种意义上来说，UI渲染是不是也是一种宏任务，只是他没有属于自己的微任务罢了。
> 
> —
> 最后：仔细想一想，我们在工作中有时导致“跳屏”的原因是不是又多了一种可能呢？？
> 总结：
> <p align="center">
><img src="https://mmbiz.qpic.cn/mmbiz_png/RrlicwKU9Ad5SrGeicicbSz3ev9ACt9XVPvQ51WKxqHeGgCwW2fcibGz0jhNcibf1tc7VwMYKreicdCK9NNVA4qGoNcg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1" alt="宏任务和微任务">
></p>

### node端的 event loop 又是什么呢

Node中的Event Loop是基于libuv实现的，而libuv是 Node 的新跨平台抽象层，libuv使用异步，事件驱动的编程方式，核心是提供i/o的事件循环和异步回调。libuv的API包含有时间，非阻塞的网络，异步文件操作，子进程等等。

Event Loop就是在libuv中实现的。所以关于 Node 的 Event Loop学习，有两个官方途径可以学习:
* libuv 文档
* 官网的What is the Event Loop?

在学习 Node 环境下的 Event Loop 之前呢，我们首先要明确执行环境，Node 和浏览器的Event Loop是两个有明确区分的事物，不能混为一谈。nodejs的event是基于libuv，而浏览器的event loop则在html5的规范中明确定义。

<p align="center">
<img src="https://github.com/jimwong666/FEstart/blob/master/knowledge/eventLoop/img/node-event-loop.png" alt="node中event loop">
</p>






















```js
  console.log(1);

  setTimeout(() => {
    console.log(2);
    Promise.resolve().then(function(){
      console.log(3)
    })
  },20)
  setTimeout(() => {
    console.log(7)
  },0)
  let promise = new Promise((resolve,reject) => {
    console.log(4);
    resolve();
  });

  promise.then(function(){
    console.log(5);
    return setTimeout(function(){
      console.log(6);
    },0)
  })
```