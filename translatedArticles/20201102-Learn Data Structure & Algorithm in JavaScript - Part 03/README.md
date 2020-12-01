原文链接：[Learn Data Structure & Algorithm in JavaScript | Part 03](https://dev.to/edisonnpebojot/learn-data-structure-and-algorithm-in-javascript-part-03-44h8 "学习JavaScript中的数据结构和算法 | 第03部分") <br/>
作者：Edison Pebojot(👨‍💻)<br/>
作者创作时间：2019年07月04日

------------------------------------------------------------------------------------------------
# ![翻译](../images/publicFile/icon_teranlation.png) 学习JavaScript中的数据结构和算法 | 第03部分

### 第03部分：JavaScript Numbers（😱 🔥 🔢）

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--nK1CzJRH--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/l2af5q0amrhpx1czgqgo.png" alt="学习JavaScript中的数据结构和算法">
</p>

第三部分我们将聚焦于 **number运算、number表示法、Number对象、一般的有关number的算法，和随机数生成。**在本部分结束时，您将了解如何在JavaScript中使用数字以及如何实现**素数分解**，这是加密的基础。（🔐）

**number运算** 允许你计算数值。这儿是javascript里面的算法：
```
	+：加法
	-：剑法
	/：出发
	*：乘法
	%：取余数
```
这些运算符在其他编程语言中也普遍被接受并不局限于JavaScript。

#### Number系统（🔢）

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--56nfbuWd--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://i.imgur.com/LqY4Ttb.gif" alt="学习JavaScript中的数据结构和算法">
</p>

JavaScript 用32位浮点表示 Number。举个例子，0.15625，如果符号位为1，则符号位（31）表示数字为负。接下来的8位表示指数值，即e。最后，其余的23位代表分数，即尾数（请参阅**[Wikipedia](https://en.wikipedia.org/wiki/Common_logarithm#Mantissa_and_characteristic "Wikipedia")**）

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--kjqTcIA2--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/z4jziz4efzwyd2r4mk6r.jpg" alt="学习JavaScript中的数据结构和算法">
</p>

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--ij5Q0Zty--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://www.microcontrollertips.com/wp-content/uploads/2017/09/floating-point-operner.jpg" alt="学习JavaScript中的数据结构和算法">
<div align="center">Figure 3-1. The 32-bit floating-point number system</div>
</p>

使用32位，值由该深奥的公式计算（请参阅**[Reddit(r/math)](https://www.reddit.com/r/math/comments/61gv1i/what_are_the_examples_of_some_esoteric_and_rather/ "Wikipedia")**）：

