# 排序算法
> **非线性时间比较类排序：**通过比较来决定元素间的相对次序，由于其时间复杂度不能突破O(nlogn)，因此称为非线性时间比较类排序。

> **线性时间非比较类排序：**不通过比较来决定元素间的相对次序，它可以突破基于比较排序的时间下界，以线性时间运行，因此称为线性时间非比较类排序。 

<p align="center">
    <img src="https://github.com/jimwong666/FEstart/blob/master/FEknowledge/algorithm/sortAlgorithm/imgs/sort-classification.png" alt="排序算法分类">
    <div align="center">排序算法分类</div>
</p>

<p align="center">
    <img src="https://github.com/jimwong666/FEstart/blob/master/FEknowledge/algorithm/sortAlgorithm/imgs/sort-algorithm-complexcity.png" alt="排序算法复杂度">
    <div align="center">排序算法复杂度</div>
</p>

### 冒泡排序（Bubble Sort）
> 每轮依次比较两个元素，每轮确定一个（最大值/最小值）元素，到开头/结尾

<p align="center">
    <img src="https://github.com/jimwong666/FEstart/blob/master/FEknowledge/algorithm/sortAlgorithm/imgs/bubbleSort.gif" alt="冒泡排序">
    <div align="center">冒泡排序演示</div>
</p>

```javascript
function bubbuleSort(arr){
    var len = arr.length;

    for(var i = 0; i < len - 1; i++){
        for(var j = 0; j < len - 1 - i; j++){
            if(arr[j] > arr[j+1]){
                var temp = arr[j]; // 交换两个值
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
    return arr;
}
```

### 选择排序（Selection Sort）
> 一直找最小值（或者最大值），到开头/结尾

<p align="center">
    <img src="https://github.com/jimwong666/FEstart/blob/master/FEknowledge/algorithm/sortAlgorithm/imgs/selectyionSort.gif" alt="选择排序">
    <div align="center">选择排序演示</div>
</p>

```javascript
function selectionSort(arr){
    var len = arr.length;
    var minValsIndex, temp;
    for(var i = 0; i < len; i++){
        minValsIndex = i;
        for(var j = i + 1; j < len; j++){
            if(arr[j] < arr[minValsIndex]){
                minValsIndex = j;
            }
        }
        temp = arr[i];
        arr[i] = arr[minValsIndex];
        arr[minValsIndex] = temp;
    }
    return arr;
}
```

### 插入排序（Insertion Sort）
> 遍历整个数组并逐个插入已有有序数组（初始有序组数即为第一个元素）

<p align="center">
    <img src="https://github.com/jimwong666/FEstart/blob/master/FEknowledge/algorithm/sortAlgorithm/imgs/insertionSort.gif" alt="插入排序">
    <div align="center">插入排序演示</div>
</p>

```javascript
function insertionSort(arr){
    var len = arr.length;
    var preIndex, current;
    for(var i = 1; i < len; i++){
        preIndex = i - 1;
        current = arr[i];
        while(preIndex >= 0 && arr[preIndex] > current){
            arr[preIndex + 1] = arr[preIndex];
            preIndex--; 
        }
        arr[preIndex + 1] = current;
    }
    return arr;
}
```

### 希尔排序（Shell Sort）
> 带有间隔的插入排序

<p align="center">
    <img src="https://github.com/jimwong666/FEstart/blob/master/FEknowledge/algorithm/sortAlgorithm/imgs/shellSort.gif" alt="希尔排序">
    <div align="center">希尔排序演示</div>
</p>

```javascript
function shellSort(arr) {
    var len = arr.length,
        temp,
        gap = 1;
    while (gap < len / 3) { // 动态定义间隔序列
        gap = gap * 3 + 1;
    }
    for (gap; gap > 0; gap = Math.floor(gap / 3)) {
        for (var i = gap; i < len; i++) {
            temp = arr[i];
            for (var j = i-gap; j > 0 && arr[j]> temp; j-=gap) {
                arr[j + gap] = arr[j];
            }
            arr[j + gap] = temp;
        }
    }
    return arr;
}
```

> 希尔排序的核心在于间隔序列的设定。既可以提前设定好间隔序列，也可以动态的定义间隔序列。

### 归并排序（Merge Sort）
> 归并排序是建立在归并操作上的一种有效的排序算法。该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。将已有序的子序列合并，得到完全有序的序列；即先使每个子序列有序，再使子序列段间有序。若将两个有序表合并成一个有序表，即称为二路归并。 

<p align="center">
    <img src="https://github.com/jimwong666/FEstart/blob/master/FEknowledge/algorithm/sortAlgorithm/imgs/mergeSort.gif" alt="并归排序">
    <div align="center">并归排序演示</div>
</p>

```javascript
function mergeSort(arr) { // 采用自上而下的递归方法
    var len = arr.length;
    if (len < 2) {
        return arr;
    }
    var middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}
function merge(left, right) {
    var result = [];
    while (left.length>0 && right.length>0) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        }else {
            result.push(right.shift());
        }
    }
    while (left.length)
        result.push(left.shift());
    while (right.length)
        result.push(right.shift());
    return result;
}
```
> 归并排序是一种稳定的排序方法。和选择排序一样，归并排序的性能不受输入数据的影响，但表现比选择排序好的多，因为始终都是O(nlogn）的时间复杂度。代价是需要额外的内存空间。

### 快速排序（Quick Sort）

