原文链接：[Convert a String to a Number in JavaScript](http://thecodebarbarian.com/convert-a-string-to-a-number-in-javascript.html "在JavaScript中字符串转数字") <br/>
作者：Valeri Karpov<br/>
作者创作时间：2019年01月22日

------------------------------------------------------------------------------------------------
# ![翻译](../images/publicFile/icon_teranlation.png) 在JavaScript中字符串转数字

在JavaScript的世界里，字符串转数字是十分微妙的。面对NaN、隐式基数（指使用原生JS parseInt()等方法转换字符串形式的数字而不指定进制时，默认的进制选择规则。译者注）、数字字面量和Number对象的种种概念和用法，稍不留神就会掉进自己挖的坑里。这篇文章里，我会讲述在转换成数字时，对用parseFloat() 还是 Number()，用Number.isNaN() 还是isNaN()之间怎么作出权衡。

另外，本文也会描述怎么用eslint来配置实行这些规则。

简单来讲，将一般的JavaScript的值转换为数字时，如果对被转换值的范围支持较为宽泛，那就应该用 Number(x)，否则，用 parseFloat(x)。在检查是否转换成功时，不要用全局对象的isNaN() 函数， 而应该用Number.isNaN()。

```js
	typeof parseFloat('42'); // 'number'
	Number.isNaN(Number('42')); // false

	typeof parseFloat('fail'); // 'number'
	Number.isNaN(Number('fail')); // true
```

用Number(x)做转换时，一些边界情况是否合理，取决于你如何处理它们。你也可以用类似 archetype 的工具来帮你处理一些边界值：

```js
	archetype.to('42', 'number'); // 42
	// 对于空字符串的处理：
	Number(''); // 0
	archetype.to('', 'number'); // throws, 抛出异常
```

许多开发人员用 +x 来将字符串转换成数字。JavaScript语言规范中规定+x与Number(x)等价

```js
	+'42 fail'; // NaN
	+({ valueOf: () => '42' }); // 42
	+({ toString: () => '42' }); // 42
	+(null); // 0
	+('  '); // 0
```

## Number(x)有何不妥

Number(x) 和 parseFloat(x) 处理边界值的方式有很大差异。 parseFloat() 在处理某些字符串时，更为宽泛（能成功转换成数字）：

```js
	Number('42 fail'); // NaN
	parseFloat('42 fail'); // 42
	parseInt('42 fail'); // 42

	Number(' 10'); // 10
	parseFloat(' 10'); // 10
	parseInt(' 10'); // 10
```

你可能会误以为这就意味着用 Number(x) 处理边界值时更安全、更严格。不幸的是，处理空格、null和其他边界值的时候，Number(x)却相对没那么严格——很多值会被出乎意料地转换成0。举个几个栗子：

```js
	Number(null); // 0
	Number(''); // 0
	Number('    '); // 0
	Number(false); // 0
	Number({ toString: () => '' }); // 0
	Number({ valueOf: () => '  ' }); // 0
```

这是因为JavaScript语言规范对于将不同的值转换成数字有一套相当复杂的规则。 parseFloat() 进行值转换的规则相对简单。解析引擎必须先将传入的值转换成字符串，去掉首尾空格，然后找出符合JavaScript正则表达式定义中的数字字面量的最长前置序列。

## Number.isNaN() 与 isNaN()

还有另外一个关于将不同的值转换成数字的小坑，当尝试转换成数字失败的时候，JavaScript并不会抛出异常，而会返回一个特殊的值NaN。更让人头大的是，用 typeof 运算符判断其类型时，得到的结果是'number'。

```js
	Number('fail'); // NaN
	typeof Number('fail'); // number
```

之所以有 Number.isNaN() 和 isNaN() 这两个东东，是因为==和===用来判断值相等时，如果任意一边存在NaN，得出的结果都出乎意料。

```js
	Number('fail') == Number('fail'); // false
	Number('fail') === Number('fail'); // false
	Number('fail') == NaN; // false
	NaN === NaN; // false
```

Number.isNaN()是ES6的一个新特性，然而它没得到太多关注。Number.isNaN() 的鲁棒性更佳，你应该它用来替代isNaN() ，确实需要用到 isNaN() 的场合除外。

```js
	// 判断一个值是否数字，用 `=== NaN` ***行不通***，所以需要用函数来判断
	isNaN(Number('fail')); // true
	Number.isNaN(Number('fail')); // true
```

要便于区分两者，可以这么类比： Number.isNaN() 之于isNaN() 类似于=== 之于 ==。 isNaN() 函数在检查给定的值是否为NaN之前会先将其转换成数字。

```js
	isNaN('fail'); // true
	isNaN({}); // true

	Number.isNaN('fail'); // false
	Number.isNaN({}); // false
```

另一方面， 如果 x 不是数字型的值，Number.isNaN(x) 则返回 false。你可以用以下函数写一个 Number.isNaN() 的polyfill：

```js
	Number.isNaN = function(x) {
	return typeof x === 'number' && isNaN(x);
	};
```

反过来看，isNaN(x) 与 Number.isNaN(Number(x))等价。当你检查 Number(x) 或 parseFloat(x) 的结果是否为 NaN 的时候， 用isNaN(x) 是安全的。这是因为传入该函数的值已经是尝试转换为数字的结果。但通常来说，应该多用Number.isNaN() 而不是 isNaN()，就跟除了真的需要用 == 来判断两值相等，你一般情况下会用 === 做判断的道理一样。

## ESLint 规则

通过 eslint 的 no-restricted-globals 规则，可配置强制使用 Number.isNaN() ，以及配置选用 Number()还是 parseFloat()。在这个GitHub issue可查看更多信息。以下的例子是在 .eslintrc.yml配置禁用全局对象的isNaN() 和parseFloat() 方法。

```
rules:
  no-restricted-globals:
    - error
    - name: isNaN
      message: Use `Number.isNaN()` instead
    - name: parseFloat
      message: Use `Number()` instead
```

如果要开启parseFloat()，禁用 Number() 的话要麻烦一丢丢，可以用no-restricted-syntax这条eslint规则来搞定。

```
rules:
  no-restricted-globals:
    - error
    - name: isNaN
      message: Use `Number.isNaN()` instead
  no-restricted-syntax:
    - error
    - selector: CallExpression[callee.name='Number']
      message: Do not use `Number()`, use `parseFloat()` instead
```

## 加以实践

在JavaScript中转数字，充满着奇奇怪怪的边界用例。如果你不想考虑这些情况，用 parseFloat() 和Number.isNaN()的组合就最合适了。想灵活处理的话，就用Number()。个人而言，因为无需检查转换结果是否为NaN，我选择 archetype。



### 使用 \<kbd> 标签
```html
<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Del</kbd>
```
