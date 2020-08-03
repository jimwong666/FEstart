原文链接：[State Management with React Hooks — No Redux or Context API](https://medium.com/javascript-in-plain-english/state-management-with-react-hooks-no-redux-or-context-api-8b3035ceecf8 "使用React Hooks进行状态管理 - 没有Redux和Context API") <br/>
作者：André Gardi<br/>
作者创作时间：2019年04月09日

------------------------------------------------------------------------------------------------
# ![翻译](../images/publicFile/icon_teranlation.png) 使用React Hooks进行状态管理 - 没有Redux和Context API

<p align="center">
<img src="https://miro.medium.com/max/1440/1*xcDT-neKHP7E3quS9n30gw.png" alt="使用React Hooks进行状态管理 - 没有Redux和Context API">
</p>

###### React Hooks 比你想象的更加强大！

今天，我们将探索它，并开发一个自定义的Hook来管理全局状态-比Redux易于使用的方法，比Context API更高效的方法。

### Hook 基础

如果您已经熟悉React Hooks，则可以跳过这一部分。

##### useState()

在Hooks之前，功能组件没有状态。现在，有了useState()，我们可以做到。

<p align="center">
<img src="https://miro.medium.com/max/603/1*SfXrcDkOMOZweX9mjXwBdg.png" alt="使用React Hooks进行状态管理 - 没有Redux和Context API">
</p>

它通过返回一个数组来工作。上面数组的第一项是一个变量，它可以访问 state。第二项是更新组件 state 以在DOM上反映新值的函数。

```jsx
import React, { useState } from 'react';

function Example() {
  const [state, setState] = useState({counter:0});
  const add1ToCounter = () => {
    const newCounterValue = state.counter + 1;
    setState({ counter: newCounterValue});
  }

  return (
    <div>
      <p>You clicked {state.counter} times</p>
      <button onClick={add1ToCounter}>
        Click me
      </button>
    </div>
  );
}
```

##### useEffect()

类似于 componentDidMount() 在普通组件的生命周期里面管理副作用，useEffect() 函数可以在 函数组件(React.FC) 里面管理副作用。 

默认情况下，效果在每个完成的渲染之后运行。但是，您可以选择仅在某些值已更改时才将其触发，并将变量数组作为第二个可选参数传递。

```jsx
// Without the second parameter
useEffect(() => {
  console.log('I will run after every render');
});

// With the second parameter
useEffect(() => {
  console.log('I will run only when valueA changes');
}, [valueA]);
```

为了获得与componentDidMount()相同的结果，我们可以发送一个空数组。知道一个空集永远不会改变，效果将只运行一次。

```jsx
// With empty array
useEffect(() => {
  console.log('I will run only once');
}, []);
```

### 共享状态

我们可以看到，Hooks状态的工作方式与组件状态完全相同。组件的每个实例都有其自己的状态。

要使用在组件之间共享状态的解决方案，我们将创建一个自定义的Hook。

<p align="center">
<img src="https://miro.medium.com/max/802/1*K5QpNirqwE9DUCnFMSe-zQ.png" alt="使用React Hooks进行状态管理 - 没有Redux和Context API">
</p>

这个想法是创建一个侦听器数组和一个状态对象。每当一个组件更改状态时，所有订阅的组件都会触发其setState()函数并进行更新。

我们可以通过在自定义 Hook 中调用useState()来实现。但是，不是返回setState()函数，而是将其添加到侦听器数组中，并返回一个更新状态对象并运行所有侦听器函数的函数。

##### 稍等，这能使我们的生活更轻松吗？？
是的。我创建了一个NPM包，其中封装了所有这些逻辑。

[NPM在这里](https://www.npmjs.com/package/use-global-hook "use-global-hook")

您无需在每个项目上都重写此自定义 Hook。如果您只想跳过并使用最终解决方案，则可以通过运行以下命令轻松地将其添加到项目中：

```
npm install -s use-global-hook
```

您可以通过包装文档中的示例了解如何使用它。但是，从现在开始，我们将关注它在底层是如何实现的。

### 第一个版本

#### 在组件上使用它：

此第一个版本已经可以共享状态。您可以在应用程序中添加任意数量的Counter组件，并且它们都具有相同的全局状态。

### 但是我们可以做的更好

在第一个版本中我不喜欢的有：

- 卸载组件后，我想从数组中删除侦听器。
- 我想使其更通用，以便我们可以在其他项目中使用。
- 我行通过一个参数去设置 initialState。
- 我想使用更多面向功能的编程。

#### 在组件卸载之前调用函数

我们了解到，使用空数组调用useEffect(function，[])与componentDidMount()具有相同的用法。但是，如果在第一个参数中使用的函数返回了另一个函数，则将在卸载组件之前将触发第二个函数。就像componentWillUnmount()一样。

这是从侦听器数组中删除组件的完美位置。

### 第二个版本

除了最后的修改，我们还将执行以下操作：

- 将React设置为参数，不再导入。
- 不导出 customHook，而是导出根据 initialState 参数返回新的 customHook 的函数。
- 创建一个包含状态值和 setState() 函数的存储对象。
- 将箭头函数替换为 setState() 和 useCustom() 中的常规函数​​，因此我们可以将 store 与 this 绑定到上下文。

因为我们现在有一个更通用的Hook，所以我们必须在 store 文件中对其进行设置。

### 将 actions 与 组件 分开

如果您曾经使用过复杂的状态管理库，那么您会知道，直接从组件中操作全局状态不是最佳方法。

最好的方法是通过创建操纵状态的 acton 来分离业务逻辑。因此，我希望我们的解决方案的最新版本不授予组件访问 setState() 函数的权限，而是允许 actions 操作。

为了解决这个问题，我们的useGlobalHook（React，initialState，actions）函数将接收一个动作对象 actions 第三个参数。关于这一点，我想补充一下：

- actions 将有权访问 store 对象。因此，action 可以使用 store.state 读取状态，通过 store.setState() 写入状态，甚至可以使用 state.actions 调用其他 action。
- 对于组织而言，action 对象可能包含其他 action 的子对象。因此，您可能有一个actions.addToCounter(amount) 或一个子对象，该子对象具有通过 actions.counter.add(amount) 调用的所有 counter 的 action。

### 最终版本

以下文件是NPM软件包中的实际文件use-global-hook。

（译者：请到npm中查看）
