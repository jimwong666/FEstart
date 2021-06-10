# React Hook
> react 用过一段时间的人都知道，我们可以写类组件，也可以写函数组件。函数组件写起来简单，好维护，但是唯一的缺点是没有自己的 state。
> 那有什么样的一种方法，既能利用 react 函数组件的简单，也可以使用 state 呢，这个就是 hooks 诞生的原因。用 react 官方的话说，就是："组件不要变成复杂的容器，最好只是数据流的管道。开发者根据需要，组合管道即可。**组件的最佳写法应该是函数，而不是类。**"

## [Hook解决的问题](https://zhuanlan.zhihu.com/p/137183261 "参考")
- Component非UI逻辑复用困难
- 组件的生命周期函数不适合side effect逻辑的管理
- 不友好的Class Component

## Hooks使用的一些规则
虽然Hooks只是Javascript的方法，但是在使用时，需要遵守以下两条规则：
1. 只在顶层调用
不要在循环，条件，或者嵌套函数中调用Hooks。只在React函数组件的顶层使用Hook。这样可以确保每次组件都会以相同的顺序调用Hooks，这是保证一个函数式组件中useState和useEffect状态正确的基本前提。

2. 只在函数式组件内调用
普通的Javascript方法内，不要调用Hooks，只在以下两种情况内调用Hooks
   1. React的函数式组件内调用Hooks
   2. 自定义Hook中调用其他Hooks 这样你可以确保组件中所有的状态逻辑，都能够在代码中清晰可见，提升代码可读性

## Hook概览
- 基础的 Hook
  - useState
  - useEffect
  - useContext
- 额外的 Hook
  - useReducer
  - useCallback
  - useMemo
  - useRef
  - useImperativeHandle
  - useLayoutEffect
  - useDebugValue
- 自定义 Hook

## Hook API

### useState

```jsx
	[val, setVal] = useState(initVal);
```
useState是React提供的一个Hook。可以在函数式组件中，使用该方法维护一个组件内的局部状态。React在每次渲染该组件时，保存此状态。

和class组件的不同的是，class组件内的state必须是对象，而且调用setState方法是，会将新传入的对象和老的对象进行合并操作。 useState中，可以定义任何类型的局部状态，而且进行状态更新时，也不会将旧状态和新状态进行合并。

上述代码示例，useState(initVal)的返回值是一个长度为2的数组，利用二是色解构。相当于 [count, setCount] = [当前状态值, 更新状态值的方法]。initVal是初始值，val是当前值，setCount是更新状的方法。

看示例：

```jsx
	// class 写法
	export default class comp extends React.Component {
		constructor(props) {
			super(props);
			this.state = { 
			status: true,
			num: 0
			};
			this.add = this.add.bind(this);
		}

		add(){
			this.setState({
			num: ++this.state.num
			})
		}

		render() {
			return (
				<div>
					<button type="button" onClick={()=>this.add()}>Click Me!</button>

					<div>num:{this.state.num}</div>
				</div>	
			)
		}
	};
```

```jsx
	// hook 写法
	export default function hooks() {
		const [obj, setObj] = useState({ 
			status: true,
			num: 0
		})

		return (
			<div>
				<button type="button" onClick={
					() => setObj({
						num: obj.num + 1
					})
				}>Click Me!</button>	

				<div>num:{obj.num}</div>
			</div>
		)
	}
```

### useEffect

```jsx
	useEffect(effectFunction: Function, dependency?: any[]);
```

useEffect让函数式组件拥有了类似class组件执行生命周期钩子的方法。 它与 componentDidMount, componentDidUpdate, componentWillUnmount 的作用相同

**effectFunction** 是要执行的函数，**dependencyArray** 是被监视的数组，当这些数组的其中一项发生改变是，执行前面的函数

useEffect 方法有以下几种形态：
- useEffect(function) 在 componentDidMount 和每次 componentDidUpdate 时调用 function
- useEffect(function, []) 在 componentDidMount 是调用 function
- useEffect(function, [arg1, arg2, ...argN]) 在 componentDidMount 调用，并且当数组中有任意值改变时，调用 function

我们发现上述并没涉及到 componentWillUnmount 生命周期，这会导致某些订阅等无法卸载，其实useEffect给出了解决方法，只要在effectFunction 函数中 return 一个函数，此函数就会在组件卸载(即：componentWillUnmount)时执行你想要的something。

```jsx
	// class 写法
	export default class comp extends React.Component {
		constructor(props){
			super(props);
			this.state={
				num: 0
			}
		}
		componentDidMount(){
			console.log("这里是componentDidMount！");
		}
		componentDidUpdate(prevProps, prevState, snapshot){
			console.log("这里是componentDidUpdate！");
		}
		componentWillUnmount(){
			console.log("这里是componentWillUnmount！");
		}

		render() {
			return (
			<div>
				<button type="button" onClick={()=>this.setState({num: ++this.num})}>触发update</button>
			</div>
			)
		}
	};
```

```jsx
	// hook 写法
	export default function hook() {
		const [num, setNum] = useState(0);
		const [count, setCount] = useState(0);

		useEffect(() => {
			console.log("这里是componentDidMount/componentDidUpdate！每次都有我~");
		})
		useEffect(() => {
				console.log("这里是componentDidMount！");
				return () => {
				console.log("这里是componentWillUnmount！");
			}
		}, [])
		useEffect(() => {
			console.log("这里是componentDidMount/componentDidUpdate！只有num更新有我~");
		}, [num])

		return (
			<div>
				<button onClick={() => setNum(num+1)}>触发num更新</button>
				<button onClick={() => setCount(count+1)}>触发count更新</button>
			</div>
		)
	}
```

