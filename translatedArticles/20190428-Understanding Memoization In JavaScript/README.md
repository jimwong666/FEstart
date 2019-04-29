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

