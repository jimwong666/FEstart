原文链接：[All the JavaScript you need to know before starting with React](https://medium.com/swlh/all-the-javascript-you-need-to-know-before-starting-with-react-abe2ebffb067 "在开始使用React之前，您需要了解的JavaScript相关知识") <br/>
作者：Samer Buna <br/>
作者创作时间：2019年1月16日

------------------------------------------------------------------------------------------------

# <img src="https://github.com/jimwong666/FEstart/blob/master/translatedArticles/images/publicFile/icon_teranlation.png" alt="译文">在开始使用React之前，您需要了解的JavaScript相关知识


React开发人员喜欢JavaScript中的一些“摩登”功能，并在他们的项目中广泛使用它们。在本指南中，我将介绍通常与React一起使用的javascript常用功能。这些功能中的大部分都是比较“摩登”的JavaScript功能，但我还会谈到一些与React相关且重要的旧功能。

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

上述是块级作用域和函数作用域。在使用 ```var``` 关键字时，它们的区别是明显的。```var``` 在函数作用域内定义的变量**不会泄漏**到这个作用域之外。如果您在作用域歪想访问它，是不可能的：

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

#### 在 javascript 中，变量大多是[我们放在计算机内存中某个空间](https://jscomplete.com/learn/beginning-javascript#variables "")的[标签](https://jscomplete.com/learn/beginning-javascript#variables "")。

```js
  let V = { id: 42 }; // create a memory unit and label it as V
```

当你更改变量的值时，



```js
  // Discard current memory unit (and its current label)
  // Create new memory unit and label it as V
  V = []; // No errors
```




```js
  // Create a memory unit and label it as V
  // This label cannot be discarded or reused
  const V = { id: 42 };
  // Later in the program
  V = []; // TypeError: Assignment to constant variable.
```















* [awesome typescript](https://github.com/dzharii/awesome-typescript "awesome typescript")