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
  