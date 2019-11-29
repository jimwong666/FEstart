原文链接：[Using the DOM like a Pro](https://itnext.io/using-the-dom-like-a-pro-163a6c552eba "专业玩儿DOM") <br/>
作者：Danny Moerkerke <br/>
作者创作时间：2019年9月2日

------------------------------------------------------------------------------------------------

# <img src="https://github.com/jimwong666/FEstart/blob/master/translatedArticles/images/publicFile/icon_teranlation.png" alt="译文">专业玩儿DOM

> 别再害怕 DOM 了，让我们充分挖掘 DOM 的潜力，你会真的爱上它。

<p align="center">
<img src="https://miro.medium.com/max/5604/0*mS7vEiMIgqRwI4vZ" alt="专业玩儿DOM">
</p>

2008 年，当我刚成为一名专业 Web 开发人员参加工作时，我了解一些 HTML、CSS 和 PHP 的知识。那时我也在学习 JavaScript，因为它可以用来显示和隐藏元素和制作下拉菜单之类很酷的事情。

当时我在一家小公司工作，我们主要为客户创建 CMS 系统。彼时我们需要一个多文件上传器，这是当时的原生 JavaScript 无法实现的功能。

经过一番搜索，我发现了一个基于 Flash 的精美解决方案，还有一个名为 MooTools 的 JavaScript 库。MooTools 有一个很酷的 $ 函数来选择 DOM 元素，并带有诸如进度条和 Ajax 请求之类的模块。几周后我发现了 jQuery，仿佛打开了新世界的大门。它不再需要冗长、笨拙的 DOM 操作，取而代之的是简单、可链接的选择器，并且还附带了一堆有用的插件。

快进到 2019 年，今天的世界由框架统治。如果你作为 Web 开发人员的事业生涯始于过去十年中，那么你很可能接触不到什么“原始”的 DOM。你甚至可能根本用不着它。

尽管诸如 Angular 和 React 之类的框架让 jQuery 的热度大减，但它仍在被 6600 万个网站所使用，这是一个惊人的数字，约占全球所有网站的 74％。

jQuery 的遗产给人留下了深刻的印象，它给标准带来的影响力有一个很好的例子，那就是模仿 jQuery 的 $ 函数的 querySelector 和 query-SelectorAll 方法。讽刺的是，这两种方法可能是 jQuery 热度下降的最大元凶，因为这两种方法替代了 jQuery 最常用的功能：轻松选择 DOM 元素。

但是原生 DOM API 很 冗长。我的意思是说，一边是 $，另一边却是 document.query-SelectorAll。这就是让开发人员抵触原生 DOM API 的原因所在。但实际上这完全没必要。

原生 DOM API 很棒，而且 非常 有用。是的，它很冗长，但这是因为它们是低级构建块，上面是要构建抽象的。而且如果你真的不想多打字的话：所有现代编辑器和 IDE 都提供出色的代码完成功能。你也可以为最常用的功能加上别名，我会在后文给出示例。

我们开始吧！

## 选择元素

##### 单元素

要使用任何有效的 CSS 选择器选择单个元素，请输入：

```js
document.querySelector(/* your selector */)
```

可以使用下面的任何选择器：

```js
document.querySelector('.foo')            // class selector
document.querySelector('#foo')            // id selector
document.querySelector('div')             // tag selector
document.querySelector('[name="foo"]')    // attribute selector
document.querySelector('div + p > span')  // you go girl!
```

如果没有匹配的元素，它将返回 null。

##### 多元素

要选择多个元素，请输入：

```js
document.querySelectorAll('p')  // selects all <p> elements
```

你可以用 document.querySelectorAll，用法与 document.querySelector 相同。任何有效的 CSS 选择器都可以，唯一的区别是 querySelector 将返回单个元素，而 querySelectorAll 将返回包含找到的元素的静态 NodeList。如果没有找到任何元素，它将返回一个空的 NodeList。

NodeList 是一个可迭代的对象，它 类似 数组，但 实际上 不是数组，因此它没有相同的方法。你可以在其上运行 forEach，但不能用 map、reduce 或 find。

如果确实需要在其上运行数组方法，则可以使用解构或 Array.from 将其转换为数组：

```js
const arr = [...document.querySelectorAll('p')];
or
const arr = Array.from(document.querySelectorAll('p'));
arr.find(element => {...});  // .find() now works
```

*querySelectorAll 方法与诸如 getElements-ByTagName 和 getElementsByClassName 之类的方法的不同之处在于，这些方法返回的是 实时 收集的 HTMLCollection，而 query-SelectorAll 返回的是 静态 的 NodeList。*

因此，如果执行 getElementsByTagName('p')，
一个p将从文档中删除，也会从返回的 HTMLCollection 中删除。

但如果执行 querySelectorAll('p')，一个p将从文档中删除，但它仍将存在于返回的 NodeList 中。

另一个重要的区别是，HTMLCollection 只能包含 HTMLElement，而 NodeList 可以包含任何类型的 Node。

##### 相对搜索

你不一定需要在 document 上运行 query-Selector(All)。你可以在任何 HTML-Element 上运行它以执行相对搜索（relative search）：

```js
const div = document.querySelector('#container');
div.querySelectorAll('p')  // finds all <p> tags in #container only
```

但这仍然很冗长！

如果你还是觉得打的字太多了，则可以为两种方法起别名：

```js
const $ = document.querySelector.bind(document);
$('#container');
const $$ = document.querySelectorAll.bind(document);
$$('p');
```

搞定。

##### 爬一爬 DOM 树

使用 CSS 选择器选择 DOM 元素意味着我们只能沿着 DOM 树向 下 移动。没有 CSS 选择器可以沿树向上选择父项。

但是我们可以使用 closest() 方法向 DOM 树上面移动，该方法也能用任何有效的 CSS 选择器：

```js
document.querySelector('p').closest('div');
```

这将找到 document.querySelector('p') 选择的段落中最接近的父div元素。你可以将这些调用链接起来，往树上多爬几层：

```js
document.querySelector('p').closest('div').closest('.content');
```

##### 添加元素

向 DOM 树添加一个或多个元素的代码很容易变得冗长拖沓，因而臭名昭著。假设你要在页面上添加以下链接：

```js
<a href="/home" class="active">Home</a>
```

你需要：

```js
const link = document.createElement('a');
link.setAttribute('href', '/home');
link.className = 'active';
link.textContent = 'Home';
document.body.appendChild(link);
```

现在想象一下，这套操作要在 10 个元素上重复十次……

至少 jQuery 允许你执行以下操作：

```js
$('body').append('<a href="/home" class="active">Home</a>');
```

其实原生也有等效操作，想不到吧？

```js
document.body.insertAdjacentHTML('beforeend',
'<a href="/home" class="active">Home</a>');
```

使用 insertAdjacentHTML 方法，你可以在第一个参数指示的四个位置向 DOM 中插入任意有效的 HTML 字符串：

* 'beforebegin'：元素之前。
* 'afterbegin'：在元素的第一个子元素之前。
* 'beforeend'：在元素的最后一个子元素之后。
* 'afterend'：元素之后。

```html
<!-- beforebegin -->
<p>
  <!-- afterbegin -->
  foo
  <!-- beforeend -->
</p>
<!-- afterend -->
```

这样就能更容易地指定插入新元素的确切位置。假设你要在这个p之前插入a，如果没有 insertAdjacentHTML，则必须执行以下操作：

```js
const link = document.createElement('a');
const p = document.querySelector('p');
p.parentNode.insertBefore(link, p);
```

现在我们只要：

```js
const p = document.querySelector('p');
p.insertAdjacentHTML('beforebegin', '<a></a>');
```

这也是插入 DOM 元素的一种原生等效方法：

```js
const link = document.createElement('a');
const p = document.querySelector('p');
p.insertAdjacentElement('beforebegin', link);
```

还有文本：

```js
p.insertAdjacentText('afterbegin', 'foo');
```

##### 移动元素

insertAdjacentElement 方法也可以用来在同一文档中的现有元素之间移动。当使用 insertAdjacentElement 插入的元素已经成为文档的一部分时，它就会被移动。

如果你有以下 HTML：

```html
<div class="first">
  <h1>Title</h1>
</div>
<div class="second">
  <h2>Subtitle</h2>
</div>
```

在h1之后插入h2：

```js
const h1 = document.querySelector('h1');
const h2 = document.querySelector('h2');
h1.insertAdjacentElement('afterend', h2);
```

它将被简单地 移动，而不是复制：

```html
<div class="first">
  <h1>Title</h1>
  <h2>Subtitle</h2>
</div>
<div class="second">

</div>
```

##### 替换元素

一个 DOM 元素可以使用其 replaceWith 方法替换为其他任意 DOM 元素：

```js
someElement.replaceWith(otherElement);
```

替换它的元素可以是使用 document.create-Element 创建的新元素，也可以是已经属于同一文档的元素（在这种情况下，它还是会被移动而不是复制）：

```html
<div class="first">
  <h1>Title</h1>
</div>
<div class="second">
  <h2>Subtitle</h2>
</div>

const h1 = document.querySelector('h1');
const h2 = document.querySelector('h2');
h1.replaceWith(h2);
// result:

<div class="first">
  <h2>Subtitle</h2>
</div>
<div class="second">

</div>
```

##### 移除元素

只需调用其 remove 方法：

```js
const container = document.querySelector('#container');
container.remove();  // hasta la vista, baby
```

比老方法好得多：

```js
const container = document.querySelector('#container');
container.parentNode.removeChild(container);
```

##### 从原始 HTML 创建元素

insertAdjacentHTML 方法允许我们将原始 HTML 插入文档中，但是如果我们想从原始 HTML 中 创建 元素并在以后使用它又该怎么办？

为此，我们可以使用 DomParser 对象及其方法 parseFromString。DomParser 提供了将 HTML 或 XML 源代码解析为 DOM 文档的功能。我们使用 parseFromString 方法创建一个仅包含一个元素的文档，并仅返回这一个元素：

```js
const createElement = domString => new DOMParser().parseFromString(domString, 'text/html').body.firstChild;
const a = createElement('<a href="/home" class="active">Home</a>');
```

##### 检查 DOM

标准 DOM API 还提供了一些方便的方法来检查 DOM。例如，matchs 确定一个元素是否将与某个选择器匹配：

```js
<p class="foo">Hello world</p>
const p = document.querySelector('p');
p.matches('p');     // true
p.matches('.foo');  // true
p.matches('.bar');  // false, does not have class "bar"
```

你还可以使用 contains 方法检查一个元素是否是另一个元素的子元素：

```js
<div class="container">
  <h1 class="title">Foo</h1>
</div>
<h2 class="subtitle">Bar</h2>
const container = document.querySelector('.container');
const h1 = document.querySelector('h1');
const h2 = document.querySelector('h2');
container.contains(h1);  // true
container.contains(h2);  // false
```

你可以使用 compareDocumentPosition 方法获得有关元素的更多详细信息。使用此方法，你可以确定一个元素是在另一个元素之前还是之后，或者其中一个元素是否包含另一个元素。它返回一个整数，该整数表示对比的元素之间的关系。

下面这个示例与上一个示例的元素相同：

```js
<div class="container">
  <h1 class="title">Foo</h1>
</div>
<h2 class="subtitle">Bar</h2>
const container = document.querySelector('.container');
const h1 = document.querySelector('h1');
const h2 = document.querySelector('h2');
//  20: h1 is contained by container and follows container
container.compareDocumentPosition(h1);
// 10: container contains h1 and precedes it
h1.compareDocumentPosition(container);
// 4: h2 follows h1
h1.compareDocumentPosition(h2);
// 2: h1 precedes h2
h2.compareDocumentPosition(h1);
```

从 compareDocumentPosition 返回的值是一个整数，其数值表示相对于参数（为此方法提供）的 node 之间的关系。

因此，考虑语法 node.compareDocumentPo-stion(otherNode)，返回值的含义是：
* 1：node 不在同一文档中。
* 2：otherNode 在 node 之前。
* 4：otherNode 在 node 之后。
* 8：otherNode 包含 node。
* 16：otherNode 由 node 包含。

可能会设置多个数值，这就是为什么在上面的示例中 container.compareDocumenPosition(h1) 会返回 20——因为 h1 包含在 container 中，所以你可能以为会返回 16。但是 h1 也跟随 container(4)，因此结果值为 16 + 4 = 20。

##### 请多说一点！

你可以通过 MutationObserver 接口观察对任何 DOM 节点的更改。这包括文本更改，将节点添加到被观察的节点，或从观察的节点中删除节点或更改节点的属性。

MutationObserver 是一个功能强大的 API，几乎可以观察到 DOM 元素及其子节点上发生的任何更改。

使用回调函数调用其构造函数来创建新的 MutationObserver。每当观察到的节点发生更改时，将调用此回调：

```js
const observer = new MutationObserver(callback);
```

要观察元素，我们需要调用观察者的 observe 方法，将要观察的节点作为第一个参数，将带有选项的对象作为第二个参数。

```js
const target = document.querySelector('#container');
const observer = new MutationObserver(callback);
observer.observe(target, options);
```

调用 observe 后才开始观察目标。

此选项对象使用以下键：
* attributes：设置为 true 时，将监视节点属性的更改。
* attributeFilter：要监视的属性名称的数组，当 attribute 为 true 且未设置时，将监视节点的 所有 属性的更改。
* attributeOldValue：设置为 true 时，只要发生更改，就会记录该属性的先前值。
* characterData：设置为 true 时，它将记录文本节点中文本的更改，因此这仅适用于 Text 节点，不适用于 HTMLElement。为此，要观察的节点必须是 Text 节点，或者，如果观察者监视 HTMLElement，则需要将 option subtree 设置为 true，以监视子节点的更改。
* characterDataOldValue：设置为 true 时，每当发生更改时，将记录特征数据的先前值。
* subtree：设置为 true 还可以观察到所观察元素的子节点的更改。
* childList：设置为 true 以监视元素的添加和删除子节点动作。当 subtree 设置为 true 时，还将监视子元素中子节点的添加和删除。

当调用 observe 开始观察一个元素时，将通过一个 MutationRecord 对象数组来调用传递给 MutationObserver 构造函数的回调，这些对象描述发生的更改，并描述作为第二个参数调用的观察者。

MutationRecord 包含以下属性：

* type：更改的类型，可以是 attribute、characterData 或 childList。
* target：已更改的元素，可以是属性、字符数据或子元素。
* addNodes：已添加节点的列表；如果未添加，则为空的 NodeList。
* removeNodes：已删除节点的列表；如果未删除任何节点，则为空 NodeList。
* attributeName：更改后的属性名称；如果未更改任何属性，则为 null。
* previousSibling：添加或删除的节点的上一个同级，或者为 null。
* nextSibling：添加或删除的节点的下一个同级，或者为 null。

假设我们要观察属性和子节点的变化：

```js
const target = document.querySelector('#container');
const callback = (mutations, observer) => {
  mutations.forEach(mutation => {
    switch (mutation.type) {
      case 'attributes':
        // the name of the changed attribute is in
        // mutation.attributeName
        // and its old value is in mutation.oldValue
        // the current value can be retrieved with
        // target.getAttribute(mutation.attributeName)
        break;
      case 'childList':
        // any added nodes are in mutation.addedNodes
        // any removed nodes are in mutation.removedNodes
        break;
    }
  });
};
const observer = new MutationObserver(callback);
observer.observe(target, {
  attributes: true,
  attributeFilter: ['foo'], // only observe attribute 'foo'
  attributeOldValue: true,
  childList: true
});
```

观察完目标后，你可以断开观察器的连接，并在需要时调用其 takeRecords 方法以获取尚未传递给回调的任何挂起的突变：

```js
const mutations = observer.takeRecords();
callback(mutations);
observer.disconnect();
```

##### 不要害怕 DOM

DOM API 是一个非常强大且用途广泛的 API，尽管它很冗长。请记住，它旨在为开发人员提供底层的构建块，以便在其上构建抽象，因此从某种意义上讲，它必须很冗长，以提供明确而清晰的 API。多打几行代码不应该阻止你充分挖掘它的潜力。

DOM 是每位 JavaScript 开发人员 必不可少的知识，因为你可能每天都在使用它。不要惧怕它，要充分利用它。然后你将成为更优秀的开发人员。