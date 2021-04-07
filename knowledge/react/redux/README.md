# 实现一个Redux

> 首先要知道的是，Redux 和 React 没有关系，Redux 可以用在任何框架中。
> Redux 是一个JavaScript 状态管理器，是一种新型的前端“架构模式”。
> 还有通常与redux一起用的一个库——react-redux， 它就是把 Redux 这种架构模式和 React.js 结合起来的一个库，就是 Redux 架构在 React.js 中的体现。

## 设计思想
- Web 应用是一个状态机，视图与状态是一一对应的
- 所有的状态，保存在一个对象里面

## 何时使用Redux
- 用户的使用方式复杂
- 不同身份的用户有不同的使用方式（比如普通用户和管理员）
- 多个用户之间可以协作
- 与服务器大量交互，或者使用了WebSocket
- View要从多个来源获取数据

从组件的角度看：
- 某个组件的状态，需要共享
- 某个状态需要在任何地方都可以拿到
- 一个组件需要改变全局状态
- 一个组件需要改变另一个组件的状态

## Redux工作流程
<p align="center">
<img src="https://image-static.segmentfault.com/328/342/3283422853-0679d9daa5ea0f34" alt="实现一个Redux">
</p>

- Redux 将整个应用状态(state)存储到一个地方(通常我们称其为 store)
- 当我们需要修改状态时，必须派发(dispatch)一个 action（action 是一个带有 type 字段的对象）
- 专门的状态处理函数 reducer 接收旧的 state 和 action ，并会返回一个新的 state
- 通过 subscribe 设置订阅，每次派发动作时，通知所有的订阅者

从这个流程中可以看出，Redux 的核心就是一个**观察者模式**。一旦 store 发生了变化就会通知所有的订阅者，视图（在这里是react组件）接收到通知之后会进行重新渲染。

## 案例
先看一个真实的案例：
```js
import { createStore } from 'redux'
const defaultState = {
    value: 10
}
// reducer处理函数
function reducer (state = defaultState, action) {
    console.log(state, action)
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                value: state.value + 1
            }
        case 'DECREMENT':
            return {
                ...state,
                value: state.value - 1
            }
        default:
            return state
    }
}
const store = createStore(reducer)

const init = store.getState()
console.log(`一开始数字为：${init.value}`)

function listener () {
    const current = store.getState()
    console.log(`当前数字为：${current.value}`)
}
store.subscribe(listener) // 监听state的改变

store.dispatch({ type: 'INCREMENT' })
// 当前数字为：11
store.dispatch({ type: 'INCREMENT' })
// 当前数字为：12
store.dispatch({ type: 'DECREMENT' })
// 当前数字为：11

export default store
```

输出结果：
```
{value: 10} {type: "@@redux/INIT1.a.7.g.7.t"}
一开始数字为：10
{value: 10} {type: "INCREMENT"}
当前数字为：11
{value: 11} {type: "INCREMENT"}
当前数字为：12
{value: 12} {type: "DECREMENT"}
当前数字为：11
```

所有对数据的操作必须通过 dispatch 函数，它接受一个参数action，action是一个普通的JavaScript对象，action必须包含一个type字段，告诉它要修改什么，只有它允许才能修改。

在每次调用进来reducer函数我们都打印了state和action，我们手动通过store.dispatch方法派发了三次action，但你会发现输出了四次.这是因为Redux内部初始化就自动执行了一次dispatch方法，可以看到第一次执行它的type对我们数据来说是没有影响的（因为type取值@@redux/INIT1.a.7.g.7.t，我们自己redux的数据type不会取名成这个样子，所以不会跟它重复），即默认输出state值

## 开始动手实现（😤🔥👊）

1. 首先要手动实现一个Redux之前，先看看代码涉及到Redux什么方法，首先引入了：
```js
import { createStore } from 'redux'
// 传入reducer
const store = createStore(reducer) 
```

createStore 会返回一个对象，这个对象包含三个方法，于是我们可以列出Redux雏形：
```js
export function createStore (reducer) {

    const getState = () => {}
    const subscribe = () => {}
    const dispatch = () => {}
    
    return { 
        getState, 
        subscribe, 
        dispatch 
    }
}
```
- store.getState()用于获取 state 数据，其实就是简单地把 state 参数返回。于是：
```js
export function createStore (reducer) {
    let currentState = {}
    const getState = () => currentState
    
    return { 
        getState
    }
}
```

