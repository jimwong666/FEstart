# event loop (事件循环)

### event loop 是什么

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

*现在打印出来肯定是 **1**，那怎么样在不改变顺序的情况下依然立即打印出 **2** 呢？？？*


##### 其实就是利用event loop，像下面这样就行了：

```js
  let a = {
	  b: 1
  };

  settimeout(function(){
	  console.log(a.b); // 2
  }, 0);

  a.b = 2;
```

> 这就是event loop，上述例子最直观的感受就是**js代码的执行顺序是有规则的**。所以说你可以通俗的理解 event loop 就是 js 的执行规则。（注意:本篇文章里没做特殊说明的地方，我们说得都是浏览器端运行的js，而非nodeJs）

<hr/>

### event loop 为什么出现?

我们都知道浏览器里面JS代码是**JS引擎**处理的。而 JS引擎 是属于 浏览器内核 这个进程的。如图：

<p align="center">
<img src="https://user-images.githubusercontent.com/20440496/42146675-c35e6bdc-7dfb-11e8-920b-2c626c9845f5.png" alt="浏览器">
</p>

浏览器本身是多进程的，比如：浏览器本身是个进程、浏览器GPU也是个进程、cherome的扩展程序会增加进程、每增加一个标签页也会增加一个**浏览器内核进程**（如图）。

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

上述文中有一个很重要的信息：浏览器的 **JS引擎** 是单线程的！(虽然 HTML5 中提出了 Web-Worker，主要是为了解决页面阻塞问题，但是并没有改变 JavaScript 是单线程的本质。)

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

```js
  console.log(1);

  setTimeout(() => {
    console.log(2);
    let _promise = new Promise((resolve,reject) => {
      console.log(3);
      resolve();
    })
    new Promise().resolve().then(function(){
      console.log(6)
    })
  },0)

  let promise = new Promise((resolve,reject) => {
    console.log(3);
    resolve();
  });

  promise.then(function(){
    console.log(4);
    return setTimeout(function(){
      console.log(5);
    },0)
  })
```