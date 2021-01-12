# Chrome运行时性能瓶颈分析

> 上次我们介绍了用 Performance API 来做从客户端到服务端再到客户端这个过程的前端性能监控，主要把控的是整个流程、基本面的性能状况
> 这次我们将更加聚焦于浏览器本身，看看它能让我们在优化页面方面获得什么样的有价值的信息
> chrome 浏览器控制台中的**performance**标签，我们都知道是**性能监控**标签，但不是太了解，这次我们就来学习它

### 性能测试前准备
> 首先我们打开chrome的隐私模式（无痕窗口），打开一个需要分析的目标页面（这里用的是谷歌性能测试页面），可以打开[谷歌性能测试地址](https://googlechrome.github.io/devtools-samples/jank/)，也可以打开这个[静态页面](https://github.com/jimwong666/FEstart/blob/master/knowledge/optimization/chromePerformance/performanceTest.html)

<p align="center">
  <img src="https://github.com/jimwong666/FEstart/blob/master/knowledge/optimization/chromePerformance/img/performanceTest_0.png" alt="performanceTest">
</p>

页面上有蓝色小方块在运动，通过左边的按钮可以改变蓝色方块的数量，以达到页面消耗性能变化，这样更方便我们模拟高负载场景。当然还有其他功能的按钮。

当然，仅仅这样还不够极端模拟。

我们按下F12打开**performance**标签，点开右边的**小齿轮**，像下面这样设置来限制cpu性能，选择降低4倍性能或6倍性能，让cpu出现性能瓶颈。

<p align="center">
  <img src="https://github.com/jimwong666/FEstart/blob/master/knowledge/optimization/chromePerformance/img/performanceTest_1.png" alt="performanceTest">
</p>
此时，也可以勾选 **小齿轮** 左边的 Screenshots 和 Memony 选项，测试数据会多出 **屏幕截图** 和 **内存使用情况**

### 测试性能瓶颈

下面我们就来调整上述2个参数进行高负载模拟，当出现明显卡顿，我们便使用**performance**进行录制。

像下面这样，先点击左上角**小圆点**进行录制，然后录制适当时间，点击**stop**关闭。

<p align="center">
  <img src="https://github.com/jimwong666/FEstart/blob/master/knowledge/optimization/chromePerformance/img/performanceTest_2.png" alt="performanceTest">
</p>

你也可以点击页面上的**优化**按钮，会发现画面变得流畅了，这时再录制一下，参照对比。

<p align="center">
  <img src="https://github.com/jimwong666/FEstart/blob/master/knowledge/optimization/chromePerformance/img/performanceTest_3.png" alt="performanceTest">
</p>
<p align="center">
  <span>优化前</span>
</p>

<p align="center">
  <img src="https://github.com/jimwong666/FEstart/blob/master/knowledge/optimization/chromePerformance/img/performanceTest_4.png" alt="performanceTest">
</p>
<p align="center">
  <span>优化后</span>
</p>

我们大致看一下这个页面，其实就是两大块儿：

1. 上部分是各种随时间线变化的图表（FPS，CPU，NET 等信息）
2. 下部分是 Tab 页切换的图表（统计图表、事件时长排序、事件调用排序、事件发生的先后顺序）



### FPS

FPS：指页面每秒帧数

当 FPS = 60 时，视觉为最佳效果，肉眼几乎无法感到画面的延时和不适

当 FPS < 24 时，视觉上会感觉到明显卡顿和不适

在上图中，`<span style="color: yellow;">**黄色部分**</span>`为**FPS**展示区域，我们可以看到未优化的图中有：

1. 上部分红色的条
2. 下部分是绿色的块儿

而对比一下优化后的图，会发现：

1. 上部分红色的条变少了，甚至消失了
2. 下部分绿色的块儿变高了

所以：
- 红色的条：表示帧数已经下降到影响用户体验的程度，这块有问题
- 绿色的块：表示FPS数值，越高说明FPS越大，反之亦然

### CPU

再往下看，<span style="color: orange;">**橙色部分**</span>指的是**CPU**的使用情况，我们可以看到其中的颜色包括黄色、蓝色、绿色、灰色、白色，其实就是对应着CPU干的不同的活，参考最底部Summary Tab页里面的**环形图**，即黄色是Scripting（JavaScript的执行）、蓝色是Rendering（样式计算与布局，即重排）、绿色是Painting（重绘）、灰色是System（其他）、白色是Idle（空闲时间）。

### NET

下面是NET，已用<span style="color: blue;">**蓝色部分**</span>标出，Net部分大致记录了页面的网络状况。



NET 下面是与时间对应的每帧的截图，鼠标放在上面会逐帧放大，可以通过上方的 checkbox 来控制是否显示。

### HEAP

**HEAP**表示内存占用情况，可以通过上方的 checkbox 来控制是否显示。

再往下面看会发现有很多折叠菜单

### Frames

**Frames**是用来查看特定帧的详细信息，悬停在小绿块上，会出现此帧的毫秒数和相对应的帧数值。

也可以点击相应的帧，并在下方的 Summary Tab 页里面查看相关数据。