- dispatch方法会接收一个action，执行会调用 reducer 返回一个新状态：
```js
export function createStore (reducer) {
    let currentState = {}
    const getState = () => currentState
    const dispatch = (action) => {
        currentState = reducer(currentState, action) // 覆盖原来的state
    }
    return { 
        getState,
        dispatch
    }
}
```

- 通过 subscribe 设置监听函数（设置订阅），一旦 state 发生变化，就自动执行这个函数（通知所有的订阅者）

怎么实现呢？我们可以直接使用subscribe函数把你要监听的事件添加到数组, 然后执行dispatch方法的时候把listeners数组的监听函数给执行一遍：
```js
export function createStore (reducer) {
    let currentState = {}
    let currentListeners = [] // 监听函数，可添加多个
    
    const getState = () => currentState
    const subscribe = (listener) => {
        currentListeners.push(listener)
    }
    const dispatch = (action) => {
        currentState = reducer(currentState, action) // 覆盖原来的state
        currentListeners.forEach(listener => listener())
    }
    return {
        getState,
        subscribe,
        dispatch
    }
}
```

最上面的例子中，其实就是把store.getState()添加进来，dispatch派发一个action后，reducer执行返回新的state，并执行了监听函数store.getState()，state的值就发生变化了。

```js
function listener () {
    const current = store.getState()
    console.log(`当前数字为：${current.value}`)
}
store.subscribe(listener) // 监听state的改变
```
上述代码，跟React依然没有关系，只是纯属Redux例子。但想一想当我们把Redux和React一起用的时候，还会多做这么一步：

```js
constructor(props) {
    super(props)
    this.state = store.getState()
    this.storeChange = this.storeChange.bind(this)
    store.subscribe(this.storeChange)
}

storeChange () {
    this.setState(store.getState())
}
```
在React里面监听的方法，还要用this.setState(), 这是因为React中state的改变必须依赖于this.setState方法。所以对于 React 项目，就是组件的render方法或setState方法放入listen（监听函数），才会实现视图的自动渲染，改变页面中的state值。

最后一步，注意我们最上面说的，当初始化的时候，dispatch会先自动执行一次，继续改代码：

```js
export function createStore (reducer) {
    let currentState = {}
    let currentListeners = [] // 监听器，可监听多个事件
    
    const getState = () => currentState

    const subscribe = (listener) => {
        currentListeners.push(listener)
    }

    const dispatch = (action) => {
        currentState = reducer(currentState, action) // 覆盖原来的state
        currentListeners.forEach(listener => listener())
    }
    // 尽量写得复杂，使不会与我们自定义的action有重复可能
    dispatch({ type: '@@mini-redux/~GSDG4%FDG#*&' })
    return { 
        getState, 
        subscribe, 
        dispatch 
    }
}
```

写到这里，我们把最上面的例子中引入的redux替换我们写的文件：

```js
import { createStore } from './mini-redux'
```

当我们执行的时候，发现结果并不如我们所愿：
```
{} {type: "@@mini-redux/~GSDG4%FDG#*&"}
一开始数字为：undefined
{} {type: "INCREMENT"}
当前数字为：NaN
{type: "INCREMENT"}
当前数字为：NaN
{value: NaN} {type: "DECREMENT"}
当前数字为：NaN
```

这个怎么回事呢？因为我们写的redux一开始就给state赋值为{}，在事实state初始值是由外部传入的，通常我们自己写的时候会设置默认值：

```js
export function createStore (reducer) {
    let currentState 
    let currentListeners = [] // 监听器，可监听多个事件
    
    const getState = () => currentState

    const subscribe = (listener) => {
        currentListeners.push(listener)
    }

    const dispatch = (action) => {
        currentState = reducer(currentState, action) // 覆盖原来的state
        currentListeners.forEach(listener => listener())
    }
    dispatch({ type: '@@mini-redux/~GSDG4%FDG#*&' })
    return { 
        getState, 
        subscribe, 
        dispatch 
    }
}
```
这时，我们就可以实现跟原来的redux完全一样的输出效果了

