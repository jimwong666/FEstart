原文链接：[Learn Data Structure & Algorithm in JavaScript | Part 03](https://dev.to/edisonnpebojot/learn-data-structure-and-algorithm-in-javascript-part-03-44h8 "学习JavaScript中的数据结构和算法 | 第03部分") <br/>
作者：Edison Pebojot(👨‍💻)<br/>
作者创作时间：2019年07月04日

------------------------------------------------------------------------------------------------
# ![翻译](../images/publicFile/icon_teranlation.png) 学习JavaScript中的数据结构和算法 | 第03部分

### 第03部分：JavaScript Numbers（😱 🔥 🔢）

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--nK1CzJRH--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/l2af5q0amrhpx1czgqgo.png" alt="学习JavaScript中的数据结构和算法">
</p>

第三部分我们将聚焦于 **number运算、number表示法、Number对象、一般的有关number的算法，和随机数生成。**在本部分结束时，您将了解如何在JavaScript中使用数字以及如何实现**素数分解**，这是加密的基础。（🔐）

**number运算** 允许你计算数值。这儿是javascript里面的算法：
```
	+：加法
	-：剑法
	/：出发
	*：乘法
	%：取余数
```
这些运算符在其他编程语言中也普遍被接受并不局限于JavaScript。

#### Number系统（🔢）

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--56nfbuWd--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://i.imgur.com/LqY4Ttb.gif" alt="学习JavaScript中的数据结构和算法">
</p>

JavaScript 用32位浮点表示 Number。举个例子，0.15625，如果符号位为1，则符号位（31）表示数字为负。接下来的8位表示指数值，即e。最后，其余的23位代表分数，即尾数（请参阅[Wikipedia](https://en.wikipedia.org/wiki/Common_logarithm#Mantissa_and_characteristic "Wikipedia")）

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--kjqTcIA2--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/z4jziz4efzwyd2r4mk6r.jpg" alt="学习JavaScript中的数据结构和算法">
</p>

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--ij5Q0Zty--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://www.microcontrollertips.com/wp-content/uploads/2017/09/floating-point-operner.jpg" alt="学习JavaScript中的数据结构和算法">
<div align="center">Figure 3-1. The 32-bit floating-point number system</div>
</p>

使用32位，值由该深奥的公式计算（请参阅[Reddit(r/math)](https://www.reddit.com/r/math/comments/61gv1i/what_are_the_examples_of_some_esoteric_and_rather/ "Wikipedia")）：
<p align="center">
<img src="https://github.com/jimwong666/FEstart/blob/master/translatedArticles/20201102-Learn%20Data%20Structure%20%26%20Algorithm%20in%20JavaScript%20-%20Part%2003/images/formula_1.PNG" alt="学习JavaScript中的数据结构和算法">
</p>

使用32位，值由该深奥的公式计算（请参阅[Reddit(r/math)](https://www.reddit.com/r/math/comments/61gv1i/what_are_the_examples_of_some_esoteric_and_rather/ "Wikipedia")）：
<p align="center">
<img src="https://github.com/jimwong666/FEstart/blob/master/translatedArticles/20201102-Learn%20Data%20Structure%20%26%20Algorithm%20in%20JavaScript%20-%20Part%2003/images/formula_1.PNG" alt="学习JavaScript中的数据结构和算法">
</p>

图 3-1 展示了下面32位的分解（[单击此处以了解有关以10为基础的更多信息](https://mathbits.com/MathBits/CompSci/Introduction/tobase10.htm "单击此处")）

<p align="center">
<img src="https://github.com/jimwong666/FEstart/blob/master/translatedArticles/20201102-Learn%20Data%20Structure%20%26%20Algorithm%20in%20JavaScript%20-%20Part%2003/images/formula_2.PNG" alt="学习JavaScript中的数据结构和算法">
</p>

<p align="center">
<img src="https://github.com/jimwong666/FEstart/blob/master/translatedArticles/20201102-Learn%20Data%20Structure%20%26%20Algorithm%20in%20JavaScript%20-%20Part%2003/images/formula_3.PNG" alt="学习JavaScript中的数据结构和算法">
</p>

以下是结果：
<p align="center">
<img src="https://github.com/jimwong666/FEstart/blob/master/translatedArticles/20201102-Learn%20Data%20Structure%20%26%20Algorithm%20in%20JavaScript%20-%20Part%2003/images/formula_4.PNG" alt="学习JavaScript中的数据结构和算法">
</p>

使用小数部分时，此浮点数系统会在JavaScript中引起一些舍入错误。例如，不能精确表示0.1和0.2。因此，0.1 + 0.2 === 0.3会产生错误。

```js
// 试试
0.1+0.2===0.3
```

要真正理解为什么0.1无法正确表示为32位浮点数，您必须了解二进制文件（单击此处以了解有关二进制文件的更多信息）。用二进制表示许多小数需要无限数量的数字。这是因为二进制数由2n表示，其中n是整数。

在尝试计算0.1时，长除法将永远持续下去。如图__3-2所示，1010代表二进制10。尝试计算0.1（1/10）会导致不确定数量的小数点。
<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--tNmEMX6U--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://aaronbloomfield.github.io/pdr/slides/images/03-numbers/long-division.png" alt="学习JavaScript中的数据结构和算法">
</p>

#### JavaScript Number对象（🔢）
<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--4VLjcqwt--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://images.ctfassets.net/5pwbsaatpdfh/1cGBzxP88EYfjiVMfZmVet/cfcee0083540332c6766b4fb8b041509/trigger_rotate.gif" alt="学习JavaScript中的数据结构和算法">
</p>

幸运的是，JavaScript中Number对象的一些内置属性可帮助解决此问题。（😅）

#### 整数四舍五入（1️⃣1️⃣1️⃣1️⃣）

由于JavaScript使用浮点表示所有数字，因此Java之类的编程语言中的整数除法只是将除法表达式计算为其商。

例如，在Java中5/4为1，因为商为1（尽管有余数）：
```java
public class Demo {
   public static void main( String args[] ) {
      int a = 5;
      int b = 4;
      System.out.println("a / b = " + (a / b) );
   }
}
```

输出：

```
5 / 4 = 1
```

但是，在JavaScript中，这是一个浮点数：
```
// js中
5 / 4 = 1.25
```

这是因为Java要求您显式地将整数键入为整数。因此，结果不能是浮点数。但是，如果JavaScript开发人员想要实现整数除法，则可以执行以下操作之一：

```js
Math.floor // rounds down to nearest integer
Math.round // rounds to nearest integer
Math.ceil // rounds up to nearest integer
Math.floor(0.9); // 0
Math.floor(1.1); // 1
Math.round(0.49); // 0
Math.round(0.5); // 1
Math.round(2.9); // 3
Math.ceil(0.1); // 1 
Math.ceil(0.9); // 1 
Math.ceil(21); // 21 
Math.ceil(21.01); // 22
```

Number.EPSILON（3️⃣3️⃣）

Number.EPSILON返回两个可表示数字之间的最小间隔。这对于浮点近似问题很有用。

```js
Math.abs(0.1 + 0.2-0.3) < Number.EPSILON // true
```

该功能通过检查两个数字之间的差是否小于Number.EPSILON来起作用。请记住，Number.EPSILON是两个可表示数字之间的最小差异。 0.1 + 0.2和0.3之间的差异将小于Number.EPSILON。请参见Number.EPSILON的值：

```js
Number.EPSILON // 2.220446049250313e-16
```

#### 最大值（↗️↗️↗️）

Number.MAX_SAFE_INTEGER返回最大的整数：

```js
Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2 // true
```

这将返回true，因为它不能继续下去。但是，它不适用于浮点小数：
```js
Number.MAX_SAFE_INTEGER + 1.111 === Number.MAX_SAFE_INTEGER + 2.022 // false
```

Number.MAX_VALUE返回可能的最大浮点数。 
Number.MAX_VALUE等于1.7976931348623157e + 308：

```
Number.MAX_VALUE + 1 === Number.MAX_VALUE + 2 // true
```

这使用双精度浮点表示，并且也适用于浮点：

```js
Number.MAX_VALUE + 1.111 === Number.MAX_VALUE + 2.022 // false
```

#### Minimums（👌👌👌）
Number.MIN_SAFE_INTEGER返回最小的整数。 
Number.MIN_SAFE_INTEGER等于-9007199254740991：

```js
Number.MIN_SAFE_INTEGER - 1 === Number.MIN_SAFE_INTEGER - 2 // true
```

这将返回true，因为它不能变得更小。但是，它不适用于浮点小数：（😈）
```js
Number.MIN_SAFE_INTEGER - 1.111 === Number.MIN_SAFE_INTEGER - 2.022 // false
```

Number.MIN_VALUE返回可能的最小浮点数。 
Number.MIN_VALUE等于 **5(e)−324**

这不是负数，因为它是可能的最小浮点数，并且意味着Number.MIN_VALUE实际上大于Number.MIN_SAFE_INTEGER。
Number.MIN_VALUE也是最接近零的浮点数：
```js
Number.MIN_VALUE - 1 == -1 // true
```

这是因为这类似于写入0-1 == -1。

#### 无线数（🌀🌀🌀🌀）
大于Number.MAX_VALUE的唯一值是Infinity，小于Number.MAX_SAFE_INTEGER的唯一值是-Infinity（负无穷大）：
```js
Infinity > Number.MAX_SAFE_INTEGER // true
-Infinity < Number.MIN_SAFE_INTEGER // true
-Infinity-32323323 == -Infinity-1 // true
```
此评估为true，因为没有任何事物可以缩小到-Infinity。 （😎）

#### 大小汇总（=）
这总结了从最小的左侧（⬅️）到最大的右侧（➡️）的JavaScript数字大小：
```js
-Infinity < Number.MIN_SAFE_INTEGER < Number.MIN_VALUE < 0 < Number.MAX_SAFE_INTEGER < Number.MAX_VALUE < Infinity // true
```

#### Number 算法（⤵️↩️⤴️↪️）

讨论次数最多的涉及数字的算法之一是测试数字是否为质数。现在让我们回顾一下❗

##### 初级测试（🔬🔬🔬）
可以通过从2迭代到n，检查模数除法（余数）是否等于零来进行主要测试：0️⃣

```js
// List of Prime Number ...
// 2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97
function isPrime(n){
 if (n <= 1) {
   return false;
 }

// check from 2 to n-1
 for (var i=2; i<n; i++) {
      if (n%i == 0) {
       return false;
      }
 }

return true;
}

isPrime(2) // Change the value
```

##### 时间复杂度：O(n)
时间复杂度为O(n)，因为此算法检查从 0 到 n 的所有数字。永远记住这个术语，因为我们将在更高级的部分中使用搜索和排序算法。好的，考虑一下此方法如何迭代 2 到 n。

是否有可能找到一种模式来制作更快的算法？（❓❓😨😨）

首先，可以忽略任何2的倍数。这是一些素数的列表：
> 2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97

这很难注意到，但是所有素数的形式都是6 x K ± 1，2和3除外，其中 k 是某个整数。这是一个例子：

```
5 = (6-1) , 7 = ((1*6) + 1), 13 = ((2*6) + 1) etc
```

还应意识到，对于测试素数n，循环只需测试n的平方根。这是因为如果n的平方根不是素数，则数学定义中n不是素数：
```js
function isPrime(n){
 // 小于等于1，不是
 if (n <= 1) return false;
 // 2、3，是
 if (n <= 3) return true;
 // 除了2、3，其他它们的倍数都是
 if (n%2 == 0 || n%3 == 0) return false;
 // 找出 6 x K ± 1，然后再排除
 for (var i=5; i*i<=n; i=i+6){
	if (n%i == 0 || n%(i+2) == 0){
		return false;
	}

 	return true;
 }
// 这种改进的解决方案大大降低了时间复杂度。
```

### 素因数分解：（📐📐📐）

要理解的另一个有用算法是确定数字的素因式分解。质数是加密（我们将在第4部分中介绍）和哈希（我们还将在第11部分中介绍）的基础，素数分解是确定哪些素数乘以给定数的过程：
```js
function primeFactors(n){
  // Print the number of 2s that divide n
  while (n % 2 == 0) {
    console.log(2);
    n = n / 2;
  }
  // n must be odd at this point. So we can skip one element 
  // (Note i = i + 2)
  for (var i = 3; i * i <= n; i = i + 2) {
    // While i divides n, print i and divide n
    while (n % i == 0) {
      console.log(i);
      n = n / i;
    }
  }
  // This condition is to handle the case when n is a prime number
  // greater than 2
  if (n > 2) {
    return n;
  }
}
primeFactors(10); // prints '5' and '2'
```

#### 时间复杂度：O(sqrt(n))
该算法通过打印任何可被i整除的数字而没有余数。如果将质数传递给此函数，则可以通过打印n是否大于2来处理。（👈）

### 随机数生成器：（➿➿➿）
#### JavaScript Number对象（🔢）
<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--5YKzwIN5--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://media1.tenor.com/images/372a9761cdfbe2f79ebb38640c1d01b0/tenor.gif" alt="学习JavaScript中的数据结构和算法">
</p>

JavaScript具有一个用于生成数字的内置函数：Math.random()。
> 注意（📝）：Math.random()返回介于0和1之间的浮点数。

要使浮点数高于1（⬆️⬆️），只需将Math.random（）乘以范围：

```js
let i=()=>Math.random() * 100 // floats between 0 and 100
let j=()=>Math.random() * 25 + 5 // floats between 5 and 30
let k=()=>Math.random() * 10 - 100 // floats between -100 and -90
console.log("i="+i())
console.log("j="+j())
console.log("k="+k())
```

只需使用Math.floor()，Math.round()或Math.ceil()舍入为整数：（😎😎）
```js
let i=()=>Math.floor(Math.random() * 100) // integer between 0 and 99
let j=()=>Math.round(Math.random() * 25) + 5 // integer between 5 and 30
let k=()=>Math.ceil(Math.random() * 10) - 100 // integer between -100 and -9k
console.log("i="+i())
console.log("j="+j())
console.log("k="+k())
```

## 摘要（📚）
<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--3lJIR8vV--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://media0.giphy.com/media/KyGiMJokZEQvu/giphy.gif" alt="学习JavaScript中的数据结构和算法">
</p>

回想一下，JavaScript中的所有数字都是32位浮点格式。要获得最小的浮点数，应使用Number.EPILSON。 
JavaScript的最大和最小数目可以由以下不等式总结：
```
-Infinity < Number.MIN_SAFE_INTEGER < Number.MIN_VALUE < 0
< Number.MAX_SAFE_INTEGER < Number.MAX_VALUE < Infinity
```

质数验证和质因数分解是在各种计算机科学应用程序（例如加密）中使用的概念，我们将在第4部分中介绍。最后，JavaScript中的随机数生成通过Math.random（）进行。好的！ （🔥）

## 挑战（😤😤😤）
<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--qeXPlusZ--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://i.pinimg.com/originals/50/ad/40/50ad400c70741da195bff06f053677b3.gif" alt="学习JavaScript中的数据结构和算法">
</p>

在等待第4部分时，有一些时间来解决这个难题。但是，这里有示例代码和解释，可以自己解决，除了下面提供的代码和解释之外，还有自己的代码，我不想看到您答案或解释（或者，如果您想很好地显示它，只需确保在评论中分享它即可：（😅）

1. 给定三个数字x，y和p，compute（这是模幂）：（x ^ y）％p
  
**解释：**
在此，x是基数，y是指数，p是模量。
模幂是一种在模数上执行的幂运算，它在计算机科学中很有用，并在公钥加密算法领域中使用。
首先，这个问题似乎很简单。计算这是一个单行解决方案，如下所示：

```js
let modularExponentiation=( base, exponent, modulus )=>Math.pow(base,exponent) % modulus
```
> 注意（📝）：这正是问题所要解决的。但是，它不能处理大指数。

请记住，这是通过加密算法实现的。
在强密码学中，基数通常至少为256位（78位）。

**考虑这种情况，例如：**

基数：6 * 10^77，指数：27，模量：497

在这种情况下，（6 * 10 ^ 77）^ 27是非常大的数字，不能存储在32位浮点中。

还有另一种方法，涉及一些数学。一个必须
遵守以下数学属性：

对于任意a和b，
```
c % m = (a b) % m
c % m = [(a % m) (b % m)] % m
```

使用此数学属性，您可以将1迭代到
指数，每次乘以当前电流即可重新计算
模数值与最后。

这是伪代码：
1. 设置值= 1，当前指数= 0。
2. 将电流指数增加1。
3. 设置值=（基本值）模数，直到达到当前指数

**例如：**底数：4，指数：3，模量：5

```
4ˆ3 % 5 = 64 % 5 = 4

value = (lastValue x base ) % modulus:

value = (1 x 4) % 5 = 4 % 5 = 4

value = (4 x 4) % 5 = 16 % 5 = 1

value = (1 x 4) % 5 = 4 % 5 = 4
```

最后，下面是代码：

```
function modularExponentiation ( base, exponent, modulus ) {
 if (modulus == 1) return 0;

 var value = 1;

 for ( var i=0; i<exponent; i++ ){ 
   value = (value * base) % modulus; 
  }
  return value;
}
```

#### 时间复杂度：O(n)
时间复杂度为O(n)，其中n等于指数值。

**说明**：
为此，请使用第3部分中介绍的isPrime函数。
只需从0迭代到n并在其中打印任何质数
isPrime() 计算为true。

```js
function allPrimesLessThanN(n) {
  for (var i = 0; i < n; i++) {
    if (isPrime(i)) {
      console.log(i);
    }
  }
}
function isPrime(n) {
  if (n <= 1) return false;
  if (n <= 3) return true;



  // This is checked so that we can skip
  // middle five numbers in below loop
  if (n % 2 == 0 || n % 3 == 0) return false;

  for (var i = 5; i * i <= n; i = i + 6) {
    if (n % i == 0 || n % (i + 2) == 0)
      return false;
  }

  return true;
}

allPrimesLessThanN(15);

// prints 2, 3, 5, 7, 11, 13
```

### 时间复杂度：O(nsqrt(n))
这是因为isPrime（在本章前面已介绍）带有一个O(sqrt(n))的时间复杂度运行n次。

1. **检查一组主要因素。**

**说明**：
让我们定义丑陋的数字为那些唯一的主要因素是
2、3或5。顺序1、2、3、4、5、6、8、9、10、12、15…显示前11个丑陋数字。按照惯例，其中包括1。

为此，将数字除以除数（2、3、5），直到不能除以余数。如果数字可以被所有除数除，则在将所有数除后应为1。

```js
function maxDivide(number, divisor) {
  while (number % divisor == 0) {
    number /= divisor;
  }
  return number;
}

function isUgly(number) {
  number = maxDivide(number, 2);

  number = maxDivide(number, 3);
  number = maxDivide(number, 5);
  return number === 1;
}
```

在n上进行迭代，现在可以列出丑陋的数字了
回到：

```js
function arrayNUglyNumbers (n) {
  var counter = 0, currentNumber = 1,
  uglyNumbers = [];
    while ( counter != n ) {
    if (isUgly(currentNumber) ) {
  counter++;
  uglyNumbers.push(currentNumber);
  }

   currentNumber++;
   }

   return uglyNumbers;
   }
```

### maxDivide（数字，除数）的时间复杂度：O(log_divisor(number))

maxDivide的时间复杂度是一个对数函数，取决于除数和数量。测试2的素数时3和5，对数2(log_2(n))产生最高时间复杂。

### isUgly的时间复杂度：O(log_2(n))

### arrayNUglyNumbers的时间复杂度：O(n(log_2(n)))
isUgly函数受到maxDivide(number，2)的时间复杂度的限制。因此，arrayNUglyNumbers的时间复杂度是n倍。