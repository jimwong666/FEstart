原文链接：[Learn Data Structure & Algorithm in JavaScript | Part 01](https://dev.to/edisonpebojots/data-structure-algorithm-chapter-01-2538 "学习JavaScript中的数据结构和算法 | 第01部分") <br/>
作者：Edison Pebojot(👨‍💻)<br/>
作者创作时间：2019年06月30日

------------------------------------------------------------------------------------------------
# ![翻译](../images/publicFile/icon_teranlation.png) 学习JavaScript中的数据结构和算法 | 第01部分

###### 简介 (☝️)

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--8mO4yqci--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/fckjy97lgsne017ns9cp.png" alt="使用React Hooks进行状态管理 - 没有Redux和Context API">
</p>

因为如您所见，我写这个系列文章的动机（🔥🔥）是目前缺少关于JavaScript编写的数据结构和算法的可用信息，而我们见到的大多数关于数据结构和算法书的书都是关于 Java 和 C++ 的：

我发现这很奇怪（😑），因为当今软件工程和开发的许多工作机会都需要JavaScript知识；它是唯一可用于写全栈（包括前端和后端）的语言。（👌）

JavaScript遵循原型继承模式，与Java和C++仅遵循继承模式（对不起Java和C / C ++ 😅）不同，在JavaScript中编写数据结构有所变化。继承模式通过创建对象在继承期间遵循的模板形式来继承。这是Java固有性的示例

### 👉 Java 继承：
```java
class Vehicle {
  protected String brand = "Ford";
  public void honk() {
    System.out.println("Tuut, tuut!");
  }
}

class Car extends Vehicle {
  private String modelName = "Mustang";
  public static void main(String[] args) {
    Car myFastCar = new Car();
    myFastCar.honk();
    System.out.println(myFastCar.brand + " " + myFastCar.modelName);
  }
}
```

### 👉 输出：
```
Tuut, tuut!
Ford Mustang
```

但是，原型继承模式意味着复制对象（📝📝）并更改其属性。这是JavaScript原型的示例

### 👉 JavaScript 继承：
```javascript
function Sandwich(bread, ham, butter, cheese, tomato, cucumber) {
    this.bread = bread;
    this.ham = ham;
    this.butter = butter;
    this.cheese = cheese;
    this.tomato = tomato;
    this.cucumber = cucumber;
}

Sandwich.prototype.log = function () {
    return "Let's add some " + this.bread + " and " + this.cheese;
}

var sandwich = new Sandwich("bread", "ham", "butter", "cheese", "tomato", "cucumber");

sandwich.log();
```

### 👉 输出：
```
Let's add some bread and cheese
```

###### 第一部分：大写O表示法 (😱 🔥 ⚡)

在本章的最后，您将了解如何在时间（执行时间）和空间（消耗的内存）方面分析算法的实现。（译者：算法复杂度）

##### 大写O表示法入门（😮）

大写O表示法衡量算法的复杂性。用大写O表示，n表示输入数。问题是：“当n接近无穷大时会发生什么？（❓❓）” 大写O表示法告诉您算法的效率。

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--_8PmhzX0--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://i.pinimg.com/originals/b5/83/3e/b5833ef2e137ed62f022a5de4a1d4ea5.gif" alt="常见的O复杂性（实时）">
<div align="center">图1-0，常见的O复杂性（实时图）</div>
</p>

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--_8PmhzX0--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://i.pinimg.com/originals/b5/83/3e/b5833ef2e137ed62f022a5de4a1d4ea5.gif" alt="常见的O复杂性（静态图）">
<div align="center">图1-1，常见的O复杂性（静图）</div>
</p>

图1-0和1-1说明了这些常见的时间复杂性，包括实时的和静态的。

##### 常见范例（🤘）

见图1-1，O(1)不变。因此，O(1)被称为恒定时间。O(n)是线性时间。并且由于O(n)是线性时间，因此下面的O(n)算法的一个示例是打印从0到n-1的数字，如下所示：

### 线性时间：（🕙）
```javascript
// linear time code goes here
function exampleLinear(n) {
    for (var i = 0; i < n; i++) {
        console.log(i);
    }
}
exampleLinear(10)
```

同样，O(n^2)是二次时间，O(n^3)是立方时间。这些复杂性的示例如下所示：

### 次方时间: (🕔)
```javascript
// quadratic time code goes here
function exampleQuadratic(n) {
    for (var i = 0; i < n; i++) {
        console.log(i);
        for (var j = i; j < n; j++) {
            console.log(j);
        }
    }
}
exampleQuadratic(10)
```

### 立方时间: (🕣)
```javascript
// cubic time code goes here
function exampleCubic(n) {
    for (var i = 0; i < n; i++) {
        console.log(i);
        for (var j = i; j < n; j++) {
            console.log(j);
            for (var k = j; k < n; k++) {
                console.log(k);
            }
        }
    }
}
exampleCubic(10)
```

最后，另一个示例性对数时间复杂度是打印元素，它们是2到n之间的2的幂。例如，exampleLogarithmic（100）将打印以下内容：

> 1, 2, 4, 8, 16, 32, 64

```javascript
function exampleLogarithmic(n) {
    for (var i = 1; i < n; i=i*2) {
        console.log(i);
    }
}

exampleLogarithmic(100);
```

##### 大写O表示法规则

<p align="center">
<img src="https://github.com/jimwong666/FEstart/blob/master/translatedArticles/20200906-Learn%20Data%20Structure%20%26%20Algorithm%20in%20JavaScript%20-%20Part%2001/images/Rules%20of%20Big-O%20Notation.PNG" alt="大写O表示法规则">
<div align="center">不好翻译</div>
</p>

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--jAR-Ss6E--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/wfz65fnnokqvrwgpga4z.gif" alt="算法">
<div align="center">算法</div>
</p>

> 注意：暂时不要尝试了解它们。请特别注意前三个规则和多项式规则，因为它们是最常用的。我将在以下各节中讨论每个规则。

##### 系数规则：“摆脱常数”（💯）

该规则仅要求您忽略任何非输入大小的常量。大输入量时，Big-O中的系数（或常数）可以忽略不计。因此，这是Big-O表示法的最重要规则。

> 如果 f（n）为 O（g（n）），则kf（n）为O（g（n）），对于任何常数 k> 0。

这意味着 kf（n）和 f（n）具有相同的 O（g（n））的大写O表示法他们是不变的。这是 f（n）的代码块的示例：

```javascript
 function a(n){
    var count =0;
      for (var i=0;i<n;i++){
        count+=1;
      }
   return count;
 }
```

 此代码块具有f（n）= n。这是因为它增加了n次计数。因此，此函数为 O（n）。这是 kf（n）的另一个示例代码块：

 ```javascript
  function a(n){
   var count =0;
     for (var i=0;i<5*n;i++){
       count+=1;
     }
    return count;
 }
```

 该块具有 kf（n）= 5n。毕竟，根据上述系数规则，前两个示例都具有 O（n）或 O（g（n））的大写O表示法。下面的另一个代码块演示了另一个函数，该函数具有线性时间复杂度，但具有一个额外的操作，即count + = 1：

```javascript
 function a(n){
     var count =0;
     for (var i=0;i<n;i++){
      count+=1;
     }
     count+=1;
     return count;
  }
```

该代码块具有 f（n）= n + 1（在线性时间内，它也可以是n-1）。上一个操作有 +1个（计数+ = 1）。这仍然具有 O（n）的Big-O表示法。这是因为一个操作不像我们前面所说的那样依赖于输入n。

##### 求和规则：“添加大数据”（➕）

求和规则很容易理解；可以增加时间复杂度。想象一个主（涉及函数 a（n））算法，其中涉及另外两个算法（即for循环）。该主算法的O符号只是其他两种O符号的总和。

> 如果 f（n）为 O（h（n））且 g（n）为 O（p（n）），则 f（n）+ g（n）为O（h（n）+p（n））
注意：重要的是要记住在应用此规则之后再应用系数规则。

以下代码块演示了一个具有两个主循环的函数，其时间复杂度（二次时间）必须被视为独立的：

```javascript
 function a(n){
    var count =0;
    for (var i=0;i<n;i++){
     count+=1;
    }
    for (var i=0;i<5*n;i++){
     count+=1;
    }
    return count;
 }
 ```

 在此示例中， f（n）= 1n（或1n）， g（n）= 5n。由于 f（n）+ g（n）= 6n（或 h（n）+ p（n））。这意味着 O（h（n）+ p（n））为 6n或 O（h（n）+ p（n））= 6n。但是，当应用系数规则时，最终结果为 O（n）= n。这是因为两个循环或运算都遵循该系数规则 f（n）为 O（g（n）），然后 kf（n）是 O（g（n））

##### 产品规则：“乘以大数运算法则”（❌）

乘积规则只是简单说明了O的乘积。

> 如果 f（n）为 O（h（n））且 g（n）为 O（p（n）），则 f（n）g（n）为 O（h（n）p（n））

以下代码块演示了一个具有两个嵌套的for循环的函数（请记住，这是乘积规则内的二次时间）：

```javascript
 function (n){
   var count =0;
   for (var i=0;i<n;i++){
     count+=1;
     for (var i=0;i<5*n;i++){
       count+=1;
     }
   }
   return count;
 }
 ```

 在此示例中， f（n）= 5nxn是因为第二个循环具有 5nxn，其运行了 5n次。因此，这总计为 5n2操作。应用系数规则，结果是 O（n）= n2。

 ##### 多项式规则：“ k的幂的大O”（📈）

 多项式规则指出，多项式时间复杂度具有相同多项式的Big-O表示法（请看基础多项式主题）

 > 如果 f（n）是次数为{k} k的多项式，则 f（n）为 O（nķ）

 以下代码块只有一个for循环，具有二次时间复杂度（二次时间，因为n * n等于2个循环）：

 ```javascript
   function a(n){
    var count =0;
    for (var i=0;i<n*n;i++){
     count+=1;
    }
   return count;
 }
```

在此示例中，f（n）= n2因为第一个循环运行n * n次迭代，这等效于 n2根据多项式规则 f（n）是阶数{k} k的多项式，则 f（n）为 O（nķ）。

##### 摘要（📚）

大写O表示法对于分析和比较算法效率很重要。大写O表示法的分析从查看代码开始，然后应用规则，应用规则是因为简化大写O表示法表示法线性或二次规则还不够。以下是最常用的规则：

- 消除常数
- 加上大O符号
- 大O表示法相乘
- 确定大O表示法的多项式