# 完善Redux
接下来我们继续补充知识点：

- createStore实际有三个参数，即：
	```js
	createStore(reducer, [preloadedState], enhancer)
	```
	1. reducer
	2. 第二个参数 [preloadedState] (any)是可选的: initial state
	3. 第三个参数enhancer(function)也是可选的：用于添加中间件的

通常情况下，通过 preloadedState 指定的 state 优先级要高于通过 reducer 指定的 state。这种机制的存在允许我们可以通过指明默认参数来指定初始数据，而且还为通过服务端或者其它机制注入数据到 store 中提供了可能。

先继续完善一下代码，我们需要对第二个和第三个可选参数进行判断（第三个参数的详细解析会在后面讲）：

```js
export function createStore (reducer, preloadedState, enhancer) {

    // 当第二个参数没有传preloadedState，而直接传function的话，就会直接把这个function当成enhancer
    if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
        enhancer = preloadedState
        preloadedState = undefined
    }
    // 当第三个参数传了但不是function也会报错
    if (typeof enhancer !== 'undefined') {
        if (typeof enhancer !== 'function') {
            throw new Error('Expected the enhancer to be a function.')
        }
        return enhancer(createStore)(reducer, preloadedState)
    }
    // reducer必须为函数
    if (typeof reducer !== 'function') {
        throw new Error('Expected the reducer to be a function.')
    }

    let currentState = preloadedState // 第二个参数没传默认就是undefined赋给currentState
    let currentListeners = [] // 监听器，可监听多个事件
    
    // ...
}
```

关于第三个参数判断为什么返回 return enhancer(createStore)(reducer, preloadedState) 我们后面会说，此处先忽略

- 我们实现了store.subscribe()方法，但还是不完整的，subscribe方法可以添加监听函数listener，它还有返回值，返回一个移除listener的函数；另外我们要对类型进行判断：
	```js
	export function createStore (reducer, preloadedState, enhancer) {
		// ...
		let currentListeners = [] // 监听器，可监听多个事件

		const subscribe = (listener) => {
			if (typeof listener !== 'function') {
				throw new Error('Expected listener to be a function.')
			}
			currentListeners.push(listener)
			// 通过filter过滤，执行的时候将之前本身已经添加进数组的事件名移除数组
			return () => {
				currentListeners = currentListeners.filter(l => l !== listener);
			}
		}
		// ...
	}
	```
	
	也可以通过找数组下标的方式移除listener:

	```js
	const subscribe = (listener) => {
		if (typeof listener !== 'function') {
			throw new Error('Expected listener to be a function.')
		}
		currentListeners.push(listener)
		// 通过filter过滤，执行的时候将之前本身已经添加进数组的事件名移除数组
		return () => {
			let index = currentListeners.indexOf(listener)
			currentListeners.splice(index, 1)
		}
	}
	```

	移除listener实际就是取消订阅，使用方式如下：

	```js
	let unsubscribe = store.subscribe(() =>
		console.log(store.getState())
	);

	unsubscribe(); // 取消监听
	```

- diaptch方法执行完返回为action，然后我们同样需要为它作判断：
	```js
	export function createStore (reducer, preloadedState, enhancer) {
		// ...
		let isDispatching = false
		const dispatch = (action) => {
			// 用于判断action是否为一个普通对象
			if (!isPlainObject(action)) {
				throw new Error('Actions must be plain objects. ')
			}
			// 防止多次dispatch请求同时改状态，一定是前面的dispatch结束之后，才dispatch下一个
			if (isDispatching) {
				throw new Error('Reducers may not dispatch actions.')
			}
		
			try {
				isDispatching = true
				currentState = reducer(currentState, action) // 覆盖原来的state
			} finally {
				isDispatching = false
			}
		
			currentListeners.forEach(listener => listener())
			return action
		}
	}

	// 用于判断一个值是否为一个普通的对象(普通对象即直接以字面量形式或调用 new Object() 所创建的对象)
	export function isPlainObject(obj) {
		if (typeof obj !== 'object' || obj === null) return false

		let proto = obj
		while (Object.getPrototypeOf(proto) !== null) {
			proto = Object.getPrototypeOf(proto)
		}

		return Object.getPrototypeOf(obj) === proto
	}

	// ...
	```
	isPlainObject函数中通过 while 不断地判断 Object.getPrototypeOf(proto) !== null 并执行, 最终 proto 会指向 Object.prototype. 这时再判断 Object.getPrototypeOf(obj) === proto, 如果为 true 的话就代表 obj 是通过字面量或调用 new Object() 所创建的对象了。

	保持action对象是简单对象的作用是方便reducer进行处理，不用处理其他的情况（比如function/class实例等）

