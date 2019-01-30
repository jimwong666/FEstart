# JavaScript中无需 try-catch代码实现异步await的写法

ES7 的新特性 Async/await 允许我们这些开发者像写同步代码一样写异步代码。现在，我们可以在JS中使用Promises对象，他可以简化异步流，避免回调地域。

```javascript

function AsyncTask() {
   asyncFuncA(function(err, resultA){
      if(err) return cb(err);

      asyncFuncB(function(err, resultB){
         if(err) return cb(err);

          asyncFuncC(function(err, resultC){
               if(err) return cb(err);

               // And so it goes....
          });
      });
   });
}

```
