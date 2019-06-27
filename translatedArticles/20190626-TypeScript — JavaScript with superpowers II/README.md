原文链接：[TypeScript — JavaScript with superpowers II](https://medium.freecodecamp.org/typescript-javascript-with-super-powers-a333b0fcabc9 "TypeScript — 超级大国般的JavaScript") <br/>
作者：Indrek Lasn <br/>
作者创作时间：2018年2月28日

------------------------------------------------------------------------------------------------

# <img src="https://github.com/jimwong666/FEstart/blob/master/translatedArticles/images/publicFile/icon_teranlation.png" alt="译文">TypeScript — 超级大国般的JavaScript II

<p align="center">
<img src="https://www.strilliant.com/images/1*lrVNbYOEn_ni9NNRTY0r7w.png" alt="Enum">
Enum
</p>

Enums(枚举)允许你将值和一些友好的名称组合在一起，想想一下你有一个你有这样一个列表。

下面构建了一个 enum：

<p align="center">
<img src="https://www.strilliant.com/images/1*4qFIKpovAtDdkA0HkrqEVw.png" alt="Enum">
Enum
</p>

你可以像这样从 enum 中获取值：

<p align="center">
<img src="https://www.strilliant.com/images/1*KaoKC7ZCuXwLPR_1ntY9SQ.png" alt="Enum">
Enum
</p>

但是等等。它返回值的索引的整数。与数组一样，枚举的索引从0开始。

我么这样获取值 “Indrek” 而不是 0 ？

<p align="center">
<img src="https://www.strilliant.com/images/1*ymUuAzpdwzeMc3522yb0MA.png" alt="Enum">
Enum
</p>

注意值是如何成为字符串的。

<p align="center">
<img src="https://www.strilliant.com/images/1*XnRIFhuCMpJFp8CmVUnf3g.png" alt="Enum">
Enum
</p>

另一个很好的例子是使用枚举来存储应用程序状态。

<p align="center">
<img src="https://www.strilliant.com/images/1*nOLoMIf6YLl0XbFoPWeHmw.png" alt="Enum">
Enum
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


完美！现在，我们信任TypeSript去记住nameToUpperCase()方法只接受字符串，而不必我们自己去记住了。想象一下如果我们必须记住成千上万的方法和参数类型，而现在有了它！你说香不香？

但是我们仍然看到红色，为什么呢？因为我们仍然传递了一个整数！让我们现在传递一个字符串吧。

<p align="center">
<img src="https://www.strilliant.com/images/1*4JtcPUxZ7NPyf5gxhPqs2Q.png" alt="TypeScript">
</p>

注意TypeScript被编译成了Javascript（TypeScript只是Javascript的超集，很像c++到c）

这就是为什么TypeScript和类型检查很棒的重要论点。

<p align="center">
<img src="https://www.strilliant.com/images/1*AgAGlFdiYSiYKZLW9fNvuw.png" alt="TypeScript">
</p>

TypeScript在上个月有10,327,953次下载

<p align="center">
<img src="https://www.strilliant.com/images/1*12nXNNgYHMLqWl7FWe4mwQ.png" alt="TypeScript">
与Flow下载相比，Typescript下载
</p>

让我们探索TypeScript世界 - 稍后我们将深入探讨，但首先让我们了解一下Typescript究竟是什么以及它存在的原因。

TypeScript于2012年10月1日首次亮相。它由微软开发，由Anders Hejlsberg（C＃的首席架构师）和他的团队领导。

[TypeScript](https://www.typescriptlang.org/ "TypeScript") 在[GitHub](https://github.com/Microsoft/TypeScript "GitHub")上是完全开源的，所以任何人都可以阅读源代码并做出贡献。

<p align="center">
<img src="https://www.strilliant.com/images/1*4DNoN1QejqOlOFNft6teuw.png" alt="TypeScript">
TypeScript - 可扩展的JavaScript
</p>

## 如何开始

它实际上很简单 - 我们所需要的只是一个NPM包。打开终端并键入以下内容：

我们应该最终得到Typescript配置。

<p align="center">
<img src="https://www.strilliant.com/images/1*0a1jcXX5gYTRnVCkgisYbQ.png" alt="配置文件">
TypeScript 的配置文件 tsconfig.json
</p>

我们需要做的就是创建一个.ts文件并告诉Typescript编译器监视更改。

tsc - typescript编译器

> 下面这就是我们应该最终得到的结果

<p align="center">
<img src="https://www.strilliant.com/images/1*ervvuE5kcy2isO1zTDL_0w.png" alt="TypeScript配置">
</p>

太棒了 - 现在你可以按照我们的例子来做！

我们用.ts文件编码，然后编译成浏览器可读取的.js文件。但是我们现在没有浏览器，我们就用Node.js（.js文件Node也能读取）

<p align="center">
<img src="https://www.strilliant.com/images/1*6VLCkqegvidS5dJm-e7zSA.png" alt="TypeScript">
</p>

## Javascript的类型

Javascript有七种数据类型，其中6种是基本类型，其余的为对象。

**Javascript原语如下**：

* String
* Number
* Undefined
* Null
* Symbol
* Boolean

剩下的都叫 **Object**

* [函数是第一类对象](https://en.wikipedia.org/wiki/Function_object#In_JavaScript "Functions are first class objects")
* [数组是特殊对象](https://stackoverflow.com/questions/5048371/are-javascript-arrays-primitives-strings-objects/5048482#5048482 "Arrays are special objects")
* [原型是对象](http://raganwald.com/2015/06/10/mixins.html "Prototypes are objects")

<p align="center">
<img src="https://www.strilliant.com/images/1*9FeYC-4ZEsKAQ565pEdTqw.png" alt="TypeScript">
</p>

Typescript与Javascript共享相同的基本类型，但在TypeScript多了一些额外的类型。

额外的类型是可选的，如果您不熟悉它们，则不必使用它们。我发现这是TypeScript的美妙之处，它并没有强加，也没有那么严格。

<hr />

**额外的类型如下：**

<p align="center">
<img src="https://www.strilliant.com/images/1*QlcVGtDb2FVJjkQRIh6gLQ.png" alt="Tuple">
</p>

想象一下 Tuple 作为有组织的数组，你可以想要的顺序预定义类型。

<p align="center">
<img src="https://www.strilliant.com/images/1*tF_IxeUVobcsA2BiBbConA.png" alt="Tuple">
无组织的 array 与 tuple（有组织的 array）
</p>

如果我们不遵循我们为 tuple 发布的排序索引规则，那么 Typescript 会暗示我们没有遵守规则

<p align="center">
<img src="https://www.strilliant.com/images/1*6LvBeYZZrPTaxNIBkzQKAQ.png" alt="Tuple">
</p>

tuple 期望第一个值是number，但不是，它是一个字符串"Indrek"，因此给我们一个错误。

<hr />

<p align="center">
<img src="https://www.strilliant.com/images/1*Bto4sAfIzfV3EIyYS04JmA.png" alt="Void">
</p>

在Typescript中，您必须在函数中定义返回类型。像下图这样：
（有些函数没有return声明）

<p align="center">
<img src="https://www.strilliant.com/images/1*AboEEgZSSq9YvI-Y6KLBgA.png" alt="Void">
</p>

注意我们是如何声明参数类型和返回类型的，两者都是字符串。

现在如果我们不返回了会怎么样？真实世界的例子是函数体内的一个console.log()声明。

<p align="center">
<img src="https://www.strilliant.com/images/1*EI69g4tgKBUJYp6BZkignQ.png" alt="Void">
</p>

我们可以看到Typescript编译器告诉我们：“嘿，你没有返回任何东西，但是你明确地说我们必须返回一个字符串。我只是让你知道代码没有遵守规则。“

那么如果我们不想返回呢？假设我们的函数中有回调函数。我们 Void 在这种情况下使用返回类型。

<p align="center">
<img src="https://www.strilliant.com/images/1*JJdm0IAG6MOvVwKh-XUS-w.png" alt="Void">
</p>

但是如果我们确实隐式或显式地返回一个值，我们就不能有返回类型 Void

<p align="center">
<img src="https://www.strilliant.com/images/1*LYPDIzRpqPZtg03qMz_5SQ.png" alt="Void">
</p>

<hr />

<p align="center">
<img src="https://www.strilliant.com/images/1*DHGUJYw9MdbnobyC1wf0Pg.png" alt="Any">
</p>

Any 类型很简单。我们根本不知道我们正在处理什么类型，所以它就可以用 any

例子如下：

<p align="center">
<img src="https://www.strilliant.com/images/1*aDKDyw7uN7cbA7QMjpm3GA.png" alt="Any">
</p>

注意我们如何多次重新分配这个人的类型。首先，它是一个字符串，后来是一个数字，最后是一个布尔值。我们根本无法确定类型。

现实世界的例子是，如果你使用第三方库而你不知道类型时，就可以用它。

我们来一个阵列吧。您从API中提取一些数据并将其存储在数组中。该数组由随机数据组成。它不仅包含字符串，数字，也不会像 Tuple 一样有组织的结构。Any类型来帮助你！

<p align="center">
<img src="https://www.strilliant.com/images/1*nDGWiVcZHWXRPT3NMqHeuQ.png" alt="Any">
</p>

如果您知道数组只包含一种类型，则可以向编译器明确说明，如下所示：

<p align="center">
<img src="https://www.strilliant.com/images/1*AT2v5vHOq9_kuraL2E2hnA.png" alt="Any">
</p>

尽管这篇文章不长，但我们会在下一篇继续讨论。我们仍然需要覆盖几个最后的基本类型 — enum — never — null — undefined和特殊情况 type assertions。

[如果您有兴趣了解更多内容，请参阅以下文档](https://www.typescriptlang.org/docs/handbook/basic-types.html "TypeScript")

注意：我使用Visual Studio Code，Ayu Mirage主题和Source Code Pro字体。

[这是第二部分](https://www.strilliant.com/2018/03/08/typescript-%E2%80%94-javascript-with-superpowers-%E2%80%94-part-ii-%E2%80%93-cleversonder-%E2%80%93-medium/ "TypeScript — JavaScript with superpowers II")