至此，我们实现了最基本能用的Redux代码，下篇再继续完善Redux代码，最后放出基础版Redux所有代码：

```js
export function createStore (reducer, preloadedState, enhancer) {

    // 当第二个参数没有传preloadedState，而直接传function的话，就会直接把这个function当成enhancer
    if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
        enhancer = preloadedState 
        preloadedState = undefined
    }
    // 当第三个参数传了但不是function也会报错
    if (typeof enhancer !== 'undefined') {
        if (typeof enhancer !== 'function') {
            throw new Error('Expected the enhancer to be a function.')
        }
        return enhancer(createStore)(reducer, preloadedState)
    }
    // reducer必须为函数
    if (typeof reducer !== 'function') {
        throw new Error('Expected the reducer to be a function.')
    }

    let currentState = preloadedState // 第二个参数没传默认就是undefined赋给currentState
    let currentListeners = [] // 监听器，可监听多个事件
    let isDispatching = false
    
    const getState = () => currentState

    const subscribe = (listener) => {
        if (typeof listener !== 'function') {
            throw new Error('Expected listener to be a function.')
        }
        currentListeners.push(listener)
        // 通过filter过滤，执行的时候将之前本身已经添加进数组的事件名移除数组
        return () => {
            currentListeners = currentListeners.filter(l => l !== listener);
        }
    }

    const dispatch = (action) => {
        // 用于判断action是否为一个普通对象
        if (!isPlainObject(action)) {
            throw new Error('Actions must be plain objects. ')
        }
        // 防止多次dispatch请求同时改状态，一定是前面的dispatch结束之后，才dispatch下一个
        if (isDispatching) {
            throw new Error('Reducers may not dispatch actions.')
        }
    
        try {
            isDispatching = true
            currentState = reducer(currentState, action) // 覆盖原来的state
        } finally {
            isDispatching = false
        }

        currentListeners.forEach(listener => listener())
        return action
    }
    dispatch({ type: '@@mini-redux/~GSDG4%FDG#*&' })

    return { 
        getState, 
        subscribe, 
        dispatch 
    }
}

// 用于判断一个值是否为一个普通的对象(普通对象即直接以字面量形式或调用 new Object() 所创建的对象)
export function isPlainObject(obj) {
    if (typeof obj !== 'object' || obj === null) return false

    let proto = obj
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto)
    }

    return Object.getPrototypeOf(obj) === proto
}
```

前面我们已经实现了一个基础版的Redux，下面我们来继续完善Redux。

# 中间件

Redux 有个 API 是 applyMiddleware， 专门用来使用中间件的，首先我们得知道，它用来干嘛的。

## 为什么会需要中间件？

假设我们现在需要记录每次的 dispatch 前后 state 的记录， 那要怎么做呢？于是，简单粗暴的在第一个 dispatch 方法前后加代码：
```js
console.log('prev state', store.getState())
console.log(action)
store.dispatch({ type: 'INCREMENT' })
console.log('next state', store.getState())
```

这部分运行结果：

```
prev state {value: 10}
{type: "INCREMENT"}
当前数字为：11
next state {value: 11}
```

但加完发现情况不对，页面有多个 dispatch 的话，要这样写很多次，会产生大量重复代码。突然，又要加需求了，需要记录每次出错的原因，功能如下：

```js
try{
    store.dispatch(action)   
}catch(err){
    console.error('错误信息: ', err)  
}
```

然后两个需求都要，那就凑合两个，但叠一起看更乱了。

## 中间件的概念

