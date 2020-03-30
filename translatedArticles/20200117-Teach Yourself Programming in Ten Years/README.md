原文链接：[Teach Yourself Programming in Ten Years](https://itnext.io/using-the-dom-like-a-pro-163a6c552eba "十年自学编程之路") <br/>
作者：Peter Norvig <br/>

------------------------------------------------------------------------------------------------

# <img src="https://github.com/jimwong666/FEstart/blob/master/translatedArticles/images/publicFile/icon_teranlation.png" alt="译文">十年自学编程之路

### 为什么每个人都是如此急躁？

走进任何书店，您将看到如何在24小时内自学Java，以及无穷无尽的其他书，可以在几天或几小时内教你C，SQL，Ruby，算法等。亚马逊搜索——技术、自学等，自2000年以来，共发现512本书。在前十名中，有九本是编程书籍（另一本是关于簿记的）。通过将“自学”替换为“学习”或将“小时”替换为“天”，可以得到类似的结果。

结论是要么人们急于学习编程，要么编程比其他任何事物都更容易学习。Felleisen 等人在他们的《如何设计程序》一书中对此趋势致敬，当他们说“错误的编程很容易。傻瓜也可以在21天内学习它，即使他们的确是白痴”。同时Abtruse Goose漫画也受到了欢迎。

让我们分析一下“ 24小时自学C++”这样的标题的含义吧：

* **Teach Yourself: **在24小时内，您将没有时间编写几个重要的程序，并从中学习成功和失败的经验。您将没有时间与经验丰富的程序员一起工作，也不了解在C ++环境中生活的感觉。简而言之，您将没有时间学习很多东西。因此，这本书只能说是肤浅的认知，而不是深刻的理解。正如亚历山大·波普（Alexander Pope）所说，浅尝辄止是危险的事情。

* **C++: **在24小时内，您可能可以学习C++的某些语法（如果您已经了解另一种语言），但是您对如何使用该语言的了解却不多。简而言之，如果您是一名Basic程序员，则可以学习使用C++语法以Basic风格编写程序，但是您将无法了解C++的优点（或缺点）。那有什么意义呢？艾伦·珀利斯（Alan Perlis）曾经说过：“不影响您对编程的思考方式的语言是不值得了解的”。一个可能的观点是，您必须学习一点C++（或更可能是JavaScript或Processing之类的东西），因为您需要与现有工具交互以完成特定任务。但是，您没有学习如何编程。而是在学习完成该任务。

* **in 24 Hours: **不幸的是，这还不够，如下一节所示。

### 十年自学编程

研究人员的研究表明：在众多领域中发展专业知识大约需要十年的时间，包括下棋、音乐、写作、电报操作、绘画、弹钢琴、游泳、网球以及神经心理学和拓扑学研究。关键是深思熟虑的实践：不仅要一遍又一遍地做，还要挑战一项超越您当前能力的任务，尝试一下，分析执行前后的表现并纠正错误。然后重复，再重复一次。这似乎没有真正的捷径，即使是4岁的音乐天才莫扎特，也花了13年的时间才开始创作世界一流的音乐。在另一例子中，甲壳虫乐队似乎爆出一连串的NO1热门歌曲，并在1964年的埃德·沙利文（Ed Sullivan）演出中露面。但是自1957年以来，他们一直在利物浦和汉堡的小型俱乐部打球，尽管如此，他们早期仍然具有巨大的吸引力，他们的第一个重大成功就是 Peppers，于1967年发行。

马尔科姆·格拉德威尔（Malcolm Gladwell）推广了这个想法，尽管他专注于10,000小时而不是10年。亨利·卡蒂埃·布雷森（Henri Cartier-Bresson，1908-2004年）的另一个标准是：“您的前10,000张照片是最糟糕的。”（他没想到数码相机会在一个星期内达到这个目标。）真正的专业知识可能需要一辈子。塞缪尔·约翰逊（Samuel Johnson（1709-1784））说：“任何部门的出色表现，只有靠一生；不要以较低的价格购买它。”乔uc（1340-1400）抱怨说：“ lyf太短了，工艺太长了。”希波克拉底（约公元前400年）以其摘录“ ars longa，vita brevis”而著称，这是更长的引文“ Ars longa，vita brevis，occasio praeceps，experimentum perculosum，iudicium difficile”的一部分，英语中用“Life”表示。短，工艺长，机会稍纵即逝，实验诡reach，判断困难。”当然，没有一个数字可以作为最终答案：假设所有技能（例如编程，下棋，下棋和玩音乐）可能都需要完全相同的时间来掌握，这似乎是不合理的，也不会所有人都花费完全相同的时间。正如K. Anders Ericsson教授所说：“在大多数领域，即使是最有才华的人也需要多少时间才能达到最高水平的表现。10,000小时的小时数使您感觉我们在谈论几年每周10至20个小时，有些人会说这些是天赋最才华的人，仍然需要达到最高水平。”

### 所以你想成为一名程序员

这是我编程成功的秘诀：

* 对编程感兴趣，并做一些有趣的事情。确保它保持足够的乐趣，以便您愿意投入 十年/10,000小时 的时间。

* 编程，最好的学习方法就是边做边学。从技术上讲，“在一定范围内，个人的最高绩效不会根据扩展的经验而自动获得，但是即使是经验丰富的个人，也可以通过有针对性的努力来提高绩效水平。”和“最有效的学习需要对特定个体具有适当难度级别的明确定义的任务，信息反馈以及重复和纠正错误的机会。”（第20-21页）《实践中的认知：日常生活中的思维，数学和文化》是对此观点的有趣参考。

* 与其他程序员交谈；阅读其他程序。这比任何书籍或培训课程都重要。

* 如果需要，可以在大学学习四年（或者读研究生）。这将使您能够访问一些需要证书的工作，并且可以使您对该领域有更深入的了解，但是如果您不喜欢学校，则可以独自或在工作中获得类似的经验。。无论如何，仅靠书籍学习是不够的。《新黑客字典》的作者埃里克·雷蒙德说：“计算机科学教育不能像学习画画那样使任何人成为专家程序员。”我曾经雇用过的最好的程序员之一只有高中学位。他开发了许多出色的软件，拥有自己的项目组，并拥有足够的股票期权来满足自己出入夜店。

* 与其他程序员一起从事项目时，编程方面做最好的一个.当你成为最好时，就可以测试自己领导项目的能力了，并用自己的远见激发他人。当你遇到困难，你应该向前辈学习，并了解他们为什么不做那些事情。

* 在其他程序员之后从事项目。了解别人编写的程序。看看当先前编写程序的程序员不在时理解和修复它的过程。并考虑如何设计您的程序，使那些在您之后维护它们的人更轻松。

* 学习至少六种编程语言。包括一种强调类抽象的语言（例如Java或C ++），一种强调功能抽象的语言（例如Lisp或ML或Haskell），一种支持语法抽象的语言（例如Lisp），一种支持声明性规范的语言（例如Prolog或C ++模板），并且强调并行性（例如Clojure或Go）。

* 请记住，“计算机科学”中有一个“计算机”。知道您的计算机执行一条指令，从内存中提取一个单词（有或没有缓存未命中），从磁盘读取连续的单词以及寻找磁盘上的新位置需要多长时间。

* 参与语言标准化工作。它可以是ANSI C ++委员会，也可以确定您的本地编码样式是否具有2或4个空格缩进。无论哪种方式，您都可以了解他人在某种语言中的喜好，对他们的感受有多深，甚至可能对他们为何如此做了解一点点。

* 具有良好的意识，可以尽快开始语言标准化工作。

考虑到所有这些，仅通过学习书籍就能取得多大的成绩是值得揣测的。在我的第一个孩子出生之前，我阅读了所有关于“HOW”的书，但仍然感到自己是一个笨手笨手的新手。30个月后，当我的第二个孩子出生时，我是否复习这本书了呢？并没有。相反，我依靠我的个人经验，事实证明，与专家撰写的成千上万页相比，这对我而言更加有用并且令人放心。

弗雷德·布鲁克斯（Fred Brooks）在他的论文《没有银弹》中确定了一个由三部分组成的计划，以寻找优秀的软件设计师：

1. 尽可能早的系统地识别什么是顶级软件设计师。
2. 指派职业指导者负责潜在客户的发展，并仔细保存职业档案。
3. 为成长中的软件设计师提供交流和相互激励的机会。

这是假设某些人已经具备成为优秀设计师所需的素质；工作是适当地哄骗他们。艾伦·珀利斯（Alan Perlis）更简洁地说：“我可以教大家怎么学好雕刻：只要米开朗基罗教导你如何不那做。伟大的程序员也是如此。”佩利斯（Perlis）说，伟人的内在素质超越了他们的刻苦练习。但是质量从何而来？是天生的吗？还是他们通过勤奋发展？正如奥古斯特·古斯托（Ratatouille的虚构厨师）所说，“任何人都可以做饭，但只有无所畏惧的人才能做得好。”我将其更多地视为愿意将一生的大部分时间投入到思考实践中。但也许无所畏惧是一种概括的方式。或者，正如古斯托（Gusteau）的批评家安东·埃戈（Anton Ego）所说：“并非每个人都能成为一名伟大的艺术家，但是伟大的艺术家可以来自任何地方。”

因此，继续购买那本Java / Ruby / Javascript / PHP书；您可能会从中受益。但是您不会在24小时或21天内改变自己的生活，也不会改变自己真正的整体专业知识。如何努力在24个月内不断改进？好吧，就从现在开始...