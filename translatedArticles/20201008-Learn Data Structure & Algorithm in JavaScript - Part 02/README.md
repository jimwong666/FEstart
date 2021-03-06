原文链接：[Learn Data Structure & Algorithm in JavaScript | Part 02](https://dev.to/edisonpebojots/learn-data-structure-algorithm-in-javascript-part-02-1fff "学习JavaScript中的数据结构和算法 | 第02部分") <br/>
作者：Edison Pebojot(👨‍💻)<br/>
作者创作时间：2019年07月01日

------------------------------------------------------------------------------------------------
# ![翻译](../images/publicFile/icon_teranlation.png) 学习JavaScript中的数据结构和算法 | 第02部分

### 回顾：第一部分的大O表示法入门（📖）

Big-O对于分析和比较算法效率很重要。Big-O的分析从查看代码开始，然后应用规则，应用规则是因为简化Big-O表示法线性或二次规则还不够。以下是最常用的规则：
- 消除常数
- 大O表示法相加
- 大O表示法相乘
- 确定Big-O表示法的多项式

### 第02部分：JavaScript:独特的部分（😱⚡）

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--8mO4yqci--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/fckjy97lgsne017ns9cp.png" alt="学习JavaScript中的数据结构和算法">
</p>

第2部分将简要讨论JavaScript语法和行为的一些例外情况和案例，因此您可能会看到（👀）您可能不熟悉的JavaScript中的一些更改。（😅）

此外，第2部分还将重点介绍JavaScript的基本概念，并帮助您更好地理解JavaScript设计算法的过程。因此，这第二部分将很容易。（👌）

### JavaScript作用域（🔭🔭⭐⭐）

作用域定义了变量的访问。在JavaScript中，变量可以属于全局范围，也可以属于局部范围。全局范围变量是属于全局范围的变量，可从程序中的任何位置访问。

#### 全局定义：全局作用域（🌍)

在JavaScript中，可以在不使用任何运算符的情况下声明变量。

> **注意：**（📝）执行一些操作时。例如1 + 2，其中+（或加号）是运算符，在这种情况下产生的结果为3。但是在这里，我们不使用运算符：

这是一个例子：

但是，由于**number**是全局变量，因此不惜一切代价避免这样做，因为这是JavaScript中最差的做法之一。黑客可能将全局变量用于黑客目的（⚠️）。无论如何，请始终使用**var**或**let**来声明变量：（😉）

```js
// Without var or let
number=3
number

// With var or let
var number_one=3
let number_two=3
number_one
number_two
```

最后，在声明不会被修改的变量时，使用const：（👍）

```js
// With const
const number=3
number
```

#### 使用var声明：函数作用域（⭕）

在JavaScript中，var 用于声明变量。这些变量声明（**var**而不是**let**和**const**）将所有变量“浮动”到顶部。这称为**变量提升**。在脚本底部声明的变量不会在运行时在JavaScript程序中最后执行。简而言之，它将从顶部声明变量（⬆️）。这是一个例子：

> **注意：**（📝）注意，它显示“ No !，我是真正的底部”。为什么？因为底部的变量（即var buttom）一直被提升到顶部，而使初始化“我是真正的底部”无用。这就是为什么它在代替这是底部使用初始化在顶部底部=“不！我是真正的底部”，这就是为什么它打印“不！我是真正的底部”

这是另一个示例，但是上一个示例与编写此示例相同：

> 注意：（📝）注意些什么？它显示“我是最真实的顶端”，而不是“不！，我是最真实的顶端”，为什么？因为底部的变量（top）一直被提升到顶部，所以初始化没有用处或没有被悬挂，这就是为什么它使用初始化到顶部打印“我是真正的顶部”（💡💡）的原因

在函数的最后一行的底部变量声明被浮动或提升到顶部（⬆️），而不是初始化，然后记录该变量。var关键字是变量的范围，是最接近的函数范围。

> 现在不要尝试去理解，我们将进一步解释。

在以下代码中，作用域函数是最接近打印变量的函数作用域。让我们举个例子：

为了说明这一点，前面的函数（scope_one）等效于下面的代码scope_two：

在Java中，此语法将引发错误（❌❌），因为insideIf变量通常仅在该if语句块中可用，而不在其外部可用。

打印4，而不打印具有值1的全局变量，因为它已被重新声明并且仅在该函数作用域中可用。一旦在函数内部声明了函数，函数作用域就可以帮助变量将其范围包含在函数中。好的！（🙌）

#### 使用let声明：块级用域（⭕）

可以用来声明变量的另一个关键字是let。以这种方式声明的任何变量都在最接近的块范围内（这意味着它们仅在声明它们的地方可用）。这是一个例子：

在此示例中，没有任何内容记录到控制台（或错误），因为insideIf变量仅在if语句块内可用。

### 相等和类型（👩👨）

JavaScript具有与Java等传统语言不同的数据类型。让我们探讨一下这如何影响诸如平等比较之类的事情。（😉）

#### 变量类型

在JavaScript中，有七种原始数据类型。以下是7个（七个）基本（主要）数据类型的列表：

- 布尔值
- 数值
- 字符串
- undefined
- 对象
- 函数
- symbol（symbol不会被讨论）

未定义是一个原始值，一旦声明变量，该原始值便已可用（除非它具有值）：

##### 例子：

另一个是typeof，typeof是用于返回变量类型的原始运算符。

#### 真/假 检验

在if语句中经常使用对/错检查。在许多语言中，if（）函数内部的参数必须为布尔类型（布尔类型为true或false值）。但是，JavaScript对此更加灵活。这是一个例子：

```js
if(node){
//...
}
```

在这里，节点是一个变量。如果该变量为empty，null或undefined，则在JavaScript中它将被评估为false。以下是计算结果为false的常用表达式：
- false
- 0
- 空字符串（''和""）
- NaN
- undefined
- null

以下是计算结果为true的常用表达式：
- true
- 除了0的数字
- 非空字符串
- 非空对象

##### 这有一个例子：

#### == VS ===

JavaScript是一种脚本语言，并且变量类型在代码运行时进行解释。因此，===检查两个
类型和值，而==仅检查值。

##### 例子:

1 ==“ 1”返回true，因为值“ 1”被强制为比较之后（或之前）并解释其值的数字。另一方面，1 ===“ 1”返回false，因为“ 1”的类型是字符串，而1是数字。

#### 对象

最强类型的语言（例如Java）使用isEquals（）来检查两个对象是否相同。您可能会想简单地使用==运算符检查JavaScript中两个对象是否也相同，对吗？但是，这将不等于true。

尽管这些对象是等效的（相同的空属性和相同的空值），但它们并不相等。即，变量在存储器中具有不同的地址来存储。

这就是为什么大多数JavaScript应用程序都使用实用程序库（例如lodash或下划线），它们具有isEqual函数来严格检查两个对象或值的原因。这是通过比较对象（而不是对象本身）的属性或值来发生的。在此示例中，将比较每个属性：

但是，这仍然适用于具有字符串或数字（例如“ 1”或1）的对象。但是数组（或{}）和函数（或function（））：

```js
var a={'a':{},'b':function(){}}
var b={'a':{},'b':function(){}}

isEquivalent(a,b) // Will return to false
```

这是因为函数和数组不能简单地使用==运算符检查其相等性。这是另一个例子：

尽管这两个函数执行相同的操作，但两个函数在内存中的存储地址不同，因此，相等运算符将返回false。

等号检查运算符==和===只能用于字符串和数字。要对对象执行等效检查，需要检查对象中的每个属性或值。

### 摘要（📚）

var在函数范围内声明变量，let在块范围内声明变量，变量可以在全局范围内声明；但是，应避免全局范围。对于类型检查，应使用typeof。最后，对于相等性检查，请使用==检查值，并使用===检查类型和值。但是，只能将它们用于非对象类型，例如数字，字符串和布尔值