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

从这段代码片段中我们可以识别出三个范围：

* 全局作用域（包含foo唯一标识符）
* foo局部作用域（包含a,b和bar唯一标识符）
* bar局部作用域（包含c唯一标识符）

仔细查看上面的代码，我们注意到函数bar可以访问嵌套在foo内部的变量a、b。请注意，我们已成功存储该功能bar及其环境。因此，我们说bar是foo的闭包。

您可以在继承的背景下理解这一点，因为即使在其直接环境之外，个体也可以获得并表现出继承特性。这个逻辑突出了关于闭包的另一个因素，即这篇文章的第二个主要概念。

### 函数返回函数

> 对其他函数进行操作的函数（通过将它们作为参数或通过返回它们）称为高阶函数。

闭包允许我们在其封闭函数之外调用内部函数，同时保持对封闭函数的词法范围的访问（即其封闭函数中的标识符）。

让我们对前面示例中的代码进行一些调整来解释这一点。

```js
  function foo(){
    var a = 2;
  
    function bar() {
      console.log(a);
    }
    return bar;
  }
  var baz = foo();
  baz();//2
```

啊啊啊啊！！！**有意思，你不觉得吗！？**

注意该函数如何foo返回另一个函数bar。观察我们执行函数foo并将返回值赋值给baz。但是，在这种情况下，我们有一个返回功能。因此，baz现在持有对bar内部定义的函数的引用foo。

什么是最有趣的是，当我们执行函数baz之外的函数foo，我们得到了有价值的a，即：2会出现在我们的控制台上。这怎么可能？

请记住，即使在范围之外（远离宿主）执行bar变量，也始终可以访问foo（继承的特征）中的变量foo。

现在让我们看看memoization如何使用更多的代码示例来利用这些概念。

## 案例研究：斐波那契数列

案例研究：斐波那契数列是什么？

> 斐波那契数列是一组以1或0开头，后跟1的数字，并根据每个数字（称为斐波那契数或者Fibonacci数）等于前两个数之和的规则进行。例如

```
  0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, …
```

要么

```
  1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, …
```

挑战：编写一个函数来返回斐波那契数列中的**nth**元素，其中序列为：

```
  [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, …]
```

知道每个值是前两个值的总和，这个问题的递归解决方案将是：

```js
  function fibonacci(n) {
    if (n <= 1) {
      return 1
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
```

确实简洁准确！但是，有一个问题。请注意，在n到达终止大小之前，始终如一地减小它的大小（值），由于对序列中的某些值进行了重复计算，因此需要完成更多工作并花费时间来达到我们的解决方案。看着下面的图中，当我们试图评估fib(5)，我们发现，我们多次试图找到Fibonacci数的指标0，1，2，3在不同的分支。这被称为冗余计算，正是备忘所要消除的。

现在让我们通过memoization解决这个问题。

```js
  function fibonacci(n,memo) {
    memo = memo || {}
    if (memo[n]) {
      return memo[n]
    }
    if (n <= 1) {
      return 1
    }
    return memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo)
  }
```

在上面的代码片段中，我们调整函数以接受一个称为的可选参数memo。我们使用该memo对象作为**缓存**来存储Fibonacci数字及其各自的索引作为在执行过程中稍后需要时检索的密钥。

```js
  memo = memo || {}
```

在这里，我们检查memo在调用函数时是否将其作为参数接收。如果是，我们将其初始化以供使用，但如果不是，则将其设置为空对象。

```js
  if (memo[n]) {
    return memo[n]
  }
```

接下来，我们检查当前密钥是否有缓存值，n如果存在则返回其值。

与之前的解决方案一样，我们指定当n小于或等于的终止大小为1。

最后，我们递归调用具有较小值的函数n，同时将缓存的值（memo）传递到每个函数中，以便在计算期间使用。这确保了在之前评估过值并缓存之后，我们不会再次执行这样昂贵的计算。我们只是从缓存中检索值memo。

请注意，我们在返回之前将最终结果添加到缓存中。

😲哇哦！让我们庆祝到目前为止的好工作！

<p align="center">
<img src="http://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif" alt="庆祝">
</p>

让我们看看我们做得更好！

## 使用JSPerf测试性能

