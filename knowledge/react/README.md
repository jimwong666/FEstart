# React学习笔记

----------------------------------------------------------------------------------------------------------

## 20190329

```js
	class Popper extends React.Component{
		constructor(){
			super();
			this.state = {name:'Hello world!'};
		}
		
		preventPop = (e) => {    //事件对象e要放在最后
			console.log(e);
			e.preventDefault();
		}
		
		render(){
			return (
				<div>
					<p>hello</p>
					{/* Pass params via bind() method. */}
					<a href="https://www.baidu.com" onClick={(e)=>{this.preventPop(e)}}>Click</a>
				</div>
			);
		}
	}

	ReactDOM.render(
	<Popper />,
	document.getElementById('root')
	);
```
注意点：
* 事件对象e要放在 *参数* 最后；
* 定义类的原型方法可以用普通函数（但使用时函数的this需要注意~ 可能需要绑定），也可以用箭头函数（this不需要绑定，但是有些东西需要显式的传进来~ 比如e）；
* 可以用以下两种方式<向时间处理程序传参>：
>  ```html
>    <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
>    <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
>  ```
  1.适用于箭头函数，但要显式的传一些参数，比如e
  2.适用于普通函数，但要记得绑定this
  


## 20190726 工具型插件 react-only-if

安装：
```
	npm i --save-dev react-only-if
```

使用：
```jsx
	// 伪代码
	import React from 'react';
	import ReactOnlyIf from 'react-only-if'; // react-only-if插件
	import {conditionA, conditionB, conditionC} from '../data/condition';
	import SecrectData from '../src/components/SecrectData.jsx'; // 需要判断是否渲染的组件

	// 条件判断
	const SecrectDataOnlyIf = ReactOnlyIf(
		({conditionA, conditionB, conditionC}) => {
			return conditionA && (conditionB || conditionC);
		}
	)(SecrectData)

	// 
	export default class Home extends React.Component {
		render() {
			return (
				<SecrectDataOnlyIf />
			);
		}
	}
```

**意义：**

要保持组件内部没有过多地逻辑，及组件应尽可能保持简洁易懂



