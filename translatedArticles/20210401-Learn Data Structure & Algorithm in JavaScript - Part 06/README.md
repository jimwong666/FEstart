原文链接：[Learn Data Structure & Algorithm in JavaScript | Part 05](https://dev.to/edisonpebojots/learn-data-structure-and-algorithm-in-javascript-part-06-ia9 "学习JavaScript中的数据结构和算法 | 第06部分") <br/>
作者：Edison Pebojot(👨‍💻)<br/>
作者创作时间：2020年07月09日
最近更新时间：2020年10月03日

------------------------------------------------------------------------------------------------
# ![翻译](../images/publicFile/icon_teranlation.png) 学习JavaScript中的数据结构和算法 | 第06部分

## 第06部分：JavaScript Object（😱🔥🎲）

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--288-fs64--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/ynvy8o8o722cb64wy5fl.png" alt="学习JavaScript中的数据结构和算法">
</p>

本部分将重点介绍**什么是JavaScript对象**，**如何声明它们**以及**如何更改它们的属性**。此外，本部分还将介绍**如何使用原型继承来实现JavaScript类**。而且这部分会很短。（👍）

### JavaScript Object 属性（🎲🎲）

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--wEQvceIf--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://miro.medium.com/max/3200/1%2Ai8-u-V8LTTbQwTeUwLI_BQ.gif" alt="学习JavaScript中的数据结构和算法">
</p>
可以通过对象字面量{}或语法new Object() 创建JavaScript对象。可以通过以下两种方式之一来添加或访问其他属性：object.propertyName或object['propertyName']：

**例子**：

```js
var javaScriptObject = {}; // Object Literal or via 'var javaScriptObject = New Object()'
var testArray = [1, 2, 3, 4];

javaScriptObject.array = testArray; // Added
console.log(javaScriptObject); // {array: [1,2,3,4]}

javaScriptObject['title'] = 'Algorithms'; // Added
console.log(javaScriptObject); // {array: [1,2,3,4], title: 'Algorithms'}
```

**运行**：

array和title属性已添加到JavaScript对象。


### 原型继承（🐔↔️🐓）

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--whPg1XSa--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://flow.org/assets/featurette-bigger-1bf46c79a08d766c5e04d856bd0e3913cfc2524b8a734f3a1648e04250c7f0b3.gif" alt="学习JavaScript中的数据结构和算法">
</p>

在JavaScript中，函数作为类的属性添加。这是使用this.functionName = function(){}的JavaScript类的示例：

**例子**：
```js
function ExampleClass() {
    this.name = "JavaScript";
    this.sayName = function () {
        console.log(this.name);
    }
}

// New Object
var example1 = new ExampleClass();
example1.sayName(); // Prints "JavaScript"
```

**执行**：
这将在构造函数（为ExampleClass）中添加sayName函数。这种模式称为原型继承[请参阅Wikipedia上的更多信息](https://en.wikipedia.org/wiki/Inheritance_(object-oriented_programming) "Wikipedia-原型继承")

原型继承是JavaScript中唯一的继承方法。要添加类的功能，只需使用.prototype属性。（😃）

当您使用.prototype属性时，您正在扩展对象的属性。编译语言无法做到这一点。因为它们会在编译（❗）时引发错误。 JavaScript的这一独特属性使开发人员可以利用原型继承。

（😇）这是使用.prototype的示例：

**例子**：
```js
function ExampleClass() {
    this.array = [1, 2, 3, 4, 5];
    this.name = "JavaScript";
}

// New object
var example1 = new ExampleClass();

// Adding sayName function using prototype
ExampleClass.prototype.sayName = function () {
    console.log(this.name);
}

example1.sayName(); // Prints "JavaScript"
```

### 构造函数和变量（🔧🔜📦）

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--mMy81WlC--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://flow.org/assets/featurette-faster-56e57b5eb50445d2903590e1553797e4637fcc0aa779b09bc9c5c8a8c08a1645.gif" alt="学习JavaScript中的数据结构和算法">
</p>

因为JavaScript中类的变量是该类的属性，所以使用this.propertyName声明的任何属性都将是公共可用。这意味着可以在其他范围内访问对象的属性：

**例子**：
```js
function ExampleClass(name, size) {
    this.name = name;
    this.size = size;
}

var example = new ExampleClass("Public", 5);
console.log(example); // Prints '{name:"Public", size: 5}'

// Accessing public variables
console.log(example.name); // Prints "Public"
console.log(example.size); // Prints '5'
```

**执行**：
要模拟私有变量，您可以声明一个局部变量，并使用 getter/setters（稍后将看到😉）来允许访问该变量。这样，变量仅对构造函数的作用域可用：

**例子**：
```js
function ExampleClass(name, size) {
    var privateName = name;
    var privateSize = size;

    this.getName = function () { return privateName; }
    this.setName = function (name) { privateName = name; }

    this.getSize = function () { return privateSize; }
    this.setSize = function (size) { privateSize = size; }
}

var example = new ExampleClass("Edison", 3);
example.setSize(12);
console.log(example.privateName); // Prints 'undefined'
console.log(example.getName()); // Prints 'Edison'
console.log(example.size); // Prints 'undefined'
console.log(example.getSize()); // Prints '12' instead of '3', why?
```

## 总结（📚）

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--fcvy9W5C--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://i.pinimg.com/originals/b1/64/cc/b164cc44f39a67e4895cbe307a3af78d.gif" alt="学习JavaScript中的数据结构和算法">
</p>

在JavaScript中，原型继承是首选的继承方法。原型继承是通过.prototype向JavaScript类添加新函数来实现的。 JavaScript不支持私有变量，要模拟私有变量，您需要创建一个范围为构造函数的变量。通过this.variableName在构造函数中将变量声明为该对象的一部分会自动使该属性成为公共属性。


## 挑战（😤🔥👊）

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--sVEeFnNG--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://i.gifer.com/3s7o.gif" alt="学习JavaScript中的数据结构和算法">
</p>

略~