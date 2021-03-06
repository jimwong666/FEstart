
* [基础知识](#基础知识)
  * [SVG主要特点](#-SVG主要特点)
  * [SVG的使用](#-SVG的使用)
  * [SVG中的坐标定位](#-SVG中的坐标定位)
* [基本形状](#基本形状)
  * [矩形](#-矩形)
  * [圆形](#-圆形)
  * [椭圆](#-椭圆)
  * [线条](#-线条)
  * [折线](#-折线)
  * [多边形](#-多边形)
  * [路径](#-路径)
* [文字](#文字)
  * [文本](#-文本)
  * [SVG字体](#-SVG字体)
* [填充与边框](#填充与边框)
  * [上色](#-上色)
  * [描边](#-描边)
  * [使用css](#-使用css)
* [渐变](#渐变)
  * [线性渐变](#-线性渐变)
  * [径向渐变](#-径向渐变)
* [SVG变形](#SVG变形)
  * [SVG变SVG的缩放形](#SVG的缩放)
  * [transform](#-transform)
    * [位移](#--位移)
    * [旋转](#--旋转)
    * [缩放](#--缩放)
    * [斜切](#--斜切)
    * [matrix()](#--matrix)
* [剪切与遮罩](#剪切与遮罩)
  * [剪切](#-剪切)
  * [遮罩](#-遮罩)
* [动画](#动画)
  * [animation元素](#-animation元素)
  * [animationTransform元素](#-animationTransform元素)
  * [animateMotion元素](#-animateMotion元素)
  * [SVG文本路径动画](#-SVG文本路径动画)
  * [渐变动画](#-渐变动画)

# SVG
> &emsp;&emsp;SVG 是一种基于 XML 语法的图像格式，全称是可缩放矢量图（Scalable Vector Graphics）。jpg、png、gif等图像格式都是基于像素处理的，SVG 则是属于对图像的形状描述，所以它本质上是文本文件，体积较小，且不管放大多少倍都不会失真。<br/>

## 基础知识

#### -SVG主要特点
	1.SVG是可伸缩矢量图形。
	2.SVG图像在放大或缩小（改变尺寸）的情况下，其图形质量不会受受损失。
	3.SVG使用XML格式定义图形。
	4.SVG与JPEG和GIF图像比起来，尺寸更小，且可压缩性更强。且可被众多工具读取和修改（比如记事本）。
##
#### -SVG的使用
> 我们既可以直接内嵌在HTML代码之中，也可以将代码单独写入一个SVG文件（.svg格式文件）。

##### --内嵌在HTML
```html

    <svg version="1.1"
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

> xmlns是XML命名空间的声明，不要省略。

**注意：**<br/>
&emsp;&emsp; **1.** SVG的元素和属性必须按标准格式书写，因为XML是区分大小写的（这一点和html不同）<br/>
&emsp;&emsp; **2.** SVG里的属性值必须用引号引起来，就算是数值也必须这样做。

##
##### --引用SVG文件
三种方式：
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
        width="300" height="200"
        xmlns="http://www.w3.org/2000/svg">

        <rect width="100%" height="100%" fill="red" />

        <circle cx="150" cy="100" r="80" fill="green" />

        <text x="150" y="125" font-size="60" text-anchor="middle" fill="white">SVG</text>

    </svg>
```
喏~! 就是这个(xml)~ 最上面多了一行奇怪的东西

##
#### -SVG中的坐标定位
> &emsp;&emsp;SVG使用的坐标系统或者说网格系统，和Canvas用的差不多（所有计算机绘图都差不多）。这种坐标系统是：以页面的左上角为(0,0)坐标原点，坐标以像素（默认，可以是其他）为单位，x轴正方向是向右，y轴正方向是向下。【注意】这和我们小时候所学的坐标系是不一样的。但是在HTML文档中，元素都是用这种方式定位的。

示意图：
<p align="center">
<img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/svg/images/coordinate.png" alt="坐标定位">
</p>
<br/>

所以我们定义一个矩形:

```html
    <rect x="0" y="0" width="100" height="100" />
```

上面的元素定义了一个100*100px的SVG画布，这里1用户单位等同于1屏幕单位。

-------------------------------------------------------------------

## 基本形状
### -矩形
> rect元素会在屏幕上绘制一个矩形 。其实只要6个基本属性就可以控制它在屏幕上的位置和形状。下边的那个多了rx和ry属性用来控制圆角。如果没有设置圆角，则默认为0。

```html
    <svg version="1.1"
        width="300" height="200"
        xmlns="http://www.w3.org/2000/svg">

        <rect x="10" y="10" width="100" height="150"/>
        <rect x="150" y="10" rx="10" ry="10" width="100" height="150"/>

    </svg>
```

示意图：
<p align="center">
<img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/svg/images/rectangle.png" alt="矩形">
</p>
<br/>

> x：矩形左上角的x位置<br/>
y：矩形左上角的y位置<br/>
width：矩形的宽度<br/>
height：矩形的高度<br/>
rx：圆角的x方位的半径<br/>
ry：圆角的y方位的半径

##
### -圆形
```html
    <svg version="1.1"
        width="300" height="200"
        xmlns="http://www.w3.org/2000/svg">

        <circle cx="150" cy="100" r="80"/>

    </svg>
```

示意图：
<p align="center">
<img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/svg/images/circle.png" alt="圆形">
</p>
<br/>

> cx：圆心的x位置<br/>
cy：圆心的y位置<br/>
r：圆的半径

##
### -椭圆
```html
    <svg version="1.1"
        width="300" height="200"
        xmlns="http://www.w3.org/2000/svg">

        <ellipse cx="150" cy="100" rx="100" ry="70"/>

    </svg>
```

示意图：
<p align="center">
<img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/svg/images/oval.png" alt="椭圆">
</p>
<br/>

> Ellipse 是circle元素更通用的形式，你可以分别缩放圆的x半径和y半径（通常数学家称之为长轴半径和短轴半径）
>
> rx：椭圆的x半径<br/>
ry：椭圆的y半径

##
### -线条
```html
    <svg version="1.1"
        width="300" height="200"
        xmlns="http://www.w3.org/2000/svg">

        <line x1="50" y1="20" x2="200" y2="100" stroke="black" />
    </svg>
```

示意图：
<p align="center">
<img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/svg/images/line.png" alt="线条">
</p>
<br/>

> Line 绘制线段。它取两个点的位置作为属性，指定这条线的起点和终点位置。
>
> x1：起点的x位置<br/>
> y1：起点的y位置<br/>
> x2：终点的x位置<br/>
> y2：终点的y位置<br/>

##
### -折线
```html
    <svg version="1.1"
        width="300" height="200"
        xmlns="http://www.w3.org/2000/svg">

        <polyline points="60 110, 65 120, 70 115, 75 130, 80 125, 85 140, 90 135, 95 150, 100 145" fill="transparent" stroke="black"/>

    </svg>
```

示意图：
<p align="center">
<img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/svg/images/polyline.png" alt="折线">
</p>
<br/>

> Polyline是一组点连接在一起的直线。因为它可以有很多的折点，所有折点位置都放在一个points属性中<br/>
>
> points：点集数列。每个数字用空白、逗号、终止命令符或者换行符分隔开。每个点必须包含2个数字，一个是x坐标，一个是y坐标。所以点列表 (0,0), (1,1) 和(2,2)可以写成这样：“0 0, 1 1, 2 2”。

##
### -多边形
```html
    <svg version="1.1"
        width="300" height="200"
        xmlns="http://www.w3.org/2000/svg">

        <polygon points="50 100, 55 120, 70 120, 60 130, 65 145, 50 135, 35 145, 40 130, 30 120, 45 120"/>

    </svg>
```

示意图：
<p align="center">
<img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/svg/images/polygon.png" alt="多边形">
</p>
<br/>

> polygon和折线很像，它们都是由连接一组点集的直线构成。不同的是，polygon的路径在最后一个点处自动回到第一个点。

##
### -路径
```html
    <svg version="1.1"
        width="300" height="200"
        xmlns="http://www.w3.org/2000/svg">

        <path d="M 20 230 Q 40 205, 50 230"/>

    </svg>
```
> path可能是SVG中最常见的形状。<br/>
> 你可以用path元素绘制矩形（直角矩形或者圆角矩形）、圆形、椭圆、折线形、多边形，以及一些其他的形状，例如贝塞尔曲线、2次曲线等曲线。<br/>
> 
> d：一个点集数列以及其它关于如何绘制路径的信息（形如“命令+参数”形式的命令）。
##
#### --移点命令:

> 移点命令：M x y 或者 m dx dy<br/>
> 
> M或者m意思是：move命令，将点移到什么地方。

这里需要注意几点：<br/>
    1、这只会移动点，并不会画点，也不会在移动的路径上划线！<br/>
    2、大写的M和小写的m不一样。大写的M坐标采用绝对定位，小写的m坐标采用相对定位（就是相对于上一个点的坐标），后面的小写也是相对应的意思。
##
#### --直线命令:

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
#### --曲线命令:

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
> 用来生成弧形，即椭圆形的一部分。

示意图：
<p align="center">
<img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/svg/images/path_oval.png" alt="弧形曲线">
</p>
<br/>

```html
    <svg width="320px" height="320px" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 315
            L 110 215
            A 30 50 0 0 1 162.55 162.45
            L 172.55 152.45
            A 30 50 -45 0 1 215.1 109.9
            L 315 10" stroke="black" fill="green" stroke-width="2" fill-opacity="0.5"/>
    </svg>
```

```
    A rx ry x-axis-rotation large-arc-flag sweep-flag x y
    a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy
```

> rx和ry 表示需要截取的弧度所在椭圆的x方向半轴长度与y方向半轴长度。<br/>
> x-axis-rotation 表示这个椭圆的旋转角度，正值表示顺时针方向旋转，负值表示逆时针方向。<br/>
> large-arc-flag 决定弧线是大于还是小于180度，0表示小角度弧，1表示大角度弧。就是选长弧还是短弧。
> sweep-flag 表示弧线的方向，0表示从起点到终点沿逆时针画弧，1表示从起点到终点沿顺时针画弧。

示意图：
<p align="center">
<img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/svg/images/path_oval_2.png" alt="large-arc-flag与sweep-flag">
</p>
<br/>

-------------------------------------------------------------------

## 文字
> 在SVG中有两种截然不同的文本模式. 一种是写在图像中的文本，另一种是SVG字体。

### -文本
text元素
> text元素内部可以放任何的文字。可以理解为p元素。

```html
    <text x="10" y="10" text-anchor="start">Hello World!</text>
```

> 属性x和属性y性决定了文本在视口中显示的位置。<br/>
>
> 属性text-anchor，可以有这些值：start、middle、end或inherit，允许决定从这一点开始的文本流的方向。<br/>
>
> 下列每个属性可以被设置为一个SVG属性或者成为一个CSS声明：font-family、font-style、font-weight、font-variant、font-stretch、font-size、font-size-adjust、kerning、letter-spacing、word-spacing和text-decoration

##
tspan标签
> tspan标签它必须是一个text元素或别的tspan元素的子元素。<br/>
>
> text标签绘制功能过于简单，很多常见的功能实现起来都比较困难，比如内部文本换行。再比如单独设置文本某一部分的样式，也很困难，使用tspan可以有效的解决类似问题。可以理解为span元素。

```html
<text>
    <tspan font-weight="bold" fill="red">This is bold and red</tspan>
</text>
```
tspan元素有以下的自定义属性:
> x：为容器设置一个新绝对x坐标。它覆盖了默认的当前的文本位置。这个属性可以包含一个数列，它们将一个一个地应用到tspan元素内的每一个字符上。<br/>
> dx：从当前位置，用一个水平偏移开始绘制文本。这里，你可以提供一个值数列，可以应用到连续的字体，因此每次累积一个偏移。<br/>
> rotate：把所有的字符旋转一个角度。如果是一个数列，则使每个字符旋转分别旋转到那个值，剩下的字符根据最后一个值旋转。

##

> textPath元素利用它的xlink:href属性取得一个任意路径，把字符对齐到路径，于是字体会环绕路径、顺着路径走。
```html
<path id="my_path" d="M 20,20 C 40,40 80,40 100,20" />
<text>
    <textPath xlink:href="#my_path">This text follows a curve.</textPath>
</text
```

##

> tref元素用来指定的包含文本内容的引用元素。

### -SVG字体
> 当规定SVG时，在浏览器支持web字体并不流行。因为访问正确的字体文件对于正确呈现字体是有确定性的，SVG中添加了一个字体描述技术，以提供这个能力。它并不是为了和别的格式比如说PostScript或OTF兼容，而是为了将字形信息嵌入SVG呈现的一个简单的方法。<br/>
> 大家如果有兴趣，课后自行查阅。
-------------------------------------------------------------------
## 填充与边框
### -上色
> fill属性设置对象内部的颜色。<br/>
> stroke属性设置绘制对象的线条的颜色。<br/>
> 你可以使用在HTML中的CSS颜色命名方案定义它们的颜色，比如说颜色名（像red这种）、rgb值（像rgb(255,0,0)这种）、十六进制值、rgba值，等等。

```html
    <rect x="10" y="10" width="100" height="100" stroke="blue" fill="purple" fill-opacity="0.5" stroke-opacity="0.8"/>
```
> 属性fill-opacity控制填充色的不透明度。<br/>
> 属性stroke-opacity控制描边的不透明度。

##
### -描边
> 除了颜色属性，还有其他一些属性用来控制绘制描边的方式。

##
stroke-linejoin属性，stroke-linecap属性：

```html
    <svg width="160" height="140" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <line x1="40" x2="120" y1="20" y2="20" stroke="black" stroke-width="20" stroke-linecap="butt"/>
        <line x1="40" x2="120" y1="60" y2="60" stroke="black" stroke-width="20" stroke-linecap="square"/>
        <line x1="40" x2="120" y1="100" y2="100" stroke="black" stroke-width="20" stroke-linecap="round"/>
    </svg>
```

<p align="center">
<img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/svg/images/stroke_linecap.png" alt="描边方式_1">
</p>
<br/>

>stroke-width 属性定义了描边的宽度。
>
> stroke-linecap属性，它控制边框终点的形状，有三个值：<br/>
> &emsp;&emsp; butt 用直边结束线段，它是常规做法，线段边界90度垂直于描边的方向、贯穿它的终点。<br/>
> &emsp;&emsp; square 的效果差不多，但是会稍微超出实际路径的范围，超出的大小由stroke-width控制。<br/>
> &emsp;&emsp; round 表示边框的终点是圆角，圆角的半径也是由stroke-width控制的。<br/>

##

stroke-linejoin属性用来控制两条描边线段之间，用什么方式连接：
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
> stroke-linejoin属性，它有三个值：<br/>
> &emsp;&emsp; miter 是默认值，表示用方形画笔在连接处形成尖角。<br/>
> &emsp;&emsp; round 表示用圆角连接，实现平滑效果。<br/>
> &emsp;&emsp; bevel 表示连接处会形成一个斜接。<br/>

##

stroke-dasharray属性，将虚线类型应用在描边上：
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

### -使用css
> 除了定义对象的属性外，你也可以通过CSS来样式化填充和描边。语法和在html里使用CSS一样，只不过你要把background-color、border改成fill和stroke。注意，不是所有的属性都能用CSS来设置。上色和填充的部分一般是可以用CSS来设置的，比如fill，stroke，stroke-dasharray等，但是不包括下面会提到的渐变和图案等功能。另外，width、height，以及路径的命令等等。

像这样
```html
    <rect x="10" height="180" y="10" width="180" style="stroke: black; fill: red;"/>
```
或者这样
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
还可以这样（伪类）
```css
    #MyRect:hover {
        stroke: black;
        fill: blue;
    }
```
这样也可以（XML文件中引入css）
```xml
    <?xml version="1.0" standalone="no"?>
    <?xml-stylesheet type="text/css" href="style.css"?>

    <svg width="200" height="150" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <rect height="10" width="10" id="MyRect"/>
    </svg>
```

-------------------------------------------------------------------
## 渐变
### -线性渐变
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
### -径向渐变
> 径向渐变与线性渐变相似，只是它是从一个点开始发散绘制渐变。创建径向渐变需要在文档的defs中添加一个radialGradient元素

示意图：
<p align="center">
<img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/svg/images/radial_gradient.png" alt="径向渐变">
</p>
<br/>

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
        <rect x="10" y="120" rx="15" ry="15" width="100" height="100" fill="url(#RadialGradient2)"/>

    </svg>
```

-------------------------------------------------------------------
## SVG变形
> 在这开始之前，我们先认识一个新的元素g。它的作用是把各种svg的图形组成group。以便一起操作。
```html
    <g fill="red">
        <rect x="0" y="0" width="10" height="10" />
        <rect x="20" y="0" width="10" height="10" />
    </g>
```

##
### -SVG的缩放
> SVG中viewport就是视口的意思。通俗一点就是观察SVG的窗口。就是width和height。<br/>
>
> SVG 文档中的1个像素对应输出设备（比如显示屏）上的1个像素（默认）。但是这种情况是可以改变的，否则 SVG 的名字里也不至于会有“Scalable”（可缩放）这个词。

看个改过的例子：
```html
    <svg version="1.1"
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

##
### -transform
##
#### --位移

> transform="translate(x,y)"<br/>
> x：方向位移x<br/>
> y：方向位移y<br/>
> 这与css的translate(x,y)类似<br/>

```html
    <rect id="ant"
        x="60" y="60"
        width="100"
        height="100"
        transform="translate(50,50)"
        fill="blue"/>
```

##
#### --旋转
> transform="rotate(angle x y)"<br/>
> angle是顺时针旋转的角度<br/>
> x：中心点的横坐标<br/>
> y：中心点的纵坐标<br/>
> 如果x和|y不写，则默认是(0,0)，急远点

```html
    <rect id="ant"
        x="60" y="60"
        width="100"
        height="100"
        transform="rotate(45 110 110)"
        fill="blue"/>
```

##
#### --缩放
> scale()变形改变了元素的尺寸<br/>
> 它需要两个数字，作为比率计算如何缩放。0.5表示收缩到50%。如果第二个数字被忽略了，它默认等于第一个值<br/>
> 注意：坐标也会产生了缩放哦~

示意图：
<p align="center">
<img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/svg/images/zoom.png" alt="缩放">
</p>
<br/>

```html
    <rect id="ant"
        x="60" y="60"
        width="100"
        height="100"
        transform="scale(0.5)"
        fill="blue"/>
```

##
#### --斜切
> 斜切，分为skewX(angle)变形和skewY(angle)变形。每个都需要角度以确定元素斜切到多远。x和y分开写，不能写成skew(angleX,angleY)。

示意图：
<p align="center">
<img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/svg/images/beveled.png" alt="斜切">
</p>
<br/>

```html
    <rect id="ant"
        x="100" y="100"
        width="100"
        height="100"
        transform="skewX(-45)"
        fill="blue"/>
```

##
#### --matrix
> 所有上面的变形可以表达为一个2x3的变形矩阵。组合一些变形，可以直接用matrix(a, b, c, d, e, f)变形设置结果矩阵，利用下面的矩阵，它把来自上一个坐标系统的坐标映射到新的坐标系统：

<p align="center">
<img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/svg/images/matrix.png" alt="矩阵">
</p>
<br/>

> 这个跳过，感兴趣的可以课后了解一下。
-------------------------------------------------------------------
## 剪切与遮罩
### -剪切

> 如果我们想用矩形截出圆的一部分，怎么办呢？

示意图：
<p align="center">
<img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/svg/images/cut.png" alt="剪切">
</p>
<br/>

```html
<svg version="1.1"
    xmlns="http://www.w3.org/2000/svg">
    <defs>
        <clipPath id="cut-off-bottom">
            <rect x="0" y="30" width="500" height="250" />
        </clipPath>
    </defs>

    <circle cx="250" cy="250" r="100" clip-path="url(#cut-off-bottom)" />
</svg>
```
> 属性clip-path引用了一个带单个rect元素的clipPath元素。它内部的这个矩形将把画布的上半部分截取下来。<br/>
> 注意，clipPath元素经常放在一个defs元素内，而且该rect不会被绘制。它的象素数据将用来确定：圆形的哪些像素需要最终呈现出来。因为矩形只覆盖了圆形的上半部分，所以下半部分将消失了。<br/>
> 当然这里的clipPath可以是任意svg形状。

##
### -遮罩
> 遮罩的效果最令人印象深刻的是表现为一个渐变。如果你想用半透明的东西遮住一个元素的一部分，你可以利用遮罩效果实现这一点。

```html
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="Gradient">
                <stop offset="0" stop-color="white" stop-opacity="0" />
                <stop offset="1" stop-color="white" stop-opacity="1" />
            </linearGradient>
            <mask id="Mask">
                <rect x="0" y="0" width="200" height="200" fill="url(#Gradient)" />
            </mask>
        </defs>
        <rect x="0" y="0" width="200" height="200" fill="red" mask="url(#Mask)" />
        <rect x="200" y="200" width="200" height="200" fill="url(#Gradient)" />
    </svg>
```
> 例子中，你会看到红色渐渐消失露出背景

-------------------------------------------------------------------
## 动画
### -animation元素
> 基础动画元素，实现单属性的动画效果

介绍 animation 动画之前，先看一个简单的元素标签 set ，它并没有动画效果
```html
    <rect
        id="ant"
        x="10" y="10"
        width="50" height="50"
        fill="blue">
    </rect>
    <set xlink:href="#ant"
        attributeName="x" 
        to="100"
        begin="3s" />
```
> 上图会在3s之后将矩形从横坐标10位置移动到100位置
##
> animation 元素可以创建单属性动画过渡效果
```html
    <rect id="ant"
        x="10" y="10"
        width="50" height="50"
        fill="blue">
    </rect>
    <animate
        xlink:href="#ant"
        attributeName="x" 
        to="100"
        dur="3s"
        begin="0s"/>
    <animate
        xlink:href="#ant"
        attributeName="x" 
        values="10;100;50;120"
        dur="3s"
        begin="0s"/>
```
> 用3s的时间，矩形元素从x轴10处以动画方式移动到100处

attributeName属性：
> 它用来规定元素的哪个属性会产生动画效果。比如上面代码的x轴坐标，也可以是透明度等类似属性。

from、to和by 属性：
> from属性规定attributeName属性的起始值，如果起始值和默认值相同，from可以省略。<br/>
> 
> to属性规定attributeName属性的终止值。<br/>
> 
> by属性规定了一个相对于from的值（to是绝对值）。假如from值是10，by的值是50，那么最终值是60。
特别说明：如果同时规定了to和by，那么to的优先级会更高。

dur 属性：
> 此属性规定动画持续的时间。

values 属性：
> 此属性功能与from和to类似。<br/>
> 
> 它也是规定attributeName的起点和终点，并且起点和终点之间也可以有关键帧。<br/>
> 
> 属性值是一个用分号分隔的一个或多个值。
特别说明:如果规定了values属性，那么from, to和by都会被忽略。

begin 属性：
> 上面已经介绍过了，begin可以是开始时间。当然begin还可以是其他值：

1. offset-value
    > 相对于svg文档开始时间（可以简单理解为svg文档就绪）的一个偏移值。
    ```
        begin="5s"
    ```
2. syncbase-value
    > 基于同步确定的时间点开始动画。也就是基于一个指定元素开始或者结束时间点的偏移值。
    ```
        [元素的id].begin +/- 时间值

        begin="rect-anim.begin + 1s"
    ```
3. event-value
    > 动画的开始与事件相关联。
    ```
        [元素的id].[事件类型] +/- 时间值

        begin="click + 1s"
    ```
4. repeat-value
    > 规定动画是在其他某个动画重复执行指定次数后开始。
    ```
        [元素的id].repeat(整数) +/- 时间值

        begin="rect-anim.repeat(2)+2s"
    ```
5. accessKey-value
    > 定义动画开始的快捷键
    ```
        accessKey("character") +/- 时间值

        begin="accessKey(d)+1s"
    ```
6. wallclock-sync-value
    > 以真实的世界时钟时间来规定动画的开始。
    ```
        wallclock("wallclock-value")

        begin="wallclock('1997-07-16T19:20+01:00')"
    ```
7. 等等

### -animationTransform元素
> animateTransform是animate+transform的组合，很明显是对svg元素transform变换的动画操作。
```html
    <rect id="ant"
        x="20" y="20"
        width="50" height="50"
        fill="blue">
    </rect>
    <animateTransform
        xlink:href="#ant"
        attributeName="transform"
        begin="0s"
        dur="3s"
        type="scale"
        from="1" to="2"
        repeatCount="indefinite" />
```
> 与animation不一样的就是attributeName和type，其他都是一样的。<br/>

> attributeName的值就是transform。<br/>
> type的值就是transform可选的值。

这边再讲3个属性：
1. fill属性，有2个值：
    > freeze：动画结束以后，动画保持最后状态。

    > remove：动画结束之后，恢复到初始状态。
2. repeatCount属性：
    > 此属性用来规定动画重复的次数。属性值可以是数字，也可以是"indefinite"，表示可以无限循环下去。
    ```html
        repeatCount="2"
    ```
3. repeatDur属性:
    > 此属性用来限制动画重复的时间。优先级大于repeatCount属性。
    ```html
        repeatCount="4"
    ```

### -animateMotion元素
> 实现路径动画效果

```html
<path transform=""
    d="M0,0 Q50,60 80,140 T340,100"
    stroke="red"
    stroke-width="6"
    fill="none" />


<animateMotion
    xlink:href="#ant"
    path="M0,0 Q50,60 80,140 T340,100"
    dur="10s"
    begin="click"
    fill="freeze">
</animateMotion> 
<g id="ant">
    <circle
        fill="red"
        fill-opacity="0.5"
        cx="0" cy="0"
        r="20"/>
    <circle
        fill="green"
        cx="0" cy="0"
        r="3"/>
</g>
```
> 定义一条path路径，然后用xlink:href引入一个svg，这个svg图形就能随着路径动了。

### -SVG文本路径动画
> 实现文本沿路径动画效果

```html
    <path id="path"
        d="M20,20 Q50,60 80,140 T340,100"
        stroke="red"
        fill="none" />
<text>
    <textPath id="textPath" xlink:href="#path">蚂蚁部落欢迎您</textPath>
</text>
<animate xlink:href="#textPath"
    attributeName="startOffset"
    from="0%" to="100%"
    begin="0s"
    dur="5s"
    repeatCount="indefinite"
    keyTimes="0;1"
    calcMode="spline"
    keySplines="0.1 0.2 .22 1"/>
```

### -渐变动画
```html
<radialGradient
    id="gr-radial"
    cx="50%" cy="50%"
    r="70%">
    <animate attributeName="r"
        values="0%;150%;100%;0%"
        dur="5s"
        repeatCount="indefinite" />

    <stop stop-color="#FFF" offset="0">
        <animate attributeName="stop-color"
            values="#333;#FFF;#FFF;#333"
            dur="5s"
            repeatCount="indefinite" />
    </stop>
    <stop stop-color="rgba(55,55,55,0)" offset="100%" />
</radialGradient>
<circle cx="50%" cy="50%" r="50%" fill="url(#gr-radial)"/>
```
-------------------------------------------------------------------
-------------------------------------------------------------------
> 思考：那么svg，到底能做什么？