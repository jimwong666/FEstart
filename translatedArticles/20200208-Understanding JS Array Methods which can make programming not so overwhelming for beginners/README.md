原文链接：[Understanding JS Array Methods which can make programming not so overwhelming for beginners](https://medium.com/quick-code/understanding-js-array-methods-which-can-make-programming-not-so-overwhelming-for-beginners-7afb5b4a0967 "理解js数组的一些方法可以让新手更易编程") <br/>
作者：Bhavishya Negi <br/>
时间：2019.11.24

------------------------------------------------------------------------------------------------

# <img src="https://github.com/jimwong666/FEstart/blob/master/translatedArticles/images/publicFile/icon_teranlation.png" alt="译文">理解js数组的一些方法可以让初学编程更易上手

> 在学习编码的过程中，每个人都经历过十分困苦的编程阶段，甚至想过放弃程序员这个职业。而数组方法是如何工作的，以及所有循环首会先使每个人都发疯……这使我确信。

在这里，我将采用一个对象并应用以下数组方法：

**1. Array.map()**
**2. Array.filter()**
**3. Array.reduce()**
**4. Array.forEach()**

还有其他的数组方法，例如：push,pop,splice,indexOf,reverse,join等等
我将在针对我所采用的对象提出和解决问题时进行解释。
之所以选择以上方法，是因为它们每个都具有回调函数，并且在现实情况中大多数时候都使用它们。

我拿了一个叫做“got”的对象，这是指我们最喜欢的系列电视剧《权力的游戏》，该系列最终在上个赛季被毁了。（:( 难受）该对象包含其中家族的所有名称，节目中的每个角色名称都分成对象数组，然后进一步嵌套到具有数组的对象中。

想获得这个对象，请点击这个链接 [OBJECT](https://drive.google.com/file/d/1HyVnNiB2mdLLc8kDcKZdXLv0uhLM7W9e/view "权力的游戏-族谱")

<p align="center">
<img src="https://miro.medium.com/max/991/1*vi6xUz3y6OS8L6I5x3yBfw.png" alt="浏览器控制台中got对象的实例">
</p>

那么，让我们开始愉快的玩耍数组的方法吧。

我将编写一个名为countAllPeople()的函数，该函数将对获取的对象中的总人数进行计数。

```js
   countAllPeople = () => {
      let houseArrayLength = got.houses.map((e) => {
        return e.people.length
      })
      let peopleLength = houseArrayLength.reduce((a, b) => {
        return a + b
      })
      return peopleLength
    }
```

因此，在countAllPeople（）中，我们首先选择比houses数组高的对象，然后在其上进行map（），该对象将返回一个数组，该数组组成houses数组中每个对象内每个people数组的长度。
map（）始终返回一个数组，该数组等于应用该数组的原始数组的数组大小。它接受3个参数的当前值，数组索引和数组本身。
应用map（）之后，它会返回一个数组，其中每个人数组的长度。

```js
	let houseArrayLength = got.houses.map((e) => {
		return e.people.length
	})
	return houseArrayLength
```

<p align="center">
<img src="https://miro.medium.com/max/488/1*d4y1RmF15TCbClOQFesVWQ.png" alt="上述map方法的返回值">
</p>

在此之后，我使用了reduce（）方法来累计数组的总长度。
reduce（）最多可以使用4个参数累加器，当前值，数组索引和数组本身。
累加器可以根据要求进行初始设置，否则它将数组中的第一个元素作为其值。

它可以返回任何dataType，可以是数字，数组，对象或字符串。最好的使用方法是查看输出，例如，如果所需的输出是一个对象，我们将一个空对象作为累加器的初始值。

```js
	let peopleLength = houseArrayLength.reduce((acc, cv) => {
		return acc + cv
	})
	return peopleLength
```

在这里，acc是累加器，它被初始化为数组中的第一个元素，并返回为33的peopleLength。

<p align="center">
<img src="https://miro.medium.com/max/597/1*TXYFrTtqlrmTI7BIQzqbOg.png" alt="countAllPeople函数">
</p>

看了map（）和reduce（）之后，我们看一下forEach（）和filter（）。
Array.forEach（）与for循环类似，但是整个过程是自动化的，并且每次调用都返回undefined。Array.forEach（）对应用数组的每个元素执行一个操作。
相比之下，filter（）返回的数组大小等于或小于原始数组，它需要一个在每次调用filter（）时都会调用的回调函数，但它返回带有满足特定条件的元素的数组。

让我们通过对我们的对象的示例来了解这两个函数。现在，我们将编写一个名为nameWithS（）的函数，该函数将返回包含字母“ S”或“ s”的所有名称。
我们再次从获取对象开始，并像针对countAllPeople（）那样将houses数组作为目标，在这里我们应用Array.reduce（）方法，这次我们将accumulator的值初始化为一个空数组。
cv是一个包含关键人物的对象，该人物是一个数组，因此我们在数组人物上应用forEach（）方法，并将人物数组中的名称推送到累加器。

```js
 	function nameWithS() {
        return got.houses.reduce((acc,cv)=>{
          cv.people.forEach((n) => acc.push(n.name))
          return acc.filter((name) => name.toLowerCase().includes('s'))
        },[])
      }
```

现在，acc是一个包含所有名称的数组。我们在acc上应用filter（）方法，并且name是针对acc中每个名称的元素，现在我们将所有名称都转换为小写并检查是否包含字母s。现在filter（）过滤掉满足条件的名称元素，并返回包含每个包含字母“s”的元素的数组。

<p align="center">
<img src="https://miro.medium.com/max/1121/1*riC4kC6LZOlRGgOY2X0pFw.png" alt="包含“s”的所有项">
</p>

现在我们已经介绍了4种方法，这太酷了。我希望您能遵循所有这些方式，即使不只是重新审视并练习。这是您打基础的方法，最终您可以掌握这些方法。

**让我们看一些更重要的数组方法，**我将列出所有这些，然后逐个举例，并对它们进行解释，最后，我将留下一张图像，列出一个方法是否改变了数组。
你们将非常方便地检查是否使用哪种方法。

**1. push()**
Array.push（）将元素添加到数组的最后一个索引。

**2. pop()**
Array.pop（）删除数组的最后一个索引元素。

**3. shift()**
Array.shift（）从数组的开头删除一个项目。

**4. unshift()**
Array.unshift（）在数组的开头添加一个项目。

**5. splice()**
Array.splice（）对数组进行突变，它可以替换元素，添加新元素并删除它们。它最多需要3个参数，用于splice的语法。

**6. slice**
Array.slice（）返回一个新数组，该数组将索引开始到结束（不包括结束）的所有项目复制到该数组。开始和结束都可以为负。

**7. reverse**
arr.reverse（）方法可以反转arr中元素的顺序。

**8. concat()**
方法arr.concat（）创建一个新数组，其中包含其他数组和其他项目中的值。
```js
	let arr = [1, 2];

	alert( arr.concat([3, 4]) ); // 1,2,3,4

	alert( arr.concat([3, 4], [5, 6]) ); // 1,2,3,4,5,6

	alert( arr.concat([3, 4], 5, 6) ); // 1,2,3,4,5,
```

**9. some()/every()**
如果传递的条件满足arr中的至少一个元素，则arr.some（）将返回true。
```js
	const array = [1, 2, 3, 4, 5];
	const even = (element) => element % 2 === 0;
	console.log(array.some(even));
	//output: true
```

如果所有元素都满足条件，则arr.every（）将返回true。
```js
	const isBelowThreshold = (currentValue) => currentValue < 40;
	const array1 = [1, 30, 39, 29, 10, 13];
	console.log(array1.every(isBelowThreshold));
	//output: true
```

**10. find()/findIndex()**
find（）方法返回提供的数组中满足回调函数条件的第一个元素的值。
```js
	const array1 = [5, 12, 8, 130, 44];
	const found = array1.find(element => element > 10);
	console.log(found);
	//output: 12
```

而如果只需要返回元素的索引，则可以使用findIndex（）方法。f
indIndex（）方法返回满足所提供条件的数组中第一个元素的索引。
否则，它返回-1，表示没有元素通过给定条件。
我做了一张表格，列出了我上面提到的改变原数组和不改变原数组的方法。

<p align="center">
<img src="https://miro.medium.com/max/837/1*hav8uvwoznX0JITWDOCvFw.png" alt="破坏性方法表格">
</p>

还要注意的另一件好事是，这些方法中的许多方法都可以链接在一起，从而消除了对额外变量的需求，并使您的代码更整洁，更易于阅读和遵循。

通过组合方法，可以避免混乱，并且每个开发人员都渴望使自己的代码尽可能小，这是最好的事情，这些方法可以帮助您实现目标，并成为您的理想之选。

就是这样，谢谢大家！！！