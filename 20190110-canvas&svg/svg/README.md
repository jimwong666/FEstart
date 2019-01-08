
* [基础知识](#基础知识)
  * [SVG的使用](#SVG的使用)
  * [坐标定位](#坐标定位)
  * [SVG的缩放](#SVG的缩放)
* [深入](#深入)
  * [基本形状](#基本形状)
    * [矩形](#矩形)
    * [圆形](#圆形)
    * [椭圆](#椭圆)
    * [线条](#线条)
    * [折线](#折线)
    * [多边形](#多边形)
    * [路径](#路径)
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

<!-- [0] 基础知识 ---------------------------------------------------------------------------->

## 基础知识

<!-- [0-1] HTML标签使用 ---------------------------------------------------------------------------->

#### SVG主要特点
	1.SVG是可伸缩矢量图形。
	2.SVG用来定义用于网络的基于矢量的图形。
	3.SVG使用XML格式定义图形。
	4.SVG图像在放大或缩小（改变尺寸）的情况下，其图形质量不会受受损失。
	5.SVG是W3C的一个标准。

<!-- [0-1] SVG使用 ---------------------------------------------------------------------------->

#### SVG的使用
<!-- [0-2-1] 内嵌在HTML ---------------------------------------------------------------------------->
> 我们既可以直接内嵌在HTML代码之中，也可以将代码单独写入一个SVG文件（.svg格式文件）。

##### 内嵌在HTML
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
<img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/svg/images/example.png" alt="示例">
</p>
<br/>

> xmlns是XML命名空间的声明，不要省略。<br/>
> 
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
<!-- [0-2-2] 引用SVG文件 ---------------------------------------------------------------------------->

##### 引用SVG文件
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
<!-- [0-3] 坐标定位 ---------------------------------------------------------------------------->
#### 坐标定位
> &emsp;&emsp;SVG使用的坐标系统或者说网格系统，和Canvas用的差不多（所有计算机绘图都差不多）。这种坐标系统是：以页面的左上角为(0,0)坐标原点，坐标以像素为单位，x轴正方向是向右，y轴正方向是向下。【注意】这和我们小时候所学的坐标系是不一样的。但是在HTML文档中，元素都是用这种方式定位的。

示意图：
<p align="center">
<img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/svg/images/coordinate.png" alt="坐标定位">
</p>
<br/>

所以我们定义一个矩形
```html
    <rect x="0" y="0" width="100" height="100" />
```
上面的元素定义了一个100*100px的SVG画布，这里1用户单位等同于1屏幕单位。

##  
<!-- [0-4] SVG的缩放 ---------------------------------------------------------------------------->
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

## 深入
<!-- [1-1] 基本形状 ---------------------------------------------------------------------------->
### 基本形状
<!-- [1-1-1] 矩形 ---------------------------------------------------------------------------->
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
<!-- [1-1-2] 圆形 ---------------------------------------------------------------------------->
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
<!-- [1-1-3] 椭圆 ---------------------------------------------------------------------------->
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
<!-- [1-1-4] 线条 ---------------------------------------------------------------------------->
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
<!-- [1-1-5] 折线 ---------------------------------------------------------------------------->
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
<!-- [1-1-6] 多边形 ---------------------------------------------------------------------------->
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
<!-- [1-1-7] 路径 ---------------------------------------------------------------------------->
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

<!-- [1-1-7-1] 移点命令 ---------------------------------------------------------------------------->
##### 移点命令:

> 移点命令：M x y 或者 m dx dy<br/>
> M或者m意思是：move命令，将点移到什么地方。

这里需要注意几点：<br/>
    1、这只会移动点，并不会画点，也不会在移动的路径上划线！<br/>
    2、大写的M和小写的m不一样。大写的M坐标采用绝对定位，小写的m坐标采用相对定位（就是相对于上一个点的坐标）。

<!-- [1-1-7-2] 直线命令 ---------------------------------------------------------------------------->
##### 直线命令:

直线命令 L/l（直线）：L x y 或者 l dx dy<br/>
> L或者l意思是：line命令，在当前位置和新位置之间画一条直线。
##
直线命令 H/h（水平线）：H x 或者 h dx<br/>
> H或者h意思是：绘制平行线命令，所以只有X轴的参数。
##
直线命令 V/v（垂直线）：V y 或者 v dy<br/>
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
示意图：
<p align="center">
<img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/svg/images/path_line.png" alt="path画矩形">
</p>
<br/>

也可以简化成这样：
```html
	<path d="M10 10 H 90 V 90 H 10 Z"/>
```
也可以使用相对命令：
```html
	<path d="M10 10 h 80 v 80 h -80 Z"/>
```

##
<!-- [1-1-7-3] 曲线命令 ---------------------------------------------------------------------------->
##### 曲线命令:

曲线命令C/c（贝塞尔曲线）：C x1 y1, x2 y2, x y 或者 c dx1 dy1, dx2 dy2, dx dy<br/>
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
示意图：
<p align="center">
<img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/svg/images/path_beziers.png" alt="三次贝塞尔曲线示例">
</p>
<br/>

##
曲线命令S/s（copy三型贝塞尔曲线）：S x2 y2, x y 或者 s dx2 dy2, dx dy<br/>
> S命令可以用来创建与之前那些曲线（三次贝塞尔曲线）一样的贝塞尔曲线，但是，如果S命令跟在一个C命令或者另一个S命令的后面，它的第一个控制点，就会被假设成前一个控制点的对称点。如果S命令单独使用，前面没有C命令或者另一个S命令，那么它的两个控制点就会被假设为同一个点。下面是S命令的语法示例，右图中的某个控制点用红色标示，与它对称的控制点用蓝色标示。

```html
    <path d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"/>
```
示意图：
<p align="center">
<img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/svg/images/path_bezier3.png" alt="复制三次贝塞尔曲线">
</p>
<br/>

##
曲线命令Q/q（单控制点型贝塞尔曲线）：Q x1 y1, x y 或者 q dx1 dy1, dx dy<br/>
> 另一种可用的贝塞尔曲线是二次贝塞尔曲线Q，它比三次贝塞尔曲线简单，只需要一个控制点，用来确定起点和终点的曲线斜率。因此它需要两组参数，控制点和终点坐标。

```html
    <path d="M10 80 Q 95 10 180 80"/>
```
示意图：
<p align="center">
<img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/svg/images/path_bezier2.png" alt="二次贝塞尔曲线">
</p>
<br/>

##
曲线命令T/t（copy二型贝塞尔曲线）：T x y 或者 t dx dy<br/>
> 三次贝塞尔曲线有一个S命令，二次贝塞尔曲线有一个差不多的T命令，可以通过更简短的参数，延长二次贝塞尔曲线。

```html
    <path d="M10 80 Q 52.5 10, 95 80 T 180 80"/>
```
示意图：
<p align="center">
<img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/svg/images/path_double_bezier.png" alt="复制二次贝塞尔曲线">
</p>
<br/>

##
曲线命令A/a（弧形曲线）
> 这部分跳过，大家可以自行了解

示意图：
<p align="center">
<img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/svg/images/path_oval.png" alt="弧形曲线">
</p>
<br/>

-------------------------------------------------------------------
<!-- [1-2] 填充与边框 ---------------------------------------------------------------------------->
### 填充与边框
<!-- [1-2-1] 上色 ---------------------------------------------------------------------------->
#### 上色
> fill属性和stroke属性。fill属性设置对象内部的颜色，stroke属性设置绘制对象的线条的颜色。你可以使用在HTML中的CSS颜色命名方案定义它们的颜色，比如说颜色名（像red这种）、rgb值（像rgb(255,0,0)这种）、十六进制值、rgba值，等等。

```html
    <rect x="10" y="10" width="100" height="100" stroke="blue" fill="purple"
        fill-opacity="0.5" stroke-opacity="0.8"/>
```
> 属性fill-opacity控制填充色的不透明度，属性stroke-opacity控制描边的不透明度。

##

<!-- [1-2-2] 描边 ---------------------------------------------------------------------------->
#### 描边
> 除了颜色属性，还有其他一些属性用来控制绘制描边的方式。。

##

示意图 1：
<p align="center">
<img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/svg/images/stroke_linecap.png" alt="描边方式_1">
</p>
<br/>

```html
    <svg width="160" height="140" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <line x1="40" x2="120" y1="20" y2="20" stroke="black" stroke-width="20" stroke-linecap="butt"/>
        <line x1="40" x2="120" y1="60" y2="60" stroke="black" stroke-width="20" stroke-linecap="square"/>
        <line x1="40" x2="120" y1="100" y2="100" stroke="black" stroke-width="20" stroke-linecap="round"/>
    </svg>
```
> stroke-width 属性定义了描边的宽度。<br/>
> stroke-linecap属性，它控制边框终点的形状，有三个值：<br/>
> &emsp;&emsp; butt 用直边结束线段，它是常规做法，线段边界90度垂直于描边的方向、贯穿它的终点。<br/>
> &emsp;&emsp; square 的效果差不多，但是会稍微超出实际路径的范围，超出的大小由stroke-width控制。<br/>
> &emsp;&emsp; round 表示边框的终点是圆角，圆角的半径也是由stroke-width控制的。<br/>

##

示意图 2：
<p align="center">
<img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/svg/images/stroke_linejoin.png" alt="描边方式_2">
</p>
<br/>

```html
    <svg width="160" height="280" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <polyline points="40 60 80 20 120 60" stroke="black" stroke-width="20" stroke-linecap="butt" fill="none" stroke-linejoin="miter"/>

        <polyline points="40 140 80 100 120 140" stroke="black" stroke-width="20" stroke-linecap="round" fill="none" stroke-linejoin="round"/>

        <polyline points="40 220 80 180 120 220" stroke="black" stroke-width="20" stroke-linecap="square" fill="none" stroke-linejoin="bevel"/>
    </svg>
```
> 每条折线都是由两个线段连接起来的，连接处的样式由stroke-linejoin属性控制。<br/>
> stroke-linejoin属性，它有三个值：<br/>
> &emsp;&emsp; miter 是默认值，表示用方形画笔在连接处形成尖角。<br/>
> &emsp;&emsp; round 表示用圆角连接，实现平滑效果。<br/>
> &emsp;&emsp; bevel 表示连接处会形成一个斜接。<br/>

##

示意图 3：
<p align="center">
<img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/svg/images/stroke_dasharray.png" alt="描边方式_3">
</p>
<br/>

```html
    <svg width="200" height="150" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <path d="M 10 75 Q 50 10 100 75 T 190 75" stroke="black" stroke-linecap="round" stroke-dasharray="5,10,5" fill="none"/>
        <path d="M 10 75 L 190 75" stroke="red" stroke-linecap="round" stroke-width="1" stroke-dasharray="5,5" fill="none"/>
    </svg>
```
> stroke-dasharray属性的参数，是一组用逗号分割的数字组成的数列。注意，和path不一样，这里的数字必须用逗号分割（空格会被忽略）。<br/>
> 每一组数字，第一个用来表示填色区域的长度，第二个用来表示非填色区域的长度。

另外还有一些关于填充和边框的属性，包括fill-rule，用于定义如何给图形重叠的区域上色；stroke-miterlimit，定义什么情况下绘制或不绘制边框连接的miter效果；还有stroke-dashoffset，定义虚线开始的位置等等。

##

#### 使用css
> 除了定义对象的属性外，你也可以通过CSS来样式化填充和描边。语法和在html里使用CSS一样，只不过你要把background-color、border改成fill和stroke。注意，不是所有的属性都能用CSS来设置。上色和填充的部分一般是可以用CSS来设置的，比如fill，stroke，stroke-dasharray等，但是不包括下面会提到的渐变和图案等功能。另外，width、height，以及路径的命令等等。

像这样
```html
    <rect x="10" height="180" y="10" width="180" style="stroke: black; fill: red;"/>
```
或者
```html
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
            <style type="text/css"><![CDATA[
                #MyRect {
                    stroke: black;
                    fill: red;
                }
            ]]></style>
        </defs>
    <rect x="10" height="180" y="10" width="180" id="MyRect"/>
    </svg>
```
还可以用伪类
```html
    #MyRect:hover {
        stroke: black;
        fill: blue;
    }
```
还可以在XML文件中引入css
```xml
    <?xml version="1.0" standalone="no"?>
    <?xml-stylesheet type="text/css" href="style.css"?>

    <svg width="200" height="150" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <rect height="10" width="10" id="MyRect"/>
    </svg>
```

-------------------------------------------------------------------
<!-- [1-3] 渐变 ---------------------------------------------------------------------------->
### 渐变
<!-- [1-3-1] 线性渐变 ---------------------------------------------------------------------------->
#### 线性渐变
> 线性渐变沿着直线改变颜色，要插入一个线性渐变，你需要在SVG文件的defs元素内部，创建一个<linearGradient> 节点。

示意图：
<p align="center">
<img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/svg/images/linear_gradient.png" alt="线性渐变">
</p>
<br/>

```html
    <svg width="120" height="240" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="Gradient1">
                <stop class="stop1" offset="0%"/>
                <stop class="stop2" offset="50%"/>
                <stop class="stop3" offset="100%"/>
            </linearGradient>
            <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stop-color="red"/>
                <stop offset="50%" stop-color="black" stop-opacity="0"/>
                <stop offset="100%" stop-color="blue"/>
            </linearGradient>
            <style type="text/css"><![CDATA[
                #rect1 { fill: url(#Gradient1); }
                .stop1 { stop-color: red; }
                .stop2 { stop-color: black; stop-opacity: 0; }
                .stop3 { stop-color: blue; }
            ]]></style>
        </defs>
        
        <rect id="rect1" x="10" y="10" rx="15" ry="15" width="100" height="100"/>
        <rect x="10" y="120" rx="15" ry="15" width="100" height="100" fill="url(#Gradient2)"/>
    
    </svg>
```
##
<!-- [1-3-2] 径向渐变 ---------------------------------------------------------------------------->
#### 径向渐变
> 径向渐变与线性渐变相似，只是它是从一个点开始发散绘制渐变。创建径向渐变需要在文档的defs中添加一个<radialGradient>元素

```html
    <svg width="120" height="240" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="RadialGradient1">
                <stop offset="0%" stop-color="red"/>
                <stop offset="100%" stop-color="blue"/>
            </radialGradient>
            <radialGradient id="RadialGradient2" cx="0.25" cy="0.25" r="0.25">
                <stop offset="0%" stop-color="red"/>
                <stop offset="100%" stop-color="blue"/>
            </radialGradient>
        </defs>
 
        <rect x="10" y="10" rx="15" ry="15" width="100" height="100" fill="url(#RadialGradient1)"/> 
        <rect x="10" y="120" rx="15" ry="15" width="100"   height="100" fill="url(#RadialGradient2)"/>
  
    </svg>
```

-------------------------------------------------------------------
<!-- [1-3] 图案 ---------------------------------------------------------------------------->
### 图案
> 在我看来patterns（图案）是SVG中用到的最让人混淆的填充类型之一。它的功能非常强大，所以我认为他们值得讨论一下并且我们应至少对他们有最基本的了解。跟渐变一样，<pattern>需要放在SVG文档的<defs>内部。

```html
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <linearGradient id="Gradient1">
      <stop offset="5%" stop-color="white"/>
      <stop offset="95%" stop-color="blue"/>
    </linearGradient>
    <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
      <stop offset="5%" stop-color="red"/>
      <stop offset="95%" stop-color="orange"/>
    </linearGradient>

    <pattern id="Pattern" x="0" y="0" width=".25" height=".25">
      <rect x="0" y="0" width="50" height="50" fill="skyblue"/>
      <rect x="0" y="0" width="25" height="25" fill="url(#Gradient2)"/>
      <circle cx="25" cy="25" r="20" fill="url(#Gradient1)" fill-opacity="0.5"/>
    </pattern>

  </defs>

  <rect fill="url(#Pattern)" stroke="black" x="0" y="0" width="200" height="200"/>
</svg>
```
> 在pattern元素内部你可以包含任何之前包含过的其它基本形状，并且每个形状都可以使用之前学习过的任何样式样式化，包括渐变和半透明。这里我们在pattern中绘制两个矩形（两个矩形互相重叠，一个矩形是另一个矩形大小的二倍，且用于填充整个pattern）和一个圆。

-------------------------------------------------------------------
<!-- [1-3] 文字 ---------------------------------------------------------------------------->
### 文字
> 在SVG中有两种截然不同的文本模式. 一种是写在图像中的文本，另一种是SVG字体。

#### 文本
> <text>元素内部可以放任何的文字。

```html
    <text x="10" y="10">Hello World!</text>
```

> 属性x和属性y性决定了文本在视口中显示的位置。属性text-anchor，可以有这些值：start、middle、end或inherit，允许决定从这一点开始的文本流的方向。<br\>
> 下列每个属性可以被设置为一个SVG属性或者成为一个CSS声明：font-family、font-style、font-weight、font-variant、font-stretch、font-size、font-size-adjust、kerning、letter-spacing、word-spacing和text-decoration

##

> <tspan>，它必须是一个text元素或别的tspan元素的子元素。一个典型的用法是把句子中的一个词变成粗体红。

```html
<text>
  <tspan font-weight="bold" fill="red">This is bold and red</tspan>
</text>
```
tspan元素有以下的自定义属性:
> x：为容器设置一个新绝对x坐标。它覆盖了默认的当前的文本位置。这个属性可以包含一个数列，它们将一个一个地应用到tspan元素内的每一个字符上。<br/>
> dx：从当前位置，用一个水平偏移开始绘制文本。这里，你可以提供一个值数列，可以应用到连续的字体，因此每次累积一个偏移。<br/>
> rotate：把所有的字符旋转一个角度。如果是一个数列，则使每个字符旋转分别旋转到那个值，剩下的字符根据最后一个值旋转。<br/>
> textLength：这是一个很模糊的属性，给出字符串的计算长度。它意味着如果它自己的度量文字和长度不满足这个提供的值，则允许渲染引擎精细调整字型的位置。<br/>
> tref：tref元素允许引用已经定义的文本，高效地把它复制到当前位置。你可以使用xlink:href属性，把它指向一个元素，取得其文本内容。你可以独立于源样式化它、修改它的外观。

##

> <textPath>，该元素利用它的xlink:href属性取得一个任意路径，把字符对齐到路径，于是字体会环绕路径、顺着路径走。
```html
<path id="my_path" d="M 20,20 C 40,40 80,40 100,20" />
<text>
  <textPath xlink:href="#my_path">This text follows a curve.</textPath>
</text
```
#### SVG 字体
> 当规定SVG时，在浏览器支持web字体并不流行。因为访问正确的字体文件对于正确呈现字体是有确定性的，SVG中添加了一个字体描述技术，以提供这个能力。它并不是为了和别的格式比如说PostScript或OTF兼容，而是为了将字形信息嵌入SVG呈现的一个简单的方法。<br/>
> 大家如果有兴趣，课后自行查阅。



-------------------------------------------------------------------
<!-- [1-3] 基本变形 ---------------------------------------------------------------------------->
### 基本变形











-------------------------------------------------------------------
<!-- [1-3] 剪切与遮罩 ---------------------------------------------------------------------------->
### 剪切与遮罩