显然，我们不能通过这种方式来做。比较理想的方案是Redux本身提供一个功能入口，让我们可以在外面添加功能进去，这样代码就不会复杂。

但如果给我们现有实现的Redux添加功能，在哪个环节添加比较合适呢？

- **Reducer**：纯函数，只承担计算 State 的功能，不合适承担其他功能，也承担不了，因为理论上，纯函数不能进行读写操作
- **View**：与 State 一一对应，可以看作 State 的视觉层，也不合适承担其他功能
- **Action**：存放数据的对象，即消息的载体，只能被别人操作，自己不能进行任何操作

我们发现，以上需求都是和 dispatch 相关，只有发送 **action** 的这个步骤，即 store.dispatch() 方法，可以添加功能。比如添加日志功能，我们只要把日志放进 dispatch 函数里，不就好了吗，我们只需要改造 dispatch 函数，把 dispatch 进行一层封装。

```js
const store = createStore(counter)
const next = store.dispatch
store.dispatch = (action) => {
    try{
        console.log('prev state', store.getState())
        console.log(action)
        next(action)   
        console.log('next state', store.getState())
    }catch(err){
        console.error('错误信息: ', err)  
    }
}
```

上面代码，对 store.dispatch 进行了重新定义，这就是中间件的雏形。

**所以说Redux的中间件就是一个函数，是对 dispatch 方法的扩展，增强 dispatch 的功能**

## 实现中间件

对于上述 dispatch 的封装，实际上是缺陷很大的。万一又来 n 多个需求怎么办? 那 dispatch 函数就混乱到无法维护了，故需要扩展性强的多中间件合作模式。

1. 我们把 loggerMiddleware 提取出来
	```js
	const store = createStore(counter)
	const next = store.dispatch

	const loggerMiddleware = (action) => {
		console.log('prev state', store.getState())
		console.log(action)
		next(action)
		console.log('next state', store.getState())
	}

	store.dispatch = (action) => {
		try {
			loggerMiddleware(action)
		} catch (err) {
			console.error('错误信息: ', err)
		}
	}
	```
2. 把 exceptionMiddleware 提取出来
	```js
	const exceptionMiddleware = (action) => {
		try {
			loggerMiddleware(action)
		} catch (err) {
			console.error('错误信息: ', err)
		}
	}

	store.dispatch = exceptionMiddleware
	```
3. 现在代码有个问题，就是 exceptionMiddleware 中间件写死 loggerMiddleware，但以后又万一不要记录功能呢，所以我们需要让 next(action) 变成动态的，即换哪个中间件都可以
	```js
	const exceptionMiddleware = (next) => (action) => {
		try {
			// loggerMiddleware(action)
			next(action)
		} catch (err) {
			console.error('错误信息: ', err)
		}
	}
	```
	这个写法可能刚开始看不太适应，实际就是函数里面，返回一个函数，即等效于
	```js
	const exceptionMiddleware = function (next) {
		return function (action) {
			try {
				// loggerMiddleware(action)
				next(action)
			} catch (err) {
				console.error('错误信息: ', err)
			}
		}
	}
	```
	传参数的时候即是exceptionMiddleware(next)(action)
4. 同理，我们让 loggerMiddleware 里面无法扩展别的中间件了！我们也把 next 写成动态的
	```js
	const loggerMiddleware = (next) => (action) => {
		console.log('prev state', store.getState())
		console.log(action)
		next(action)
		console.log('next state', store.getState())
	}
	```

目前为止，整个中间件设计改造如下：
```js
	const store = createStore(counter)
	const next = store.dispatch

	const loggerMiddleware = (next) => (action) => {
		console.log('prev state', store.getState())
		console.log(action)
		next(action)
		console.log('next state', store.getState())
	}

	const exceptionMiddleware = (next) => (action) => {
		try {
			next(action)
		} catch (err) {
			console.error('错误信息: ', err)
		}
	}

	store.dispatch = exceptionMiddleware(loggerMiddleware(next))
```
5. 现在又有一个新问题，想想平时使用中间件是从外部引入的，那外部中间件里面怎么会有 store.getState() 这个方法，于是我们把 store 也给独立出去。
	```js
	const store = createStore(counter)
	const next = store.dispatch

	const loggerMiddleware = (store) => (next) => (action) => {
		console.log('prev state', store.getState())
		console.log(action)
		next(action)
		console.log('next state', store.getState())
	}

	const exceptionMiddleware = (store) => (next) => (action) => {
		try {
			next(action)
		} catch (err) {
			console.error('错误信息: ', err)
		}
	}

	const logger = loggerMiddleware(store)
	const exception = exceptionMiddleware(store)
	store.dispatch = exception(logger(next))
	```
