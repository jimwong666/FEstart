原文链接：[Do You Know About the Keyboard Tag in HTML?](https://medium.com/better-programming/do-you-know-about-the-keyboard-tag-in-html-55bb3986f186 "你知道 HTML 的键盘标签吗？") <br/>
作者：Ashay Mandwarya<br/>
作者创作时间：未知

------------------------------------------------------------------------------------------------
![翻译](../images/publicFile/icon_teranlation.png) 你知道 HTML 的键盘标签吗？

> 使键盘指令有更好的文本格式

![翻译](https://user-gold-cdn.xitu.io/2020/4/16/1718234a47ade663?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

HTML5 的 \<kbd> 标签用于展示键盘输入。使用此标签包装键盘指令文本，将会在语义上提供更准确的结果，也能让您定位，以便能对其应用一些很棒的样式。而且 \<kbd> 标签特别适合用在文档中。

让我们来看看它的实际效果。

## HTML
### 使用 \<kbd> 标签
```html
<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Del</kbd>
```
![翻译](https://user-gold-cdn.xitu.io/2020/4/16/1718234a038b5294?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 不使用 \<kbd> 标签
对比一下，没有使用 \<kbd> 标签是这样的：
```html
<p>Ctrl+Alt+Del</p>
```
![翻译](https://user-gold-cdn.xitu.io/2020/4/16/1718234a037aaa67?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## CSS
只使用 <kbd> 标签，看起来差别不大。但通过加上一些样式，可以让它看起来像实际的键盘按钮，具有更逼真的效果。
```css
kbd {
	border-radius: 5px;
	padding: 5px;
	border: 1px solid teal;
}
```
![翻译](https://user-gold-cdn.xitu.io/2020/4/16/1718234a30f1272e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

如果您在控制台中查看该元素，您会发现它除了更改为等宽字体外，没有其他特别之处。
![翻译](https://user-gold-cdn.xitu.io/2020/4/16/1718234a0aa4e736?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 结论
使用 \<code> 标签也可以产生同样的效果。那为什么要创建 \<kbd> 呢？

答案在于语义上的区别。\<code> 用于显示简短的代码片段，而 \<kbd> 用于表示键盘输入。