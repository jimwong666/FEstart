原文链接：[Building the old Twitter layout using CSS Grid](https://medium.com/quick-code/building-the-old-twitter-layout-using-css-grid-3de34cde582f "使用CSS Grid构建旧的Twitter布局") <br/>
作者：Daryl Duckmanton <br/>
作者创作时间：2019年8月21日

------------------------------------------------------------------------------------------------

# <img src="https://github.com/jimwong666/FEstart/blob/master/translatedArticles/images/publicFile/icon_teranlation.png" alt="译文">使用CSS Grid构建旧的Twitter布局

<p align="center">
<img src="https://miro.medium.com/max/2690/1*yZbODHhGBxizxFK2nohhrQ.png" alt="layout">
</p>

我是一个喜欢开发挑战性东西的人。而最好的挑战是复制最成功公司所做的大量工作。最受欢迎的社交媒体平台Twitter似乎是学习新技术的完美候选人。

不管怎么说，每当我开始学习一个新的技术来构建应用程序，我总是从用户界面先开始。现在，当我开始研究这个时，Twitter的UI并没有改变。它仍然使用它的基于磁贴的系统，如上图所示。

而我现在正在制作CSS Grid课程，我想重建这个应用程序以使用CSS Grid会很有趣。因此，在本文中，我将向您展示我是如何做到的。

## 设置HTML

所以对于大多数CSS Grid示例。我们的想法是保持HTML简单并尽可能保持平坦。创建一个名为twitter.html的文件，然后复制并粘贴下面的代码。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Twitter Layout</title>
    <link rel="stylesheet" type="text/css" media="screen" href="twitter.css" />
</head>
<body>
    <header>
        <h1>Top Bar</h1>
    </header>
    <main>
        <article id="profile-tile" class="tile">
            <header>
                <h2>Profile Area</h2>
            </header>
        </article>
        <section id="feed-tile" class="tile">
            <header>
                <h2>Feed</h2>
            </header>
        </section>
        <aside id="trending-tile" class="tile">
            <header>
                <h2>Trending</h2>
            </header>
        </aside>
        <article id="notice-tile" class="tile">
            <header>
                <h2>Notice</h2>
            </header>
        </article>
        <aside id="follow-tile" class="tile">
            <header>
                <h2>Follow</h2>
            </header>
        </aside>
        <aside id="links-tile" class="tile">
            <header>
                <h2>Links</h2>
            </header>
        </aside>
    </main>
</body>
</html>
```

所以这里的结构很简单。我有一个链接到body元素的标题。这将包含这将是最上面一栏的Twitter的。目前在我的例子中我刚刚将主h1添加到这个顶部栏。

对于其余内容，我将其添加到主元素中。主要元素包含2篇文章，3篇副词和1篇。它们代表配置文件详细信息图块，通知图块，趋势图块，跟随图块，带链接的标题，最后我们有主要的源图块。

## 设置基本样式

所以在我们进入CSS Grid方面之前，让我们添加你需要的CSS才能完成这个页面。创建一个名为twitter.css的新文件，该文件与twitter.html文件位于同一文件夹中。然后将下面的CSS复制到其中。

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html, body {
    height: 100%;
}

html {
    font-size: 10px;
    font-family: Arial, Helvetica, sans-serif;
    background: #afccdb;
}

h2 {
    font-size: 1.8rem;
    text-align: center;
    margin-bottom: 2.4rem;
}

p {
    margin-bottom: 2.0rem;
}

body > header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 46px;
    background: #FFF;
    border-bottom: 3px solid rgba(0,0,0,0.05);
}

body > main {
    width: 100%;
    padding: 10px;
    margin-top: 46px;
}

.tile {
    padding: 10px 12px;
    background: #FFF;
}
```

如果您现在保存CSS文件并在Chrome中打开您的页面，您应该会看到类似于以下内容的内容。

<p align="center">
<img src="https://miro.medium.com/max/2978/1*eIGd9P6wOl6hMC2WxtTb6Q.png" alt="Twitter使用CSS Grid之前的基本演示">
Twitter使用CSS Grid之前的基本演示
</p>

如果你已经到了这一点，恭喜!! 您已准备好进入下一阶段。并且是为此布局实现移动视图。这将在下一篇文章中介绍。

下一篇文章 - [设置移动布局](https://github.com/jimwong666/FEstart/tree/master/translatedArticles/20190909-Building%20the%20old%20Twitter%20layout%20using%20CSS%20Grid%20%E2%85%A1 "设置移动布局")