如果又有一个新需求，需要在打印日志前输出当前时间戳，我们又需要构造一个中间件：
```js
const timeMiddleware = (store) => (next) => (action) => {
	console.log('time', new Date().getTime())
	next(action)
}

const logger = loggerMiddleware(store)
const exception = exceptionMiddleware(store)
const time = timeMiddleware(store)
store.dispatch = exception(time(logger(next)))
```

## 中间件使用方式优化
上面的写法可知，中间件的使用方式有点繁琐，故我们需要把细节封装起来，通过扩展createStore来实现。
先来看看期望的用法：
```js
/* 接收旧的 createStore，返回新的 createStore */
const newCreateStore = applyMiddleware(exceptionMiddleware, timeMiddleware, loggerMiddleware)(createStore);

/* 返回了一个 dispatch 被重写过的 store */
const store = newCreateStore(reducer);
```

## 实现 applyMiddleware
```js
export const applyMiddleware = function (...middlewares) {
  /* 返回一个重写createStore的方法 */
  return function rewriteCreateStoreFunc(oldCreateStore) {
    /* 返回重写后新的 createStore */
    return function newCreateStore(reducer, preloadedState) {
      // 生成 store
      const store = oldCreateStore(reducer, preloadedState)
      let dispatch = store.dispatch

      // 只暴露 store 部分给中间件用的API，而不传入整个store
      const middlewareAPI = {
        getState: store.getState,
        dispatch: (action) => store.dispatch(action),
      }
      // 给每个中间件传入API
      // 相当于 const logger = loggerMiddleware(store)，即 const logger = loggerMiddleware({ getState, dispatch })
      // const chain = [exception, time, logger]
      const chain = middlewares.map((middleware) => middleware(middlewareAPI))
      // 实现 exception(time((logger(dispatch))))
      chain.reverse().map((middleware) => {
        dispatch = middleware(dispatch)
      })
      // 重写dispatch
      store.dispatch = dispatch
      return store
    }
  }
}
```

我们来看这一处代码：
```js
chain.reverse().map((middleware) => {
    dispatch = middleware(dispatch)
})
```

要注意一点，中间件是顺序执行，但是 dispatch 却是反序生成的。所以在这步会把数组顺序给反序（**比如 applyMiddleware(A, B, C)，因为 A 在调用时需要知道 B 的 dispatch，B 在执行时需要知道 C 的 dispatch，那么需要先知道 C 的 dispatch**）

官方Redux源码，采用了 compose 函数，我们也试试这种方式来写：
```js
export const applyMiddleware = (...middlewares) => {
  return (createStore) => (...args) => {
    // ...
    dispatch = compose(...chain)(store.dispatch)
    // ... 
  }
}

// compose(fn1, fn2, fn3)
// fn1(fn2(fn3))
// 从右到左来组合多个函数: 从右到左把接收到的函数合成后的最终函数
export const compose = (...funcs) => {
  if (funcs.length === 0) {
    return (arg) => arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((ret, item) => (...args) => ret(item(...args)))
}
```

我们再对代码精简：

```js
export const applyMiddleware = (...middlewares) => {
  return (createStore) => (...args) => {
    const store = createStore(...args)
    let dispatch = store.dispatch

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action),
    }

    const chain = middlewares.map((middleware) => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch,
    }
  }
}

export const compose = (...funcs) => {
  if (funcs.length === 0) {
    return (arg) => arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((ret, item) => (...args) => ret(item(...args)))
}
```

