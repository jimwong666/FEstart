原文链接：[How to use console in node.js](https://scotch.io/tutorials/understanding-memoization-in-javascript#toc-testing-our-memoizer-function "了解JavaScript中的Memoization") <br/>
作者：Philip Obosi <br/>
作者创作时间：2019年3月4日

------------------------------------------------------------------------------------------------

# <img src="https://github.com/jimwong666/FEstart/blob/master/translatedArticles/images/publicFile/icon_teranlation.png" alt="译文">了解JavaScript中的Memoization

<p align="center">
<img src="https://scotch-res.cloudinary.com/image/upload/w_1000,q_auto:good,f_auto/v1549388375/dcugfumfvlbdyrf7skqh.png" alt="Understanding Memoization In JavaScript">
</p>

随着我们的应用程序的增长并开始进行更重的计算，对速度的需求越来越高，并且流程的优化变得必不可少。当我们忽略这个问题时，我们最终得到的程序会花费大量时间并在执行期间消耗大量的系统资源。

 * [介绍](#介绍)
 * [什么是Memoization？](#什么是memoization)
 * [为什么说Memoization很重要？](#为什么说memoization很重要)
 * [Memoization如何运作？](#memoization如何运作)
 * [案例研究：斐波那契数列](#案例研究斐波那契数列)
 * [使用JSPerf测试性能](#使用jsperf测试性能)
 * [函数式方法](#函数式方法)
 * [测试我们的memoizer函数](#测试我们的memoizer函数)
 * [什么时候使用memoizer函数](#什么时候使用memoizer函数)
 * [memoizer技术库](#memoizer技术库)
 * [结论](#结论)
 * [进阶阅读](#进阶阅读)

**Memoization**是一种优化技术，通过存储昂贵的函数调用的结果来加速应用程序，并在再次发生相同的输入时返回缓存的结果。

如果这对你没有多大意义，那没关系。本文深入解释了为什么需要进行memoization，它是什么，如何实现以及何时应该使用memoization。

## 什么是Memoization？

> Memoization是一种优化技术，通过存储昂贵的函数调用的结果来加速应用程序，并在再次提供相同的输入时返回缓存的结果。

对Memoization的再次定义好像跟之前相同？好吧，这次让我们来分解它吧！

在这一点上我们很清楚，Memoization的目的是减少执行“昂贵的函数调用”所花费的时间和消耗的资源量。

**什么是昂贵的函数调用？**不要混淆，我们不会在这里花钱。在计算机程序的背景下，我们拥有的两个主要资源是时间和内存。因此，昂贵的函数调用是由于函数的计算量大，而在执行期间消耗的这两大块资源。

但是，和钱一样，我们都需要经济性。为此，memoization使用缓存来存储函数调用的结果，以便以后快速方便地访问。

> 缓存只是一个临时数据存储，它保存数据，以便可以更快地提供对该数据的未来请求。

因此，当一次调用昂贵的函数时，结果存储在高速缓存中，这样无论何时在我们的应用程序中再次调用该函数，结果都将非常快速地从高速缓存返回，而无需重做任何计算。

## 为什么说Memoization很重要？

这是一个实际的例子，显示了memoization的重要性：

想象一下，你正在公园里阅读一本带有漂亮迷人封面的新小说。每当一个人经过时，他们都被封面所吸引，所以他们要求提供该书及其作者的姓名。第一次提出问题时，您翻开封面并读出作者的标题和名称。现在越来越多的人不断地停下来问同样的问题。你是一个非常善良的人，所以你回答他们。

> 你会翻开封面并将标题和作者的名字读出来给每一个人，或者你会开始提供记忆中的回应吗？这为您节省了更多时间？

注意相似性？通过memoization，当为​​函数提供输入时，它会执行所需的计算并在返回值之前将结果存储到缓存中。如果将来收到相同的输入，则不必一次又一次地进行。它只是提供缓存（内存）的答案。

**很简单吧？现在你想知道它是如何工作的？我们来看看！**

## Memoization如何运作？

JavaScript中的memoization概念主要建立在两个概念上。他们是：

* 闭包
* 高阶函数（函数返回函数）

### 闭包

> 闭包是函数和声明该函数的词法环境的组合。

对闭包的概念还不清楚？我也这么认为。

为了更清楚地理解，让我们快速检查JavaScript中词法范围的概念。词法范围简单地指代程序员在编写代码时指定的变量和块的物理位置。

看看这个非常流行的代码片段，改编自Kyle Simpson的书：《你不知道的JS》：

```js
	function foo(a) {
		var b = a + 2;
		function bar(c) {
			console.log(a, b, c);
		}
		bar(b * 2);
	}

	foo(3); // 3, 5, 10
```

## 案例研究：斐波那契数列


## 使用JSPerf测试性能


## 函数式方法


## 测试我们的memoizer函数



## 什么时候使用memoizer函数


## memoizer技术库


## 结论


## 进阶阅读