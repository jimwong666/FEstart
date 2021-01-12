# Chrome运行时性能瓶颈分析

> 上次我们介绍了用 Performance API 来做从客户端到服务端再到客户端这个过程的前端性能监控，主要把控的是整个流程、基本面的性能状况
> 这次我们将更加聚焦于浏览器本身，看看它能让我们在优化页面方面获得什么样的有价值的信息
> chrome 浏览器控制台中的**performance**标签，我们都知道是**性能监控**标签，但不是太了解，这次我们就来学习它

------

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

------

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

------

### FPS

FPS：指页面每秒帧数

当 FPS = 60 时，视觉为最佳效果，肉眼几乎无法感到画面的延时和不适

当 FPS < 24 时，视觉上会感觉到明显卡顿和不适

在上图中，<span style="color: yellow;">**黄色部分**</span>为**FPS**展示区域，我们可以看到未优化的图中有：

1. 上部分红色的条
2. 下部分是绿色的块儿

而对比一下优化后的图，会发现：

1. 上部分红色的条变少了，甚至消失了
2. 下部分绿色的块儿变高了

所以：
- 红色的条：表示帧数已经下降到影响用户体验的程度，这块有问题
- 绿色的块：表示FPS数值，越高说明FPS越大，反之亦然



#### 了解FPS快捷工具

<p align="center">
  <img src="https://github.com/jimwong666/FEstart/blob/master/knowledge/optimization/chromePerformance/img/performanceTest_5.png" alt="performanceTest">
</p>

打开 F12，然后点击**右上角三个点**，选择 **More tools**，再选择**Rendering**，此时会看到控制台底部多出了一个**Rendering** Tab 页，接着勾选 **Frame Rendering Stats**，这时我们的页面上就会出现一个与帧数和GPU相关的数据黑框，如下图：

<p align="center">
  <img src="https://github.com/jimwong666/FEstart/blob/master/knowledge/optimization/chromePerformance/img/performanceTest_6.png" alt="performanceTest">
</p>

------

### CPU

再往下看，<span style="color: orange;">**橙色部分**</span>指的是**CPU**的使用情况，我们可以看到其中的颜色包括黄色、蓝色、绿色、灰色、白色，其实就是对应着CPU干的不同的活，参考最底部Summary Tab页里面的**环形图**，即黄色是Scripting（JavaScript的执行）、蓝色是Rendering（样式计算与布局，即重排）、绿色是Painting（重绘）、灰色是System（其他）、白色是Idle（空闲时间）。

------

### NET

下面是NET，已用<span style="color: blue;">**蓝色部分**</span>标出，展示资源占用网络情况，有两条蓝色的长条，深蓝代表优先级比较高的请求，浅蓝代表优先级比较低的请求，横杠越长，网络花费时间越长。

------

### 屏幕快照

NET 下面是与时间对应的每帧的截图，鼠标放在上面会逐帧放大，可以通过上方的 checkbox 来控制是否显示。

------

### HEAP

**HEAP**表示内存占用情况，可以通过上方的 checkbox 来控制是否显示。

再往下面看会发现有很多折叠菜单，我们来逐个打开看看

------

### Network

**Network**即对上面的**NET**部分的详细展示，此处展示的是资源加载顺序和耗费时间。有下面几种文件资源：

- HTML：显示蓝色
- JS：显示黄色
- CSS：显示紫色
- 媒体文件：显示绿色
- 其他资源：显示灰色

每个资源块都有一个像K线的外向，只不过K线是竖着的，它是横着的。

- 左边横线：对应 NetWork 工具中 Request Sent 之前的所有的事情

------

### Frames

**Frames**是用来查看特定帧的详细信息，悬停在小绿块上，会出现此帧的毫秒数和相对应的帧数值。

也可以点击相应的帧，并在下方的 Summary Tab 页里面查看相关数据。

------

### Interactions

这一块是查看并分析记录过程中用户的交互操作。如果没有交互操作，则不会展示这个部分，下图为示例：

<p align="center">
  <img src="https://github.com/jimwong666/FEstart/blob/master/knowledge/optimization/chromePerformance/img/performanceTest_7.png" alt="performanceTest">
</p>

------

### Timings

**Timings**展示的是一系列**关键时间节点**，其中包括DCL、FP、FCP、LCP、L等

- DCL：HTML文档被完全加载和解析完成（DOMContentLoaded Event）
- FP：首次绘制（First Paint）
- FCP：首次有内容的渲染（First Contentful Paint）
- LCP：最大内容的渲染（Largest Contentful Paint）
- L：页面中所有资源加载完成（Onload Event）
- FMP：首次有意义的绘制（First Meaningful Paint，可能已移除）

------

### Experience

此部分展示的是**用户体验**相关的数据，比如当出现了可能会影响用户体验的操作时，时间轴上会有相应标红和提示。

比如上图中就出现了 **Layout Shift** ，即出现了 **布局移动**，可能会影响用户体验。

------

### Main

------

### Raster

**光栅格化**线程，查看光栅格活动信息

------

### GPU

**GPU**进程，此部分用来查看GPU活动信息

------

### Chrome_ChildIOThread

浏览器**IO子线程**，用来接收其他进程的IPC消息和派发消息到其他进程

------

### Compositor

**排版**线程

------

### GPUMemoryThread

**GPU内存**线程

------

### ThreadPoolForegoroundWorker

**工作**线程

------

### 内存情况

这是一种块单独的块，显示的是浏览器**内存**相关的数据。其中有5个指标：

- JS Heap：js堆栈，可以结合之前我们讲过的 **performance.memory** API
- Document：这个代表的是目前tab标签的内存有多少个Documents，包括当前页面、之前的页面、iframe和插件产生的页面。
- Nodes：DOM节点数
- Listeners：监听数
- GPU memory：显存数

------

### 相关统计信息Tab页

这部分**tab页**的信息基本都是上述图表信息的详情，比如点击 Main 里面的函数块，此处就会显示次函数的相关详情。总共包括4个Tab标签：

- Summary：概览标签，统计每个阶段花费的时间等
- Bottom-Up：按照事件花费的时间长短来排序
- Call Tree：按照调用顺序来排序的
- Event Log：按照事件发生的先后顺序排序，显示的事件的详细信息

