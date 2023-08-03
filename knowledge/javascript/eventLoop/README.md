# event loop (事件循环)

### event loop 是什么（浏览器端）

在 W3C文档 中我们可以找到关于它的描述：

> 客户端必须使用本章节中所描述的事件循环，来协调事件，用户交互，脚本，呈现，网络等等。事件循环有两种：用于浏览上下文的事件循环和用于 worker 的事件循环。

看完之后好像还是不太明白~

##### 假如有这样一个例子：

```js
  // 实在找不到好例子了
  let a = {
	  b: 1
  };

  console.log(a.b); // 1

  a.b = 2;
```

*现在会打印出 **1**，那怎么样在不改变顺序的情况下在赋值2后“立即”打印出 **2** 呢？？？*

> 小高说：是时候展示真正的技术了~！！向下面那样写
```js
  let a = {
	  b: 1
  };

  settimeout(function(){
	  console.log(a.b); // 2
  }, 1000);

  a.b = 2;
```

> 波儿：没错，这样是会打印出来，可是这延迟的时间是1s，这样好像并不符合要求。

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

##### 前置知识
我们都知道浏览器里面JS代码是**JS引擎**处理的。而 JS引擎 是属于 浏览器内核 这个进程的。如图：

<p align="center">
<img src="https://user-images.githubusercontent.com/20440496/42146675-c35e6bdc-7dfb-11e8-920b-2c626c9845f5.png" alt="浏览器">
</p>

浏览器本身是多进程的，比如：浏览器本身是个进程、浏览器GPU渲染也是个进程、chrome的扩展程序会增加进程、每增加一个标签页也会增加一个**浏览器内核进程**。

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

任务（task）：我们可以通俗的理解为每一个语句就是一个任务。javascript就是由一个个任务组成的。
```js
// 这里有2个任务
console.log(1);
console.log(2);
```

主线程（main thread）：就相当于执行 任务 的唯一执行者。

执行栈（call-stack）：主线程执行 任务 的地方，js代码 最终都会在此地进行执行。

任务队列（task queue）：异步函数任务 等待、排队的地方。

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

```js
  // -----------理解“执行栈”小例子-----------
  // Tips: JavaScript 的执行和运行是两个不同概念的，运行指JavaScript 的解析引擎。这是统一的，比如V8。而执行是要带上环境、上下文的，比如浏览器和node中js的执行是不一样的。
  // 基本概念：所有的 JS 代码执行时都依赖于环境、上下文等等。比如浏览器端的js执行时都依赖于浏览器环境，而且都是在执行上下文中（Execution context，简称EC）进行的。执行上下文是一个抽象的概念，JS 中有三种执行上下文：
  // 1. 全局执行上下文，默认的，在浏览器中是 window 对象，并且 this 在非严格模式下指向它。
  // 2. 函数执行上下文，JS 的函数每当被调用时会创建一个上下文。
  // 3. Eval 执行上下文，eval 函数会产生自己的上下文，这里不讨论。
  function foo() {
      console.log('1');
    bar();
    console.log('3');
  }
  function bar() {
      console.log('2');
  }
  foo();
  //栈，是一种数据结构，具有先进后出的原则。JS 中的执行栈就具有这样的结构，当引擎第一次遇到 JS 代码时，会产生一个全局执行上下文并压入执行栈，每遇到一个函数调用，就会往栈中压入一个新的上下文。引擎执行栈顶的函数，执行完毕，弹出当前执行上下文。
  // 所以：“进”是指进栈执行，“出”是指出栈释放~
```

###### 回到刚才的话题，所以广义上JS代码的执行顺序：
1. 先执行同步代码
2. 再执行异步代码

> 小高：跟个鬼一样！不是跟没说一样嘛，这个我不知道？
> 
> 波儿：对啊！那异步代码还分好多种呢？哪个先哪个后？

##### 狭义上来说：

JavaScript 的任务不仅仅分为同步任务和异步任务，同时从另一个维度，也分为了**宏任务**(MacroTask)和**微任务**(MicroTask)。

先说说 宏任务，它包括：script(整体代码), setTimeout、setInterval、new Promise、setImmediate、I/O、UI rendering等等。

