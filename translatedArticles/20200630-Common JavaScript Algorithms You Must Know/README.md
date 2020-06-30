原文链接：[Common JavaScript Algorithms You Must Know](https://medium.com/javascript-in-plain-english/common-javascript-algorithms-you-must-know-9ca569ddf46f "您必须知道的常见JavaScript算法") <br/>
作者：Ahmed Faisal Amit<br/>
作者创作时间：2020年05月10日

------------------------------------------------------------------------------------------------
# ![翻译](../images/publicFile/icon_teranlation.png) 您必须知道的常见JavaScript算法

<p align="center">
<img src="https://miro.medium.com/max/1200/0*buhwR7J2SCtXOfdr.jpg" alt="您必须知道的常见JavaScript算法">
</p>

今天，我们将学习每个开发人员都应该知道的一些基本算法。算法是面试中的常见话题。因此，您应该专注于这个主题。对算法的深入了解可以很好地完成开发人员的工作。

### 阶乘
这是基本算法之一。但是有时可能会询问您有关查找数字的阶乘的问题。那么什么是阶乘数呢？

> 任何数字的阶乘是该数字乘以阶乘（该数字减去1）。您将该数字乘以每个连续的数字减一。

那么5号的阶乘是什么呢？

```
5！= 5 * 4 * 3 * 2 * 1
```

## 迭代实现
```js
function iterativeFactorial(num) {
    if (num === 0 || num === 1) {
        return 1;
    }

    for (let i = num - 1; i >= 1; i--) {
        num = num * i;
    }

    return num;
}

console.log(iterativeFactorial(5));
//output: 120
```

## 递归实现
```js
function recursiveFactorial(num) {
    if (num === 0 || num === 1) {
        return 1;
    }

    return num * recursiveFactorial(num - 1);
}

console.log(recursiveFactorial(6));
```

### 斐波那契数
在数学中，斐波那契数是以下整数序列（称为斐波那契数列）中的数字，其特征在于前两个数字之后的每个数字都是前两个数字的和：

> 0、1、1、2、3、5、8、13、21、34、55、89、144，....

## 迭代实现
```js
function fib(n) {
    const result = [0, 1];

    for (let i = 2; i <= n; i++) {
        let a = result[i - 1];
        let b = result[i - 2];

        result.push(a + b);
    }

    return result[n];
}

console.log(fib(7));
```

## 递归实现
```js
function fib(n) {
    if (n < 2) {
        return n;
    }

    return fib(n - 1) + fib(n - 2);
}

console.log(fib(6));
```

### 线性搜寻
在计算机科学中，线性搜索或顺序搜索是一种用于在列表中查找目标值的方法。它顺序检查列表中的每个元素的目标值，直到找到匹配项或搜索到所有元素为止。

<p align="center">
<img src="https://miro.medium.com/max/438/0*qFdVYD95mMmC5Nz8" alt="线性搜寻">
</p>

**时间复杂度：** O(n) -由于在最坏的情况下，我们只检查一次每个元素。

## 实现
```js
function linearSearch(arr, item) {
    for (const element of arr) {
        if (element === item) {
            return "Found";
        }
    }

    return "Not Found";
}

console.log(linearSearch([10, 15, 20, 30], 30));
//output: Found
```

## 二分搜索
在计算机科学中，二分搜索（也称为半间隔搜索，对数搜索或二进制印章）是一种搜索算法，用于查找排序数组中目标值的位置。

> 要实现二进制搜索，必须对数组进行排序

<p align="center">
<img src="https://miro.medium.com/max/773/0*_x448VKxS02bAExW.gif" alt="二分搜索">
</p>

**时间复杂度：** O(log(n)) -由于我们在每次下一次迭代时都将搜索区域分为两部分。

## 实现
```js
function binarySearch(arr, item) {
    let startIndex = 0;
    let endIndex = arr.length - 1;

    while (startIndex < endIndex) {
        let middleIndex = Math.floor((startIndex + endIndex) / 2);

        if (arr[middleIndex] === item) {
            return `Found at index ${middleIndex}`;
        }

        if (arr[middleIndex] < item) {
            startIndex = middleIndex + 1;
        } else {
            endIndex = middleIndex - 1;
        }
    }

    return "Not Found";
}

console.log(binarySearch([5, 10, 20, 30, 40], 30));
//output: Found at index 3
```

### 冒泡排序
冒泡排序（有时也称为沉没排序）是一种简单的排序算法，它反复遍历要排序的列表，比较每对相邻项，并以错误的顺序（升序或降序）交换它们。重复通过列表，直到不需要交换为止，这表明列表已排序。

<p align="center">
<img src="https://miro.medium.com/max/300/0*gQdBpSsRXlalDWNI" alt="冒泡排序">
</p>

**时间复杂度：** O(n^2)

## 实现
```js
function bubbleSort(arr) {
    //sort the array
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                const lesser = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = lesser;
            }
        }
    }

    //returning the array
    return arr;
}

console.log(bubbleSort([10, 4, 3, 8]));
//output : [ 3, 4, 8, 10 ]
```

### 选择排序
选择排序是一种排序算法，特别是就地比较排序。

<p align="center">
<img src="https://miro.medium.com/max/946/0*xYeiwrdnA3XIcq_k.gif" alt="选择排序">
</p>

**时间复杂度：** O(n^2)

## 实现
```js
function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;

        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        if (i !== minIndex) {
            const lesser = arr[minIndex];
            arr[minIndex] = arr[i];
            arr[i] = lesser;
        }
    }

    return arr;
}

console.log(selectionSort([10, 4, 3, 8, -10]));
//output : [ 3, 4, 8, 10 ]
```

### 插入排序
插入排序是一种通过将数组分为“已排序”部分和“未排序”部分来对数组进行排序的方法。然后，我们比较未排序的项目，看它是否大于前一个元素，如果不是，则插入新项目。基本上，我们从左到右看，然后进行排序。

<p align="center">
<img src="https://miro.medium.com/max/946/0*3d5oGwqQko_8g5M4.gif" alt="选择排序">
</p>

**时间复杂度：** O(n^2)

## 实现
```js
function insertionSort(arr) {
    const len = arr.length;

    for (let i = 0; i < len; i++) {
        let key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = key;
    }

    return arr;
}

console.log(insertionSort([20, 5, 15, 35, 10]));
//output: [ 5, 10, 15, 20, 35 ]
```

今天就这些了。谢谢阅读。