## createStore的处理
现在的问题是，有两个 createStore 了，这怎么区分，上篇我们其实已经先告知了对中间件代码处理，但具体怎么推出的，我们继续看：
```js
// 没有中间件的 createStore
const store = createStore(counter)

// 有中间件的 createStore
const rewriteCreateStoreFunc = applyMiddleware(exceptionMiddleware, timeMiddleware, loggerMiddleware);
const newCreateStore = rewriteCreateStoreFunc(createStore);
const store = newCreateStore(counter, preloadedState);
// 其实就是：applyMiddleware(exceptionMiddleware, timeMiddleware, loggerMiddleware)(createStore)(counter, preloadedState)
```

为了让用户用起来统一一些，我们可以很简单的使他们的使用方式一致，我们修改下 createStore 方法
```js
const createStore = (reducer, preloadedState, rewriteCreateStoreFunc) => {
    // 如果有 rewriteCreateStoreFunc，那就采用新的 createStore 
    if(rewriteCreateStoreFunc){
       const newCreateStore =  rewriteCreateStoreFunc(createStore);
       return newCreateStore(reducer, preloadedState);
    }
    // ...
}
```

不过Redux源码 rewriteCreateStoreFunc 换了个名字，还加了判断，也就是我们上篇的代码：
```js
if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.')
    }
    return enhancer(createStore)(reducer, preloadedState)
}
```

所以中间件的用法为：
```js
const store = createStore(counter, /* preloadedState可选 */ applyMiddleware(logger))
```

## combineReducers
如果我们做的项目很大，有大量 state，那么维护起来很麻烦。Redux 提供了 combineReducers 这个方法，作用是把多个 reducer 合并成一个 reducer， 每个 reducer 负责独立的模块。

我们用一个新例子来举例：
```js
import { createStore, applyMiddleware, combineReducers } from 'redux'

const initCounterState = {
  value: 10,
}
const initInfoState = {
  name: 'jacky',
}

const reducer = combineReducers({
  counter: counterReducer,
  info: infoReducer,
})

// counter reducer处理函数
function counterReducer(state = initCounterState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        value: state.value + 1,
      }
    case 'DECREMENT':
      return {
        ...state,
        value: state.value - 1,
      }
    default:
      return state
  }
}

function infoReducer(state = initInfoState, action) {
  switch (action.type) {
    case 'FULL_NAME':
      return {
        ...state,
        name: state.name + ' lin',
      }
    default:
      return state
  }
}

const store = createStore(reducer)

const init = store.getState()
// 一开始counter为：10，info为 jacky
console.log(`一开始counter为：${init.counter.value}，info为 ${init.info.name}`)
function listener() {
  store.getState()
}
store.subscribe(listener) // 监听state的改变

// counterReducer
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'DECREMENT' })

// infoReducer
store.dispatch({ type: 'FULL_NAME' })

// 执行完counter为：11，info为jacky lin
console.log(`执行完counter为：${store.getState().counter.value}，info为${store.getState().info.name}`)
export default store
```

我们来尝试下如何实现这个 API

首先要把一个函数里的所有 reducers 循环执行一遍，并且这个函数要遵循(state, action) => newState 格式。还需要把每个 reducer 的 initState 合并成一个 rootState。
实现如下：
```js
export function combineReducers(reducers) {
  // reducerKeys = ['counter', 'info']
  const reducerKeys = Object.keys(reducers)
  // 返回合并后的新的reducer函数
  return function combination(state = {}, action) {
    // 生成的新的state
    const nextState = {}

    // 遍历执行所有的reducers，整合成为一个新的state
    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i]
      const reducer = reducers[key]
      // 之前的 key 的 state
      const previousStateForKey = state[key]
      // 执行 分 reducer，获得新的state
      const nextStateForKey = reducer(previousStateForKey, action)

      nextState[key] = nextStateForKey
    }
    return nextState
  }
}
```

## replaceReducer
> 在大型 Web 应用程序中，通常需要将应用程序代码拆分为多个可以按需加载的 JS 包。 这种称为“代码分割”的策略通过减小初次加载时的 JS 的包的大小，来提高应用程序的性能。

