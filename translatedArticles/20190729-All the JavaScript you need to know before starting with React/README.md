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


<p align="center">
<img src="https://miro.medium.com/max/685/0*RB9KcxFJF34Ov721.png" alt="about React">
</p>




* [awesome typescript](https://github.com/dzharii/awesome-typescript "awesome typescript")