再说说 微任务，其实很少，只要记住几个：Process.nextTick、Promise.then/catch/finally(注意不是new Promise)、async/await、MutationObserver。


顺序：先执行**宏任务**（其实第一个任务中js会把 script代码块 当成一个宏任务从头到尾执行一次，所以宏任务中有 script整体代码。其实也及时 前面说的“同步代码”）。如果在宏任务执行期间遇到**微任务**，那么它会被放在一个单独的**微任务队列**，等待本次宏任务执行完毕后再执行这个微任务队列。如果在宏任务执行期间遇到其他的**宏任务**，那么遇到的这些宏任务就会由**事件触发线程**或者和**定时器触发线程**一起负责，达到某个条件后将它放入到任务队列（task queue）进行排队等待（！！所以setTimeout和setInterval的定时还准确吗？）主线程（main thread）空闲时依次执行它们。然后这样往复循环~

<p align="center">
<img src="https://mmbiz.qpic.cn/mmbiz_png/nLOS7RCOmU4rnju6mMCibV5lp08m6BoVic5afL1ywWbpJRuv2NzXIYPicdKmZQkuDvHlfFPQzInOMFrLfGMBIOhRQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1" alt="宏任务和微任务">
</p>

> **Tips：** 上面我们提到了 宏任务 中有一个：UI rendering（ui渲染）。这是什么意思呢？
> 
> 因为 UI渲染进程 是与 js引擎进程 是互斥的，所以 UI要想渲染怎么办呢？总不能等到所有js执行结束之后再渲染吧？那黄花菜都凉了。那只能等 主线程执行js 的间隙渲染了！（前面这几句话是我猜的...）那么间隙在哪里？？对！就是宏任务之间的间隙。所以是这样执行的：宏任务（当然肯定包括其中的微任务）-->渲染-->宏任务-->渲染-->宏任务．．．
> <p align="center">
><img src="https://mmbiz.qpic.cn/mmbiz_gif/RrlicwKU9Ad5SrGeicicbSz3ev9ACt9XVPvsqmZ5Em6oSgy91nGFCnzSLxD3VRzWLwgWRmXj981bibC08RegYhyXkg/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1" alt="宏任务和渲染">
></p>
> 所以，从某种意义上来说，UI渲染是不是也是一种宏任务。
><p align="center">
> <img src="https://mmbiz.qpic.cn/mmbiz_png/RrlicwKU9Ad5SrGeicicbSz3ev9ACt9XVPvQ51WKxqHeGgCwW2fcibGz0jhNcibf1tc7VwMYKreicdCK9NNVA4qGoNcg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1" alt="宏任务和微任务">
></p>
> 
> 最后：仔细想一想，我们在工作中有时导致“跳屏”的原因是不是又多了一种可能呢？？

