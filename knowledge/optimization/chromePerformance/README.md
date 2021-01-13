# Chrome运行时性能瓶颈分析

> 上次我们介绍了用 Performance API 来做前端性能监控，主要把控的是整个流程、基本面的性能状况
>
> 这次我们将更加聚焦于浏览器，甚至代码本身，看看通过浏览器控制台中performance标签能让我们在优化页面方面获得什么样有价值的信息
>
> chrome浏览器版本：87.0.4280.141

### 性能测试前准备

> 首先我们打开chrome的隐私模式（无痕窗口），打开一个需要分析的目标页面（这里用的是谷歌性能测试页面），可以打开[谷歌性能测试地址](https://googlechrome.github.io/devtools-samples/jank/)，也可以打开这个[静态页面](https://github.com/jimwong666/FEstart/blob/master/knowledge/optimization/chromePerformance/performanceTest.html)

<p align="center">
  <img src="https://github.com/jimwong666/FEstart/blob/master/knowledge/optimization/chromePerformance/img/performanceTest_0.png" alt="performanceTest">
</p>

页面上有蓝色小方块在运动，通过左边的按钮可以改变蓝色方块的数量，以达到页面消耗性能的变化，这样更方便我们模拟高负载场景，除了有改变蓝色小方块数量的按钮，还有性能优化按钮和帮助按钮。

当然，仅仅这样还不够极端模拟。

我们按下F12打开**performance**标签，在开始之前我们先了解一下界面及功能

<p align="center">
  <img src="https://github.com/jimwong666/FEstart/blob/master/knowledge/optimization/chromePerformance/img/performanceTest_demo.png" alt="performanceTest">
</p>

点开右边的**小齿轮**，像下面这样设置来限制cpu性能，选择降低4倍性能或6倍性能，让cpu出现性能瓶颈（也可以勾选Enabled advanced paint instrumentation这个选项来进一步？增加性能消耗，但是效果好像不明显，可能有误。另外此选项打开后最底部tabs标签页将会多出来一个tab，用来展示浏览器渲染图像时发生的情况）

<p align="center">
  <img src="https://github.com/jimwong666/FEstart/blob/master/knowledge/optimization/chromePerformance/img/performanceTest_1.png" alt="performanceTest">
</p>
再勾选 **小齿轮** 左边的 Screenshots 和 Memony 选项，这样性能测试的数据会多出 **屏幕快照** 和 **内存使用情况** 这两项

下面我们就来调整上述2个参数（增加蓝色小方块数量和限制cpu性能）进行高负载模拟，此时画面出现了明显卡顿，下面我们进入测试环节

------

### 测试性能

像下面这样，先点击左上角**小圆点**进行录制，然后录制6秒左右，点击**stop**关闭。

<p align="center">
  <img src="https://github.com/jimwong666/FEstart/blob/master/knowledge/optimization/chromePerformance/img/performanceTest_2.png" alt="performanceTest">
</p>

下图是卡顿时的性能分析：

<p align="center">
  <img src="https://github.com/jimwong666/FEstart/blob/master/knowledge/optimization/chromePerformance/img/performanceTest_3.png" alt="performanceTest">
</p>
<p align="center">
  <span>卡顿时</span>
</p>
这时我们恢复正常状态，然后点击**优化**按钮，再进行录制，形成参照：


<p align="center">
  <img src="https://github.com/jimwong666/FEstart/blob/master/knowledge/optimization/chromePerformance/img/performanceTest_4.png" alt="performanceTest">
</p>
<p align="center">
  <span>优化后</span>
</p>

我们大致看一下这个页面，看上去主要分为4大块儿：

1. 第一部分是各种随时间线变化的图表（FPS，CPU，NET 等信息）
2. 第二部分是几个折叠菜单（Frames，Experience，Main等信息）
3. 第三部分是方形折线图
4. 第四部分是 Tab 页切换的图表

下面我们对照图表，逐个讲解

------

> 第一部分

### FPS

FPS：指页面每秒帧数

当 FPS = 60 时，视觉为最佳效果，肉眼几乎无法感到画面的延时和不适

当 FPS < 24 时，视觉上会感觉到明显卡顿和不适

在上图中，我们可以看到未优化的图中有：

1. 上部分红色的条
2. 下部分是绿色的块儿

而对比一下优化后的图，会发现：

1. 上部分红色的条消失了
2. 下部分绿色的块儿变高了

所以：
- 红色的条：表示帧数已经下降到影响用户体验的程度，这块有问题
- 绿色的块：表示FPS数值，越高说明FPS越大，反之亦然



##### 了解FPS快捷工具

<p align="center">
  <img src="https://github.com/jimwong666/FEstart/blob/master/knowledge/optimization/chromePerformance/img/performanceTest_5.png" alt="performanceTest">
</p>

在控制台界面我们点击**右上角三个点**，选择 **More tools**，再选择**Rendering**，此时会看到控制台底部多出了一个**Rendering** Tab 页，接着勾选 **Frame Rendering Stats**，这时我们的页面上就会出现一个与帧数和GPU相关的数据黑框，如下图：

<p align="center">
  <img src="https://github.com/jimwong666/FEstart/blob/master/knowledge/optimization/chromePerformance/img/performanceTest_6.png" alt="performanceTest">
</p>
这个黑框可以我们方便的观察到页面帧数的实时情况


------

### CPU

再往下是**CPU**的使用情况，我们可以看到**波浪图**，其中的颜色包括黄色、蓝色、绿色、灰色、白色，其实就是对应着CPU干的不同的活，参考最底部**Summary** Tab页里面的**环形图**，即黄色是Scripting（JavaScript的执行）、蓝色是Rendering（样式计算与布局，即重排）、绿色是Painting（重绘）、灰色是System（其他）、白色是Idle（空闲时间）。

------

### NET

下面是NET，展示了资源占用网络情况，有两条蓝色的长条，深蓝代表优先级比较高的请求，浅蓝代表优先级比较低的请求，横条越长，网络花费时间越长。

------

### 屏幕快照

屏幕快照是与时间对应的每帧的截图，鼠标放在上面会逐帧放大，可以通过上方的 checkbox 来控制是否显示。

------

### HEAP

**HEAP**展示了内存占用情况的方形折线图，可以通过上方的 checkbox 来控制是否显示。

再往下面看会发现有很多折叠菜单，我们来逐个打开看看

------

> 第二部分

### Network

**Network**即对上面的**NET**部分的详细展示，此处展示的是资源加载顺序和耗费时间。有下面几种文件资源：

- HTML：显示蓝色
- JS：显示黄色
- CSS：显示紫色
- 媒体文件：显示绿色
- 其他资源：显示灰色

每个**资源条**都有一个像K线的外型，只不过K线是竖着的，它是横着的。你在控制台的Network标签栏一一对照他们的含义：

- 左边横线：对应 NetWork 工具中 Request Sent 之前的所有的事情
- 浅色的条：对应 NetWork 工具中Request Sent 和 Waiting
- 深色的条：对应 NetWork 工具中 Content Download
- 右边横线：表示等待主进程所花费的时间，在 NetWork 工具中没有显示出来

------

### Frames

**Frames**是用来查看特定帧的详细信息，悬停在小绿块上，会出现此帧的毫秒数和相对应的帧数值。

也可以点击相应的帧，并在下方的 Summary Tab 页里面查看相关数据。

------

### Interactions

这一块是查看过程中用户的交互操作，比如点击鼠标、输入文字、动画等。如果没有交互操作，则不会展示这个部分，下图为示例：

<p align="center">
  <img src="https://github.com/jimwong666/FEstart/blob/master/knowledge/optimization/chromePerformance/img/performanceTest_7.png" alt="performanceTest">
</p>

------

### Timings

**Timings**展示的是一系列**关键时间节点**，其中包括DCL、FP、FCP、LCP、L等，参考 **performance.timing** API

- DCL：HTML文档被完全加载和解析完成（DOMContentLoaded Event）
- FP：首次绘制（First Paint）
- FCP：首次有内容的渲染（First Contentful Paint）
- LCP：最大内容的渲染（Largest Contentful Paint）
- L：页面中所有资源加载完成（Onload Event）
- FMP：首次有意义的绘制（First Meaningful Paint）

------

### Experience

此部分展示的是**用户体验**相关的数据，比如当出现了可能会影响用户体验的操作时，时间轴上会有相应标红和提示。

比如上图中就出现了 **Layout Shift** ，即出现了 **布局移动**，可能会影响用户体验。

------

### Main

此部分记录了**主线程**的执行记录，可以看到某个任务执行的具体情况，此部分的图表也称为**火焰图**（倒着看）。

> 因为浏览器的单个页面，就是打开的一个tab标签，他是单线程，即全部的程序都是跑在这个主线程的，所以你可以在这里看到所有的事件。

我们点开**Main**折叠栏（内部的颜色好像是随机的），可以看到从左至右都是一段一段的，每段的**顶层**都是 **TASK**，这就是表示主线程处理的任务。并且下一层都是 **事件类型**，类型有所不同（有DOMContentLoaded、Timer Fired、XHR等等），也称为**根活动**。再下一层为 **Function Call** 等等，越往下层越具体，具体看示例。

点击某一块，你可以在下方的信息 Tab 页中观察此 TASK 的相关信息。并且如果哪一块的性能不好，那一块的右上角会有一个红色三角形。

> **根活动**指的是浏览器触发的一系列流程。例如，当你点击页面内容，浏览器触发一个Event作为根活动，该Event可能回调一个事件处理事件。在Main面板中的火焰图中，根活动展示在上部，在 **Call Tree** 和 **Event Log** 面板中，根活动展示在顶层。

下面列出一些 **根活动** 事件类型：

##### Loading事件

|       事件       |                             描述                             |
| :--------------: | :----------------------------------------------------------: |
|    Parse HTML    |                      浏览器执行HTML解析                      |
|  Finish Loading  |                       网络请求完毕事件                       |
|   Receive Data   | 请求的响应数据到达事件，如果响应数据很大（拆包），可能会多次触发该事件 |
| Receive Response |                     响应头报文到达时触发                     |
|   Send Request   |                      发送网络请求时触发                      |

##### Scripting事件

|          事件           |                        描述                         |
| :---------------------: | :-------------------------------------------------: |
|  Animation Frame Fired  |     一个定义好的动画帧发生并开始回调处理时触发      |
| Cancel Animation Frame  |                取消一个动画帧时触发                 |
|        GC Event         |                   垃圾回收时触发                    |
|    DOMContentLoaded     |        当页面中的DOM内容加载并解析完毕时触发        |
|     Evaluate Script     |                  一个js脚本被评估                   |
|          Event          |                       js事件                        |
|      Function Call      |          只有当浏览器进入到js引擎中时触发           |
|      Install Timer      | 创建计时器（调用setTimeout()和setInterval()）时触发 |
| Request Animation Frame |         requestAnimationFrame() 调用了新帧          |
|      Remove Timer       |               当清除一个计时器时触发                |
|          Time           |               调用console.time()触发                |
|        Time End         |              调用console.timeEnd()触发              |
|       Timer Fired       |                定时器激活回调后触发                 |
| XHR Ready State Change  |           当一个异步请求为就绪状态后触发            |
|        XHR Load         |            当一个异步请求完成加载后触发             |

##### Rendering事件

|       事件        |              描述               |
| :---------------: | :-----------------------------: |
| Invalidate layout | 当DOM更改导致页面布局失效时触发 |
|      Layout       |     页面布局计算执行时触发      |
| Recalculate style |  Chrome重新计算元素样式时触发   |
|      Scroll       |      内嵌的视窗滚动时触发       |

##### Painting事件

|       事件       |                 描述                 |
| :--------------: | :----------------------------------: |
| Composite Layers | Chrome的渲染引擎完成图片层合并时触发 |
|   Image Decode   |      一个图片资源完成解码后触发      |
|   Image Resize   |       一个图片被修改尺寸后触发       |
|      Paint       | 合并后的层被绘制到对应显示区域后触发 |

------

### Raster

**光栅格化**线程池，查看光栅格活动信息

**“光栅格化”**或者叫**“光栅化”**代表与**页面绘制**有关的所有活动。毕竟，任何HTML页面最终展示在我们眼前都是叠加的“图像”。浏览器将DOM和CSS转换为图像在屏幕上显示。因此，即使页面上没有任何图像，你仍然会在“光栅格化”中看到至少一个光栅格化线程，这表示HTML页面信息转化为了显示器上的像素点了。

> **rasterization**（栅格化）是三维物体在二维平面上成像的一个过程，即将三维物体投影到二维影像上，解决了一个三维物体在不同角度看“长”什么样的问题。**rasterization**有两种实现算法，一种投影法：即从物方出发将物方三角面投影到影像上，一种光线法，即从像方出发，从像方发射光线与物方三角面相交，前者算法效率较高，但精度不如后者，后者反之。

------

### Compositor

**合成排版**线程的执行记录，用来记录**HTML绘制**阶段 (Paint)结束后的图层合成操作

**合成**是一种将页面分成若干层，然后分别对它们进行光栅化，最后在一个单独的线程 - 合成线程（compositor thread）里面合并成一个页面的技术。

> Chromium 目前实际支持三种不同的光栅化和合成的组合方式：软件光栅化 + 软件合成，软件光栅化 + gpu 合成，gpu 光栅化 + gpu 合成。在移动平台上，大部分设备和移动版网页使用的都是 gpu 光栅化 + gpu 合成的渲染方式，理论上性能也最佳。

------

### GPU

**GPU**进程主线程的执行过程记录，查看GPU活动信息，如 可以直观看到何时启动GPU加速

------

### Chrome_ChildIOThread

浏览器**IO子线程**，用来接收其他进程的IPC消息和派发消息到其他进程

------

### GPUMemoryThread

**GPU内存**线程

------

### ThreadPoolForegoroundWorker

**工作**线程

------

> 第三部分

### 内存使用情况

这一部分显示的是浏览器**内存**相关的数据。其中有5个指标：

- JS Heap：即js堆栈，可以结合之前我们讲过的 **performance.memory** API。比如曲线一直在增长，则说明存在内存泄露，如果相当长的一段时间，内存曲线都是没有下降的，这里是有发生内存泄露的可能的。
- Document：这个代表的是目前tab标签的内存有多少个Documents，包括当前页面、之前的页面、iframe和插件产生的页面。
- Nodes：DOM节点数
- Listeners：监听数
- GPU memory：显存数

------

> 第四部分

### 相关统计信息Tab页

这部分**tab页**的信息基本都是上述图表信息的详情，比如点击 Main 里面的函数块，此处就会显示次函数的相关详情。总共包括4个Tab标签：

- Summary：概览标签，统计每个阶段或函数等所花费的时间等信息
- Bottom-Up：按照事件花费的时间长短来排序
- Call Tree：按照调用顺序来排序的
- Event Log：按照事件发生的先后顺序排序，显示的事件的详细信息
- Paint Profiler：当勾选了 Enabled advanced paint instrumentation 时，会多出来这个标签，描述当浏览器渲染图像时发生的一些情况

