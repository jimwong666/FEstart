# 关于NPM —— 你可能不知道的一些事

## npm
> npm，就像 maven 之于 Java
> 
> npm(node package manager) 是 Node.js 官方提供的包管理工具，是随同 Node.js 一起安装的包管理工具
> 
> npm已经成了 Node.js 包的标准发布平台，用于 Node.js 包的发布、传播、依赖控制。npm 提供了命令行工具，使你可以方便地下载、安装、升级、删除包，也可以让你作为开发者发布并维护包

### npm介绍
#### ① 供用户使用
###### 安装方式
  1. 项目内安装
     - **dependencies** 的依赖；命令是 `npm install XXX -S` 或者 `npm install XXX --save`
     - **devDependencies** 的依赖；命令是 `npm install XXX -D` 或者 `npm install XXX --save-dev`
  2. 全局安装
     - 依赖包会安装全局目录中

###### 安装的目录结构
  1. 【**2.X**】版本时 npm 包的目录结构
     - 嵌套安装
  2. 【**3.X**】版本时 npm 包的目录结构
     - 扁平安装（没有完全平铺）

###### 包的查找方式
  - 首先在 **package.json** 所在的目录查找 **node_modules**，然后一直往父目录查找 **node_modules** 文件夹，如果还没有，再到 **全局目录** 去查找 **node_modules**

#### ② 供开发者开发插件

###### 开发
开发的工具库有 father、 roll.js 等等

###### 调试
本地调试，npm link(即利用了**软链**，可以再了解一下**硬链**)

###### 产物
一般会生成三个文件夹， dist, lib, es
> 对应到 package.json 文件里面的入口文件字段是 "main": "lib/index.js" 和 "module": "es/index.js" 

###### peerDependencies
**peerDependencies** 用于指定你正在开发的包所依赖的包，但是这个包我自己不安装，因为我知道你用我你肯定会安装它。这个属性在npm2和npm3上的表现不同。

### npm的一些问题
- 幽灵依赖（Phantom dependencies），即某个包没有在 **package.json** 中被依赖，但是用户却能够引用到这个包
- NPM分身（NPM doppelgangers），这个问题其实也可以说是 hoist 导致的，这个问题可能会导致有大量的依赖的被重复安装

所以上述急待你就引起了 **磁盘空间浪费**、**安装耗时**、**包的结构混乱**等等 问题

## Lerna

> 一个 monorepo 的管理工具，许多库都在用，他并不是为 npm 而生的工具，但再一些方面也能弥补 npm 的一些不足

只要在他的工作区间之内，下面所有项目的 npm 依赖可以一起装，可以 hoist 到父目录，消除重复依赖，节约空间

工作区间内包之间相互引用，无需 npm link (直接 import 或者可以 npm i 进行安装)

> yarn workspace 好想也能达到这个目的（暂时还未使用过yarn...）

当然 Lerna 的能力不止这些，大家有空可以深入了解一下

## pnpm

> pnpm(performant npm)，即：高性能的npm。它由 npm/yarn 衍生而来，但却解决了 npm/yarn 内部潜在的 bug，并且极大了地优化了性能，扩展了使用场景

### 什么是 pnpm