```js
  // 小试牛刀
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

### node端的 event loop 又是什么呢

##### node-eventLoop 简介

Node 中的 Event Loop 和浏览器中的是完全不相同的东西。Node.js采用V8作为js的解析引擎，而I/O处理方面使用了自己设计的libuv，libuv是一个基于事件驱动的跨平台抽象层，封装了不同操作系统一些底层特性，对外提供统一的API，事件循环机制也是它里面的实现（下文会详细介绍）。

<p align="center">
<img src="https://user-gold-cdn.xitu.io/2019/1/11/1683d81674f076eb?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" alt="node">
</p>

Node.js的运行机制如下:

* V8引擎解析JavaScript脚本。
* 解析后的代码，调用Node API。
* libuv库负责Node API的执行。它将不同的任务分配给不同的线程，形成一个Event Loop（事件循环），以异步的方式将任务的执行结果返回给V8引擎。
* V8引擎再将结果返回给用户。

##### 6个阶段

其中libuv引擎中的事件循环分为 6 个阶段，它们会按照顺序反复运行。每当进入某一个阶段的时候，都会从对应的回调队列中取出函数去执行。当队列为空或者执行的回调函数数量到达系统设定的阈值，就会进入下一阶段。

<p align="center">
<img src="https://user-gold-cdn.xitu.io/2019/1/12/16841bd9860c1ee9?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" alt="node-eventLoop 6个阶段">
</p>

从上图中，大致看出node中的事件循环的顺序：

外部输入数据-->轮询阶段(poll)-->检查阶段(check)-->关闭事件回调阶段(close callback)-->定时器检测阶段(timer)-->I/O事件回调阶段(I/O callbacks)-->闲置阶段(idle, prepare)-->轮询阶段（按照该顺序反复运行）...

* timers 阶段：这个阶段执行timer（setTimeout、setInterval）的回调
* I/O callbacks 阶段：处理一些上一轮循环中的少数未执行的 I/O 回调
* idle, prepare 阶段：仅node内部使用
* poll 阶段：获取新的I/O事件, 适当的条件下node将阻塞在这里
* check 阶段：执行 setImmediate() 的回调
* close callbacks 阶段：执行 socket 的 close 事件回调

注意：上面六个阶段都不包括 **process.nextTick()**(下文会介绍)

接下去我们详细介绍*timers、poll、check*这3个阶段，因为日常开发中的绝大部分异步任务都是在这3个阶段处理的。

###### timer阶段

timers 阶段会执行 setTimeout 和 setInterval 回调，并且是由 poll 阶段控制的。 同样，**在 Node 中定时器指定的时间也不是准确时间，只能是尽快执行**。

###### poll阶段

poll 是一个至关重要的阶段，这一阶段中，系统会做两件事情

1. 回到 timer 阶段执行回调
2. 执行 I/O 回调

并且在进入该阶段时如果没有设定了 timer 的话，会发生以下两件事情:

* 如果 poll 队列不为空，会遍历回调队列并同步执行，直到队列为空或者达到系统限制
* 如果 poll 队列为空时，会有两件事发生
  * 如果有 setImmediate 回调需要执行，poll 阶段会停止并且进入到 check 阶段执行回调
  * 如果没有 setImmediate 回调需要执行，会等待回调被加入到队列中并立即执行回调，这里同样会有个超时时间设置防止一直等待下去

当然设定了 timer 的话且 poll 队列为空，则会判断是否有 timer 超时，如果有的话会回到 timer 阶段执行回调。

###### check阶段

setImmediate()的回调会被加入check队列中，从event loop的阶段图可以知道，check阶段的执行顺序在poll阶段之后。 我们先来看个例子:

```js
console.log('start')
setTimeout(() => {
  console.log('timer1')
  Promise.resolve().then(function() {
    console.log('promise1')
  })
}, 0)
setTimeout(() => {
  console.log('timer2')
  Promise.resolve().then(function() {
    console.log('promise2')
  })
}, 0)
Promise.resolve().then(function() {
  console.log('promise3')
})
console.log('end')
//start=>end=>promise3=>timer1=>timer2=>promise1=>promise2
```

* 一开始执行栈的同步任务（这属于宏任务）执行完毕后（依次打印出start end，并将2个timer依次放入timer队列）,会先去执行微任务（**这点跟浏览器端的一样**），所以打印出promise3
* 然后进入timers阶段，执行timer1的回调函数，打印timer1，并将promise.then回调放入microtask队列，同样的步骤执行timer2，打印timer2；这点跟浏览器端相差比较大，**timers阶段有几个setTimeout/setInterval都会依次执行**，并不像浏览器端，每执行一个宏任务后就去执行一个微任务（关于Node与浏览器的 Event Loop 差异，下文还会详细介绍）。

##### Micro-Task 与 Macro-Task

Node端事件循环中的异步队列也是这两种：macro（宏任务）队列和 micro（微任务）队列。

* 常见的 macro-task 比如：setTimeout、setInterval、 setImmediate、script（整体代码）、 I/O 操作等。
* 常见的 micro-task 比如: process.nextTick、new Promise().then(回调)等。

##### 注意点:

###### setTimeout 和 setImmediate

二者非常相似，区别主要在于调用时机不同。

* setImmediate 设计在poll阶段完成时执行，即check阶段；
* setTimeout 设计在poll阶段为空闲时，且设定时间到达后执行，但它在timer阶段执行

```js
setTimeout(function timeout () {
  console.log('timeout');
},0);
setImmediate(function immediate () {
  console.log('immediate');
});
```

* 对于以上代码来说，setTimeout 可能执行在前，也可能执行在后。
* 首先 setTimeout(fn, 0) === setTimeout(fn, 1)，这是由源码决定的
进入事件循环也是需要成本的，如果在准备时候花费了大于 1ms 的时间，那么在 timer 阶段就会直接执行 setTimeout 回调
* 如果准备时间花费小于 1ms，那么就是 setImmediate 回调先执行了

但当二者在异步i/o callback内部调用时，总是先执行setImmediate，再执行setTimeout:

```js
const fs = require('fs')
fs.readFile(__filename, () => {
    setTimeout(() => {
        console.log('timeout');
    }, 0)
    setImmediate(() => {
        console.log('immediate')
    })
})
// immediate
// timeout
```

在上述代码中，setImmediate 永远先执行。因为两个代码写在 IO 回调中，IO 回调是在 poll 阶段执行，当回调执行完毕后队列为空，发现存在 setImmediate 回调，所以就直接跳转到 check 阶段去执行回调了。

###### process.nextTick

这个函数其实是独立于 Event Loop 之外的，它有一个自己的队列，当每个阶段完成后，如果存在 nextTick 队列，就会清空队列中的所有回调函数，并且优先于其他 microtask 执行。

```js
setTimeout(() => {
 console.log('timer1')
 Promise.resolve().then(function() {
   console.log('promise1')
 })
}, 0)
process.nextTick(() => {
 console.log('nextTick')
 process.nextTick(() => {
   console.log('nextTick')
   process.nextTick(() => {
     console.log('nextTick')
     process.nextTick(() => {
       console.log('nextTick')
     })
   })
 })
})
// nextTick=>nextTick=>nextTick=>nextTick=>timer1=>promise1
```

### Node与浏览器的 Event Loop 差异

**浏览器环境下，microtask的任务队列是每个macrotask执行完之后执行。而在Node.js中，microtask会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行microtask队列的任务。**

<p align="center">
<img src="https://user-gold-cdn.xitu.io/2019/1/12/16841bad1cda741f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" alt="浏览器-eventLoop和node-eventLoop差异">
</p>

接下我们通过一个例子来说明两者区别：

##### 浏览器端 event loop

```js
setTimeout(()=>{
    console.log('timer1')
    Promise.resolve().then(function() {
        console.log('promise1')
    })
}, 0)
setTimeout(()=>{
    console.log('timer2')
    Promise.resolve().then(function() {
        console.log('promise2')
    })
}, 0)
```

浏览器端运行结果：*timer1=>promise1=>timer2=>promise2*

浏览器端的处理过程如下：

<p align="center">
<img src="https://user-gold-cdn.xitu.io/2019/1/12/16841d6392e8f537?imageslim" alt="浏览器-eventLoop的处理过程">
</p>

##### node端 event loop

Node端运行结果分两种情况：

* 如果是node11版本一旦执行一个阶段里的一个宏任务(setTimeout,setInterval和setImmediate)就立刻执行微任务队列，这就跟浏览器端运行一致，最后的结果为*timer1=>promise1=>timer2=>promise2*
* 如果是node10及其之前版本：要看第一个定时器执行完，第二个定时器是否在完成队列中。
  * 如果是第二个定时器还未在完成队列中，最后的结果为*timer1=>promise1=>timer2=>promise2*
  * 如果是第二个定时器已经在完成队列中，则最后的结果为*timer1=>timer2=>promise1=>promise2*(下文过程解释基于这种情况下)

1. 全局脚本（main()）执行，将2个timer依次放入timer队列，main()执行完毕，调用栈空闲，任务队列开始执行；
2. 首先进入timers阶段，执行timer1的回调函数，打印timer1，并将promise1.then回调放入microtask队列，同样的步骤执行timer2，打印timer2；
3. 至此，timer阶段执行结束，event loop进入下一个阶段之前，执行microtask队列的所有任务，依次打印promise1、promise2

Node端的处理过程如下：

<p align="center">
<img src="https://user-gold-cdn.xitu.io/2019/1/12/16841d5f85468047?imageslim" alt="node-eventLoop的处理过程">
</p>

### 总结

浏览器和Node 环境下，microtask 任务队列的执行时机不同

* Node端，microtask 在事件循环的各个阶段之间执行
* 浏览器端，microtask 在事件循环的 macrotask 执行完之后执行

### 20210517
只有运行完await语句（算宏任务），才把await语句后面的全部代码加入到微任务行列
