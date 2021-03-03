原文链接：[Learn Data Structure & Algorithm in JavaScript | Part 05](https://dev.to/edisonpebojots/learn-data-structure-and-algorithm-in-javascript-part-05-39ii "学习JavaScript中的数据结构和算法 | 第05部分") <br/>
作者：Edison Pebojot(👨‍💻)<br/>
作者创作时间：2020年07月07日
最近更新时间：2020年10月03日

------------------------------------------------------------------------------------------------
# ![翻译](../images/publicFile/icon_teranlation.png) 学习JavaScript中的数据结构和算法 | 第05部分

## 第05部分：JavaScript Arrays（😱🔥📊）

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--JjbYOhmO--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/4pvuql2eml9n0rmplzpk.png" alt="学习JavaScript中的数据结构和算法">
</p>

作为JavaScript开发人员，您将经常使用数组。它是最常用的数据结构。 JavaScript中的数组带有许多内置方法。在本部分的最后，您将了解数组并选择正确的方法（💪）

### 数组介绍（📊）

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--KNMv3u78--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://d2r55xnwy6nx47.cloudfront.net/uploads/2020/06/ISING_2880x1620_Lede2.gif" alt="学习JavaScript中的数据结构和算法">
</p>
**数组**是最基本的数据结构之一。如果您曾经编程过，则很可能使用了数组。（😌）

```js
var array = [1,2,3,4]
```
对于任何数据结构，开发人员都对四个基本操作（**访问**，**插入**，**删除**和**搜索**）的时间和空间复杂性感兴趣。


#### 插入（🐖👈👈）

**插入**意味着添加一个新元素。 JavaScript数组插入 **.push(element)**方法在以下位置添加了一个新元素数组的末尾
```js
var array = [1, 2, 3, 4];
array.push(5) //array = [1,2,3,4,5]
array.push(7) //array = [1,2,3,4,5,7]
array.push(2) //array = [1,2,3,4,5,7,2]
```

从理论上讲，此操作的时间复杂度为O(1)。实际上，这取决于运行代码的JavaScript引擎。(😉)

添加元素的另一种方法是**unshift()**方法。这
方法将在数组的第一个索引处添加

要访问字符，请使用 **.chartAt()**
```js
var array = [1, 2, 3, 4];
array.unshift(5) //array = [5,1,2,3,4]
array.unshift(7) //array = [7,5,1,2,3,4]
array.unshift(2) //array = [2,7,5,1,2,3,4]
```

#### 删除（❌❌❌）

JavaScript数组用 **.pop()** 方法删除数组的最后一个元素。这还将返回已删除的元素

此方法的时间复杂度为O(1)

删除元素的另一种方法是 **.shift()** 方法。此方法将删除第一个元素并返回它

```js
var array = [1,2,3,4];
console.log(array.shift()) //returns 1, array = [2,3,4]

//console.log(array.shift()) //returns 2, array = [3,4] // Uncomment this
```

#### 访问（🔑🔑🔑）

访问数组指定索引处的元素时间复杂度只需要O(1)，因为此过程直接从内存获取值

```js
var array = [1,2,3,4];
console.log(array[0]) //returns 1
console.log(array[1]) //returns 2
```

### 迭代（🌀🌀🌀）

**迭代**是访问每个项目的过程。有多种方法可以遍历数组。他们都需要O(n)的时间复杂度，因为迭代要访问n次（即元素数量）。

#### for(变量; 条件; 修改)（4️⃣🌀🌀）

for是最常见的迭代方法。它最经常以这种形式使用：
```js
//var array=[1,2,3,4,5] // Remove the '//' before var array
for (var i = 0, len = array.length; i < len; i++) {
    console.log(array[i]);
}
```

前面的代码只是意味着初始化变量i，检查条件是否为假（i < len），然后进行修改（i ++），直到条件为假。

您可以通过不设置条件来使用for循环实现无限循环

```js
for (; ;) {
  console.log('I am infinite!')
}
```

#### for(in)（1️⃣2️⃣3️⃣4️⃣）

迭代的另一种方法是一个一个地调用索引（index）。变量index是数组的索引

```js
var array = ['all', 'cows', 'are', 'big'];

for (var index in array) {
    console.log(index);
}

// This prints the following: '0,1,2,3'
```

要打印值，请使用以下命令：

```js
var array = ['You', 'are', 'pig'];

for (var index in array) {
    console.log(array[index]);
}

// This prints 'You are pig'
```

#### for(of)（🅰️🅱️🅰️）

元素是数组的值
```js
var array = ['If', 'am', 'bad', 'then', 'I', 'am', 'your', 'dad'];

for (var element of array) {
    console.log(element);
}

// This prints ' If am bad then I am your dad' :)
```

#### forEach()（🐾🐾🐾🐾）

forEach与其他迭代之间的区别在于，forEach无法中断迭代或跳过数组中的元素。 forEach更具表现力（😘）
```js
var array = ['With', 'great', 'power', 'comes', 'with', 'great', 'electricity', 'bill'];

array.forEach((element, index)=>console.log(element))

// Remove the '//'
//array.forEach((element, index)=>console.log(array[index]))

// This prints 'With great power comes with great electricity bill' 
```

### 辅助函数（👬👬👬）

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--1E6kfdpj--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://newnation.sg/wp-content/uploads/fist-bump-adventure.gif" alt="学习JavaScript中的数据结构和算法">
</p>

#### .slice(start, end)（🔪✂️📰）
该辅助函数返回数组的一部分，并且不会修改原数组。.slice()具有两个参数：数组的开始索引和结束索引

```js
var array = [1, 2, 3, 4];
console.log(array.slice(1, 2)) //returns [2], array = [1,2,3,4]
console.log(array.slice(2, 4)) //returns [3,4], array = [1,2,3,4]
```

如果仅传递起始索引，则终止索引将假定为最大index（🔚）

```js
var array = [1, 2, 3, 4];
console.log(array.slice(1)) //returns [2,3,4], array = [1,2,3,4]
console.log(array.slice(1,4)) //returns [2,3,4], array = [1,2,3,4]
```

如果未传递任何内容，则此函数仅返回数组的副本

```js
var array = [1, 2, 3, 4]
console.log(array.slice()) //returns [1,2,3,4], array = [1,2,3,4]
```

应该注意的是 **array.slice() === array** 的计算结果为false。这是因为内存对这些数组的地址不同

**slice()** 对于复制数组很有用。请记住，JavaScript中的数组是基于引用的（连接），这意味着如果您为数组分配新变量，则对该变量所做的更改将应用​​于原始数组

```js
var array_one = [1, 2, 3, 4],array_two = array_one

// Before:
// array_one = [1,2,3,4]
// array_two = [1,2,3,4]

// After:
array_two[0] = 5;

console.log(array_one) // array_one [5,2,3,4]
console.log(array_two) // array_two [5,2,3,4]
```

由于更改元素是对原始数组的引用，因此意外更改了它。要创建一个新数组，可以使用**Array.from(new array)**

```js
var array_one = [1, 2, 3, 4],array_two = Array.from(array_one)

// Before:
// array_one = [1,2,3,4]
// array_two = [1,2,3,4]

// After:
array_two[0] = 5;

console.log(array_one) // array_one [1,2,3,4]
console.log(array_two) // array_two [5,2,3,4]
```

Array.from() 的时间复杂度是 O(n)，其中n是数组的大小。这是自动的，因为复制数组需要复制数组的所有n个元素

#### .splice(begin,size,element1,element2…)（1️⃣📐📄）

该辅助函数通过删除和/或添加新元素来更改数组的内容。**.splice()** 具有三个参数：**开始索引**，要删除的**大小**和要添加的**新元素**

新元素将添加到第一个参数指定的位置。它还返回删除的元素

```js
var array = [1, 2, 3, 4];

// Before: array = [1,2,3,4]

// After: return [], array=[1,2,3,4]
console.log(array.splice()) 

// Before: array = [1,2,3,4]

// After: return [2,3], array=[1,4]
console.log(array.splice(1, 2))
```

对象类型也可以添加到数组中

```js
var array = [1, 2, 3, 4];
console.log(array.splice(1, 2, [5, 6, 7])) //returns [2,3], array = [1,[5,6,7],4]

array = [1, 2, 3, 4];
console.log(array.splice(1, 2, { 'ss': 1 })) //returns [2,3], array = [1,{'ss':1},4]
```

**.splice()** 时间复杂度也是 O(n)

与复制类似，如果指定的.splice（... range）方法的范围是整个数组，则必须删除该数组中的每项

#### Concat（✂️➕📃）

**Concat()** 将新元素添加到数组的末尾并返回结果数组

> 注意：Concat() 不会更改原始数组，而是将原始数组复制到新数组

```js
var array = [1, 2, 3, 4]
console.log(array.concat()) //returns [1,2,3,4], array = [1,2,3,4]
console.log(array.concat([2, 3, 4])) //returns [1,2,3,4,2,3,4], array = [1,2,3,4]
```

#### .length 属性（📏📏📏）

**.length** 属性返回数组的大小

```js
var array = [1, 2, 3, 4];
array.length //prints 4
```

但是将此属性更改为较小的大小可以从数组中删除元素

```js
var array = [1, 2, 3, 4]
console.log("Original Array:"+array.length) //prints 4

array.length = 3
"New Array:"+array.length  // prints '3'
```

#### 扩展操作符（🎉🎉🎉）

扩展运算符（...）用于扩展参数（或值）

```js
var sum=(a, b, c, d)=>a + b + c + d
var numbers = [1, 2, 3, 4];
sum(...numbers); // prints '10'
```

**Math.max** 和 **Math.min** 函数都可以使用扩展运算符。查找数组中的最值

```js
var array = [1,2,3,4,5];
Math.max(...array) // print '5'

var array = [3,2,-123,2132,12];
Math.min(...array) // print '-123'
```

### JavaScript函数数组方法（🐾🐾🐾）

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--eEAv5BlI--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://i.gifer.com/oWr.gif" alt="学习JavaScript中的数据结构和算法">
</p>

JavaScript可以像**函数式编程语言**一样编写。它不使用循环（😐），仅使用函数（方法）调用（😊）。

在本节中，将仅探讨JavaScript中的三种函数数组方法（😭）：**map**，**filter** 和 **reduce**

> 注意：这些方法不会更改原始数组的内容

#### Map（📜📌🚩）

**map**函数转换数组中的每个元素并返回一个新数组。例如，您可以将每个元素乘以10

```js
[1, 2, 3, 4, 5, 6, 7].map(value=>value * 10) 
// prints '[10, 20, 30, 40, 50, 60, 70]'
```

#### Filter（🚯📵🚳）

过滤器功能仅返回满足条件的元素。例如，此过滤器过滤大于100的元素

```js
[100, 2003, 10, 203, 333, 12].filter(value=>value > 100)
// prints '[2003, 203, 333]'
```

> Note：同样，这不会更改原始数组

#### Reduce（📉📉📉）

reduce函数将所有元素组合为一个值

```js
[0, 1, 2, 3, 4].reduce((prevVal, currentVal, index,
array)=>prevVal + currentVal)
// prints '10'
```

此函数也可以使用第二个参数（😱），作为初始值

```js
[0, 1, 2, 3, 4].reduce((prevVal, currentVal, index,
array)=>prevVal + currentVal,1)
// prints '10'
```

### 多维数组（🌒🌘🌑）

多维数组是度或维度大于1的数组。例如，二维数组或二维数组是数组的数组，表示行和列矩阵

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--FJKBDNl4--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://i.gifer.com/Cwnu.gif" alt="学习JavaScript中的数据结构和算法">
</p>

JavaScript本身并不像下面那样提供多维数组

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--yCnwdAUp--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/hr6qv04q2cljfuvycynj.png" alt="学习JavaScript中的数据结构和算法">
<div align="center">图5-1 多维数组</div>
</p>

请参见图5-1，与 Java 和 C++ 不同，JavaScript没有多维数组（😿）

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--ayVWJP3v--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/turke7pcq7u3yioe8lmg.png" alt="学习JavaScript中的数据结构和算法">
<div align="center">图5-2 锯齿状阵列</div>
</p>

相反，js有锯齿状数组！（😹）如图5-2所示，锯齿状数组是其元素为数组的数

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--O1UvOj_j--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/00yfxdj7b6xevsadwqnl.png" alt="学习JavaScript中的数据结构和算法">
<div align="center">图5-3 三乘三矩阵</div>
</p>

这是一个创建锯齿状数组的函数，如图5-3所示：

```js
function Matrix(rows, columns) {
    var jaggedarray = new Array(rows);
    for (var i = 0; i < columns; i += 1) {
        jaggedarray[i] = new Array(rows);
    }
    return jaggedarray;
}
Matrix(3, 3)
```

通过定义元素数组，您可以创建一个多维数组，其中每个元素也是另一个数组。因此，我们可以说JavaScript的多维数组是数组的数组

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--O1UvOj_j--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/00yfxdj7b6xevsadwqnl.png" alt="学习JavaScript中的数据结构和算法">
<div align="center">图5-4 三乘三的数字矩阵</div>
</p>

要访问锯齿状数组中的元素，请指定行和列（请参见图5-4）：

```js
var matrix3by3 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

/* Access column */
console.log("Column 1:"+matrix3by3[0]) // [1,2,3]
console.log("Column 2:"+matrix3by3[1]) // [4,5,6]
console.log("Column 3:"+matrix3by3[2]) // [7,8,9]

/* Access row 1, 2 and 3 in column 1 */
console.log("Column 1 Row 1:"+matrix3by3[0][0]) // 1
console.log("Column 1 Row 2:"+matrix3by3[0][1]) // 2
console.log("Column 1 Row 3:"+matrix3by3[0][2]) // 3

/* Access row 1, 2 and 3 in column 2 */
console.log("Column 2 Row 1:"+matrix3by3[1][0]) // 4
console.log("Column 2 Row 2:"+matrix3by3[1][1]) // 5
console.log("Column 2 Row 3:"+matrix3by3[1][2]) // 6

/* Access row 1, 2 and 3 in column 3 */
console.log("Column 3 Row 1:"+matrix3by3[2][0]) // 7
console.log("Column 3 Row 2:"+matrix3by3[2][1]) // 8
console.log("Column 3 Row 3:"+matrix3by3[2][2]) // 9
```

## 总结（📚）

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--3A3qwr6O--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://i.pinimg.com/originals/b3/12/b7/b312b7395f5aefa1ba8405b43fc71979.gif" alt="学习JavaScript中的数据结构和算法">
</p>

本部分介绍了各种数组函数，分别总结于表5-1：

| Function | Usage |
| :-----| :---- |
| push(element) | 在数组的结尾添加一个元素 |
| pop() | 移除数组末尾的子后一个元素 |
| shift()| 移除数组第一个元素 |
| slice(beginIndex, endIndex)| 返回数组的起始索引到结束索引的内容 |
| splice(beginIndex, endIndex)| 返回从beginIndex到endIndex的数组的一部分，并通过删除这些元素来修改原始数组 |
| concat(arr)| 在数组末尾将新元素（来自arr）添加到数组中 |
<div align="center">表5-1 数组函数总结</div>

数组元素的迭代可以使用表5-2中所示的循环机制：

| Function | Usage |
| :-----| :---- |
| for (var prop in arr) | 根据数组元素的索引进行迭代 |
| for (var elem of arr) | 根据数组元素的值进行迭代 |
<div align="center">表5-2 遍历器总结</div>

最后，回想一下JavaScript是利用锯齿状数组（数组的数组）来获得多维数组（😊）

## 挑战（😤🔥👊）

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--Ynx8UU4x--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://thumbs.gfycat.com/ApprehensiveCanineIbadanmalimbe-size_restricted.gif" alt="学习JavaScript中的数据结构和算法">
</p>

在等待第6部分时，有一些时间来解决这个难题。但是，这里有示例代码和解释，您可以自己解决，除了下面提供的代码和解释之外，还有您自己的代码，我不想看到您答案或解释（或者，如果您想显示正确的话，只需确保在评论中分享即可：（😅）

**在最多可增加一个的数组中查找两个数组元素**
**问题：**给定数组arr，找到并返回该数组的两个索引，这些索引加起来等于权重；如果没有任何组合加起来，则返回-1
**说明：**例如，在类似[1,2,3,4,5]的数组中，哪些数字加起来等于9？
(译者：先排序，然后双指针)

**查找相同大小的两个排序数组的中位数**
**问题：**回想一下，一组偶数中的中位数是两个中间数的平均值。如果数组已排序，这很简单。
**说明：**[1,2,3,4]的中位数为（2 + 3）/ 2 = 2.5

**查找K排序数组中的公共元素**
<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--22oGk5sG--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/kqywae290zddyw2sckfi.png" alt="学习JavaScript中的数据结构和算法">
<div align="center">图5-5 三个变量</div>
</p>

**问题：**在具有三个数组的此示例中，k = 3。
**扩展：**为此，只需遍历每个数组并计算每个元素的实例数即可。但是，不要跟踪重复的（在一次数组迭代中应将5和5.5计数一次）。为此，请在递增之前检查最后一个元素是否相同。仅在排序后才有效。

**螺旋绘制**

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--l1L20s4v--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/t8ydsphvy2i5qmixc673.png" alt="学习JavaScript中的数据结构和算法">
<div align="center">图5-6 螺旋绘制</div>
</p>

**问题：**让我们用矩阵创建一个示例问题。给定矩阵，以螺旋顺序打印元素，如图5-5所示。
**说明：**起初这看起来像一项艰巨的任务。但是，该问题可以分解为五个主要部分。从左到右打印，从上到下打印，从右到左打印，从下到上打印，这四个操作都受到限制






-----------------------------------------------------------------------------


**.replace(字符, 替换的字符)**替换一个字符为另外一个字符：

```js
"Wizard of Oz".replace("Wizard","Witch"); // "Witch of Oz"
```

#### 正则表达式（😛😲😱😆）

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--DmSWm7Ng--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://thumbs.gfycat.com/VerifiableNearFlee-size_restricted.gif" alt="学习JavaScript中的数据结构和算法">
</p>

正则表达式定义了一种搜索模式。JavaScript带有对象正则表达式*，该对象用于正则表达式。

RegExp对象的构造函数采用两个参数：正则表达式和可选的匹配设置，如下所示：

```
i. Perform case-insensitive matching
g. Perform a global match (find all matches rather than stopping after
first match)
m. Perform multiline matching
```

正则表达式有2个函数：
- search(): 返回一个匹配的索引值
- match(): 返回所有的匹配项

JavaScript String对象还具有以下两个与RegExp相关的正则表达式相关函数：

- exec(): 返回第一个匹配项
- test(): 返回true或者false

#### 基础正则表达式（👌👌👌）

这里是基础的正则规则：
- **^**: 表示字符串的开头
- **\d**: 查找任何数字
- **[abc]**: 查找括号之间的任何字符
- **[^abc]**: 查找不括号之间的任何字符
- **[0-9]**: 查找括号之间的任何数字
- **[^0-9]**: 查找不括号之间的任何数字
- **(x|y)**: 匹配二选一

以下返回索引11，它是字符D的索引，它是匹配的正则表达式的第一个字符：

```js
"JavaScript DataStructures".search(/DataStructures/) // prints '11'
```

#### 常用正则表达式（🆗🆗🆗）

正则表达式有助于检查JavaScript中用户输入的有效性。输入检查的一种常见类型是验证它是否具有任何数字字符。以下是开发人员经常使用的五个正则表达式：

**任何数字字符：/\d+/ **(🔢🔠)

```js
// Number
console.log(/\d+/.test("123")) // true
// Number and Letter
console.log(/\d+/.test("33asd")) // true
console.log(/\d+/.test("5asdasd")) // true
// Only letter
console.log(/\d+/.test("asdasd")) // false

```

**只有数字字符：/\d+$/ **(1️⃣2️⃣3️⃣4️⃣)

```js
// Only Numeric
console.log(/^\d+$/.test("123")) // true
// Numeric and Letter
console.log(/^\d+$/.test("123a")) // false
// Only Letter
console.log(/^\d+$/.test("a")) // false

```

**浮点数字字符: /^[0-9].[0-9][1-9]+$/ **(1️⃣2️⃣ . 3️⃣4️⃣)

```js
var regex=/^[0-9].[0-9][1-9]+$/;
// No Floating point
console.log(regex.test("12")) // false
// With Floating point
console.log(regex.test("12.2")) // true
```

**仅字母数字字符: /[a-zA-Z0-9]/ **(🔤🔤🔤)
    
```js
var regex = /[a-zA-Z0-9]/;
// With Alphanumeric
console.log(regex.test("somethingELSE")); // true
console.log(regex.test("hello")); // true
console.log(regex.test("112a")); // true
console.log(regex.test("112")); // true
// Without Alphanumeric
console.log(regex.test("^")); // false
```

** 查找字符：/([^?=&]+)(=([^&]*))/ **(🔎🔎🔎)

在Web应用程序中，Web URL传递用于路由或数据库查询的参数。例如，对于URL：http：//your.domain/product.aspx？category = 4＆product_id = 2140＆query = lcd + tv，URL可能会响应后端SQL查询，例如
以下：
```sql
SELECT LCD, TV FROM database WHERE Category = 4 AND Product_id=2140
```

要解析这些参数，正则表达式可能有用：
```js
  var queryString = {};
  'http://your.domain/product.aspx?category=4&product_id=2140&query=lcd+tv'.replace(
    new RegExp ("([^?=&]+)(=([^&]*))?" , "g" ),
    function ($0, $1, $2, $3) { queryString[$1] = $3; }
  );
  console.log('ID: ' + queryString['product_id' ]); // ID: 2140
  console.log('Name: ' + queryString['product_name' ]); // Name: undefined
  console.log('Category: ' + queryString['category' ]); // Category: 4
```

#### 编码(📄📄📄)
<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--vNOXwhuo--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://cdn78.picsart.com/199683351001202.gif%3Fto%3Dmin%26r%3D1024" alt="学习JavaScript中的数据结构和算法">
</p>

**编码**是计算机科学中用于传输或存储的笼统概念。所有计算机文件类型均以特定结构编码。比如，当你上传一个PDF，编码看起来可能像这样：
```
1. JVBERi0xLjMKMSAwIG9iago8PCAvVHlwZSAvQ2F0YWxvZwovT3V0bGluZXMgMiAwIFIKL1Bh
Z2VzIDMgMCBS\
2. ID4+CmVuZG9iagoyIDAgb2JqCjw8IC9UeXBlIC9PdXRsaW5lcyAvQ291bnQgMCA+PgplbmR
vYmoKMyAwIG9i\
3. ago8PCAvVHlwZSAvUGFnZXMKL0tpZHMgWzYgMCBSCl0KL0NvdW50IDEKL1Jlc291cmNlcyA8
PAovUHJvY1Nl\
4. dCA0IDAgUgovRm9udCA8PCAKL0YxIDggMCBSCj4+
Cj4+Ci9NZWRpYUJveCBbMC4wMDAgMC4w
MDAgNjEyLjAw\
5. MCA3OTIuMDAwXQogPj4KZW5kb2JqCjQgMCBvYmoKWy9QREYgL1RleHQgXQplbmRvYmoKNSAw
IG9iago8PAov\
6. Q3JlYXRvciAoRE9NUERGKQovQ3JlYXRpb25EYXRlIChEOjIwMTUwNzIwMTMzMzIzKzAyJzAw
JykKL01vZERh\
7. dGUgKEQ6MjAxNTA3MjAxMzMzMjMrMDInMDAnKQo+PgplbmRvYmoKNiAwIG9iago8PCAvVHlw
ZSAvUGFnZQov\
8. UGFyZW50IDMgMCBSCi9Db250ZW50cyA3IDAgUgo+PgplbmRvYmoKNyAwIG9iago8PCAvRmls
dGVyIC9GbGF0\
9. ZURlY29kZQovTGVuZ3RoIDY2ID4+CnN0cmVhbQp4nOMy0DMwMFBAJovSuZxCFIxN9AwMzRTM
DS31DCxNFUJS\
10. FPTdDBWMgKIKIWkKCtEaIanFJZqxCiFeCq4hAO4PD0MKZW5kc3RyZWFtCmVuZG9iago4IDA
gb2JqCjw8IC9U\
11. eXBlIC9Gb250Ci9TdWJ0eXBlIC9UeXBlMQovTmFtZSAvRjEKL0Jhc2VGb250IC9UaW1lcy1
Cb2xkCi9FbmNv\
12. ZGluZyAvV2luQW5zaUVuY29kaW5nCj4+CmVuZG9iagp4cmVmCjAgOQowMDAwMDAwMDAwIDY
1NTM1IGYgCjAw\
13. MDAwMDAwMDggMDAwMDAgbiAKMDAwMDAwMDA3MyAwMDAwMCBuIAowMDAwMDAwMTE5IDAwMDA
wIG4gCjAwMDAw\
14. MDAyNzMgMDAwMDAgbiAKMDAwMDAwMDMwMiAwMDAwMCBuIAowMDAwMDAwNDE2IDAwMDAwIG4
gCjAwMDAwMDA0\
15. NzkgMDAwMDAgbiAKMDAwMDAwMDYxNiAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDkKL1J
vb3QgMSAwIFIK\
16. L0luZm8gNSAwIFIKPj4Kc3RhcnR4cmVmCjcyNQolJUVPRgo=.....
```

这是Base64编码的PDF字符串。上传PDF文件时，此类数据通常会传递到服务器。 （💡💡）

#### Base64编码 (6️⃣4️⃣6️⃣4️⃣6️⃣4️⃣)
.btoa() 函数根据字符串创建Base64编码的ASCII字符串。字符串中的每个字符都被视为一个字节（8位：8个0和1）。

.atob()函数对已编码的字符串进行解码。
例如，Base64编码的字符串中的字符串“ hello，我喜欢学习计算机程序”看起来像这样：
```
aGVsbG8gSSBsb3ZlIGxlYXJuaW5nIHRvIGNvbXB
1dGVyIHByb2dyYW0
```

#### 字符串缩短（📐📏😝）
您是否曾经想过像Bit.ly这样的URL缩短站点如何工作？一个简化的URL压缩算法遵循特定的结构，例如www.google.com所示，它是一个示例：

1. 数据库为URL创建唯一的ID：
  <table>
    <tr>
      <th>Long ID</th>
      <th>URL</th>
    </tr>
    <tr>
      <td>11231230</td>
      <td>www.google.com</td>
    </tr>
  </table>

2. 该ID缩短为使用Base62编码的字符串：
  <table>
    <tr>
      <th>Long ID</th>
      <th>URL</th>
      <th>Short ID</th>
    </tr>
    <tr>
      <td>11231230</td>
      <td>www.google.com</td>
      <td>VhU2</td>
    </tr>
  </table>

对于缩短部分，有62个可能的字母和数字，包括26个小写字母，26个大写字母和10个数字（0到9）。可以使用以下算法：

```js
  var DICTIONARY = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
function encodeId(num) {
    var base = DICTIONARY.length;
    var encoded = "";
if (num === 0) {
    return DICTIONARY[0];
}

while (num > 0) {
    encoded += DICTIONARY[(num % base)];
    num = Math.floor(num / base);
}

return reverseWord(encoded);

}

function reverseWord(str) {
    var reversed = "";
    for (var i = str.length - 1; i >= 0; i--) {
        reversed += str.charAt(i);
    }
    return reversed;
}

function decodeId(id) {
    var base = DICTIONARY.length;
    var decoded = 0;
for (var index = 0; index < id.split("").length; index++) {
    decoded = decoded * base + DICTIONARY.
        indexOf(id.charAt(index));
}

return decoded;

}

console.log(encodeId(11231230)); // prints 'VhU2'
console.log(decodeId('VhU2')); // prints '11231230'
```

#### 加密（🔑🔒🔓）

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--ogoUhhUs--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://getflywheel.com/wp-content/uploads/2017/10/chrome-not-secure-ssl-not-secure-sonnection.png" alt="学习JavaScript中的数据结构和算法">
</p>

您是否曾经在Google Chrome浏览器（😐❓❓）中看到图4-3中的警告。这可能意味着您尝试访问的网站没有正确的安全套接字层（SSL）证书。

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--pvxpe6EM--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/jlvqtv1mch51b5ea565m.png" alt="学习JavaScript中的数据结构和算法">
</p>

TSL是用于在服务器和客户端之间建立加密链接的标准安全性。在此过程中，服务器使用非对称加密。浏览器仅使用对称加密：

1. 服务器将其非对称公钥发送到浏览器。
2. 浏览器为当前会话创建一个对称密钥。
3. 服务器通过其私钥解密浏览器的会话并检索会话密钥。
4. 两个系统都有会话密钥，并将使用它来安全地传输数据。

这是安全的，因为只有浏览器和服务器知道会话密钥。如果浏览器第二天要连接到同一服务器，则将创建一个新的会话密钥。
SSL警告消息表示浏览器和服务器可能未在该连接上加密数据。最常用的公钥加密算法是RSA算法。

#### RSA加密（🔑🔑🔑）

RSA是一种基于分解大整数的加密算法。在RSA中，将生成两个大质数和一个补充值作为公钥。任何人都可以使用公共密钥对消息进行加密，但是只有具有主要因素的人才能对消息进行解码。 （💡💡💡）

该过程分为三个阶段：密钥生成，加密和解密。

1. 密钥生成：生成公钥和私钥。按键的构造方法产生应该是秘密的。
2. 加密：可以通过公用密钥对邮件进行加密
3. 解密：只能使用私钥来解密信息。

以下是该算法的概述：

1. 选择两个（通常大）素数p和q
  a. p和q的乘积表示为n。
  b. (p-1)和(q-1)的乘积表示为phi。
2. 选择2个指数，e和d
   a. e通常为3。可以使用其他大于2的值。
   b. d是使得（e×d）％phi = 1的值。

加密过程如下所示：
```js
m - message:
m^e % n = c
c - encrypted message
```
解密过程如下图：
```
c^d % n = m
```

这是计算d的实现：
```js
function modInverse(e, phi) {
    var m0 = phi, t, q;
    var x0 = 0, x1 = 1;
if (phi == 1)
    return 0;

while (e > 1) {
    // q is quotient
    q = Math.floor(e / phi);

    t = phi;

    // phi is remainder now, process same as
    // Euclid's algo
    phi = e % phi, e = t;

    t = x0;

    x0 = x1 - q * x0;

    x1 = t;
}

// Make x1 positive
if (x1 < 0)
    x1 += m0;

return x1;

}
modInverse(7, 40) // 23
```

还需要生成公共密钥和私有密钥的密钥对。让我们选择5和11作为素数：
```js
function modInverse(e, phi) {
    var m0 = phi, t, q;
    var x0 = 0, x1 = 1;
if (phi == 1)
    return 0;

while (e > 1) {
    // q is quotient
    q = Math.floor(e / phi);

    t = phi;

    // phi is remainder now, process same as
    // Euclid's algo
    phi = e % phi, e = t;

    t = x0;

    x0 = x1 - q * x0;

    x1 = t;
}

// Make x1 positive
if (x1 < 0)
    x1 += m0;

return x1;

}

function isPrime(n){
    var prime_numbers=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97]
    for(let i of prime_numbers){
        if(n===i){
            return true
        }
    }
}

function RSAKeyPair(p, q) {
    // Need to check that they are primes
    if (!(isPrime(p) && isPrime(q)))
        return;
// Need to check that they're not the same
if (p == q)
    return;

var n = p * q,
    phi = (p - 1) * (q - 1),
    e = 3,
    d = modInverse(e, phi);


// Public key: [e,n], Private key: [d,n]
return [[e, n], [d, n]]

}
RSAKeyPair(5,11) //Public key: [3,55], Private key: [27,55]
```

让我们将秘密消息用作数字2，高于该数字将导致解密不正确。 JavaScript内部使用浮点运算。如果数字变大，那么答案不对就不会感到惊讶：

**加密:**
```js
// m - secret message: 2 // Always remember our secret message
// m^e % n = c
// 2^3 % 55 = 8
2**3 % 55 
// You can also Math.pow(base,exponent) % modulus
// Now the value is 8. Use the value of 8 to decryption
```

**解密:**
```js
// c^d % n = m
8**27 % 55 
// You can also use Math.pow(base,exponent) % modulus
```

**完成：**加密和解密
```js
function modInverse(e, phi) {
    var m0 = phi, t, q;
    var x0 = 0, x1 = 1;
if (phi == 1) {
    return 0;
}

while (e > 1) {
    // q is quotient
    q = Math.floor(e / phi);

    t = phi;

    // phi is remainder now, process same as
    // Euclid's algo
    phi = e % phi // 3 % 40
    e = t; // e = 40
    t = x0; // t = 0
    x0 = x1 - q * x0; // 1-0|13|3 x 0
    x1 = t; // 0
}

// Make x1 positive
if (x1 < 0) {
    x1 += m0;
}

return x1;

}

function isPrime(n){
    var prime_numbers=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97]
    for(let i of prime_numbers){
        if(n===i){
            return true
        }
    }
}

function RSAKeyPair(p, q) {
    // Need to check that they are primes
    if (!(isPrime(p) && isPrime(q))) {
        return;
    }
// Need to check that they're not the same
if (p==q) {
    return;
}

var n = p * q,
    phi = (p-1)*(q-1),
    e = 3,
    d = modInverse(e,phi);



// Public key: [e,n], Private key: [d,n]
return [[e,n], [d,n]]

}

RSAKeyPair(5,11)

for (let i in RSAKeyPair(5,11)){
    var encrypted_message;
const encryption=c=>{
    var m=2,e=c[0],n=c[1],Encrypted_Message=m**e%n
    console.log("Encryption: "+Encrypted_Message)
    encrypted_message=Encrypted_Message
}
const decryption=c=>{
   var d=c[0],n=c[1],Decrypted_Message=encrypted_message**d % n
   console.log("Decryption: "+Decrypted_Message)
}
i=="0"?encryption(RSAKeyPair(5,11)[0]):i=="1"?decryption(RSAKeyPair(5,11)[1]):false

}
```

这将对2进行加密，接收者可以将其解密回2。对于RSA算法，选择的质数非常大，如果大于2，则要尝试，将第70行的2的值更改为3，您会得到不同的结果。结果。
这是因为大数的质分解需要时间来计算。今天的标准是4,096位主要产品。

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--9oqD8dP2--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/gvbsids6mwv3ojbr6hm3.jpg" alt="学习JavaScript中的数据结构和算法">
</p>

图中显示了最大可能值4,096位数字。

#### 总结（📚）

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--blaRiVoc--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://thumbs.gfycat.com/AdventurousBothAlaskanmalamute-size_restricted.gif" alt="学习JavaScript中的数据结构和算法">
</p>

表中总结了各种字符串函数。
  <table>
    <tr>
      <th>Function</th>
      <th>用法</th>
    </tr>
    <tr>
      <td>charAt(index)</td>
      <td>在索引处访问单个字符</td>
    </tr>
    <tr>
      <td>substring(startIndex, endIndex)</td>
      <td>访问从startIndex到endIndex的字符串部分</td>
    </tr>
    <tr>
      <td>x str1 > str2</td>
      <td>如果str1在字典上大于str2，则返回true</td>
    </tr>
    <tr>
      <td>indexOf(str, startIndex)</td>
      <td>从startIndex开始的所需str的索引</td>
    </tr>
    <tr>
      <td>str.split(delimiter)</td>
      <td>使用指定的分隔符将字符串拆分为数组</td>
    </tr>
    <tr>
      <td>str.replace(original,new)</td>
      <td>用新的替换原来的</td>
    </tr>
  </table>

此外，JavaScript Regex对象可用于字符串验证。下表提供了一个摘要：

<table>
    <tr>
      <th>/\d+/</th>
      <th>用法</th>
    </tr>
    <tr>
      <td>/^\d+$/</td>
      <td>任何数字字符</td>
    </tr>
    <tr>
      <td>substring(startIndex, endIndex)</td>
      <td>只有数字字符</td>
    </tr>
    <tr>
      <td>/^[0-9]*.[0-9]*[1-9]+$/</td>
      <td>浮点数字字符</td>
    </tr>
    <tr>
      <td>/[a-zA-Z0-9] /</td>
      <td>仅字母数字字符</td>
    </tr>
  </table>
