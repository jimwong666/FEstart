原文链接：[All the JavaScript you need to know before starting with React](https://medium.com/swlh/all-the-javascript-you-need-to-know-before-starting-with-react-abe2ebffb067 "在开始使用React之前，您需要了解的JavaScript相关知识") <br/>
作者：Samer Buna <br/>
作者创作时间：2019年1月16日

------------------------------------------------------------------------------------------------

# <img src="https://github.com/jimwong666/FEstart/blob/master/translatedArticles/images/publicFile/icon_teranlation.png" alt="译文">在开始使用React之前，您需要了解的JavaScript相关知识 Ⅱ

## rest/扩展运算符 语法

当解构与 rest/扩展运算符 语法一起使用时，解构会变得相当有趣（而且非常实用），rest/扩展运算符 语法都是实用3个点（...）语法完成的。但是，他们做了不同的事情。

rest 语法是您在 解构 中使用的语法。扩展语法是您在 对象/数组等常量中。

这儿有个例子：

```js
  const [first, ...restOfItems] = [10, 20, 30, 40];
```

此处的3个点处于解构调用中，因此表示 rest 语法。我们在这里要求JavaScript从该数组中解构仅一项（第一个），然后在数组用 rest 语法创建一项  restOfItems，以容纳其余项（除了已经解构的第一项）。

<p align="center">
<img src="https://miro.medium.com/max/682/0*7EVCIXAtzHq8QxlT.png" alt="rest/扩展运算符">
</p>

这对于拆分数组很有用，在处理对象以从对象中滤除某些属性时，它甚至更强大。例如，给定此对象：

```js
  const obj1 = { 
    temp1：'001'，
    temp2：'002'，
    firstName：'John'，
    lastName：'Doe'，
	// many other properties
  };
```


如果您需要在 obj1 中创建一个包含除temp1和temp2意外的其他所有属性的新对象，你该怎么办？

你可以轻易地解构 temp1 和 temp2 (并忽略他们)，然后使用 rest 语法吧其余属性捕获到新对象中：

```js
  const {temp1，temp2，... obj2 } = obj1;
```

很酷，不是嘛？

扩展运算符语法使用相同的3个点将数组或者对象浅拷贝到新的数组或对象中。这通常用于将部分数据结构合并为现有数据结构。它取代了使用 Object.assign 方法的需要。

```js
  const array2 = [newItem0, ...array1, newItem1, newItem2];
  const object2 = {
    ...object1,
    newP1: 1,
    newP2: 2,
  };
```

当使用扩展运算符是，属性名称冲突的问题会以最后一个值为准。

什么事浅拷贝？？简而言之，所有嵌套的数组或者对象都将在副本之间共享。这与内存空间及其它们的标签类似，除了本身的标签被克隆并且它的值完全与内存地址完全一样。

在React中，相同的3点用于传播组件调用的“道具”对象。JavaScript传播语法的灵感来自React（及其他），但是React / JSX和JavaScript中3点的用法有些不同。例如，假设组件X可以访问以下对象：

```js 
const engine = { href: "http://google.com", src: "google.png" };
```

该组件可以渲染另一个组件Y并将引擎对象的属性作为Y的道具（属性）传播：

```js
<Y {...engine} />
```

这等效于：

```js
<Y href={engine.href} src={engine.src} />
```

请注意，上面的大括号是JSX大括号。

## 简略和动态属性

您可以在现代JavaScript中使用对象进行以下操作：

```js
  const mystery = 'answer';
  const InverseOfPI = 1 / Math.PI;
  const obj = {
    p1: 10,        // Plain old object property   (don't abbreviate)
    f1() {},       // Define a shorthand   function property
    InverseOfPI,   // Define a shorthand   regular property
    f2: () => {},  // Define an arrow function   property
    [mystery]: 42, // Define a dynamic property
  };
```

您是否注意到 [mystery]？那不是数组或破坏性的事情。这是定义动态属性的方式。

> 采访问题：给定上面的代码，obj.mystery的值是什么？

<p align="center">
<img src="https://miro.medium.com/max/689/0*ncUqAKAp71zBGug9.png" alt="简略和动态属性">
</p>

当您使用动态属性语法时，JavaScript首先会评估[]中的表达式，而该表达式所评估的结果将成为对象的新属性。

对于上面的示例，obj对象将具有值为42的属性answer。

当您需要使用属性名称定义一个对象来保存当前作用域中存在的具有完全相同名称的值时，可以使用另一种广泛使用的有关对象文字的功能。您可以为此使用简写属性名称语法。这就是我们对上面的InverseOfPI变量所做的。该对象的该部分等效于：

```js
  onst obj = {
   InverseOfPI: InverseOfPI,
  ;
```

对象在JavaScript中非常流行。它们用于管理和通信数据，使用其现代的文字功能将使您的代码更短，更易于阅读。




## Promises and async/await

当需要使用异步操作时，通常必须处理promise对象。Promise是一个对象，它可能会在程序的后续位置传递数据，或者可能崩溃并传递错误。

返回承诺的异步函数的一个示例是某些浏览器中固有的Web提取API。

```js
  const fetchData = () => {
    fetch('https://api.github.com').then(resp   => {
      resp.json().then(data => {
        console.log(data);
      });
    });
  };
```

fetchData函数从顶级GitHub API获取信息。由于fetch返回了一个Promise，要使用该Promise，我们对.fetch的结果进行.then调用并在其中提供回调函数。回调函数将从API接收原始响应。如果需要将数据解析为JSON，则需要在原始响应对象上调用json（）方法。该json（）方法也是异步的，因此它也返回一个promise。要获取数据，您需要另一个.then，然后调用json（）方法的结果，然后在该回调中可以访问已解析的数据。

如您所见，这种语法可能会随着异步操作的更多嵌套或需要与任何循环逻辑结合使用而变得复杂。您可以通过使每个Promise回调返回Promise对象来简化上面的嵌套，但是整个.then语法比使用async / await的JavaScript中使用Promise的现代方式可读性差：

```js
  const fetchData = async () => {
    const resp = await fetch('https://  api.github.com');
    const data = await resp.json();
    console.log(data);
  };
```

您只需等待异步调用（返回一个promise），即可直接将响应对象返回给您。然后，您可以等待json（）方法来访问已解析的JSON数据。要使等待调用起作用，您只需要将该函数标记为异步即可。

async / await语法只是您使用promise（但不必处理.then调用）的另一种方式。阅读起来有点简单，但是请记住，一旦您在函数中等待任何内容，该函数本身就会变得异步，并且它将返回一个promise对象（即使您不从中返回任何内容）。

<p align="center">
<img src="https://miro.medium.com/max/693/0*WKjSOuzCUiTvDm2K.png" alt="Promises and async/await">
</p>

对于错误处理（例如，当promise被拒绝时），您可以将async / await语法与普通的try / catch语句结合使用（并且您应该一直这样做）。

## import/export 模块化

现代JavaScript引入了import / export语句，为“模块依赖关系管理”提供了解决方案，这只是一个描述彼此需要的JavaScript文件的幻想。

需要使用文件Y.js中的功能的文件X.js可以使用import语句声明此依赖关系。必须先导出Y.js中的函数，以便其他任何文件导入它。为此，您可以使用export关键字：

```js
  // Y.js
  export const functionY() {
  }
```

现在，任何文件都可以导入此名为functionY的导出。如果X.js与Y.js处于同一级别，则可以执行以下操作：

```js
  // X.js
  import { functionY } from './Y';
  // functionY();
```

{functionY}语法没有被破坏！它是一个命名出口的导入。您还可以使用以下其他语法导出不带名称的文件：

```js
  // Y.js
  export default function () {
  }
```

导入此默认的Y导出时，可以为其指定任何名称：

```js
  // X.js
  import function42 from './Y';
  // function42();
```

尽管默认导出有其优势，但是命名导出在具有自动完成/可发现性和其他功能的智能IDE中的表现要好得多。通常最好使用命名导出，尤其是在模块中导出许多项目时。

## Map, filter, and reduce

在许多情况下，这3种数组方法取代了使用for / while循环的需要。在for / while循环中使用它们的价值在于它们都返回一个值。它们是表达。它们可以直接嵌入JSX大括号中。

所有这些方法都在原始数组上工作，并接收回调函数作为参数。他们调用原始数组中每个项目的回调函数，并对该回调的返回值进行处理。理解它们的最佳方法是通过示例。

这是.map的示例，该示例将所有数字平方组成一个数字数组：

```js
  [4, 2, 0].map(e => e * e);
  // Result: [16, 4, 0]
```

map方法使用其回调函数的返回值构造一个新的数组。每次回调函数调用的返回值将成为新构造（映射）数组中的新值。

这是.filter的示例，该过滤器过滤数字数组，将其减少为仅偶数集：

```js
  [4, 7, 2, 5, 0, 11].filter(e => e%2 === 0)
  // Result: [4, 2, 0]
```

filter方法使用其回调函数的返回值来确定当前项目是否应保留在新构造（过滤）的数组中。如果回调函数返回true，则该项保留。

这是一个reduce的示例，它将计算数组中所有数字的总和：

```js
  [16, 4, 0].reduce((acc, curr) => acc + curr, 0);
  // Result: 20
```

reduce方法使用略有不同的回调函数。这一个接收2个参数，而不是1个。除了常规current-item元素（在所有示例中均称为e）之外，该元素还接收累加器值（在示例中名为acc）。acc的初始值是reduce的第二个参数（在示例中为0）。

每次回调函数调用的返回值将成为acc变量的新值。

将[16，4，0]遍为20的情况如下：

```js
  Initial value of acc = 0
  First run: acc = 0, curr = 16
    New acc = 0 + 16 = 16
  Second run: acc = 16, curr = 4
    New acc = 16 + 4 = 20
  Third run: acc = 20, curr = 0
    New acc = 20 + 0 = 20
  Final value of acc = 20
```

因为所有这些函数都是返回值的表达式，所以我们可以将它们链接在一起：

```js
  [4, 7, 2, 5, 0, 11]
    .filter(e => e%2 === 0)
    .map(e => e * e)
    .reduce((acc, curr) => acc + curr, 0);
  // Result: 20
```

该链将采用数字数组，并在平方后计算该数组中偶数之和。您可能会认为执行3个循环而不是1个循环（这将手动包括所有操作）是多于的，但是这种功能样式具有许多优点。

## 条件表达式

因为您只能在JSX大括号内包含表达式，所以不能在其中写一个if语句。但是，您可以使用三元表达式：

```jsx
<div>
  {condition ? valueX : valueY}
</div>
```

JSX将根据条件输出valueX或valueY。值可以是任何值，包括使用JSX呈现的其他UI元素：

```jsx
  <div>
    {condition ? <input /> : <img />}
  </div>
```

如果对JSX大括号内的表达式求值的结果为true或false（包括undefined和null），React将完全忽略该表达式。它不会转换为字符串：“true”/“false”/“null”/“undefined”。

React忽略大括号中的true / false,该div完全没有内容：

```jsx
  <div>
    {3 === 3}
  </div>
```

这是故意的。它允许使用较短的语法通过使用&&运算符来有条件地将值（或元素）放在条件后面：

短路评估:

```jsx
  <div>
    {condition && <input />}
  </div>
```

如果 condition 为true，则将返回第二个操作数。如果为假，React将忽略它。这意味着它将要么渲染输入元素，要么什么都不渲染。这个JavaScript技巧被称为“短路评估”。

## Timeouts and intervals

Timeouts和intervals是浏览器API的一部分。它们并不是JavaScript语言本身的真正组成部分，而是与诸如setTimeout和setInterval之类的JavaScript函数一起使用。

这两个函数都接收“回调”函数和“延迟”值。setTimeout将在其延迟值之后一次调用其回调函数，而setInterval将以每次调用之间的延迟值重复调用其回调函数。

此代码将在3秒后显示“ Hello Timeout！”消息：

```js
  setTimeout(() => {
    console.log('Hello Timeout!');
  }, 3000);
```

第一个参数是回调函数，第二个参数是延迟（以毫秒为单位）。回调函数中的代码（粗体部分）是3秒钟后将执行的代码。

此代码将每3秒永久打印一次“ Hello Interval！”消息：

```js
  setInterval(() => {
    console.log('Hello Interval!');
  }, 3000);
```

setInterval调用通常将具有“退出”条件。setTimeout和setInterval都返回它们创建的计时器对象的“ id”，并且该id值可用于停止它们。您可以使用clearTimeout（id）调用停止Timeouts对象，并使用clearInterval（id）停止intervals对象。

此代码将每3秒打印一次“ Hello Interval！”消息，但仅打印3次：

```js
  let count = 0;
  const intervalId = setInterval(() => {
    count = count + 1
    console.log('Hello Interval!');
    if (count === 3) {
      clearInterval(intervalId);
    }
  }, 3000);
```

React应用程序中的计时器通常是在“side effect”挂钩函数中引入的。

最初于2019年1月6日发布在https://jscomplete.com。