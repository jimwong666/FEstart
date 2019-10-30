原文链接：[Building the old Twitter layout using CSS Grid](https://medium.com/quick-code/building-the-old-twitter-layout-using-css-grid-9aeee2260ba4 "使用CSS Grid构建旧的Twitter布局") <br/>
作者：Daryl Duckmanton <br/>
作者创作时间：2019年8月21日

------------------------------------------------------------------------------------------------

# <img src="https://github.com/jimwong666/FEstart/blob/master/translatedArticles/images/publicFile/icon_teranlation.png" alt="译文">使用CSS Grid构建旧的Twitter布局 - 设置移动布局

<p align="center">
<img src="https://miro.medium.com/max/2690/1*yZbODHhGBxizxFK2nohhrQ.png" alt="layout">
</p>

本文是系列文章的一部分。当前是第2部分。对于第1部分，您可以单击[此处](https://github.com/jimwong666/FEstart/tree/master/translatedArticles/20190909-Building%20the%20old%20Twitter%20layout%20using%20CSS%20Grid "使用CSS Grid构建旧的Twitter布局 - 介绍")。

因此，我们现在可以构建Twitter布局的移动版本。请注意，我只是在这里进行布局，不包括所有菜单和内容等。这是我们希望最终结果出现在移动设备上的图片。

<p align="center">
<img src="https://miro.medium.com/max/1000/1*ifPT43E4FqMsIynI-xiqXA.png" alt="本文的最终结果">
</p>

如您所见，我们在这里显示的是顶部栏和提要。此图片基于Chrome中的Pixel 2显示屏。顶部栏中的文本居中，提要本身也居中。屏幕上缺少所有其余的图块。

### 隐藏所有未使用的图块

因此，让我们使用简单的东西，并删除此移动视图不需要的所有图块。目前，我们的网站显示了所有图块。在twitter.css文件的底部添加以下CSS 。

```css
#profile-tile {
    display: none;
}

#trending-tile {
    display: none;
}

#notice-tile {
    display: none;
}

#follow-tile {
    display: none;
}

#links-tile {
    display: none;
}
```

如果现在运行页面，您将看到大部分磁贴都消失了，只有提要和顶部栏被保留了。如果您已正确完成所有操作，则应该看到类似以下内容的信息。

<p align="center">
<img src="https://miro.medium.com/max/1010/1*p7HnFCtX4WA-FeDBTIqUkA.png" alt="仅显示所需图块的移动视图">
</p>

没关系，但是我认为我们需要解决三件事。首先，让我们解决供稿缺少的内容。然后，我们将解决顶部栏标题的对齐问题。最后，我们将进料部分的宽度略微缩小，然后将其居中。

### 添加提要内容

出于本文的目的，我只是将任何文本转储到提要中，只是为了将其扩展，以便我们需要在大多数设备上滚动。

打开twitter.html文件，并在feed部分的标题下添加以下HTML 。

```html
<p>
    Interdum, ridiculus rutrum vitae urna rhoncus. Est at mattis congue
    donec cum neque torquent. Ac ipsum metus pellentesque habitasse
    venenatis magnis sagittis condimentum condimentum. Nostra senectus urna
    tristique urna vel montes. Magna cubilia in nulla. Adipiscing
    elementum proin ac habitant nisi congue rutrum aliquam duis himenaeos.
    Conubia potenti sapien proin adipiscing potenti netus. Iaculis erat dolor
    montes lobortis rutrum mauris. Natoque justo praesent diam auctor. Etiam
    taciti curae; rutrum eros gravida eu arcu amet eget interdum.
    Blandit etiam senectus molestie posuere primis sed.
</p>
<p>
    Interdum, ridiculus rutrum vitae urna rhoncus. Est at mattis congue
    donec cum neque torquent. Ac ipsum metus pellentesque habitasse
    venenatis magnis sagittis condimentum condimentum. Nostra senectus urna
    tristique urna vel montes. Magna cubilia in nulla. Adipiscing
    elementum proin ac habitant nisi congue rutrum aliquam duis himenaeos.
    Conubia potenti sapien proin adipiscing potenti netus. Iaculis erat dolor
    montes lobortis rutrum mauris. Natoque justo praesent diam auctor. Etiam
    taciti curae; rutrum eros gravida eu arcu amet eget interdum.
    Blandit etiam senectus molestie posuere primis sed.
</p>
<p>
    Interdum, ridiculus rutrum vitae urna rhoncus. Est at mattis congue
    donec cum neque torquent. Ac ipsum metus pellentesque habitasse
    venenatis magnis sagittis condimentum condimentum. Nostra senectus urna
    tristique urna vel montes. Magna cubilia in nulla. Adipiscing
    elementum proin ac habitant nisi congue rutrum aliquam duis himenaeos.
    Conubia potenti sapien proin adipiscing potenti netus. Iaculis erat dolor
    montes lobortis rutrum mauris. Natoque justo praesent diam auctor. Etiam
    taciti curae; rutrum eros gravida eu arcu amet eget interdum.
    Blandit etiam senectus molestie posuere primis sed.
</p>
<p>
    Interdum, ridiculus rutrum vitae urna rhoncus. Est at mattis congue
    donec cum neque torquent. Ac ipsum metus pellentesque habitasse
    venenatis magnis sagittis condimentum condimentum. Nostra senectus urna
    tristique urna vel montes. Magna cubilia in nulla. Adipiscing
    elementum proin ac habitant nisi congue rutrum aliquam duis himenaeos.
    Conubia potenti sapien proin adipiscing potenti netus. Iaculis erat dolor
    montes lobortis rutrum mauris. Natoque justo praesent diam auctor. Etiam
    taciti curae; rutrum eros gravida eu arcu amet eget interdum.
    Blandit etiam senectus molestie posuere primis sed.
</p>
<p>
    Interdum, ridiculus rutrum vitae urna rhoncus. Est at mattis congue
    donec cum neque torquent. Ac ipsum metus pellentesque habitasse
    venenatis magnis sagittis condimentum condimentum. Nostra senectus urna
    tristique urna vel montes. Magna cubilia in nulla. Adipiscing
    elementum proin ac habitant nisi congue rutrum aliquam duis himenaeos.
    Conubia potenti sapien proin adipiscing potenti netus. Iaculis erat dolor
    montes lobortis rutrum mauris. Natoque justo praesent diam auctor. Etiam
    taciti curae; rutrum eros gravida eu arcu amet eget interdum.
    Blandit etiam senectus molestie posuere primis sed.
</p>
<p>
    Interdum, ridiculus rutrum vitae urna rhoncus. Est at mattis congue
    donec cum neque torquent. Ac ipsum metus pellentesque habitasse
    venenatis magnis sagittis condimentum condimentum. Nostra senectus urna
    tristique urna vel montes. Magna cubilia in nulla. Adipiscing
    elementum proin ac habitant nisi congue rutrum aliquam duis himenaeos.
    Conubia potenti sapien proin adipiscing potenti netus. Iaculis erat dolor
    montes lobortis rutrum mauris. Natoque justo praesent diam auctor. Etiam
    taciti curae; rutrum eros gravida eu arcu amet eget interdum.
    Blandit etiam senectus molestie posuere primis sed.
</p>
<p>
    Interdum, ridiculus rutrum vitae urna rhoncus. Est at mattis congue
    donec cum neque torquent. Ac ipsum metus pellentesque habitasse
    venenatis magnis sagittis condimentum condimentum. Nostra senectus urna
    tristique urna vel montes. Magna cubilia in nulla. Adipiscing
    elementum proin ac habitant nisi congue rutrum aliquam duis himenaeos.
    Conubia potenti sapien proin adipiscing potenti netus. Iaculis erat dolor
    montes lobortis rutrum mauris. Natoque justo praesent diam auctor. Etiam
    taciti curae; rutrum eros gravida eu arcu amet eget interdum.
    Blandit etiam senectus molestie posuere primis sed.
</p>
<p>
    Interdum, ridiculus rutrum vitae urna rhoncus. Est at mattis congue
    donec cum neque torquent. Ac ipsum metus pellentesque habitasse
    venenatis magnis sagittis condimentum condimentum. Nostra senectus urna
    tristique urna vel montes. Magna cubilia in nulla. Adipiscing
    elementum proin ac habitant nisi congue rutrum aliquam duis himenaeos.
    Conubia potenti sapien proin adipiscing potenti netus. Iaculis erat dolor
    montes lobortis rutrum mauris. Natoque justo praesent diam auctor. Etiam
    taciti curae; rutrum eros gravida eu arcu amet eget interdum.
    Blandit etiam senectus molestie posuere primis sed.
</p>
<p>
    Interdum, ridiculus rutrum vitae urna rhoncus. Est at mattis congue
    donec cum neque torquent. Ac ipsum metus pellentesque habitasse
    venenatis magnis sagittis condimentum condimentum. Nostra senectus urna
    tristique urna vel montes. Magna cubilia in nulla. Adipiscing
    elementum proin ac habitant nisi congue rutrum aliquam duis himenaeos.
    Conubia potenti sapien proin adipiscing potenti netus. Iaculis erat dolor
    montes lobortis rutrum mauris. Natoque justo praesent diam auctor. Etiam
    taciti curae; rutrum eros gravida eu arcu amet eget interdum.
    Blandit etiam senectus molestie posuere primis sed.
</p>
<p>
    Interdum, ridiculus rutrum vitae urna rhoncus. Est at mattis congue
    donec cum neque torquent. Ac ipsum metus pellentesque habitasse
    venenatis magnis sagittis condimentum condimentum. Nostra senectus urna
    tristique urna vel montes. Magna cubilia in nulla. Adipiscing
    elementum proin ac habitant nisi congue rutrum aliquam duis himenaeos.
    Conubia potenti sapien proin adipiscing potenti netus. Iaculis erat dolor
    montes lobortis rutrum mauris. Natoque justo praesent diam auctor. Etiam
    taciti curae; rutrum eros gravida eu arcu amet eget interdum.
    Blandit etiam senectus molestie posuere primis sed.
</p>
<p>
    Interdum, ridiculus rutrum vitae urna rhoncus. Est at mattis congue
    donec cum neque torquent. Ac ipsum metus pellentesque habitasse
    venenatis magnis sagittis condimentum condimentum. Nostra senectus urna
    tristique urna vel montes. Magna cubilia in nulla. Adipiscing
    elementum proin ac habitant nisi congue rutrum aliquam duis himenaeos.
    Conubia potenti sapien proin adipiscing potenti netus. Iaculis erat dolor
    montes lobortis rutrum mauris. Natoque justo praesent diam auctor. Etiam
    taciti curae; rutrum eros gravida eu arcu amet eget interdum.
    Blandit etiam senectus molestie posuere primis sed.
</p>
<p>
    Interdum, ridiculus rutrum vitae urna rhoncus. Est at mattis congue
    donec cum neque torquent. Ac ipsum metus pellentesque habitasse
    venenatis magnis sagittis condimentum condimentum. Nostra senectus urna
    tristique urna vel montes. Magna cubilia in nulla. Adipiscing
    elementum proin ac habitant nisi congue rutrum aliquam duis himenaeos.
    Conubia potenti sapien proin adipiscing potenti netus. Iaculis erat dolor
    montes lobortis rutrum mauris. Natoque justo praesent diam auctor. Etiam
    taciti curae; rutrum eros gravida eu arcu amet eget interdum.
    Blandit etiam senectus molestie posuere primis sed.
</p>
<p>
    Interdum, ridiculus rutrum vitae urna rhoncus. Est at mattis congue
    donec cum neque torquent. Ac ipsum metus pellentesque habitasse
    venenatis magnis sagittis condimentum condimentum. Nostra senectus urna
    tristique urna vel montes. Magna cubilia in nulla. Adipiscing
    elementum proin ac habitant nisi congue rutrum aliquam duis himenaeos.
    Conubia potenti sapien proin adipiscing potenti netus. Iaculis erat dolor
    montes lobortis rutrum mauris. Natoque justo praesent diam auctor. Etiam
    taciti curae; rutrum eros gravida eu arcu amet eget interdum.
    Blandit etiam senectus molestie posuere primis sed.
</p>
<p>
    Interdum, ridiculus rutrum vitae urna rhoncus. Est at mattis congue
    donec cum neque torquent. Ac ipsum metus pellentesque habitasse
    venenatis magnis sagittis condimentum condimentum. Nostra senectus urna
    tristique urna vel montes. Magna cubilia in nulla. Adipiscing
    elementum proin ac habitant nisi congue rutrum aliquam duis himenaeos.
    Conubia potenti sapien proin adipiscing potenti netus. Iaculis erat dolor
    montes lobortis rutrum mauris. Natoque justo praesent diam auctor. Etiam
    taciti curae; rutrum eros gravida eu arcu amet eget interdum.
    Blandit etiam senectus molestie posuere primis sed.
</p>
<p>
    Interdum, ridiculus rutrum vitae urna rhoncus. Est at mattis congue
    donec cum neque torquent. Ac ipsum metus pellentesque habitasse
    venenatis magnis sagittis condimentum condimentum. Nostra senectus urna
    tristique urna vel montes. Magna cubilia in nulla. Adipiscing
    elementum proin ac habitant nisi congue rutrum aliquam duis himenaeos.
    Conubia potenti sapien proin adipiscing potenti netus. Iaculis erat dolor
    montes lobortis rutrum mauris. Natoque justo praesent diam auctor. Etiam
    taciti curae; rutrum eros gravida eu arcu amet eget interdum.
    Blandit etiam senectus molestie posuere primis sed.
</p>
<p>
    Interdum, ridiculus rutrum vitae urna rhoncus. Est at mattis congue
    donec cum neque torquent. Ac ipsum metus pellentesque habitasse
    venenatis magnis sagittis condimentum condimentum. Nostra senectus urna
    tristique urna vel montes. Magna cubilia in nulla. Adipiscing
    elementum proin ac habitant nisi congue rutrum aliquam duis himenaeos.
    Conubia potenti sapien proin adipiscing potenti netus. Iaculis erat dolor
    montes lobortis rutrum mauris. Natoque justo praesent diam auctor. Etiam
    taciti curae; rutrum eros gravida eu arcu amet eget interdum.
    Blandit etiam senectus molestie posuere primis sed.
</p>
<p>
    Interdum, ridiculus rutrum vitae urna rhoncus. Est at mattis congue
    donec cum neque torquent. Ac ipsum metus pellentesque habitasse
    venenatis magnis sagittis condimentum condimentum. Nostra senectus urna
    tristique urna vel montes. Magna cubilia in nulla. Adipiscing
    elementum proin ac habitant nisi congue rutrum aliquam duis himenaeos.
    Conubia potenti sapien proin adipiscing potenti netus. Iaculis erat dolor
    montes lobortis rutrum mauris. Natoque justo praesent diam auctor. Etiam
    taciti curae; rutrum eros gravida eu arcu amet eget interdum.
    Blandit etiam senectus molestie posuere primis sed.
</p>
<p>
    Interdum, ridiculus rutrum vitae urna rhoncus. Est at mattis congue
    donec cum neque torquent. Ac ipsum metus pellentesque habitasse
    venenatis magnis sagittis condimentum condimentum. Nostra senectus urna
    tristique urna vel montes. Magna cubilia in nulla. Adipiscing
    elementum proin ac habitant nisi congue rutrum aliquam duis himenaeos.
    Conubia potenti sapien proin adipiscing potenti netus. Iaculis erat dolor
    montes lobortis rutrum mauris. Natoque justo praesent diam auctor. Etiam
    taciti curae; rutrum eros gravida eu arcu amet eget interdum.
    Blandit etiam senectus molestie posuere primis sed.
</p>
<p>
    Interdum, ridiculus rutrum vitae urna rhoncus. Est at mattis congue
    donec cum neque torquent. Ac ipsum metus pellentesque habitasse
    venenatis magnis sagittis condimentum condimentum. Nostra senectus urna
    tristique urna vel montes. Magna cubilia in nulla. Adipiscing
    elementum proin ac habitant nisi congue rutrum aliquam duis himenaeos.
    Conubia potenti sapien proin adipiscing potenti netus. Iaculis erat dolor
    montes lobortis rutrum mauris. Natoque justo praesent diam auctor. Etiam
    taciti curae; rutrum eros gravida eu arcu amet eget interdum.
    Blandit etiam senectus molestie posuere primis sed.
</p>
<p>
    Interdum, ridiculus rutrum vitae urna rhoncus. Est at mattis congue
    donec cum neque torquent. Ac ipsum metus pellentesque habitasse
    venenatis magnis sagittis condimentum condimentum. Nostra senectus urna
    tristique urna vel montes. Magna cubilia in nulla. Adipiscing
    elementum proin ac habitant nisi congue rutrum aliquam duis himenaeos.
    Conubia potenti sapien proin adipiscing potenti netus. Iaculis erat dolor
    montes lobortis rutrum mauris. Natoque justo praesent diam auctor. Etiam
    taciti curae; rutrum eros gravida eu arcu amet eget interdum.
    Blandit etiam senectus molestie posuere primis sed.
</p>
<p>
    Interdum, ridiculus rutrum vitae urna rhoncus. Est at mattis congue
    donec cum neque torquent. Ac ipsum metus pellentesque habitasse
    venenatis magnis sagittis condimentum condimentum. Nostra senectus urna
    tristique urna vel montes. Magna cubilia in nulla. Adipiscing
    elementum proin ac habitant nisi congue rutrum aliquam duis himenaeos.
    Conubia potenti sapien proin adipiscing potenti netus. Iaculis erat dolor
    montes lobortis rutrum mauris. Natoque justo praesent diam auctor. Etiam
    taciti curae; rutrum eros gravida eu arcu amet eget interdum.
    Blandit etiam senectus molestie posuere primis sed.
</p>
<p>
    Interdum, ridiculus rutrum vitae urna rhoncus. Est at mattis congue
    donec cum neque torquent. Ac ipsum metus pellentesque habitasse
    venenatis magnis sagittis condimentum condimentum. Nostra senectus urna
    tristique urna vel montes. Magna cubilia in nulla. Adipiscing
    elementum proin ac habitant nisi congue rutrum aliquam duis himenaeos.
    Conubia potenti sapien proin adipiscing potenti netus. Iaculis erat dolor
    montes lobortis rutrum mauris. Natoque justo praesent diam auctor. Etiam
    taciti curae; rutrum eros gravida eu arcu amet eget interdum.
    Blandit etiam senectus molestie posuere primis sed.
</p>
<p>
    Interdum, ridiculus rutrum vitae urna rhoncus. Est at mattis congue
    donec cum neque torquent. Ac ipsum metus pellentesque habitasse
    venenatis magnis sagittis condimentum condimentum. Nostra senectus urna
    tristique urna vel montes. Magna cubilia in nulla. Adipiscing
    elementum proin ac habitant nisi congue rutrum aliquam duis himenaeos.
    Conubia potenti sapien proin adipiscing potenti netus. Iaculis erat dolor
    montes lobortis rutrum mauris. Natoque justo praesent diam auctor. Etiam
    taciti curae; rutrum eros gravida eu arcu amet eget interdum.
    Blandit etiam senectus molestie posuere primis sed.
</p>
<p>
    Interdum, ridiculus rutrum vitae urna rhoncus. Est at mattis congue
    donec cum neque torquent. Ac ipsum metus pellentesque habitasse
    venenatis magnis sagittis condimentum condimentum. Nostra senectus urna
    tristique urna vel montes. Magna cubilia in nulla. Adipiscing
    elementum proin ac habitant nisi congue rutrum aliquam duis himenaeos.
    Conubia potenti sapien proin adipiscing potenti netus. Iaculis erat dolor
    montes lobortis rutrum mauris. Natoque justo praesent diam auctor. Etiam
    taciti curae; rutrum eros gravida eu arcu amet eget interdum.
    Blandit etiam senectus molestie posuere primis sed.
</p>
<p>
    Interdum, ridiculus rutrum vitae urna rhoncus. Est at mattis congue
    donec cum neque torquent. Ac ipsum metus pellentesque habitasse
    venenatis magnis sagittis condimentum condimentum. Nostra senectus urna
    tristique urna vel montes. Magna cubilia in nulla. Adipiscing
    elementum proin ac habitant nisi congue rutrum aliquam duis himenaeos.
    Conubia potenti sapien proin adipiscing potenti netus. Iaculis erat dolor
    montes lobortis rutrum mauris. Natoque justo praesent diam auctor. Etiam
    taciti curae; rutrum eros gravida eu arcu amet eget interdum.
    Blandit etiam senectus molestie posuere primis sed.
</p>
<p>
    Interdum, ridiculus rutrum vitae urna rhoncus. Est at mattis congue
    donec cum neque torquent. Ac ipsum metus pellentesque habitasse
    venenatis magnis sagittis condimentum condimentum. Nostra senectus urna
    tristique urna vel montes. Magna cubilia in nulla. Adipiscing
    elementum proin ac habitant nisi congue rutrum aliquam duis himenaeos.
    Conubia potenti sapien proin adipiscing potenti netus. Iaculis erat dolor
    montes lobortis rutrum mauris. Natoque justo praesent diam auctor. Etiam
    taciti curae; rutrum eros gravida eu arcu amet eget interdum.
    Blandit etiam senectus molestie posuere primis sed.
</p>
<p>
    Interdum, ridiculus rutrum vitae urna rhoncus. Est at mattis congue
    donec cum neque torquent. Ac ipsum metus pellentesque habitasse
    venenatis magnis sagittis condimentum condimentum. Nostra senectus urna
    tristique urna vel montes. Magna cubilia in nulla. Adipiscing
    elementum proin ac habitant nisi congue rutrum aliquam duis himenaeos.
    Conubia potenti sapien proin adipiscing potenti netus. Iaculis erat dolor
    montes lobortis rutrum mauris. Natoque justo praesent diam auctor. Etiam
    taciti curae; rutrum eros gravida eu arcu amet eget interdum.
    Blandit etiam senectus molestie posuere primis sed.
</p>
<p>
    Interdum, ridiculus rutrum vitae urna rhoncus. Est at mattis congue
    donec cum neque torquent. Ac ipsum metus pellentesque habitasse
    venenatis magnis sagittis condimentum condimentum. Nostra senectus urna
    tristique urna vel montes. Magna cubilia in nulla. Adipiscing
    elementum proin ac habitant nisi congue rutrum aliquam duis himenaeos.
    Conubia potenti sapien proin adipiscing potenti netus. Iaculis erat dolor
    montes lobortis rutrum mauris. Natoque justo praesent diam auctor. Etiam
    taciti curae; rutrum eros gravida eu arcu amet eget interdum.
    Blandit etiam senectus molestie posuere primis sed.
</p>
<p>
    Interdum, ridiculus rutrum vitae urna rhoncus. Est at mattis congue
    donec cum neque torquent. Ac ipsum metus pellentesque habitasse
    venenatis magnis sagittis condimentum condimentum. Nostra senectus urna
    tristique urna vel montes. Magna cubilia in nulla. Adipiscing
    elementum proin ac habitant nisi congue rutrum aliquam duis himenaeos.
    Conubia potenti sapien proin adipiscing potenti netus. Iaculis erat dolor
    montes lobortis rutrum mauris. Natoque justo praesent diam auctor. Etiam
    taciti curae; rutrum eros gravida eu arcu amet eget interdum.
    Blandit etiam senectus molestie posuere primis sed.
</p>
<p>
    Interdum, ridiculus rutrum vitae urna rhoncus. Est at mattis congue
    donec cum neque torquent. Ac ipsum metus pellentesque habitasse
    venenatis magnis sagittis condimentum condimentum. Nostra senectus urna
    tristique urna vel montes. Magna cubilia in nulla. Adipiscing
    elementum proin ac habitant nisi congue rutrum aliquam duis himenaeos.
    Conubia potenti sapien proin adipiscing potenti netus. Iaculis erat dolor
    montes lobortis rutrum mauris. Natoque justo praesent diam auctor. Etiam
    taciti curae; rutrum eros gravida eu arcu amet eget interdum.
    Blandit etiam senectus molestie posuere primis sed.
</p>
```

因此，所有这些操作就是向Feed中添加一些虚拟HTML，以便我们可以看到Feed大于屏幕高度时会发生什么。如您所见，我们已经可以滚动了。没什么大不了的。

从这里开始，我们将进行的所有更改都在CSS文件中。因此，如果您愿意，可以关闭HTML源代码。

### 固定顶杆对齐

现在，通常我会使用Flexbox在垂直和水平方向上将内容对齐到中心。但是，看到这是CSS Grid上的文章，我们可以看看如何使用它来实现它。

在您的twitter.css里面添加如下CSS到**body > header**选择器。

```css
display: grid;
place-items: center center;
```

通过将这两个属性添加到标题中，我们可以轻松地将“ Top Bar”文本在标题中垂直和水平居中。

通过将display属性更改为grid的值，我们将标题转换为网格容器。此容器 仅包含一列和一行。我们的“顶部栏”文本成为一个网格项目，我们可以在单个单元格内对齐。

然后，我们使用place-items属性将文本居中。第一个中心值是指文本的垂直对齐方式，第二个中心是指文本的水平对齐方式。我们还可以使用start，end和一个特殊的值Stretch（可以查看它的工作方式，但实际上是拉伸item）。

### 缩小进纸宽度

因此，对于移动视图，我们要做的最后一件事是将提要的宽度减小为设备窗口宽度的85％，并将其居中在主要部分的中间。

为此，我们需要定义哪个元素将成为我们可以操纵其布局的网格容器。在这种情况下，所有图块都包含在主元素内部。

在您的twitter.css里面添加如下CSS到**body > header**选择器的顶部。

```css
display: grid;
grid-template-columns: 85vw;
justify-content: center;
```

因此，我们在这里所做的就是将我们的主要元素转换为CSS网格，并在该网格中将单个列定义为85vw。这使得我们的提要（当前唯一显示的图块）的宽度为窗口宽度的85％。然后，我们使用证明内容与价值中心到中心这个单列水平到屏幕的中间。

有了这个，我们得到了想要的最终结果。

<p align="center">
<img src="https://miro.medium.com/max/1000/1*ifPT43E4FqMsIynI-xiqXA.png" alt="所有移动设备更改后的成品">
</p>

再次感谢您的到来！我们的下一步是为Twitter克隆建立2列布局，并将图块放置在适当的位置。下一篇文章将对此进行介绍。