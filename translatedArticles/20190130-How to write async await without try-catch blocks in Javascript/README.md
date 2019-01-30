原文链接：[How to write async await without try-catch blocks in Javascript](https://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/ "https://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/")

# JavaScript中无需 try-catch代码实现异步await的写法

ES7 的新特性 Async/await 允许我们这些开发者像写同步代码一样写异步代码。现在，我们可以在JS中使用Promises对象，他可以简化异步流，避免回调地域。

回调地域一词描述的是下面这种状况：

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

这样的代码不仅难以维护，还让控制流变得异常艰难。想想一下有这样一个 if 语句：如果需要在 callbackA 的返回值为 'foo' 的时候执行其它异步方法…

## 让 Promise 来拯救

随着  ES6 及 Promise 的发布，我们像这样可以简化前面那段悲剧的代码：

```javascript

function asyncTask(cb) {

   asyncFuncA.then(AsyncFuncB)
      .then(AsyncFuncC)
      .then(AsyncFuncD)
      .then(data => cb(null, data)
      .catch(err => cb(err));
}

```

你不觉得这段代码要好看些吗？

不过真实的开发中异步流可能会更复杂一些，比如服务端的模型（nodejs）中，你想在数据库中保存一个实体，然后基于保存的值查找其它实体，如果值存在则进行另外的异步任务，在所有任务完成之后需要向用户返回第1步创建的对象。如果任意步骤发生错误，需要准确地向用户发出错误通知。

用上了promises以后，理所当然代码比平常callback的方式干净一点。但是，恕在下直言，还是有一点乱。

## ES7 Async/await

注意，为了享受async/await语法，你需要一个编译器。由于需要polyfill，所以你可以使用babel或者typescript。

这是我发现async/await语法真正有用的地方：你可以把代码写成下面这样。

```javascript

async function asyncTask(cb) {
    const user = await UserModel.findById(1);
    if(!user) return cb('No user found');

    const savedTask = await TaskModel({userId: user.id, name: 'Demo Task'});
    
    if(user.notificationsEnabled) {
         await NotificationService.sendNotification(user.id, 'Task Created');  
    }

    if(savedTask.assignedUser.id !== user.id) {
        await NotificationService.sendNotification(savedTask.assignedUser.id, 'Task was created for you');
    }

    cb(null, savedTask);
}

```

上面的代码看起来真简洁，不过，怎么进行错误处理？

在执行 Promise 期间的异步调用有可能发生错误（数据库连接错误、数据模型错误等）。

由于异步函数在等待 Promise，所以当 Promise 遇到错误的时候会抛出异常，并由 Promise 的 catch 方法捕获。

在 async/await 方式中一般使用 try/catch 块来捕捉这类错误。

我不懂强类型语言，所以我觉得 try/catch 给我添加了额外的代码，看起来不那么舒服。我相信这与个人喜好有关，但在我看来就是这样。

所以前面的代码会改成像这样：

```javascript

async function asyncTask(cb) {
    try {
       const user = await UserModel.findById(1);
       if(!user) return cb('No user found');
    } catch(e) {
        return cb('Unexpected error occurred');
    }

    try {
       const savedTask = await TaskModel({userId: user.id, name: 'Demo Task'});
    } catch(e) {
        return cb('Error occurred while saving task');
    }

    if(user.notificationsEnabled) {
        try {
            await NotificationService.sendNotification(user.id, 'Task Created');  
        } catch(e) {
            return cb('Error while sending notification');
        }
    }

    if(savedTask.assignedUser.id !== user.id) {
        try {
            await NotificationService.sendNotification(savedTask.assignedUser.id, 'Task was created for you');
        } catch(e) {
            return cb('Error while sending notification');
        }
    }

    cb(null, savedTask);
}

```

## 另辟蹊径

最近我在用go语言 ，我非常喜欢他们的解决方式，就像下面这样：

```javascript

data, err := db.Query("SELECT ...")
if err != nil { return err }

```

这种方式比try-catch块清楚，代码也少，所以容易读，也好维护。

问题在于 await ，如果不用try-catch，它会不声不响退出函数。如果没有catch语句，就无法控制它。

我和我的好友Tomer Barnea试着去寻找简洁的解决办法，最后找到的方法如下：

还记得await就是等待promise的状态变成 resolve 吗(wj说：状态从pengding 变成resolve~)？

利用这一点我们可以写一个小小的工具函数来帮助我们处理这些异常。

```javascript
// to.js
export default function to(promise) {
   return promise.then(data => {
      return [null, data];
   })
   .catch(err => [err]);
}
```

（jim：[err,data] = to(promise) 这种形式~！）

这个工具函数接收promise（jim：async/await也行鸭~ 本质上也就是promise~）作为参数，将成功的运行结果作为数组的第二项，而把catch中接收的异常作为数组的第一项。

这样我们的async代码就会变成这样：

```javascript

import to from './to.js';

async function asyncTask() {
     let err, user, savedTask;

     [err, user] = await to(UserModel.findById(1));
     if(!user) throw new CustomerError('No user found');

     [err, savedTask] = await to(TaskModel({userId: user.id, name: 'Demo Task'}));
     if(err) throw new CustomError('Error occurred while saving task');

    if(user.notificationsEnabled) {
       const [err] = await to(NotificationService.sendNotification(user.id, 'Task Created'));  
       if (err) console.error('Just log the error and continue flow');
    }
}

```

上面的例子只是解决方案的一个简单用例，您可以在to.js方法中附加拦截器，该方法将接收原始错误对象，记录或执行任何您需要执行的操作，然后再传回。

我们为此库创建了一个简单的NPM包，您可以使用以下方式安装它：[Github Repo](https://github.com/scopsy/await-to-js "https://github.com/scopsy/await-to-js")

```
npm i await-to-js
```

(jim：配合此篇[文章](https://juejin.im/post/5c49eb28f265da613a545a4b?utm_source=gold_browser_extension "https://juejin.im/post/5c49eb28f265da613a545a4b?utm_source=gold_browser_extension")使用更佳~！)