# Canvas 图片验证

> 大家应该都看过网站登录界面的图片验证，如下图：

<p align="center">
    <img src="https://github.com/jimwong666/FEstart/blob/master/canvas%26svg/canvas图片验证/images/bilibili.png" alt="哔哩哔哩">
</p>

那么他是怎么实现的呢？让我们来一探究竟~~~

> 1. 首先，映入眼帘的是 2 部分的图，一个“大图”，一个“小图”。大图上有印记，好比是个“锁孔”，而小图就像个“钥匙”，正好与“大图”上的印记相吻合。
> 
> 2. 然后，当我们看到这个形状的时候，我们就知道得用canvas（因为又有形状，又有图片而且会涉及到复杂的js操作等等）了。
> 
> 3. 先看大图，我们只要在 ctx.drawImage() 之后，再选好位置继续画图就好了~
> 
> 4. 再看小图，首先这个小图肯定是裁剪得到的（要用clip()），所以思路是先将“大图”的印记部分的图弄到“小图”里面去，再把“小图”进行裁切。这样就可以得到和印记一样的图啦~<br/>
> 
>    那么怎么将“大图”得部分放进小图里呢？即：怎么将一个图放入到 canvas 里面？<br/>
> 	 有两种方法：
>    1. 先ctx.getImageData()，然后再 anotherCtx.putImageData()，这方法很好，一步到位又省事儿~ 但是putImageData()的图不能被clip()裁切~~所以这个方法行不通~
>    2. 通过“印记”的位置，在“小图”中使用和大图一样的 drawImage() 写入图片，之后再进行相应的裁剪~~ok~

<p align="center">
    <img src="https://github.com/jimwong666/FEstart/blob/master/canvas%26svg/canvas图片验证/images/slideToUnlock.png" alt="思考">
</p>

主要代码：

```javascript
    // 图片加载后执行
    function onLoad() {
        // 保存
    	_ctx.save();
    	// 清楚画布
    	_ctx.clearRect(0,0,50,300);
    	Ttop = getRandom(50,250);
    	Tlight = getRandom(50,250);
    	// 大canvas 放入 img
    	ctx.drawImage(img,0,0);
    	// 大canvas 根据图案 画图
    	_draw(ctx,Tlight,Ttop,'fill');
    	// 小canvas 根据图案 裁切
    	_draw(_ctx,0,Ttop,'clip');
    	// 小canvas 放入 img
    	_ctx.drawImage(img,-Tlight,0);
        // 恢复
    	_ctx.restore();
    };
```
