# 关于NPM —— 你可能不知道的一些

## npm
> npm，就像 maven 之于 Java
> 
> npm(node package manager) 是 Node.js 官方提供的随同 Node.js 一起安装的包管理工具
> 
> npm已经成了 Node.js 包的标准发布平台，用于 Node.js 包的发布、传播、依赖控制。npm 提供了命令行工具，使你可以方便地下载、安装、升级、删除包，也可以让你作为开发者发布并维护包

### npm介绍
#### ① 通过npm安装依赖包
###### 安装方式
  1. 项目内安装
     - 安装**生产** 的依赖；对应 package.json里面的 dependencies 字段，命令是 `npm install XXX -S` 或者 `npm install XXX --save`
     - 安装**开发** 的依赖；对应 package.json里面的 devDependencies 字段，命令是 `npm install XXX -D` 或者 `npm install XXX --save-dev`
  2. 全局安装
     - 依赖包会安装全局目录中，命令是 `npm install XXX -g`

###### 安装的目录结构
<p align="center">
  <img src="https://github.com/jimwong666/FEstart/blob/master/knowledge/npm/TheNPMYouDontKnow/imgs/npm2vs3.png" alt="npm2 VS npm3">
</p>
<p align="center">
  <span>npm2 VS npm3</span>
</p>

1. 【**2.X**】版本时 npm 包的目录结构
   - 嵌套安装
2. 【**3.X**】版本时 npm 包的目录结构
   - 扁平安装（没有完全平铺）

###### 包的查找方式
  - 首先在 **package.json** 所在的目录查找 **node_modules**，然后一直往父目录查找 **node_modules** 文件夹，如果还没有，再到 **全局目录** 去查找 **node_modules**

#### ② 通过npm发布包

###### 开发
开发的工具库有 father、 roll.js 等等

###### 调试
本地调试，npm link(即利用了**软链**，可以再了解一下**硬链**，[参考文章](https://www.ruanyifeng.com/blog/2011/12/inode.html))

###### 产物
一般会生成三个文件夹， dist, lib, es
> 对应到 package.json 文件里面的入口文件字段是 "main": "lib/index.js" 和 "module": "es/index.js"

###### peerDependencies
**peerDependencies** 用于指定你正在开发的包所依赖的包，但是这个包我自己不安装，因为我知道你用我你肯定会安装它。这个属性在npm2和npm3上的表现不同。

### npm的一些问题
- 幽灵依赖（Phantom dependencies），即某个包没有在 **package.json** 中被依赖，但是用户却能够引用到这个包
- NPM分身（NPM doppelgangers），这个问题其实也可以说是 hoist 导致的，这个问题可能会导致有大量的依赖的被重复安装

所以上述急待你就引起了 **磁盘空间浪费**、**安装耗时**、**包的结构混乱**、**安全问题**等等 问题

## Lerna

> 一个 monorepo 的管理工具，许多库都在用，他并不是为 npm 而生的工具，但再一些方面也能弥补 npm 的一些不足

只要在他的工作区间之内，下面所有项目的 npm 依赖可以一起装，可以 hoist 到父目录，消除重复依赖，节约空间

工作区间内包之间相互引用，无需 npm link (直接 import 或者可以 npm i 进行安装)

> yarn workspace 好想也能达到这个目的（暂时还未使用过yarn...）

当然 Lerna 的能力不止这些，它的绝活在 monorepo 方面，大家有空可以深入了解一下~

## pnpm

> pnpm(performant npm)，即：高性能的npm。它由 npm/yarn 衍生而来，是 npm/yarn 的替代品，但却解决了 npm/yarn 内部潜在的 bug，并且极大了地优化了性能，扩展了使用场景


<p align="center">
  <img src="https://github.com/jimwong666/FEstart/blob/master/knowledge/npm/TheNPMYouDontKnow/imgs/fast.png" alt="无阻塞，速度快">
</p>
<p align="center">
  <span>无阻塞，速度快</span>
</p>

<p align="center">
  <img src="https://github.com/jimwong666/FEstart/blob/master/knowledge/npm/TheNPMYouDontKnow/imgs/performant.jpg" alt="速度快，性能好">
</p>
<p align="center">
  <span>速度快，性能好</span>
</p>

### 为什么是 pnpm
<p align="center">
  <img src="https://github.com/jimwong666/FEstart/blob/master/knowledge/npm/TheNPMYouDontKnow/imgs/why.png" alt="pnpm">
</p>

- 速度快
- 高效利用磁盘空间
- 支持 monorepo
- 安全性高

### pnpm 怎么做到的

这里假设我们只安装 express，做2组参照：

<p align="center">
  <img src="https://github.com/jimwong666/FEstart/blob/master/knowledge/npm/TheNPMYouDontKnow/imgs/compare.png" alt="npm对比pnpm">
</p>
<p align="center">
  <span>npm对比pnpm</span>
</p>

我们会发现pnpm安装的 node_modules 并**不是扁平化结构**，而是目录树的结构，类似 **npm 2.x** 版本中的结构

我们再点开 **.pnpm** 目录

<p align="center">
  <img src="https://github.com/jimwong666/FEstart/blob/master/knowledge/npm/TheNPMYouDontKnow/imgs/.pnpm.png" alt="npm对比pnpm">
</p>
<p align="center">
  <span>.pnpm目录</span>
</p>

**.pnpm** 以平铺的形式储存着所有的包，正常的包都可以在下面这种命名模式的文件夹中被找到（peerDep例外）
```
.pnpm/<organization-name>+<package-name>@<version>/node_modules/<name>

// 组织名(若无会省略)+包名@版本号/node_modules/名称(项目名称)
```
我们称 **.pnmp** 为 **虚拟存储** 目录，该目录通过 **<package-name>@<version>** 来实现相同模块不同版本之间隔离和复用，由于它只会根据项目中的依赖生成，并不存在提升，所以它不会存在之前提到的 **幽灵依赖** 问题！

##### 依赖包的存储与链接

那么它如何跟文件资源进行关联的呢？又如何被项目中使用呢？

1. pnpm install 之后，首先 pnpm 首先会并行下载各个包并放到库存中（无阻塞，速度快），即放在 .pnpm-store 文件夹中（windows下会设置到当前盘的根目录下）
2. 然后创建 **虚拟存储**（.pnpm）目录，并创建各个依赖包，他们都会 **硬链接** 到 .pnpm-store 文件夹下（这样就达到了节约硬盘资源的目的），如果他们内部有互相引用，则使用 **软链接**（他们的相互内部依赖也是用到了 node_modules 包的查找方式）
3. 最后根据 **package.json** 的依赖项生成对应的依赖包（提高了安全性），依赖包 软链接 到 **虚拟存储**（.pnpm）目录中对应的版本
  
> 目前 issue 和 社区 都有声音支持 Lerna 和 pnpm 进行整合，如果成功了肯定是件大好事~

## 结语

我们从 npm 说到 Lerna 再到 pnpm，说明前端领域一直在发展，并且依然蓬勃~
  
最后，推荐几个比较好用的工具，nrm（npm源管理器）和 nvm（node版本管理器）

谢谢大家倾听，3Q~
