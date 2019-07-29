```js
  // [jsdrops.com/arrow-functions](https://jsdrops.com/arrow-functions?source=post_page--------------------------- "示例")
  this.whoIsThis = 'TOP'; // 注意此作用域
  // 1) 定义
  const fancyObj {
    whoIsThis: 'FANCY', // 注意此对象
    regularF: function () {
      console.log('regularF', this.whoIsThis);
    },
    arrowF: () => {
      console.log('arrowF', this.whoIsThis);
    },
  };
  // 2) 调用
  console.log('TOP-LEVEL', this.whoIsThis); // It's "TOP" here
  fancyObj.regularF(); // Output #1 (Fancy)
  fancyObj.arrowF();   // Output #2 (Top)
  fancyObj.regularF.call({whoIsThis: 'FAKE'}); // Output #3 (Fake)
  fancyObj.arrowF.call({whoIsThis: 'FAKE'});   // Output #4 (Top)
```

这个例子很奇怪，箭头函数的 this 是怎么“一层一层寻找主人的”？