### useContext

```jsx
	useContext(MyContext);
```
useContext 的目的在于实现父组件与子组件之间的数据传递。相较于非hook下的createContext({})，其在子组件中获取 Provider 变得较为简便

```jsx
	const UserContext = createContext({})

	function Header() {
		const useInfo = useContext(UserContext)
		return (
			// 这里是非hook下的写法，做参考
			// <UserContext.Consumer>
			//   {
			//     // item 代表 value传递的数据
			//     item => {
			//       return (
			//         <div>
			//           <p>{item.name}</p>
			//           <p>{item.age}</p>
			//         </div>
			//       )
			//     }
			//   }
			// </UserContext.Consumer>
			<div>
				<p>{useInfo.name}</p>
				<p>{useInfo.age}</p>
			</div>
		)
	}

	function App() {
		return (
			<div>
			<UserContext.Provider value={
				{ 
					name: 'wj',
					 age: 22 
				}
			}>
				<Header />
			</UserContext.Provider>
			根组件
			</div>
		);
	}
```

### useReducer

```jsx
	const [state, dispatch] = useReducer(reducer, initialArg, init?);
```

useReducer 从字面意思来说它是 redux 的替代方案，但是真正替代的是 useState。
它接收一个形如 (state, action) => newState 的 reducer，并返回当前的 state 以及与其配套的 dispatch 方法。（如果你熟悉 Redux 的话，就已经知道它如何工作了。）

**state** 有2中不同的初始化方式：
- 指定初始化：**initialArg** 是 state 的默认值
- 惰性初始化：**init** 是一个接受 initialArg 作为参数初始化的函数，可选

```jsx
	// 指定初始化
	export default function hook() {
		const initialState = {count: 0};

		function reducer(state, action) {
			switch (action.type) {
			case 'increment':
				return {count: state.count + 1};
			case 'decrement':
				return {count: state.count - 1};
			default:
				throw new Error();
			}
		}

		const [state, dispatch] = useReducer(reducer, initialState);
		
		return (
			<>
				Count: {state.count}
				<button onClick={() => dispatch({type: 'decrement'})}>-</button>
				<button onClick={() => dispatch({type: 'increment'})}>+</button>
			</>
		);
	}
```

```jsx
	// 惰性初始化：
	function hookk(initialCount) {
		function init_initialCount) {
			return {count: _initialCount};
		}

		function reducer(state, action) {
			switch (action.type) {
			case 'increment':
				return {count: state.count + 1};
			case 'decrement':
				return {count: state.count - 1};
			case 'reset':
				return init(action.payload);
			default:
				throw new Error();
			}
		}

		const [state, dispatch] = useReducer(reducer, initialCount, init);
		
		return (
			<>
			Count: {state.count}
			
			<button
				onClick={() => dispatch({type: 'reset', payload: initialCount})}>
				Reset
			</button>
			<button onClick={() => dispatch({type: 'decrement'})}>-</button>
			<button onClick={() => dispatch({type: 'increment'})}>+</button>
			</>
		);
	}
```

### useCallback

```jsx
	useCallback(
		() => {
			doSomething(a, b);
		},
		[a, b],
	);
```
返回一个 memoized 回调函数。

把内联回调函数及依赖项数组作为参数传入 useCallback，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 shouldComponentUpdate）的子组件时，它将非常有用。

useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。

### useMemo

```jsx
	useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

返回一个 memoized 值。

把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。

记住，传入 useMemo 的函数会在渲染期间执行。请不要在这个函数内部执行与渲染无关的操作，诸如副作用这类的操作属于 useEffect 的适用范畴，而不是 useMemo。

如果没有提供依赖项数组，useMemo 在每次渲染时都会计算新的值。

你可以把 useMemo 作为性能优化的手段，但不要把它当成语义上的保证。将来，React 可能会选择“遗忘”以前的一些 memoized 值，并在下次渲染时重新计算它们，比如为离屏组件释放内存。先编写在没有 useMemo 的情况下也可以执行的代码 —— 之后再在你的代码中添加 useMemo，以达到优化性能的目的。

### useRef

```jsx
	useRef(initialValue);
```

useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内保持不变。

### useImperativeHandle

```jsx
	useImperativeHandle(ref, createHandle, [deps])
```

useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值。在大多数情况下，应当避免使用 ref 这样的命令式代码。

### useLayoutEffect

其函数签名与 useEffect 相同，但它会在所有的 DOM 变更之后同步调用 effect。可以使用它来读取 DOM 布局并同步触发重渲染。在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新。

### useDebugValue

```jsx
	useDebugValue(value)
```

useDebugValue 可用于在 React 开发者工具中显示自定义 hook 的标签。

### 自定义 Hook

自定义 Hook 其实就是一个hook集合体函数，其名称以 “use” 开头（即：只要是use开头的函数都会默认是钩子函数），函数内部可以调用其他的 Hook，这样可以将组件的状态逻辑抽离出来，方便进行复用。

```jsx
	// 定义自定义hook useTimerUp
	function useTimerUp() {
		const [timerCount, setTimerCount] = useState(0)
		useEffect(() => {
			const timer = setInterval(() => {
				setTimerCount(timerCount + 1)
			}, 1000)
			return () => {
				clearInterval(timer)
			}
		}, [])
		return timerCount
	}

	// 使用自定义hook
	function NewTimerUpComponent() {
		const timeCount = useTimerUp();
		return (
			<div>newCurrentTimeCount : {timeCount} </div>
		)
	}
```