# Chrome运行时性能瓶颈分析

> 上次我们介绍了用 Performance API 来做从客户端到服务端再到客户端这个过程的前端性能监控，主要把控的是整个流程、基本面的性能状况
> 这次我们将更加聚焦于浏览器本身，看看它能让我们在优化页面方面获得什么样的有价值的信息
> chrome 浏览器控制台中的**performance**标签，我们都知道是**性能监控**标签，但不是太了解，这次我们就来学习它

### 性能测试
> 首先我们打开chrome的隐私模式（无痕窗口），打开一个需要分析的目标页面（这里用的是谷歌性能测试页面），可以打开[谷歌性能测试地址](https://googlechrome.github.io/devtools-samples/jank/)，也可以打开这个[静态页面]()

<p align="center">
  <img src="https://mmbiz.qpic.cn/mmbiz_png/aVp1YC8UV0fULlqAmCyhMXIMclUIdrBumozhq72qogNMhiaibbNqplxAJVWdkZLhjvpEJpUrlYafibnsQRD7kibwwg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1" alt="window.performance">
</p>
<p align="center">
  <span>window.performance</span>
</p>