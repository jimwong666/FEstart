原文链接：[TypeScript — JavaScript with superpowers II](https://medium.freecodecamp.org/typescript-javascript-with-super-powers-a333b0fcabc9 "TypeScript — 超级大国般的JavaScript") <br/>
作者：Indrek Lasn <br/>
作者创作时间：2018年2月28日

------------------------------------------------------------------------------------------------

# <img src="https://github.com/jimwong666/FEstart/blob/master/translatedArticles/images/publicFile/icon_teranlation.png" alt="译文">TypeScript — 超级大国般的JavaScript II

<p align="center">
<img src="https://www.strilliant.com/images/1*lrVNbYOEn_ni9NNRTY0r7w.png" alt="Enum">
</p>

Enums(枚举)允许你将值和一些友好的名称组合在一起，想想一下你有一个你有这样一个列表。

下面构建了一个 enum：

<p align="center">
<img src="https://www.strilliant.com/images/1*4qFIKpovAtDdkA0HkrqEVw.png" alt="Enum">
</p>

你可以像这样从 enum 中获取值：

<p align="center">
<img src="https://www.strilliant.com/images/1*KaoKC7ZCuXwLPR_1ntY9SQ.png" alt="Enum">
</p>

但是等等。它返回值的索引的整数。与数组一样，枚举的索引从0开始。

我么这样获取值 “Indrek” 而不是 0 ？

<p align="center">
<img src="https://www.strilliant.com/images/1*ymUuAzpdwzeMc3522yb0MA.png" alt="Enum">
</p>

注意值是如何成为字符串的。

<p align="center">
<img src="https://www.strilliant.com/images/1*XnRIFhuCMpJFp8CmVUnf3g.png" alt="Enum">
</p>

另一个很好的例子是使用枚举来存储应用程序状态。

<p align="center">
<img src="https://www.strilliant.com/images/1*nOLoMIf6YLl0XbFoPWeHmw.png" alt="Enum">
</p>

如果你有兴趣了解更多关于枚举的知识 —— 我发现了一个[很好的答案](https://stackoverflow.com/questions/28818849/how-do-the-different-enum-variants-work-in-typescript/28818850#28818850 "Enum")，就是enum的细节。

<p align="center">
<img src="https://www.strilliant.com/images/1*DKPVSnf7PVjrdDY_Fvz6EQ.png" alt="Never">
</p>

假设我们从API中获取了一些数据。虽然我们总是期望获取数据 —— 但是如果我们无法获取数据呢？

返回 never 的完美时刻（特殊情况下）：

<p align="center">
<img src="https://www.strilliant.com/images/1*lkfWaSP6G8YfqWjoFWqh4w.png" alt="Never">
</p>

请注意我们传递的错误消息。

我们可以在另一个函数（回调）中调用error函数：

<p align="center">
<img src="https://www.strilliant.com/images/1*oZ4Ya3w5ypd6BM3AeF1nRA.png" alt="Never">
</p>

注意 我们没用 void 而用 never 是因为我们推测他的返回值时 never。

<p align="center">
<img src="https://www.strilliant.com/images/1*bgzesRZpes2KJYFRWRgFkw.png" alt="Null && Undefined">
</p>

* **null** —— 没有任何值
* **undefined** —— 已声明变量但尚未复制

不是很有用：

<p align="center">
<img src="https://www.strilliant.com/images/1*PwsNVPPzy7qav43uRHKBRg.png" alt="Null && Undefined">
</p>

默认情况下，null和undefined是所有其他类型的子类型。这意味着你可以将null和undefined分配给数字之类的东西。

<p align="center">
<img src="https://www.strilliant.com/images/1*q6FsoxR0Qou54lG040J2KQ.jpeg" alt="Null && Undefined">
</p>

这是一篇关于null的[好文章](http://2ality.com/2013/04/quirk-undefined.html "Null && Undefined")，由Axel Rauschmayer博士定义。

<p align="center">
<img src="https://www.strilliant.com/images/1*x3Y773t23Pc1VlhYWXB0TQ.png" alt="Type assertions">
</p>

如果您知道某个实体的类型可能比其当前类型更具体，则通常会发生类型断言。

类型断言没有运行时影响，纯粹由编译器使用。TypeScript假定您（程序员）已执行了您需要的任何特殊检查。

这是一个快速演示：

<p align="center">
<img src="https://www.strilliant.com/images/1*LGa_fcmyWZSCzduOKqHgpw.png" alt="Type assertions">
</p>

括号<>语法与JSX冲突，因此我们使用as语法。

<p align="center">
<img src="https://www.strilliant.com/images/1*GgrkjRVkPhwu7hHAacWwaQ.png" alt="Type assertions">
</p>

这里有关于类型断言的[更多信息](https://basarat.gitbooks.io/typescript/docs/types/type-assertion.html "type assertions")。

这里有一些很酷的东西
* [interfaces](https://basarat.gitbooks.io/typescript/docs/types/interfaces.html "interfaces")
* [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped "DefinitelyTyped")
* [unions](https://basarat.gitbooks.io/typescript/docs/types/discriminated-unions.html "unions")
* [classes](https://www.typescriptlang.org/docs/handbook/classes.html "classes")
* [awesome typescript](https://github.com/dzharii/awesome-typescript "awesome typescript")

现在 —— 使用Typescript构建一些有趣的东西吧！