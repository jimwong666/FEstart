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

Node 的 Event Loop 分为 6 个阶段：
* timers：执行setTimeout() 和 setInterval()中到期的callback。
* pending callback: 上一轮循环中有少数的I/O callback会被延迟到这一轮的这一阶段执行
* idle, prepare：仅内部使用
* poll: 最为重要的阶段，执行I/O callback，在适当的条件下会阻塞在这个阶段
* check: 执行setImmediate的callback
* close callbacks: 执行close事件的callback，例如socket.on('close'[,fn])、http.server.on('close, fn)

> 上面六个阶段都不包括 process.nextTick()(下文会介绍)

<p align="center">
<img src="https://mmbiz.qpic.cn/mmbiz_png/udZl15qqib0NPJYm99fCKh9SUq52nkiaF0cgXb3z7IA2Hzc042MIlVUat6hUyGssfK6z3RqibKOtrpBgft81uWAvw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1" alt="node中event loop">
</p>

整体的执行机制如上图所示，下面我们具体展开每一个阶段的说明

##### timers 阶段

timers 阶段会执行 setTimeout 和 setInterval 回调，并且是由 poll 阶段控制的。

在 timers 阶段其实使用一个最小堆而不是队列来保存所有的元素，其实也可以理解，因为timeout的callback是按照超时时间的顺序来调用的，并不是先进先出的队列逻辑）。而为什么 timer 阶段在第一个执行阶梯上其实也不难理解。在 Node 中定时器指定的时间也是不准确的，而这样，就能尽可能的准确了，让其回调函数尽快执行。

以下是官网给出的例子：

```js
  const fs = require('fs');

  function someAsyncOperation(callback) {
    // Assume this takes 95ms to complete
    fs.readFile('/path/to/file', callback);
  }

  const timeoutScheduled = Date.now();

  setTimeout(() => {
    const delay = Date.now() - timeoutScheduled;

    console.log(`${delay}ms have passed since I was scheduled`);
  }, 100);

  // do someAsyncOperation which takes 95 ms to complete
  someAsyncOperation(() => {
    const startCallback = Date.now();

    // do something that will take 10ms...
    while (Date.now() - startCallback < 10) {
      // do nothing
    }
  });
```

当进入事件循环时，它有一个空队列（fs.readFile()尚未完成），因此定时器将等待剩余毫秒数，当到达95ms时，fs.readFile()完成读取文件并且其完成需要10毫秒的回调被添加到轮询队列并执行。

当回调结束时，队列中不再有回调，因此事件循环将看到已达到最快定时器的阈值，然后回到timers阶段以执行定时器的回调。在此示例中，您将看到正在调度的计时器与正在执行的回调之间的总延迟将为105毫秒。

##### pending callbacks 阶段

pending callbacks 阶段其实是 I/O 的 callbacks 阶段。比如一些 TCP 的 error 回调等。

举个栗子：如果TCP socket ECONNREFUSED在尝试connect时receives，则某些* nix系统希望等待报告错误。这将在pending callbacks阶段执行。

##### poll 阶段

poll 阶段主要有两个功能：
* 执行 I/O 回调
* 处理 poll 队列（poll queue）中的事件

当时Event Loop 进入到 poll 阶段并且 timers 阶段没有任何可执行的 task 的时候（也就是没有定时器回调），将会有以下两种情况:
* 如果 poll queue 非空，则 Event Loop就会执行他们，知道为空或者达到system-dependent(系统相关限制)
* 如果 poll queue 为空，则会发生以下一种情况:
  * 如果setImmediate()有回调需要执行，则会立即进入到 check 阶段
  * 相反，如果没有setImmediate()需要执行，则 poll 阶段将等待 callback 被添加到队列中再立即执行，这也是为什么我们说 poll 阶段可能会阻塞的原因

一旦 poll queue 为空，Event Loop就回去检查timer 阶段的任务。如果有的话，则会回到 timer 阶段执行回调。

##### check 阶段

check 阶段在 poll 阶段之后，setImmediate()的回调会被加入check队列中，他是一个使用libuv API 的特殊的计数器。

通常在代码执行的时候，Event Loop 最终会到达 poll 阶段，然后等待传入的链接或者请求等，但是如果已经指定了setImmediate()并且这时候 poll 阶段已经空闲的时候，则 poll 阶段将会被中止然后开始 check 阶段的执行。

##### close callbacks 阶段

如果一个 socket 或者事件处理函数突然关闭/中断(比如：socket.destroy()),则这个阶段就会发生 close 的回调执行。否则他会通过 process.nextTick() 发出。

##### setImmediate() VS setTimeout()

setImmediate() 和 setTimeout()非常的相似，区别取决于谁调用了它。

* setImmediate在 poll 阶段后执行，即check 阶段
* setTimeout 在 poll 空闲时且设定时间到达的时候执行，在 timer 阶段

计时器的执行顺序将根据调用它们的上下文而有所不同。如果两者都是从主模块中调用的，则时序将受到进程性能的限制。

例如，如果我们运行以下不在I / O周期（即主模块）内的脚本，则两个计时器的执行顺序是不确定的，因为它受进程性能的约束：

```js
  // timeout_vs_immediate.js
  setTimeout(() => {
    console.log('timeout');
  }, 0);

  setImmediate(() => {
    console.log('immediate');
  });
```








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