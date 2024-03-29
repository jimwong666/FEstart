# 深入理解redux之applyMiddleware

## 一个普通的redux中间件写法:

用了ES6箭头函数和对象解构写法：
```js
export default function callTraceMiddleware ({dispatch,getState}){
    return next=> action =>{
        console.trace();
        return next(action);
    }
}
```
等价于ES5的写法：
```js
exports.default = callTraceMiddleware;
function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;

    return function (next) {
        return function (action) {
            console.trace();
            return next(action);
        };
    };
}
```

## applyMiddleware使用redux中间件来加强createStore函数：

```js
createStore(
	reducer,
	initialState,
	applyMiddleware(
		thunkMiddleware,//常用的异步使用action中间件
		callTraceMiddleware//使用自定义的打印调用栈中间件
	)
)
```

## applyMiddleware实现原理：

以下是applyMiddleware.js的源码:
```js
import compose from './compose'
export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState, enhancer) => {
    var store = createStore(reducer, preloadedState, enhancer)
    var dispatch = store.dispatch
    var chain = []

    var middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    }
    chain = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}
```

1. applyMiddleware返回了一个匿名闭包函数，在该闭包内使用createStore(reducer, preloadedState, enhancer)创建了store。这样在无数个中间件形成的嵌套函数中共享一个store对象。
2. middlewares数组（我们这里为[thunkMiddleware,callTraceMiddleware]）遍历生成新的中间件函数对象数组，每个中间件函数传入middlewareAPI。根据文章开篇的中间件代码可知此时的chain数组里的每个函数对象其实就是入参为next的匿名函数。
3. compose方法将chain数组和原生的store.dispatch结合，生成了一个通过一条条都是中间件的流水线加工好的新dispatch方法。
4. 至此return给我们的是闭包共享的store对象和dispatch方法。

## compose：
> 我们看到在使用middlewares加工store.dispatch时用到了compose函数，以下是compose的源码设计:
```js
export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  const last = funcs[funcs.length - 1]
  const rest = funcs.slice(0, -1)
  return (...args) => rest.reduceRight((composed, f) => f(composed), last(...args))
}
```

可以看到compose里关键的地方就是调用了Array.prototype.reduceRight方法。该方法功能就是从右向左执行的reduce函数，详细自行google。
```js
/**
 * 1. initalValue： lastMiddleware(store.dispatch)
 * 2. previousValue: composed
 * 3. currentValue: currentMiddleware
 * 4. return value: currentMiddleware(composed) => newComposed
 */
rest.reduceRight((composed, f) => f(composed), last(...args))
```

## 执行过程分析：
当前传入中间件为[thunkMiddleware,callTraceMiddleware]

1. chain = middlewares.map(middleware => middleware(middlewareAPI)) 上文提到，经过map转换后每一个middleware就变成了:
	```js
	function (next) {
	  return function (action) 
	}
	```
2. compose(…chain)(store.dispatch)：
	1. **初始阶段**
		- **initValue**：
  			```js
			composed = callTraceMiddleware(store.dispatch) = function (action) {
				console.trace();
				return next(action);
			}
			```
		- **next**：store.dispatch(原生dispatch方法)+
  
	2. **执行一次**
    	- **currentValue**：thunkMiddleware
    	- **initValue**：
  			```js
			thunkMiddleware(composed) = thunkMiddleware(callTraceMiddleware(store.dispatch))
			```
		- **next**：
  			```js
			composed = initValue = callTraceMiddleware(store.dispatch)
			```
所以最后compose执行就是:
```js
dispatch = thunkMiddleware(callTraceMiddleware(store.dispatch))
```
<hr/>

**等价于下面**：

- 先执行 **thunkMiddleware** 里的逻辑代码，此时next指代 **callTraceMiddleware(store.dispatch)**
- 执行**callTraceMiddleware**，此时**next**指代为**store.dispatch,next(action)**等于执行**store.dispatch(action)**
- store.dispatch 会执行 reducer 生成最新的 store 数据
- 所有next执行完之后return回溯
- 执行callTraceMiddleware中next后的代码（如果没写成return next(action)的话）
- 执行thunkMiddleware中next后的代码

所以中体流程就是：
**thunkMiddleware**->**callTraceMiddleware**->**dispatch**->**callTraceMiddleware**->**thunkMiddleware**

因此整个过程就跟洋葱圈一样从外到里，再从里回溯到外~