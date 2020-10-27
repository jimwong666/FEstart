## This

```this``` 的 **指向** 问题可谓是前端社区的月经贴了，每每都有新手（当然工作一两年的老手也有会搞不明白的233）询问这样的问题。

##### 下面用例子来说明（ES5）：

```js
  // 总结：ES5中的常规函数，this取决于**函数是如何被调用的**
  this.name = 'window';

  let func = function() {
    console.log(this.name);
  };

  let obj = {
	  name: 'objName',
	  func: func 
  };

  //
  func(); // 情况1
  obj.func(); // 情况2
  func.call(obj); // 情况3
  let foo = new func(); // 情况4
```

这里总结一下上述4中情况，也为了自己忘掉的时候方便方便查阅：

* 情况1中，直接调用了函数func()，这种调用方法 ```this``` 是指向 ```window``` 的（记住就行，解释起来还是挺麻烦的，可参考[这个](https://juejin.im/post/5c1c5bfcf265da614c4cc40e "换个角度看 JavaScript 中的 (this) => { 整理 (JavaScript 深入之从 ECMAScript 规范解读 this ) }")），在严格模式下是 ```undefined```。
* 情况2中，此时 ```this``` 指向 obj 对象。因为是 obj 调用了它。
* 情况3中，利用 ```call``` 函数改变了 ```this``` 的指向，指向 obj（还可以用```apply```、```bind```）。
* 情况4中，用 ```new``` 实例化了函数 func，得到了实例foo，此时 ```this``` 指向实例。

> 
> 所以这些规则的优先级是：
> 
> func() < obj.func() < func.call(obj) < new func()
> 


<hr />

##### 但是下面有个例外（ES6）：

```js
  // 总结：ES6中的箭头函数，this取决于**函数是在哪被定义的**
  this.name = 'window';

  let arrowFunc = () => {
	  console.log(this.name);
  };

  let obj = {
	  name: 'objName',
	  func: arrowFunc
  }
```

* 箭头函数没有自己的 ```this```（并且这一点无法改变），所有的箭头函数的 ```this``` 都指向包含它的作用域的 ```this```。



### 20200513

总结：
1. 判断是否在new中调用（new 绑定）？如果是的话 this 绑定的是新创建的对象。
```js
  var bar = new bar();
```

2. 函数是否通过call、apply（显示绑定）或者硬绑定调用？如果是的话，this绑定的是指定的对象。 
```js
  var bar = obj1.foo();
```
3. 函数是否在某个上下文对象上调用（隐式绑定）？如果是的话，this绑定的是那个上下文对象。
```js
  var bar = obj1.foo();
```
4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到undefined，否则绑定到全局对象。
```js
  var bar = foo();
```
