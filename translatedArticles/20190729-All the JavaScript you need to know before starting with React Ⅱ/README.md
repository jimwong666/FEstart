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