点击[此链接进入JSPerf的性能测试](https://jsperf.com/scotch-memoization-test "JSPerf的性能测试")。在那里，我们运行测试来评估fibonacci(20)使用这两种方法执行所需的时间。请参阅以下结果：

<p align="center">
<img src="https://d2mxuefqeaa7sj.cloudfront.net/s_663C19FBEBF5C40174705FFED0DE5FBF14BF1F3E2DE251F46C6FC51CD989D79A_1548732327687_image.png" alt="JSPerf的性能测试">
</p>

😲哇!!! 这超级令人印象深刻。memoizer的斐波纳契函数是预期的最快。然而，多少是惊人的。它执行126,762 ops / sec，远远大于执行1,751 ops / sec的纯递归解决方案，并且大约慢了99％。

> 注意：“ops / sec”代表每秒的操作次数。这是一次测试预计执行的次数。

现在我们已经看到了多少memoization会影响我们的应用程序在功能级别上的性能。这是否意味着对于我们的应用程序中的每个昂贵的功能，我们必须创建一个被修改以维护内部缓存的变体？

回想一下，我们通过从函数返回函数来了解到，即使在外部执行它们，它们也会导致它们继承父函数的范围？这使得可以将某些特征和属性（特征）从封闭函数传递到返回的函数。

当我们编写自己的memoizer函数时，让我们将它应用于memoization。

## 函数式方法

在下面的代码片段中，我们创建了一个名为的更高阶函数memoizer。使用此功能，我们将能够轻松地将memoization应用于任何功能。

```js
  function memoizer(fun){
    let cache = {};
    return function (n){
      if (cache[n] != undefined ) {
        return cache[n];
      } else {
        let result = fun(n);
        cache[n] = result;
        return result;
      }
    }
  }
```

上面，我们简单地创建一个新函数memoizer，该函数接受fun要作为参数memoizer的函数。在函数中，我们创建了一个cache对象，用于存储函数执行的结果以供将来使用。

从memoizer函数中，我们返回一个新函数，cache由于上面讨论的闭包原理，无论它在何处执行都可以访问它。

在返回的函数中，我们使用一个if..else语句来检查指定的键（参数）是否已经存在缓存值n。如果有，我们检索并返回它。如果没有，我们计算result使用要memoizer的功能fun。然后，我们添加result了对cache使用适当的键n，以便它可以从那里对未来的场合进行访问。最后，我们返回计算结果result。

**很顺利！**

要将memoizer函数应用于最初考虑的递归fibonacci函数，我们memoizer将函数作为参数传递给函数。

```js
  const fibonacciMemoFunction = memoizer(fibonacciRecursive)
```

## 测试我们的memoizer函数

当我们将memoizer函数与上面的示例案例进行比较时，结果如下：

<p align="center">
<img src="https://d2mxuefqeaa7sj.cloudfront.net/s_663C19FBEBF5C40174705FFED0DE5FBF14BF1F3E2DE251F46C6FC51CD989D79A_1548735781269_image.png" alt="JSPerf的性能测试">
</p>

😲😲😲没办法!!!! 我们的memoizer功能以42,982,762 ops / sec的速度提供了最快的解决方案。之前考虑的解决方案速度要慢100％。

优化怎么样！

关于memoizer，我们现在考虑了**是什么、为什么以及怎么样**。现在，让我们来看看**什么时候**。

## 什么时候使用memoizer函数

当然，memoizer是惊人的，你现在可能想要记住你的所有功能。这可能会变得非常无益。这三种情况下，备忘将是有益的：

* 对于昂贵的函数调用，即执行繁重计算的函数。
* 对于具有有限且高度重复输入范围的函数，缓存值不仅仅位于此处且不执行任何操作。
* 对于具有重复输入值的递归函数。
* 对于纯函数，即每次使用特定输入调用时返回相同输出的函数。

全部完成！你现在明白了，不是吗？

## memoizer技术库

以下是一些提供memoization功能的库。

* [lodash](https://lodash.com/docs/#memoize "lodash")
* [Memoizer](https://www.npmjs.com/package/memoizer "Memoizer")
* [Fastmemoize](https://www.npmjs.com/package/fast-memoize "Fastmemoize")
* [Moize](https://www.npmjs.com/package/moize "Moize")
* [Reselect for Redux](https://github.com/reduxjs/reselect "Reselect for Redux")

## 结论

通过memoization，我们可以阻止我们的函数调用重复计算相同结果的函数。现在是您将这些知识付诸实践的时候了。

您可以前往并记住整个代码库！😅（开玩笑）

## 进阶阅读

要了解有关本文中讨论的技术和概念的更多信息，您可以使用以下链接：

* [记忆化](https://en.wikipedia.org/wiki/Memoization "记忆化")
* [理解JavaScript的闭包和范围链的基础过程](https://scotch.io/tutorials/understanding-the-underlying-processes-of-javascripts-closures-and-scope-chain#toc-closures "理解JavaScript的闭包和范围链的基础过程")
* [高阶函数](http://eloquentjavascript.net/05_higher_order.html#h_xxCc98lOBK "高阶函数")
* [在JavaScript中实现Memoization](https://www.sitepoint.com/implementing-memoization-in-javascript/ "在JavaScript中实现Memoization")