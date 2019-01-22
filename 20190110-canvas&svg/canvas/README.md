
* [基本用法](#基本用法)
* [绘制形状](#绘制形状)
  * [绘制矩形](#-绘制矩形)

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

想要用canvas，首先你的浏览器得 **支持canvas** ，这是前提，（本节课例子默认都是支持canvas）。

> 然后，canvas要开始绘图，是要在js里面用的。向下面这样<br/>

```javascript
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    // getContext可以接受2个参数(contextType, contextAttributes);
```

> 其中 getcontext() 的方法，这个方法用来获取 **上下文** 和它的绘画功能。“上下文”是一个术语，你可以理解为一种 **特殊的环境** ，只有在这个环境里 canvas 才能做某些事情。

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

### -绘制矩形

> 首先，canvas内置的傻瓜式画形状只有一个——矩形，**其他形状全部都需要路径来绘制**。<br/>

**fillRect(x, y, width, height)**
> 绘制一个填充的矩形，x、y是矩形的左上角坐标。

**strokeRect(x, y, width, height)**
> 绘制一个矩形的边框

**clearRect(x, y, width, height)**
> 清除指定矩形区域，让清除部分完全透明。

##
### -绘制路径

> 图形的基本元素是路径。路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。一个路径，甚至一个子路径，都是闭合的。使用路径绘制图形需要一些额外的步骤。

1. 首先，你要命令式的告诉canvas “我要开始啦~！（若果需要的话，比如绘制非连续样式的线段，就需要）。 **=> beginPath()**
2. 然后，你需要创建路径起始点。 **=> moveTo()**
3. 接着，你使用画图命令去画出路径。 **=> 各种命令**
4. 之后你把路径封闭（如果需要的话）。 **=> closePath()**
5. 一旦路径生成，你就能通过描边或填充路径区域来渲染图形。**=> stroke()、fill()**

```javascript
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    ctx.beginPath(); // 开始
    ctx.moveTo(75, 50); // 移点，如果需要的话
    ctx.lineTo(100, 75); // 命令
    ctx.lineTo(100, 25); // 命令
    ctx.closePath(); // 结束，如果需要的话
    ctx.stroke(); // 绘制边框
    ctx.fill(); // 绘制填充
```

#### --移点命令 moveTo(x, y)

> 将笔触移动到指定的坐标x以及y上。

##
#### --直线命令 lineTo(x, y)

> 绘制直线，起点与(x,y)相连。

##
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

##
#### --椭圆命令

画一个以（x,y）为中心的以radiusX为X轴半径，radiusY为Y轴半径的椭圆弧（椭圆），从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为顺时针），为true时，是逆时针方向。

```html
    ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)
```


##
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

绘制三次贝塞尔曲线，cp1x,cp1y为控制点一，cp2x,cp2y为控制点二，x,y为结束点。

##
#### --矩形命令

```html
    rect(x, y, width, height)
```

绘制一个左上角坐标为（x,y），宽高为width以及height的矩形。

##
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

<p align="center">
    <img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/canvas/images/fillRule.png" alt="fillRule">
</p>

**path：**（可选）
> 指Path2D对象，不填则默认填充黑色。

```javascript
    context.stroke();
    context.stroke(path);
```


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

##
### -整体透明度

```html
    globalAlpha = transparencyValue
```

这个属性影响到 canvas 里所有图形的透明度，有效的值范围是 0.0 （完全透明）到 1.0（完全不透明），默认是 1.0。

##
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

##
### -渐变

```javascript
createLinearGradient(x1, y1, x2, y2)
```

createLinearGradient 方法接受 4 个参数，表示渐变的起点 (x1,y1) 与终点 (x2,y2)。

```javascript
createRadialGradient(x1, y1, r1, x2, y2, r2)
```

createRadialGradient 方法接受 6 个参数，前三个定义一个以 (x1,y1) 为原点，半径为 r1 的圆，后三个参数则定义另一个以 (x2,y2) 为原点，半径为 r2 的圆。

##
### -图案

<p align="center">
    <img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/canvas/images/createpattern.png" alt="图案">
</p>

> 用循环来实现图案的效果

##
### -阴影
> 略~

## 绘制文本
> 略~

## 使用图片

> canvas更有意思的一项特性就是图像操作能力。可以用于动态的图像合成或者作为图形的背景，以及游戏界面（Sprites）等等。浏览器支持的任意格式的外部图片都可以使用，比如PNG、GIF或者JPEG。 你甚至可以将同一个页面中其他canvas元素生成的图片作为图片源。

引入图像到canvas里需要以下两步基本操作：
1. 获得一个指向HTMLImageElement的对象或者另一个canvas元素的引用作为源，也可以通过提供一个URL的方式来使用图片
2. 使用drawImage()函数将图片绘制到画布上

canvas的API可以使用下面这些类型中的一种作为图片的源：

1. > HTMLImageElement

   这些图片是由Image()函数构造出来的，或者任何的img元素

2. > HTMLVideoElement

   用一个HTML的 video 元素作为你的图片源，可以从视频中抓取当前帧作为一个图像

3. > HTMLCanvasElement

   可以使用另一个 canvas 元素作为你的图片源。

4. > ImageBitmap

   这是一个高性能的位图，可以低延迟地绘制，它可以从上述的所有源以及其它几种源中生成。

**例子：**


```javascript
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = "../images/rhino.jpg"
    img.onload = function() {
        ctx.drawImage(img,0,0,300,227);
    }
```

**ctx.drawImage()：**
1. 当drawImaged(img, x, y, width, height)有3/6个参数的时候。
   > img：可以是各类Canvas图片资源，如<img>图片，SVG图像，Canvas元素本身等<br/>
   > x、y：图片左上角坐标 <br/>
   > width和hight：图片绘制时的宽和高
2. 当drawImaged(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)有8个参数的时候。
   > img：可以是各类Canvas图片资源，如<img>图片，SVG图像，Canvas元素本身等<br/>
   > sx、sy：原图片裁剪左上角坐标 <br/>
   > sWidth和sHight：原图片裁剪的宽和高 <br/>
   > dx、dy：绘制时图片的左上角坐标 <br/>
   > dWidth和dHight：绘制时图片的宽和高


## 变形

> 在了解变形之前，我先介绍两个在你开始绘制复杂图形时必不可少的方法。save()和restore()，即：保存和恢复

**save()、restore()：**
save 和 restore 方法是用来保存和恢复 canvas 状态的，都没有参数。Canvas 的状态就是当前画面应用的所有样式和变形的一个快照。<br/>
Canvas状态存储在栈中，每当save()方法被调用后，当前的状态就被推送到栈中保存。一个绘画状态包括：<br/>
* 当前应用的变形（即移动，旋转和缩放，见下）
* strokeStyle, fillStyle, globalAlpha, lineWidth, lineCap, lineJoin, miterLimit, shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor, globalCompositeOperation 的值
* 当前的裁切路径（clipping path），会在下一节介绍

示意图：

<p align="center">
    <img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/canvas/images/stack.png" alt="栈">
</p>

```javascript
    var ctx = document.getElementById('canvas').getContext('2d');
    
    ctx.fillRect(0,0,150,150);   // 使用默认设置绘制一个矩形
    ctx.save();                  // 保存默认状态
    
    ctx.fillStyle = '#09F'       // 在原有配置基础上对颜色做改变
    ctx.fillRect(15,15,120,120); // 使用新的设置绘制一个矩形
    
    ctx.save();                  // 保存当前状态
    ctx.fillStyle = '#FFF'       // 再次改变颜色配置
    ctx.globalAlpha = 0.5;    
    ctx.fillRect(30,30,90,90);   // 使用新的配置绘制一个矩形
    
    ctx.restore();               // 重新加载之前的颜色状态
    ctx.fillRect(45,45,60,60);   // 使用上一次的配置绘制一个矩形
    
    ctx.restore();               // 加载默认颜色配置
    ctx.fillRect(60,60,30,30);   // 使用加载的配置绘制一个矩形
```

### -移动 translate(x,y)

> 我们先介绍 translate 方法，它用来移动 canvas 和它的 **原点** 到一个不同的位置。

**translate(x, y)：**
translate 方法接受两个参数。x 是左右偏移量，y 是上下偏移量，如图所示。

<p align="center">
    <img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/canvas/images/grid_translate.png" alt="translate">
</p>

### -旋转 rotate(angle)

> 第二个介绍 rotate 方法，它用于以原点为中心旋转 canvas。

**rotate(angle)：**
这个方法只接受一个参数：旋转的角度(angle)，它是顺时针方向的，以弧度为单位的值。

<p align="center">
    <img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/canvas/images/grid_rotate.png" alt="rotate">
</p>

### -缩放 scale(x, y)

> 接着是缩放。我们用它来增减图形在 canvas 中的像素数目，对形状，位图进行缩小或者放大。

**scale(x, y)：**
scale 方法接受两个参数。x,y 分别是横轴和纵轴的缩放因子，它们都必须是正值。值比 1.0 小表示缩小，比 1.0 大则表示放大，值为 1.0 时什么效果都没有。

<p align="center">
    <img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/canvas/images/scale.png" alt="scale">
</p>

### -变形 transform(m11, m12, m21, m22m dx, dy)

> 最后一个方法允许对变形矩阵直接修改。

**transform(m11, m12, m21, m22, dx, dy)：**

* m11：水平方向的缩放

* m12：水平方向的倾斜偏移

* m21：竖直方向的倾斜偏移

* m22：竖直方向的缩放

* dx：水平方向的移动

* dy：竖直方向的移动

## 合成与裁剪

### -合成
> 在之前的例子里面，我们总是将一个图形画在另一个之上，对于其他更多的情况，仅仅这样是远远不够的。比如，对合成的图形来说，绘制顺序会有限制。不过，我们可以利用 globalCompositeOperation 属性来改变这种状况。此外, clip属性允许我们隐藏不想看到的部分图形。

**globalCompositeOperation：**
```
    globalCompositeOperation = type
```
这个属性设定了在画新图形时采用的遮盖策略，其值是一个标识遮盖方式的字符串。放在两个图之间，用于改变两个图的层叠关系。

* source-over
* source-in
* source-out
* source-atop
* destination-over
* destination-in
* destination-out
* destination-atop
* lighter
* copy
* xor
* multiply
* screen
* overlay
* darken
* lighten
* color-dodge
* color-burn
* hard-light
* soft-light
* difference
* exclusion
* hue
* saturation
* color
* luminosity

<p align="center">
    <img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/canvas/images/globalCompositeOperation.png" alt="合成">
</p>

### -裁剪

> 裁切路径和普通的 canvas 图形差不多，不同的是它的作用是遮罩，用来隐藏不需要的部分。如图所示。红边五角星就是裁切路径，所有在路径以外的部分都不会在 canvas 上绘制出来。

<p align="center">
    <img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/canvas/images/clipping_path.png" alt="裁剪">
</p>

**clip()：**
将当前正在构建的路径转换为当前的裁剪路径。

```javascript
    context.clip();
    context.clip(fillRule);
    context.clip(path, fillRule);
```

**fillRule：**（可选）
> 填充方式，有兴趣可以了解一下

**path：**（可选）
> 指Path2D对象，不填则默认填充黑色。

可以这么使用：

```javascript
    ctx.arc(60,60,60,0,Math.PI*2,true);
    ctx.clip();
    ctx.fillRect(0,0,150,150);
```

也可以像上面的例子那样：

```javascript
    context.clip(path, fillRule);
```

## 动画

> 大家要知道，canvas 其实没有原生的傻瓜式“一键”动画API，上面我们说了那么多，都在阐述一个概念：“这么让canvas生成一个静态图。”<br/>
> 所以这些静态图（即：“帧”）是怎么形成动画的呢？~~~~~~~~所以我们自然而然就想到了逐帧动画啦~(思考下：我们见过哪些逐帧动画~)<br/>

> 所以我们在js中怎么来实现逐帧动画呢？<br/>
> setTimeout(function, delay)、setInterval(function, delay)、requestAnimationFrame(callback)

**动画的基本步骤：**
1. **清空 canvas**
    除非接下来要画的内容会完全充满 canvas （例如背景图），否则你需要清空所有。最简单的做法就是用 clearRect 方法。

2. **保存 canvas 状态**
    如果你要改变一些会改变 canvas 状态的设置（样式，变形之类的），又要在每画一帧之时都是原始状态的话，你需要先保存一下。

3. **绘制动画图形**
    这一步才是重绘动画帧。

4. **恢复 canvas 状态**
    如果已经保存了 canvas 的状态，可以先恢复它，然后重绘下一帧。

**动画 小例子：**

```javascript
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = "yellow";
    ctx.translate(30, 30);

    setInterval(function() {
        // 清除上一次的矩形
        ctx.clearRect(-30, -30, canvas.width, canvas.height);
    
        // 旋转坐标系
        ctx.rotate(2 * Math.PI / 180);
    
        // 绘制图形
        ctx.fillRect(-10,-10,20,20);
    }, 100)
```
思考：
1. 用 path 路径写，在写法上有什么的区别
2. 我不想写死translate，怎么办？（提示：save() restore()）

## 像素操作

> 到目前为止，我们尚未了解Canvas画布真实像素的原理，事实上，我们可以直接通过 canvas 来操作图片甚至图片上的单个像素点，直接读取或将数据数组写入到 canvas 中。可以实现 缩放、取反色、图片抗锯齿、压缩图片、保存图片等功能。<br/>
> 下面，我们先来了解一下ImageData对象

**ImageData对象：**
canvas中，ImageData对象中存储着canvas对象真实的像素数据，它包含以下几个只读属性：

> width -图片宽度，单位是像素 <br/>
> height -图片高度，单位是像素 <br/>
> data -Uint8ClampedArray类型的一维数组，每个像素用4个1bytes值(按照红，绿，蓝和透明值的顺序; 这就是"RGBA"格式)来代表。数组的长度即为图片像素点的个数*4<br/>

ImageData.data示意：
```javascript
    [255,255,255,255,0,0,0,255]
```

**所以：Uint8ClampedArray 包含高度 × 宽度 × 4 bytes数据，索引值从0到(高度×宽度×4)-1**

##

**那么怎么获取canvas的ImageData对象呢？**
获得一个包含画布场景像素数据的ImageData对像，你可以用getImageData()方法：

```javascript
    var myImageData = ctx.getImageData(left, top, width, height);
```

这个方法会返回一个ImageData对象，它代表了被选择画布区域的对象数据，此画布的四个角落分别表示为(left, top), (left + width, top), (left, top + height), 以及(left + width, top + height)四个点。

注：任何在画布以外的元素都会被返回成一个透明黑的ImageData对像。

```javascript
    var img = new Image();
    img.src = '../images/rhino.jpg';
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    img.onload = function() {
        ctx.drawImage(img, 0, 0);

        console.log(ctx.getImageData(0,0,300,300).data);
    };
```

**那么又怎么设置canvas的ImageData对象呢？**

> putImageData()将给定ImageData对象的数据绘制到位图上。

```javascript
    context.putImageData(imagedata, dx, dy);
    context.putImageData(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
```


**还可以创建一个ImageData对象**

> 创建一个空白（只能是透明黑）的ImageData对象，你应该使用createImageData() 方法。

1. 创建一个高为height，宽为width的空白ImageData对象
```javascript
    var myImageData = ctx.createImageData(width, height);
```

2.创建一个继承自另外一个ImageData对象的ImageData对象（只继承宽和高哦~背景依然是透明黑）
```javascript
    var myImageData = ctx.createImageData(anotherImageData);
```

接下来，你就可以操作它啦~

```javascript
    var imagedata = context.createImageData(300, 300);
    imagedata.data[0] = 0;
    imagedata.data[1] = 0;
    imagedata.data[2] = 0;
    imagedata.data[3] = 255;
    ctx.putImageData(imagedata,0,0);
```

**我们还可以对canvas进行缩放、抗锯齿、灰度处理等等：**

> 缩放

就是运用drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)

> 抗锯齿

```javascript
    ctx.imageSmoothingEnabled = true; // 打开，默认
    ctx.imageSmoothingEnabled = false; // 关闭
```

> 反色、灰度处理

反色：255 - R/G/B 部分
灰度：R/G/B = R+G+B/3

**保存图片：**

> HTMLCanvasElement 提供一个toDataURL()方法，此方法在保存图片的时候非常有用。它返回一个包含被类型参数规定的图像表现格式的数据链接(base64)。返回的图片分辨率是96dpi。

```javascript
    canvas.toDataURL(mimeType, quality);
```

1. **mimeType（可选）** 表示需要转换的图像的mimeType类型。默认值是image/png，还可以是image/jpeg，甚至image/webp（前提浏览器支持）等。
2. **quality（可选）** 表示转换的图片质量。范围是0到1。此参数要想有效，图片的mimeType需要是image/jpeg或者image/webp，其他mimeType值无效。默认压缩质量是0.92。

##

> HTMLCanvasElement 还有一个 canvas.toBlob() 方法可以Canvas图像对应的Blob对象（binary large object）。此方法可以把Canvas图像缓存在磁盘上，或者存储在内存中，这个往往由浏览器决定。兼容IE10+

```javascript
    canvas.toBlob(callback, mimeType, quality);
```

1. **callback** toBlob()方法执行成功后的回调方法，支持一个参数，表示当前转换的Blob对象。
2. **mimeType（可选）** mimeType表示需要转换的图像的mimeType类型。默认值是image/png，还可以是image/jpeg，甚至image/webp（前提浏览器支持）等。
3. **quality（可选）** 表示转换的图片质量。范围是0到1。由于Canvas的toBlob()方法转PNG是无损的，因此，此参数默认是没有效的，除非，指定图片mimeType是image/jpeg或者image/webp，此时默认压缩值是0.92。



# 与SVG对比一下

**SVG：**
* SVG 的每个元素都可以是单独可用的。您可以为某个元素附加 JavaScript 事件处理器。
* SVG 在 DOM 中，所以 DOM 发生变化，浏览器能够自动重现图形。
* SVG是基于矢量的（不依赖分辨率，放大不失帧）。
* SVG要加载到DOM中，所以不能用于游戏等复杂场景，会有性能问题。

**canvas：**
* Canvas 通过 JavaScript 来绘制 2D 图形（也可以是3D，那是webGL）。
* 在 canvas 中，一旦图形被绘制完成，它就不会继续得到浏览器的关注。如果想要有动画效果，那么整个canvas也需要不断重绘。
* 不依赖 DOM，所以不支持时间处理。
* 像素图（以来分辨率）。
* 能够以 .png 或 .jpg 格式保存结果图像。

<p align="center">
    <img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/canvas/images/comparison.png" alt="Canvas与SVG比较">
</p>

**SVG适合啥：**
> 1. 大分辨率屏幕、小图标、小动画
> 2. 矢量图
> 3. 需要DOM用户交互的

**Canvas适合啥：**
> 1. 复杂场景
> 2. 需要大量依赖JS的（如：数据可视化）
> 3. 甚至3D


