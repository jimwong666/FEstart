原文链接：[All the JavaScript you need to know before starting with React Ⅰ](https://medium.com/swlh/all-the-javascript-you-need-to-know-before-starting-with-react-abe2ebffb067 "在开始使用React之前，您需要了解的JavaScript相关知识") <br/>
作者：Samer Buna <br/>
作者创作时间：2019年1月16日

------------------------------------------------------------------------------------------------

# <img src="https://github.com/jimwong666/FEstart/blob/master/translatedArticles/images/publicFile/icon_teranlation.png" alt="译文">在开始使用React之前，您需要了解的JavaScript相关知识 Ⅰ


React开发人员喜欢JavaScript中的一些“新”功能，并在他们的项目中广泛使用它们。在本指南中，我将介绍通常与React一起使用的javascript常用功能。这些功能中的大部分都是 现代JavaScript 的功能，但我还会谈到一些与React相关且重要的旧功能。

> 这不是JavaScript语言提供的所有知识的完整列表，而是我认为可以帮助您编写更好React代码的知识列表。

## 块级作用域 和 关键字——var/let/const

使用大括号可以创建一个块级作用域。并且使用if语句、for循环语句、while语句也都会这样。唯一的不同是您使用函数的大括号创建的是函数作用域，而不是块级作用域。

块级与函数作用域：

```js
	{ 
	  // Block Scope
	} 
	if（true）{ 
	  // Block Scope
	} 
	for（var i = 1; i <= 10; i ++）{ 
	  // Block Scope
	} 
	function doSomething（）{ 
	  // Function Scope
	}
```

上述是块级作用域和函数作用域。在使用 ```var``` 关键字时，它们的区别是明显的。```var``` 在函数作用域内定义的变量**不会泄漏**到这个作用域之外。如果您想在外部作用域访问它，是不可能的：

<p align="center">
<img src="https://miro.medium.com/max/685/0*RB9KcxFJF34Ov721.png" alt="Function Scope">
</p>

但是，当您在块级作用域中定义 ```var``` 的话，您可以再此作用域范围之外访问到它，这就会存在问题。例如，在 for循环 语句中，如果定义了一个变量，您可以在**循环完成后**访问该变量。

<p align="center">
<img src="https://miro.medium.com/max/690/0*pKaw9CxC4g4RpQxW.png" alt="Block Scope">
</p>

这就是为什么在 现代JavaScript 中声明变量的更推荐方法是使用let关键字而不是var关键字。使用let，我们不会有这种奇怪的超出范围的访问问题。

<p align="center">
<img src="https://miro.medium.com/max/684/0*OcTZeuLZ_cfcnk9Y.png" alt="let Keyword">
</p>

但是，let只有在需要更改变量的值时才应使用该关键字。它不应该过度使用。对于大多数其他情况，您应该使用const关键字，所以让我告诉你以下几点。

#### 在 javascript 中，变量大多是 [我们放在计算机内存中某个空间](https://jscomplete.com/learn/beginning-javascript#variables "") 的 [标记](https://jscomplete.com/learn/beginning-javascript#variables "")。

```js
  let V = { id: 42 }; // 创建一个内存单元并将其标记为V
```

当你更改变量的值时，```V``` 实际上并没有更改最初关联的内存空间的内容 ```V```。相反，你正在穿件新的内存空间并且更改 ```V``` 与该新空间的联系。

```js
  // 丢弃当前存储单元（及其当的标记）
  // 创建新的存储单元并将其标记为V 
  V = []; // 没有报错
```
当您使用 ```const``` 定义变量时，您指示计算机不仅标记内存中的空间，而且也不会更改该标记。标记将永远与其在内存中的相同空间相关联。

```js
  // 创建一个内存单元并将其标记为V 
  // 此标记不能被丢弃或重用
  const V = { id: 42 };
  // Later in the program
  V = []; // TypeError: Assignment to constant variable.
```

请注意，这里的常量部分只是 **标记**。内存空间中的 **值** 仍然可以改变（如果它是可变的）。例如，JavaScript中的对象是可变的，因此对于V上述内容：

```js
  // 你可以这样做：
  V.id = 37; // 没有报错
  console.log(V.id); // 37
  // 但是你仍然不能这样做：
  V = { id: 37 }; // TypeError:   Assignment to constant variable.
```

这也适用于数组（因为它们也是可变的）。

字符串和整数在JavaScript中是不可变的，因此在JavaScript中更改字符串或整数值的唯一方法是丢弃当前的内存空间并重新标记另一个。这就是为什么如果你有一个数字计数器，你需要在你的程序中增加，你需要使用```let```：

```js
  // 以下这种情况不能使用 const :
  let counter = 0;
  counter = counter + 1; // 丢弃并且重新标记
```

始终使用 ```const``` 关键字来定义变量。只有 ```let``` 在绝对需要时才使用它。切勿使用 ```var``` 关键字。

## 箭头函数和闭包

箭头函数可能是现代 JavaScript 中最常用的功能了。

它们长这样：

```js
  const doSomething = () => {
    // 函数作用域
  };
```

用于定义函数的这种新的“更短”语法很受欢迎，不仅因为它更短，而且因为它对闭包的行为更具**可预测性**。箭头函数可以访问其**定义环境**，而常规函数只可以访问其**调用环境**。可以通过函数范围中的 ```this``` 关键字进行访问：

* 在常规函数中 ```this``` 关键字的值取决于 **函数是如何被调用的**。（即常规函数中的this取决于运行时环境）
* 在箭头函数中 ```this``` 关键字的值取决于 **函数是在哪被定义的**。（即箭头函数中的this取决于定义时环境）

这是一个扩展说明的代码示例。尝试弄清楚＃1到＃4（最后4行）打印的输出内容：

```js
  // [jsdrops.com/arrow-functions](https://jsdrops.com/arrow-functions?source=post_page--------------------------- "示例")
  this.whoIsThis = 'TOP'; // 注意此作用域
  // 1) 定义
  const fancyObj {
    whoIsThis: 'FANCY', // 注意此对象
    regularF: function () {
      console.log('regularF', this.whoIsThis);
    },
    arrowF: () => {
      console.log('arrowF', this.whoIsThis);
    },
  };
  // 2) 调用
  console.log('TOP-LEVEL', this.whoIsThis); // It's "TOP" here
  fancyObj.regularF(); // Output #1 (Fancy)
  fancyObj.arrowF();   // Output #2 (Top)
  fancyObj.regularF.call({whoIsThis: 'FAKE'}); // Output #3 (Fake)
  fancyObj.arrowF.call({whoIsThis: 'FAKE'});   // Output #4 (Top)
```

此示例具有常规函数（regularF）和箭头函数（arrowF），它们在同一环境中定义并由同一调用者调用。以下是最后4行输出的说明：

1. 常规函数将始终使用它 ```this``` 来表示谁调用它。在上面的例子中，两个函数的调用者都是fancyObj它自己。这就是输出＃1是“FANCY”的原因。
2. 箭头函数将始终打印 ```this``` 定义时的作用域。这就是输出＃2是“TOP”的原因。（箭头函数的作用域里并没有）
3. ```.call```，```.apply``` 和 ```.bind``` 函数都是被用来改变调用环境的。它们的第一个参数成为新的“调用者”。这就是为什么＃3输出“TOP”的原因。
4. 箭头函数不在乎 ```.call```，```.apply``` 和 ```.bind``` 调用者的更改。这就是为什么输出＃4是“TOP”而不是新的“FAKE”。

关于箭头函数的另一个很酷的事情是，如果函数只有返回一行：

```js
  const square = (a) => {
    return a * a;
  };
```

您可以通过完全删除大括号和return关键字使其更简洁。

```js
  const square = (a) => a * a;
```

如果函数接收到一个参数，您还可以删除参数周围的括号：

```js
  const square = a => a * a;
```

这短得多的语法通常流行在传递数组的方法，如功能```map```，```reduce```，```filter```，和其他编程方法：

```js
  console.log([1, 2, 3, 4].map(a => a * a));
```

请注意，如果要使用箭头函数来创建返回对象的单行函数，则必须将对象括在**括号**中，否则大括号实际上将用于函数的范围。

```js
  // Wrong
  const objMaker = () => { answer: 42 };
  // Right
  const objMaker = () => ({ answer: 42 };
```

以上实际上是初学者在使用像React这样的库时[最常犯的错误](https://jscomplete.com/learn/react-beyond-basics/react-cfp "")之一。

箭头函数简短，可读性更强。它们可以访问它们的定义环境，使它们非常适用于需要在与定义环境不同的环境中执行该函数的情况（想想定时器或单击事件处理程序）。

## 字面量表示法

您可以通过几种不同的方式创建JavaScript对象，但最常见的方式是使用对象字面量（使用大括号）：

对象字面量：

```js
  const obj = { 
    // key：value 
  };
```
字面量表示法非常常见。我们将它用于对象，数组，字符串，数字甚至是正则表达式之类的东西！

对于数组，字面量表示法是使用一组方括号```[]```：

数组字面量：

```js
  const arr = [item0，item1，item2，...];
```

对于字符串，您可以使用单引号或双引号：

```js
  const greeting = "Hello World";
  const answer = 'Forty Two';
```

这两种在JavaScript中定义字符串文字的方法是等价的。现代JavaScript有第三种方法来定义字符串，并使用**反引号**字符。

```js
  const html =` 
    <div> 
      $ {Math.random()} 
    </ div> 
  `;
```

将其粘贴到浏览器的控制台中，看看它是如何形成具有随机值的多行字符串：

<p align="center">
<img src="https://miro.medium.com/max/693/0*YTZkiz1_MDUrTANl.png" alt="backtick character">
</p>

使用反引号字符定义的字符串称为模板字符串，因为它们可以用作具有动态值的模板。它们支持[字符串插值](https://en.wikipedia.org/wiki/String_interpolation?source=post_page--------------------------- "")。您可以在```${}```语法中注入任何JavaScript表达式。

使用模板字符串，您还可以在字符串中包含多行，这是常规引用字符串无法实现的。您还可以使用函数“标记”模板字符串，并让JavaScript在返回字符串之前执行该函数，这是将逻辑附加到字符串的便捷方式。此[标记](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates "")功能用于流行的[样式组件库](https://github.com/styled-components/styled-components?source=post_page--------------------------- "")（用于React）。

反引号与单引号非常相似。确保在使用时训练您的眼睛发现模板字符串。

## React 表达式

在React中，有一种类似于模板文字语法的语法，您可以使用它来动态地将JavaScript表达式插入到React组件的代码中。它看起来像这样：

```jsx
  // React组件中的某处返回值
  <div>
    {Math.random()}
  </div>
```

这不是JavaScript模板文字。React中的这些花括号是如何在JSX中插入动态表达式的。你没有使用```$```它们的标志。虽然，您仍然可以在React应用程序的其他位置使用JavaScript模板字符串（包括JSX大括号内的任何位置）。这可能会令人困惑，所以这里是一个在同一行中同时使用JSX大括号和JavaScript模板文字大括号的示例：

带JS模板文字的JSX表达式:

```jsx
  <div>
    {`Random value is: ${Math.random()}`}
  </div>
```

粗体部分是JavaScript模板文字，它是一个表达式。我们在JSX花括号中运行该表达式。

## 解构数组和对象

解构语法很简单，但它使用了与对象/数组字面量一起使用的相同的花括号和方括号，这有时会让人感到困惑。您需要检查上下文以了解是否将一组花括号```{}```或方括号```[]```用作文字初始化或解构分配。

花括号多用：

```js
  const PI = Math.PI;
  console.log({ PI });
  const fn = ({ PI }) => {}
```

在Coding Listing 3.9中，第一个```{ PI }```（在第二行中）是一个对象字面量，它使用第一行中定义的```PI```变量。第二个```{ PI }```（在最后一行）是一个解构赋值，与第一行中定义的```PI```变量无关。

它确实会比这更令人困惑，但这里有一个简单的一般规则来确定是什么：

**当括号出现在赋值的左侧（LHS）或括号内用于定义函数时，它们最有可能用于解构。此规则有例外，不过这些例外情况很少见。**

解构示例：

```js
  // 1) Destructure array items
  const [first, second,, forth] = [10, 20, 30, 40]  ;
  // 2) Destructure object properties
  const { PI, E, SQRT2 } = Math;
```

这些都是破坏性的，因为括号在赋值的LHS上。

解构只是从一个数组（使用它们的位置）或一个对象的属性（使用它们的名称）中提取命名项，并将其提取到封闭作用域内的局部变量中。上面的2行相当于：

```js
  // 1) assuming arr is [10, 20, 30, 40]
  const first = arr[0];
  const second = arr[1];
  // third element skipped
  const forth = arr[3];
  // 2)
  const PI = Math.PI;
  const E = Math.E;
  const SQRT2 = Math.SQRT2;
```

当您需要从更大的对象中使用一些属性时，这非常有用。例如，这里有一行来从React的API中构造useState和useEffect钩子函数。

```jsx
  const {useState，useEffect} = React;
```

在此行之后，您可以直接使用这些React API对象：

```jsx
  const [state, setState] = useState();
  useEffect(() => {
    // do something
  });
```

注意```useState```函数返回值中的2个项（正好是2个项的数组）也被解构为2个局部变量。

在设计接收对象和数组作为参数的函数时，您也可以使用解构来从中提取命名项或属性，并将其提取到函数范围内的局部变量中。这是一个例子：

```js
  const circle = {
    label: 'circleX',
    radius: 2,
  };
  const circleArea = ({ radius }, [precision = 2]) => (Math.PI * radius * radius).toFixed(precision);
  console.log(
    circleArea(circle, [5]) // 12.56637
  );
```

该circleArea函数旨在接收第一个参数中的对象和第二个参数中的数组。这些参数未命名，不直接在函数作用域内使用。相反，它们的属性和类目被解构并在函数的作用域内使用。您甚至可以给定解构元素的默认值（就像为precision类目所做的那样）。

在JavaScript中，使用**单个对象的解构**作为函数的参数是**命名参数**的替代（在其他语言中亦是）。它比依靠位置参数要好得多。