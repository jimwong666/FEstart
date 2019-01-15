
* [基本用法](#基本用法)
  * [SVG主要特点](#-SVG主要特点)
  * [SVG的使用](#-SVG的使用)
  * [SVG中的坐标定位](#-SVG中的坐标定位)
* [基本形状](#基本形状)

# Canvas
> canvas 是一个可以使用JavaScript来绘制图形的 HTML 元素。

```html
    <canvas id="canvas" width="300" height="300">
        <!-- 代码块 -->
    </canvas>
```

## 基本用法
> canvas 的标签只有两个属性—width和height，并且也是可选的，若果不填则canvas的默认大小width是300px，height是150px。当然，像id、class、title、style这些都是标配哈~！<br/>
> 也就是说，其实canvas跟其他html元素一样，也可以用css属性（width、height、background、margin等等）。

想要用canvas，首先你的浏览器得 **支持canvas** ，这是前提。

> 然后，canvas元素会有一个叫 getcontext() 的方法，这个方法用来获取 **上下文** 和它的绘画功能。“上下文”是一个术语，你可以理解为一种 **特殊的环境** ，只有在这个环境里 canvas 才能做某些事情。

```javascript
    var context = canvas.getContext(contextType, contextAttributes);
```
**contextType：**
* "2d"：用来进行2d绘制，也就是二维绘制，平面绘制。这是本次要讲的内容。
* "webgl"：用来进行3d绘制，如3d游戏等等，不再本节课的范围之内。

**contextAttributes：**(为一个纯对象参数，可选)
* 可用来关闭透明度等等全局配置。 

然后就可以绘制啦：

```javascript
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    context.fillRect(0, 0, 100, 100);
```

## 绘制形状

坐标系统：

<p align="center">
    <img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/canvas/images/default_grid.png" alt="坐标系统">
</p>
<br/>

### -绘制矩形

**fillRect(x, y, width, height)**
> 绘制一个填充的矩形，x、y是矩形的左上角坐标。

**strokeRect(x, y, width, height)**
> 绘制一个矩形的边框

**clearRect(x, y, width, height)**
> 清除指定矩形区域，让清除部分完全透明。

### -绘制路径

> 首先，canvas内置的傻瓜式画图形只有一个矩形（上面提到的那个），**其他形状全部都需要路径来绘制**。<br/>
> 图形的基本元素是路径。路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。一个路径，甚至一个子路径，都是闭合的。使用路径绘制图形需要一些额外的步骤。

1. 首先，你要命令式的告诉canvas “我要开始啦~！”。 **beginPath()**
2. 然后，你需要创建路径起始点。 **moveTo()**
3. 接着，你使用画图命令去画出路径。 
4. 之后你把路径封闭（如果需要的话）。 **closePath()**
5. 一旦路径生成，你就能通过描边或填充路径区域来渲染图形。**stroke() fill()**

```javascript
    function draw() {
        var canvas = document.getElementById('canvas');
        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');

            ctx.beginPath();
            ctx.moveTo(75, 50);
            ctx.lineTo(100, 75);
            ctx.lineTo(100, 25);
            ctx.closePath();
            ctx.stroke();
        }
    }
```

#### --移点命令 moveTo(x, y)

> 将笔触移动到指定的坐标x以及y上。

#### --直线命令 lineTo(x, y)

> 绘制直线，起点与(x,y)相连。

#### --圆弧命令

```html
1、
    arc(x, y, radius, startAngle, endAngle, anticlockwise)
```

画一个以（x,y）为圆心的以radius为半径的圆弧（圆），从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为顺时针），为true时，是逆时针方向。

```html
2、
    arcTo(x1, y1, x2, y2, radius)
```

根据给定的控制点和半径画一段圆弧，再以直线连接两个控制点。

#### --贝塞尔曲线命令

```html
1、
    quadraticCurveTo(cp1x, cp1y, x, y)
```

绘制二次贝塞尔曲线，cp1x,cp1y为一个控制点，x,y为结束点。

```html
2、
    bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
```

绘制二次贝塞尔曲线，cp1x,cp1y为一个控制点，x,y为结束点。

#### --矩形命令

```html
    rect(x, y, width, height)
```

绘制一个左上角坐标为（x,y），宽高为width以及height的矩形。

### -Path2D 对象

> Path2D对象用来缓存或记录绘画命令，这样你将能快速地回顾路径。

```javascript
    new Path2D();     // 空的Path对象
    new Path2D(path); // 克隆Path对象
    new Path2D(d);    // 从SVG建立Path对象
```

所有的路径方法比如moveTo, rect, arc或quadraticCurveTo等，如我们前面见过的，都可以在Path2D中使用。

```javascript
    Path2D.addPath(path [, transform])​
```

Path2D API 添加了 addPath作为将path结合起来的方法。添加了一条路径到当前路径（可能添加了一个变换矩阵）。

**例子：**

```javascript
    var canvas = document.getElementById('canvas');
    if (canvas.getContext){
        var ctx = canvas.getContext('2d');

        var rectangle = new Path2D();
        rectangle.rect(10, 10, 50, 50);

        var circle = new Path2D();
        circle.moveTo(125, 35);
        circle.arc(100, 35, 25, 0, 2 * Math.PI);

        ctx.stroke(rectangle);
        ctx.fill(circle);
    }
```

```javascript
    var p = new Path2D("M10 10 h 80 v 80 h -80 Z");
```

## 样式与颜色

在开始正式开始之前，先介绍一下fill()和stroke()
```javascript
    context.fill();
    context.fill(fillRule);
    context.fill(path, fillRule);
```

**fillRule：**（可选）
> 填充方式，有兴趣可以了解一下

**path：**（可选）
> 指Path2D对象，不填则默认填充黑色。

##

```javascript
    context.stroke();
    context.stroke(path);
```

**path：**（可选）
> 指Path2D对象，不填则默认填充黑色。

---------------------------------------

### -颜色

```html
    fillStyle = color
```

设置图形的填充颜色。

```html
    strokeStyle = color
```

设置图形轮廓的颜色。

### -整体透明度

```html
    globalAlpha = transparencyValue
```

这个属性影响到 canvas 里所有图形的透明度，有效的值范围是 0.0 （完全透明）到 1.0（完全不透明），默认是 1.0。

### -线型

```javascript
    lineWidth = value
```

设置线条宽度。

```javascript
    lineCap = type
```

设置线条末端样式。

```javascript
    lineJoin = type
```

设定线条与线条间接合处的样式。

```javascript
    miterLimit = value
```

限制当两条线相交时交接处最大长度；所谓交接处长度（斜接长度）是指线条交接处内角顶点到外角顶点的长度。

```javascript
    getLineDash()
```

返回一个包含当前虚线样式，长度为非负偶数的数组。

```javascript
    setLineDash(segments)
```

设置当前虚线样式。

```javascript
    lineDashOffset = value
```

设置虚线样式的起始偏移量。

### -渐变

```javascript
createLinearGradient(x1, y1, x2, y2)
```

createLinearGradient 方法接受 4 个参数，表示渐变的起点 (x1,y1) 与终点 (x2,y2)。

```javascript
createRadialGradient(x1, y1, r1, x2, y2, r2)
```

createRadialGradient 方法接受 6 个参数，前三个定义一个以 (x1,y1) 为原点，半径为 r1 的圆，后三个参数则定义另一个以 (x2,y2) 为原点，半径为 r2 的圆。

### -图案

> 用循环来实现图案的效果

### -阴影

## 绘制文本

## 使用图片

## 变形

## 合成与裁剪

## 动画

## 像素操作