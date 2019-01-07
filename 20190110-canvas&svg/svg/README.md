
* [入门](#入门-相识)
  * [HTML标签使用](#HTML标签使用)
  * [HTML中引用](#HTML中引用)
  * [坐标定位](#坐标定位)
  * [SVG的缩放](#SVG的缩放)
* [深入](#深入-相知)
  * [基本形状](#基本形状)
    * [矩形](#矩形)
    * [圆形](#矩形)
    * [椭圆](#矩形)
    * [线条](#矩形)
    * [折线](#矩形)
    * [多边形](#矩形)
    * [路径](#矩形)
  * [填充与边框](#填充与边框)
  * [渐变](#渐变)
  * [图案](#图案)
  * [文字](#文字)
  * [基本变形](#基本变形)
    * [平移](#平移)
    * [旋转](#旋转)
    * [斜切](#斜切)
    * [缩放](#缩放)
    * [matrix](#matrix())
  * [剪切与遮罩](#剪切与遮罩)
  
  
<!-- SVG开始 ---------------------------------------------------------------------------->

# SVG
> &emsp;&emsp;SVG 是一种基于 XML 语法的图像格式，全称是可缩放矢量图（Scalable Vector Graphics）。jpg、png、gif等图像格式都是基于像素处理的，SVG 则是属于对图像的形状描述，所以它本质上是文本文件，体积较小，且不管放大多少倍都不会失真。<br/>
> &emsp;&emsp;SVG也提供了一些元素，用于定义圆形、矩形、简单或复杂的曲线，以及其他形状。一个简单的SVG文档由`<svg>`根元素和基本的形状元素构成。另外还有一个g元素，它用来把若干个基本形状编成一个组。<br/>

<!-- [0] 入门 ---------------------------------------------------------------------------->

## 入门-相识

<!-- [0-1] HTML标签使用 ---------------------------------------------------------------------------->

#### HTML标签使用
```html

    <svg version="1.1"
         baseProfile="full"
         width="300" height="200"
         xmlns="http://www.w3.org/2000/svg">

        <rect width="100%" height="100%" fill="red" />

        <circle cx="150" cy="100" r="80" fill="green" />

        <text x="150" y="125" font-size="60" text-anchor="middle" fill="white">SVG</text>

    </svg>
```

效果：
<p align="center">
<img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/svg/images/img_1.png" alt="img_1">
</p>
<br/>

> baseProfile：特性描述了作者认为正确渲染内容所需要的最小的 SVG 语言概述。这个特性不会说明任何处理限制，可以把它看作是元数据。 比如，这个特性的值可以被编辑工具用来在用户的修改超出所指定的基准概述范围时发出警告。<br/>
> 可选值：<br/>
> &emsp;&emsp; none：代表了最小的 SVG 语言配置，没有描述作者关于正确渲染内容的观点。<br/>
> &emsp;&emsp; full：代表一个正常的概述，适用于 PC。<br/>
> &emsp;&emsp; basic：代表一个轻量级的概述，适用于 PDA。<br/>
> &emsp;&emsp; tiny：代表更轻量的概述，适用于手机。<br/>

**注意：**<br/>
&emsp;&emsp; **1.** SVG的元素和属性必须按标准格式书写，因为XML是区分大小写的（这一点和html不同）<br/>
&emsp;&emsp; **2.** SVG里的属性值必须用引号引起来，就算是数值也必须这样做。
<br/>
  
##
<!-- [0-2] HTML中引用 ---------------------------------------------------------------------------->

#### HTML中引用
```html
    <object data="image.svg" type="image/svg+xml" />
```
```html
    <iframe src="image.svg"></iframe>
```
```html
    <image src="image.svg"></image>
```
而此时“image.svg”是什么文件呢？其实和原来的文件很像~
```xml
    <?xml version="1.0" standalone="no"?>
    <svg version="1.1"
         baseProfile="full"
         width="300" height="200"
         xmlns="http://www.w3.org/2000/svg">

        <rect width="100%" height="100%" fill="red" />

        <circle cx="150" cy="100" r="80" fill="green" />

        <text x="150" y="125" font-size="60" text-anchor="middle" fill="white">SVG</text>

    </svg>
```
喏~! 就是这个(xml)~ 最上面多了两行奇怪的东西

##
#### 坐标定位
> &emsp;&emsp;SVG使用的坐标系统或者说网格系统，和Canvas用的差不多（所有计算机绘图都差不多）。这种坐标系统是：以页面的左上角为(0,0)坐标原点，坐标以像素为单位，x轴正方向是向右，y轴正方向是向下。【注意】这和我们小时候所学的坐标系是不一样的。但是在HTML文档中，元素都是用这种方式定位的。

示意图：
<p align="center">
<img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/svg/images/img_2.png" alt="img_2">
</p>
<br/>

所以我们定义一个矩形
```html
    <rect x="0" y="0" width="100" height="100" />
```
上面的元素定义了一个100*100px的SVG画布，这里1用户单位等同于1屏幕单位。

##  
#### SVG的缩放
> &emsp;&emsp;SVG 文档中的1个像素对应输出设备（比如显示屏）上的1个像素。但是这种情况是可以改变的，否则 SVG 的名字里也不至于会有“Scalable”（可缩放）这个词。如同CSS可以定义字体的绝对大小和相对大小，SVG也可以定义绝对大小同时SVG也能使用相对大小，只需给出数字，不标明单位，输出时就会采用用户的单位。

看个改过的例子：
```html
    <svg version="1.1"
         baseProfile="full"
         width="300" height="200"
         xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 150 100">

        <rect width="100%" height="100%" fill="red" />

        <circle cx="150" cy="100" r="80" fill="green" />

        <text x="150" y="125" font-size="60" text-anchor="middle" fill="white">SVG</text>

    </svg>
```

这里定义的画布尺寸是300px * 200px。但是，viewBox属性定义了画布上可以显示的区域：从(0,0)点开始，150宽(x) * 100高(y)的区域。这个150 * 100的区域，会放到300 * 200的画布上显示。于是就形成了放大两倍的效果。

用户单位和屏幕单位的映射关系被称为<用户坐标系统>。除了缩放之外，坐标系统还可以旋转、倾斜、翻转。默认的用户坐标系统1用户像素等于设备上的1像素（但是设备上可能会自己定义1像素到底是多大）。

-------------------------------------------------------------------
<!-- [1] 深入 ---------------------------------------------------------------------------->

## 深入-相知
### 基本形状
#### 矩形
```html
    <svg version="1.1"
         baseProfile="full"
         width="300" height="200"
         xmlns="http://www.w3.org/2000/svg">

        <rect x="10" y="10" width="30" height="30"/>
        <rect x="60" y="10" rx="10" ry="10" width="30" height="30"/>

    </svg>
```
> &emsp;&emsp;rect元素会在屏幕上绘制一个矩形 。其实只要6个基本属性就可以控制它在屏幕上的位置和形状。下边的那个图形设置了rx和ry属性用来控制圆角。如果没有设置圆角，则默认为0。

> x：矩形左上角的x位置<br/>
y：矩形左上角的y位置<br/>
width：矩形的宽度<br/>
height：矩形的高度<br/>
rx：圆角的x方位的半径<br/>
ry：圆角的y方位的半径<br/>

##
#### 圆形
```html
    <svg version="1.1"
         baseProfile="full"
         width="300" height="200"
         xmlns="http://www.w3.org/2000/svg">

        <circle cx="25" cy="75" r="20"/>

    </svg>
```
> r：圆的半径

##
#### 椭圆
```html
    <svg version="1.1"
         baseProfile="full"
         width="300" height="200"
         xmlns="http://www.w3.org/2000/svg">

        <ellipse cx="75" cy="75" rx="20" ry="5"/>

    </svg>
```
> Ellipse 是circle元素更通用的形式，你可以分别缩放圆的x半径和y半径（通常数学家称之为长轴半径和短轴半径）

> rx：椭圆的x半径<br/>
ry：椭圆的y半径

##
#### 线条
```html
    <svg version="1.1"
         baseProfile="full"
         width="300" height="200"
         xmlns="http://www.w3.org/2000/svg">

        <line x1="10" x2="50" y1="110" y2="150"/>

    </svg>
```
> Line 绘制线段。它取两个点的位置作为属性，指定这条线的起点和终点位置。

> x1：起点的x位置<br/>
> y1：起点的y位置<br/>
> x2：终点的x位置<br/>
> y2：终点的y位置<br/>

##
#### 折线
```html
    <svg version="1.1"
         baseProfile="full"
         width="300" height="200"
         xmlns="http://www.w3.org/2000/svg">

        <polyline points="60 110, 65 120, 70 115, 75 130, 80 125, 85 140, 90 135, 95 150, 100 145"/>

    </svg>
```
> Polyline是一组点连接在一起的直线。因为它可以有很多的折点，所有折点位置都放在一个points属性中<br/>
> points：点集数列。每个数字用空白、逗号、终止命令符或者换行符分隔开。每个点必须包含2个数字，一个是x坐标，一个是y坐标。所以点列表 (0,0), (1,1) 和(2,2)可以写成这样：“0 0, 1 1, 2 2”。

##
#### 多边形
```html
    <svg version="1.1"
         baseProfile="full"
         width="300" height="200"
         xmlns="http://www.w3.org/2000/svg">

        <polyline points="60 110, 65 120, 70 115, 75 130, 80 125, 85 140, 90 135, 95 150, 100 145"/>

    </svg>
```
>polygon和折线很像，它们都是由连接一组点集的直线构成。不同的是，polygon的路径在最后一个点处自动回到第一个点。

##
#### 路径
```html
    <svg version="1.1"
         baseProfile="full"
         width="300" height="200"
         xmlns="http://www.w3.org/2000/svg">

        <path d="M 20 230 Q 40 205, 50 230 T 90230"/>

    </svg>
```
> path可能是SVG中最常见的形状。你可以用path元素绘制矩形（直角矩形或者圆角矩形）、圆形、椭圆、折线形、多边形，以及一些其他的形状，例如贝塞尔曲线、2次曲线等曲线。<br/>
> d：一个点集数列以及其它关于如何绘制路径的信息（形如“命令+参数”形式的命令）。

##### 直线命令

> 移点命令：M x y 或者 m dx dy<br/>
> M或者m意思是：move命令，将点移到什么地方。

这里需要注意几点：
1、这只会移动点，并不会画点，也不会在移动的路径上划线！<br/>
2、大写的M和小写的m不一样。大写的M坐标采用绝对定位，小写的m坐标采用相对定位（就是相对于上一个点的坐标）。

> 直线命令-1：L x y 或者 l dx dy<br/>
> L或者l意思是：line命令，在当前位置和新位置之间画一条直线。

> 直线命令-2：H x 或者 h dx<br/>
> H或者h意思是：绘制平行线命令，所以只有X轴的参数。

> 直线命令-2：V y 或者 v dy<br/>
> V或者v意思是：绘制垂直线命令，所以只有Y轴的参数。

现在，我们用path画一个矩形。
```html
    <svg version="1.1"
         baseProfile="full"
         width="300" height="200"
         xmlns="http://www.w3.org/2000/svg">

        <path d="M10 10 H 90 V 90 H 10 L 10 10"/>

    </svg>
```
也可以简化成这样：
```html
	<path d="M10 10 H 90 V 90 H 10 Z"/>
```
也可以使用相对命令：
```html
	<path d="M10 10 h 80 v 80 h -80 Z"/>
```

##

> 曲线命令-贝塞尔曲线：C x1 y1, x2 y2, x y 或者 c dx1 dy1, dx2 dy2, dx dy<br/>
> C或者c代表贝塞尔曲线。<br/>这里的最后一个坐标(x,y)表示的是曲线的终点<br/>(x1,y1)是起点的控制点<br/>(x2,y2)是终点的控制点。

```html
    <svg width="190px" height="160px" version="1.1"
         xmlns="http://www.w3.org/2000/svg">

        <path d="M10 10 C 20 20, 40 20, 50 10"/>
        <path d="M70 10 C 70 20, 120 20, 120 10"/>
        <path d="M130 10 C 120 20, 180 20, 170 10"/>
        <path d="M10 60 C 20 80, 40 80, 50 60"/>
        <path d="M70 60 C 70 80, 110 80, 110 60"/>
        <path d="M130 60 C 120 80, 180 80, 170 60"/>
        <path d="M10 110 C 20 140, 40 140, 50 110"/>
        <path d="M70 110 C 70 140, 110 140, 110 110"/>
        <path d="M130 110 C 120 140, 180 140, 170 110"/>

    </svg>
```
> 曲线命令-copy三型贝塞尔曲线：C x1 y1, x2 y2, x y 或者 c dx1 dy1, dx2 dy2, dx dy<br/>
> S命令可以用来创建与之前那些曲线（三次贝塞尔曲线）一样的贝塞尔曲线，但是，如果S命令跟在一个C命令或者另一个S命令的后面，它的第一个控制点，就会被假设成前一个控制点的对称点。如果S命令单独使用，前面没有C命令或者另一个S命令，那么它的两个控制点就会被假设为同一个点。下面是S命令的语法示例，右图中的某个控制点用红色标示，与它对称的控制点用蓝色标示。

```html
    <path d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"/>
```

> 曲线命令-单控制点型贝塞尔曲线：Q x1 y1, x y 或者 q dx1 dy1, dx dy<br/>
> 另一种可用的贝塞尔曲线是二次贝塞尔曲线Q，它比三次贝塞尔曲线简单，只需要一个控制点，用来确定起点和终点的曲线斜率。因此它需要两组参数，控制点和终点坐标。

```html
    <path d="M10 80 Q 95 10 180 80"/>
```

> 曲线命令-copy二型贝塞尔曲线：T x y 或者 t dx dy<br/>
> 三次贝塞尔曲线有一个S命令，二次贝塞尔曲线有一个差不多的T命令，可以通过更简短的参数，延长二次贝塞尔曲线。

```html
    <path d="M10 80 Q 52.5 10, 95 80 T 180 80"/>
```

##

> 曲线命令-弧形
> 