reducer 拆分后，和组件是一一对应的。我们就希望在做按需加载的时候，reducer 也可以跟着组件在必要的时候再加载，然后用新的 reducer 替换老的 reducer。但实际上只有一个 root reducer 函数, 如果要实现的话就可以用 replaceReducer 这个函数，实现如下：
```js
const createStore = function (reducer, initState) {
  // ...
  const replaceReducer = (nextReducer) => {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.')
    }
    reducer = nextReducer
    // 刷新一遍 state 的值，新来的 reducer 把自己的默认状态放到 state 树上去
    dispatch({ type: Symbol() })
  }
  // ...
  return {
    // ...
    replaceReducer
  }
}
```
使用如下：
```js
const reducer = combineReducers({
  counter: counterReducer
});
const store = createStore(reducer);

/*生成新的reducer*/
const nextReducer = combineReducers({
  counter: counterReducer,
  info: infoReducer
});
/*replaceReducer*/
store.replaceReducer(nextReducer);
```

## bindActionCreators

bindActionCreators 一般比较少用到，在react-redux的 connect 函数实现会用到

会使用到 bindActionCreators 的场景是当你需要把 action creator 往下传到一个组件上，却不想让这个组件觉察到 Redux 的存在，而且不希望把 dispatch 或 Redux store 传给它。

我们通过普通的方式来 隐藏 dispatch 和 actionCreator 试试：
```js
const reducer = combineReducers({
  counter: counterReducer,
  info: infoReducer
});
const store = createStore(reducer);

// 返回 action 的函数就叫 actionCreator
function increment() {
  return {
    type: 'INCREMENT'
  }
}

function getName() {
  return {
    type: 'FULL_NAME',
  }
}

const actions = {
  increment: function () {
    return store.dispatch(increment.apply(this, arguments))
  },
  getName: function () {
    return store.dispatch(getName.apply(this, arguments))
  }
}
// 其他地方在实现自增的时候，根本不知道 dispatch，actionCreator等细节
actions.increment(); // 自增
actions.getName(); // 获得全名
```

把actions生成时候的公共代码提取出来：
```js
const actions = bindActionCreators({ increment, getName }, store.dispatch)
```

bindActionCreators 的实现如下：
```js
// 返回包裹 dispatch 的函数, 将 actionCreator 转化成 dispatch 形式
// eg. { addNumAction }  =>  (...args) => dispatch(addNumAction(args))
export function bindActionCreator(actionCreator, dispatch) {
  return function (...args) {
    return dispatch(actionCreator.apply(this, args))
  }
}

export function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch)
  }
  // actionCreators 必须是 function 或者 object
  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error()
  }

  const keys = Object.keys(actionCreators)
  const boundActionCreators = {}
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const actionCreator = actionCreators[key]
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  }
  return boundActionCreators
}
```

可能大家看到这里有点懵逼，让我们来回忆下 react-redux 中 connect 函数的用法，比如有这样一个 actionCreators：
```js
// actionCreators.js
function addNumAction() {
    return { type: 'ADD_NUM' }
}
// Demo.js：在需要用到 store 数据的组件，如 Demo 组件底部我们用 connect 函数连接，如下:
import { addNumAction } from './actionCreators'
const mapDispatchToProps = (dispatch) => ({
  addNum() {
    dispatch(addNumAction())
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(Demo)
```

然后通过页面的按钮来出发 action 为 ADD_NUM 对应事件：
```jsx
<button onClick={this.props.addNum}>增加1</button>
```

但除了上面的用法，mapDispatchToProps 也可以这样用，直接传入一个对象，都没有 dispatch 方法：
```js
export default connect(mapStateToProps, { addNumAction })(Demo)
```

然后只需触发 addNumAction 就能实现和上面一样的效果。

为什么可以不传，当你传入对象的时候， connect 函数会判断，大致代码如下：
```js
let dispatchToProps

if (typeof mapDispatchToProps === 'function') {
    dispatchToProps = mapDispatchToProps(store.dispatch)
} else {
    // 传递了一个 actionCreator 对象过来
    dispatchToProps = bindActionCreators(mapDispatchToProps, store.dispatch)
}
```

这里就使用了 bindActionCreators 函数，它就是把你传入的 actionCreator 再包一层 dispatch方法，即：
```js
{ addNumAction } => (...args) => dispatch(addNumAction(args))
```

# END