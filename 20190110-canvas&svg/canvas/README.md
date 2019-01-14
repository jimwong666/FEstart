
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
    var canvas = document.querySelector('#canvas');
    var context = canvas.getContext('2d');
    context.fillRect(0, 0, 100, 100);
```

## 绘制形状

坐标系统：

<p align="center">
<img src="https://github.com/jimwong666/FEstart/blob/master/20190110-canvas%26svg/scanvas/images/default_grid.png" alt="坐标系统">
</p>
<br/>