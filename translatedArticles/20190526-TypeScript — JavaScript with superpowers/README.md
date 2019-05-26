原文链接：[TypeScript — JavaScript with superpowers](https://www.strilliant.com/2018/02/28/typescript-%E2%80%94-javascript-with-superpowers-%E2%80%93-freecodecamp-org/ "TypeScript — 超级大国般的JavaScript") <br/>
作者：不详 <br/>
作者创作时间：2018年3月左右

------------------------------------------------------------------------------------------------

# <img src="https://github.com/jimwong666/FEstart/blob/master/translatedArticles/images/publicFile/icon_teranlation.png" alt="译文">TypeScript — 超级大国般的JavaScript

Javascript很酷，但你知道什么更酷吗？

—— TypeScript!

> 你能告诉我下面这段代码出了什么问题吗？

<p align="center">
<img src="https://www.strilliant.com/images/1*IgMNDPa6Oq8De5f7Pvnmnw.png" alt="TypeScript">
TypeScript
</p>

<p align="center">
<img src="https://www.strilliant.com/images/1*TV6Dyfy3Bmul2JPC7eyKaQ.png" alt="ES6">
ES6
</p>

TypeScript代码 - 看到红色的下划线了吗？TypeScript给了我们暗示了一些可怕的错误。

你可能会想到这个（干的不错！） - toUpperCase()是一种String方法。而我们传递一个整数作为参数，因此我们不能调用toUpperCase()。

让我们来声明只能将类型为String的参数传递给nameToUpperCase()的方式来解决它。

<p align="center">
<img src="https://www.strilliant.com/images/1*N0xiNAjnnX3CijE82PpTjA.png" alt="TypeScript">
</p>

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
