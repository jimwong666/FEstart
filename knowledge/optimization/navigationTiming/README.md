# 前端页面性能监控

![Understanding Memoization In JavaScript](https://pic1.zhimg.com/v2-514596bfb7c60cc8c2272f6d3c622331_1440w.jpg?source=172ae18b)

> 我们开发过很多前端应用，可是对前端应用性能的了解却胜少

#### 为什么要监控页面性能？

在这个信息大爆炸的时代，随着前端页面越来越迎合大众日益增长的视觉审美、交互体验，也为了在页面填充更多实用信息等等，前端的种种也就越来越庞大。导致前端越来越重要，越来越复杂，而后就会越来越脆弱~

所以我们需要一个性能监控系统，持续监控和预警页面性能的状况，并且在发现瓶颈的时候指导优化工作。比如 [这个](https://yueying.effirst.com/?vf=zhihu)-阿里UC岳鹰全景监控平台 ，它是一个通用、低侵入性、自动上报的页面性能监控方案。主要采用的是Navigation Timing API以及sendBeacon等方法。

今天我们了解一下其中的基本原理。

#### 理解Navigation Timing API的性能指标

为了帮助开发者更好地衡量和改进前端页面性能，W3C性能小组引入了 Navigation Timing API ，实现了自动、精准的页面性能打点；开发者可以通过 window.performance 属性获取。

```js
// 兼容写法
var performance = window.performance || 
    window.msPerformance || 
    window.webkitPerformance;

if (performance) {
    console.log(performance);
}
```

<p align="center">
  <img src="https://mmbiz.qpic.cn/mmbiz_png/aVp1YC8UV0fULlqAmCyhMXIMclUIdrBumozhq72qogNMhiaibbNqplxAJVWdkZLhjvpEJpUrlYafibnsQRD7kibwwg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1" alt="window.performance">
</p>
<p align="center">
  <span>window.performance</span>
</p>

- **performance.memory**：显示此刻内存占用情况，它是一个动态值
  - usedJSHeapSize：JS 对象（包括V8引擎内部对象）占用的内存数
  - totalJSHeapSize：可使用的内存
  - jsHeapSizeLimit：内存大小限制

  > 通常，usedJSHeapSize不能大于totalJSHeapSize，如果大于，有可能出现了内存泄漏。
  
- **performance.navigation**:定义了当前文档的导航信息，比如是重载还是向前向后等
  - 0 表示 TYPE_NAVIGATENEXT 正常进入的页面（非刷新、非重定向等）
  - 1 表示 TYPE_RELOAD 通过 window.location.reload() 刷新的页面
  - 2 表示 TYPE_BACK_FORWARD 通过浏览器的前进后退按钮进入的页面（历史记录）
  - 255 表示 TYPE_UNDEFINED 非以上方式进入的页面
- **performance.onresourcetimingbufferfull**：属性是一个在resourcetimingbufferfull事件触发时会被调用的 event handler 。它的值是一个手动设置的回调函数，这个回调函数会在浏览器的资源时间性能缓冲区满时执行。
- **performance.timeOrigin**是一系列时间点的基准点，精确到万分之一毫秒。
- **performance.timing**：定义了从 navigationStart 至 loadEventEnd 的 21 个只读属性


下图是W3C第一版的 Navigation Timing 的处理模型。从当前浏览器窗口卸载旧页面开始，到新页面加载完成，整个过程一共被切分为 9 个小块：提示卸载旧文档、重定向/卸载、应用缓存、DNS 解析、TCP 握手、HTTP 请求处理、HTTP 响应处理、DOM 处理、文档装载完成。每个小块的首尾、中间做事件分界，取 Unix 时间戳，两两事件之间计算时间差，从而获取中间过程的耗时（精确到毫秒级别）。

<p align="center">
  <img src="https://pic2.zhimg.com/80/v2-9f63018694b9b4471e28295ddb675a91_720w.jpg" alt="W3C Navigation Timing Level 1(w3.org)">
</p>
<p align="center">
  <span>W3C Navigation Timing Level 1(w3.org)</span>
</p>




上图是 Level 1 的规范，2012 年底进入候选建议阶段，至今仍在日常使用中；但是在W3C的议程上，它已经功成身退，让位给了精度更高，功能更强大，层次更分明的 Level 2（处理模型如下图）。比如独立划分出来的 Resource Timing，使得我们可以获取具体资源的详细耗时信息。

<p align="center">
  <img src="https://pic2.zhimg.com/80/v2-dc4740614499ad2493efce8d5e827eb1_720w.jpg" alt="W3C Navigation Timing Level 2(w3.org)">
</p>
<p align="center">
  <span>W3C Navigation Timing Level 2(w3.org)</span> 
</p>

#### 指标解读

<p align="center">
  <img src="https://pic1.zhimg.com/80/v2-e4e26420d6b681b2b15b9edf9db9d4d0_720w.jpg" alt="指标解读">
</p>
<p align="center">
  <span>指标解读</span> 
</p>

#### 采集页面性能的关键指标

使用上面的指标，我们可以计算许多重要的指标，如首字节的时间，页面加载时间，dns查找以及连接是否安全。我们把 Navigation Timing API 提供的指标做下归类，按照从上到下的时间流，右边的时刻标记了每个指标从哪里开始计算到哪里截止，比如，跳转时间 redirect 由 redirectEnd - redirectStart 计算得到，其他的类推。

<p align="center">
  <img src="https://pic4.zhimg.com/80/v2-d80be1162b4d17d7c6ff265c26e30c3f_720w.jpg" alt="Navigation Timing API">
</p>
<p align="center">
  <span>Navigation Timing API</span>
</p>

【非页面性能】

#### 重定向耗时

redirectEnd - redirectStart

> **重定向优化**：重定向的类型分三种，301（永久重定向），302（临时重定向），304（Not Modified）。304是用来优化缓存，非常有用，而前两种应该尽可能的避免，凡是遇到需要重定向跳转代码的代码，可以把重定向之后的地址直接写到前端的html或JS中，可以减少客户端与服务端的通信过程，节省重定向耗时。

#### DNS查询耗时

domainLookupEnd - domainLookupStart

> **DNS优化**：一般来说，在前端优化中与 DNS 有关的有两点： 一个是减少DNS的请求次数，另一个就是进行DNS预获取（Prefetching ） 。典型的一次DNS解析需要耗费 20-120 毫秒（移动端会更慢），减少DNS解析的次数是个很好的优化方式，尽量把各种资源放在一个cdn域名上。DNS Prefetching 是让具有此属性的域名不需要用户点击链接就在后台解析，而域名解析和内容载入是串行的网络操作，所以这个方式能减少用户的等待时间，提升用户体验 。新版的浏览器会对页面中和当前域名（正在浏览网页的域名）不在同一个域的域名进行预获取，并且缓存结果，这就是隐式的 DNS Prefetch。如果想对页面中没有出现的域进行预获取，那么就要使用显示的 DNS Prefetch 了。下图是DNS Prefetch的方法：
> ```html 
> <html>
> <head>
>  <title>腾讯网</title>
>  <link rel="dns-prefetch" href="//mat1.gtimg.com"  />
>  <link rel="dns-prefetch" href="//inews.gtimg.com"  />
>  <link rel="dns-prefetch" href="//wx.qlogo.cn"  />
>  <link rel="dns-prefetch" href="//coral.qq.com" />
>  <link rel="dns-prefetch" href="//pingjs.qq.com"  />
> ```

#### TCP链接耗时

connectEnd - connectStart

> **TCP请求优化**：TCP的优化大都在服务器端，前端能做的就是尽量减少TCP的请求数，也就是减少HTTP的请求数量。http 1.0 默认使用短连接，也是TCP的短连接，也就是客户端和服务端每进行一次http操作，就建立一次连接，任务结束就中断连接。这个过程中有3次TCP请求握手和4次TCP请求释放。减少TCP请求的方式有两种，一种是资源合并，对于页面内的图片、css和js进行合并，减少请求量。另一种使用长链接，使用http1.1，在HTTP的响应头会加上 Connection:keep-alive，当一个网页打开完成之后，连接不会马上关闭，再次访问这个服务时，会继续使用这个长连接。这样就大大减少了TCP的握手次数和释放次数。或者使用Websocket进行通信，全程只需要建立一次TCP链接。

#### HTTP请求耗时

responseEnd - responseStart

> 使用内容分发网络（CDN）和减少请求。使用CDN可以减少网络的请求时延，CDN的域名不要和主站的域名一样，这样会防止访问CDN时还携带主站cookie的问题，对于网络请求，可以使用fetch发送无cookie的请求，减少http包的大小。也可以使用本地缓存策略，尽量减少对服务器数据的重复获取。


【页面性能】

#### 确定统计起始点 （navigationStart vs fetchStart）

页面性能统计的起始点时间，应该是用户输入网址回车后开始等待的时间。一个是通过navigationStart获取，相当于在URL输入栏回车或者页面按F5刷新的时间点；另外一个是通过 fetchStart，相当于浏览器准备好使用 HTTP 请求获取文档的时间。

从开发者实际分析使用的场景，浏览器重定向、卸载页面的耗时对页面加载分析并无太大作用；通常建议使用 fetchStart 作为统计起始点。

#### 首字节

主文档返回第一个字节的时间，是页面加载性能比较重要的指标。对用户来说一般无感知，对于开发者来说，则代表访问网络后端的整体响应耗时。

#### 解析dom树耗时

 domComplete - domInteractive

 > 在浏览器端的渲染过程，如大型框架，vue和react，它的模板其实都是在浏览器端进行渲染的，不是直出的html，而是要走框架中相关的框架代码才能去渲染出页面，这个渲染过程对于首屏就有较大的损耗，白屏的时间会有所增加。在必要的情况下可以在服务端进行整个html的渲染，从而将整个html直出到我们的浏览器端，而非在浏览器端进行渲染。
 >![渲染](https://mmbiz.qpic.cn/mmbiz_png/aVp1YC8UV0fULlqAmCyhMXIMclUIdrBu3M8TqiawZusYUP4ud3ajOPHb9CuicbO1CNN3S6YHBOytCVhwbxLFUNag/640?wx_fmt=png)
 >还有一个问题就是，在默认情况下，JavaScript 执行会“阻止解析器”，当浏览器遇到一个 script 外链标记时，DOM 构建将暂停，会将控制权移交给 JavaScript 运行时，等脚本下载执行完毕，然后再继续构建 DOM。而且内联脚本始终会阻止解析器，除非编写额外代码来推迟它们的执行。我们可以把 script 外链加入到页面底部，也可以使用 defer 或 async 延迟执行。defer 和 async 的区别就是 defer 是有序的，代码的执行按在html中的先后顺序，而 async 是无序的，只要下载完毕就会立即执行。或者使用异步的编程方法，比如settimeout，也可以使用多线webworker，它们不会阻碍 DOM 的渲染。
 > ```html
 > <script async type="text/javascript" src="app1.js"></script>
 > <script defer type="text/javascript" src="app2.js"></script>
 > ```

#### 白屏时间

用户看到页面展示出现一个元素的时间。很多人认为白屏时间是页面返回的首字节时间，但这样其实并不精确，因为头部资源还没加载完毕，页面也是白屏。

相对来说具备「白屏时间」统计意义的指标，可以取 domLoading - fetchStart，此时页面开始解析DOM树，页面渲染的第一个元素也会很快出现。

从W3C Navigation Timing Level 2 的方案设计，可以直接采用 <img src="https://www.zhihu.com/equation?tex=domInteractive+-+fetchStart" alt="Navigation Timing API"> ，此时页面资源加载完成，即将进入渲染环节。

#### 首屏时间

首屏时间是指页面第一屏所有资源完整展示的时间。这是一个对用户来说非常直接的体验指标，但是对于前端却是一个非常难以统计衡量的指标。

具备一定意义上的指标可以使用， <img src="https://www.zhihu.com/equation?tex=domContentLoadedEventEnd+-+fetchStart" alt="白屏时间"> ，甚至使用 <img src="https://www.zhihu.com/equation?tex=loadEventStart+-+fetchStart" alt="白屏时间"> ，此时页面DOM树已经解析完成并且显示内容。

以下给出统计页面性能指标的方法。

```js
let times = {};
let t = window.performance.timing;

// 优先使用 navigation v2  https://www.w3.org/TR/navigation-timing-2/
if (typeof win.PerformanceNavigationTiming === 'function') {
  try {
    var nt2Timing = performance.getEntriesByType('navigation')[0]
    if (nt2Timing) {
      t = nt2Timing
    }
  } catch (err) {
  }
}

//重定向时间
times.redirectTime = t.redirectEnd - t.redirectStart;

//dns查询耗时
times.dnsTime = t.domainLookupEnd - t.domainLookupStart;

//TTFB 读取页面第一个字节的时间
times.ttfbTime = t.responseStart - t.navigationStart;

//DNS 缓存时间
times.appcacheTime = t.domainLookupStart - t.fetchStart;

//卸载页面的时间
times.unloadTime = t.unloadEventEnd - t.unloadEventStart;

//tcp连接耗时
times.tcpTime = t.connectEnd - t.connectStart;

//request请求耗时
times.reqTime = t.responseEnd - t.responseStart;

//解析dom树耗时
times.analysisTime = t.domComplete - t.domInteractive;

//白屏时间 
times.blankTime = (t.domInteractive || t.domLoading) - t.fetchStart;

//domReadyTime
times.domReadyTime = t.domContentLoadedEventEnd - t.fetchStart;
```

#### 资源性能API

performance.timing记录的是用于分析页面整体性能指标。如果要获取个别资源（例如JS、图片）的性能指标，就需要使用Resource Timing API。

performance.getEntries()方法，包含了所有静态资源的数组列表；每一项是一个请求的相关参数有name，type，时间等等。下图是chrome显示腾讯网的相关资源列表。


<p align="center">
  <img src="https://mmbiz.qpic.cn/mmbiz_png/aVp1YC8UV0fULlqAmCyhMXIMclUIdrBuNdDOalicg9FDBnyMLWE6RKhtNe6ONGZZQwCqVdQlxBtcYAgeQ2ZEX2A/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1
" alt="performance.getEntries()">
</p>
<p align="center">
  <span>performance.getEntries()</span>
</p>

可以看到，与 performance.timing 对比： 没有与 DOM 相关的属性，新增了name、entryType、initiatorType和duration四个属性。它们是：

- name表示：资源名称，也是资源的绝对路径，可以通过performance.getEntriesByName（name属性的值），来获取这个资源加载的具体属性。

- entryType表示：资源类型 "resource"，还有“navigation”, “mark”, 和 “measure”另外3种。
  - <p align="center">
  <img src="https://mmbiz.qpic.cn/mmbiz_png/aVp1YC8UV0fULlqAmCyhMXIMclUIdrBuKeAn804ianOZ9Fb28GJLcjw4GIrSjbun7jLMHIQ6eiaicDCLhHrRJDIcQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1">
</p>
- initiatorType表示：请求来源 "link"，即表示<link> 标签，还有“script”即 <script>，“img”即<img>标签，“css”比如background的url方式加载资源以及“redirect”即重定向 等。
<p align="center">
  <img src="https://mmbiz.qpic.cn/mmbiz_png/aVp1YC8UV0fULlqAmCyhMXIMclUIdrBukw2016y1SXKOanKNLFAg6CBJmBBeiaA4Ns59DiaibMFlE35wqiaOhFoWSQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1">
</p>
- duration表示：加载时间，是一个毫秒数字。
  - 受同源策略影响，跨域资源获取到的时间点，通常为0，如果需要更详细准确的时间点，可以单独请求资源通过performance.timing获得。或者资源服务器开启响应头Timing-Allow-Origin，添加指定来源站点，如下所示：
  ``` 
    Timing-Allow-Origin: https://qq.com 
  ```

#### 方法集合

除了performance.getEntries之外，performance还包含一系列有用的方法。如下图：

<p align="center">
  <img src="https://mmbiz.qpic.cn/mmbiz_png/aVp1YC8UV0fULlqAmCyhMXIMclUIdrBuh5jlGwHUGQJVQibU0DsvEwV0FoTBY2Pnicl2rjbS90lvzgNYRowpXKNA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1">
</p>

##### performance.now()

performance.now() 返回一个当前页面执行的时间的时间戳，用来精确计算程序执行时间。与 Date.now() 不同的是，它使用了一个浮点数，返回了以毫秒为单位，小数点精确到微秒级别的时间，更加精准。并且不会受系统程序执行阻塞的影响，performance.now() 的时间是以恒定速率递增的，不受系统时间的影响（系统时间可被人为或软件调整）。performance.timing.navigationStart + performance.now() 约等于 Date.now()。

```js
let t0 = window.performance.now();
doSomething();
let t1 = window.performance.now();
console.log("doSomething函数执行了" + (t1 - t0) + "毫秒.")
```

通过这个方法，我们可以用来测试某一段代码执行了多少时间。

##### performance.mark()

mark方法用来自定义添加标记时间。使用方法如下：

```js
var nameStart = 'markStart';
var nameEnd   = 'markEnd';
// 函数执行前做个标记
window.performance.mark(nameStart);
for (var i = 0; i < n; i++) {
    doSomething
}
// 函数执行后再做个标记
window.performance.mark(nameEnd);
// 然后测量这个两个标记间的时间距离，并保存起来
var name = 'myMeasure';
window.performance.measure(name, nameStart, nameEnd);
```

保存后的值可以通过 performance.getEntriesByname( 'myMeasure' )或者 performance.getEntriesByType（'measure'）查询。

##### Performance.clearMeasures()
从浏览器的性能输入缓冲区中移除自定义添加的 measure

##### Performance.getEntriesByName()
返回一个 PerformanceEntry 对象的列表，基于给定的 name 和 entry type

##### Performance.getEntriesByType()
返回一个 PerformanceEntry 对象的列表，基于给定的 entry type

##### Performance.measure()
在浏览器的指定 start mark 和 end mark 间的性能输入缓冲区中创建一个指定名称的时间戳，见上例

##### Performance.toJSON() 
是一个 JSON 格式转化器，返回 Performance 对象的 JSON 对象


#### 资源缓冲区监控

##### Performance.setResourceTimingBufferSize()

设置当前页面可缓存的最大资源数据个数，entryType为resource的资源数据个数。超出时，会清空所有entryType为resource的资源数据。参数为整数(maxSize)。配合performance.onresourcetimingbufferfull事件可以有效监控资源缓冲区。当entryType为resource的资源数量超出设置值的时候会触发该事件。

##### Performance.clearResourceTimings()

从浏览器的性能数据缓冲区中移除所有的 entryType 是 "resource" 的 performance entries

下面是mdn上关于这个属性的一个demo。这个demo的主要内容是当缓冲区内容满时，调用buffer_full函数。

```js
function buffer_full(event) {
  console.log("WARNING: Resource Timing Buffer is FULL!");
  performance.setResourceTimingBufferSize(200);
}
function init() {
  // Set a callback if the resource buffer becomes filled
  performance.onresourcetimingbufferfull = buffer_full;
}
<body onload="init()">
```

使用performance的这些属性和方法，能够准确的记录下我们想要的时间，再加上日志采集等功能的辅助，我们就能很容易的掌握自己网站的各项性能指标了。

#### SPA盛行之际

Navigation Timing API可以监控大部分前端页面的性能。但随着SPA模式的盛行，类似vue，reactjs等框架的普及，页面内容渲染的时机被改变了，W3C标准无法完全满足原来的监控意义。

幸运的是，目前W3C关于首屏统计已经进入了提议阶段，以Chrome为首的浏览器正在打造更能代表用户使用体验的FP、FCP、FMP指标，并且逐步开放API。

<p align="center">
  <img src="https://pic2.zhimg.com/80/v2-7bbd2f7c671e5c9e292272040cb3a14d_720w.jpg" alt="用户体验指标">
</p>
<p align="center">
  <span>用户体验指标</span>
</p>

##### 注意点
- 通过window.performance.timing所获的的页面渲染所相关的数据，在SPA应用中改变了url但不刷新页面的情况下是不会更新的。因此仅仅通过该api是无法获得每一个子路由所对应的页面渲染的时间。如果需要上报切换路由情况下每一个子页面重新render的时间，需要自定义上报。

#### 数据上报方式

测量好时间后，就需要将数据发送给服务端。页面性能统计数据对丢失率要求比较低，且性能统计应该在尽量不影响主流程的逻辑和页面性能的前提下进行。

##### 使用的img标签get请求

- 不存在AJAX跨域问题，可做跨源的请求
- 很古老的标签，没有浏览器兼容性问题

```js
var i = new Image();
i.onload = i.onerror = i.onabort = function () {
  i = i.onload = i.onerror = i.onabort = null;
}
i.src = url;
```

##### navigator.sendBeacon

大部分现代浏览器都支持 navigator.sendBeacon方法。这个方法可以用来发送一些统计和诊断的小量数据，特别适合上报统计的场景。

- 数据可靠，浏览器关闭请求也照样能发
- 异步执行，不会影响下一页面的加载
- API使用简单

```js
window.addEventListener('unload', logData, false);

function logData() {
    navigator.sendBeacon("/log", analyticsData);
}
```

##### 最终方案

当浏览器支持sendBeacon方法，优先使用该方法，使用img方式降级上报。

#### 小结

Performance API 用来做前端性能监控非常有用，它提供了很多方便测试我们程序性能的接口。比如mark和measure。很多优秀的框架也用到了这个API进行测试。它里面就频繁用到了mark和measure来测试程序性能。所以想要开发高性能的web程序，了解Performace API还是非常重要的。