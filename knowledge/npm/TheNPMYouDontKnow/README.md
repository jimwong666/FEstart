# 你可能不知道的NPM

## npm
> npm，就像 maven 之于 Java， pip 之于 Python， gem 之于 Ruby， pear 之于 PHP
> 
> npm(node package manager) 是 Node.js 官方提供的包管理工具，是随同 Node.js 一起安装的包管理工具
> 
> npm已经成了 Node.js 包的标准发布平台，用于 Node.js 包的发布、传播、依赖控制。npm 提供了命令行工具，使你可以方便地下载、安装、升级、删除包，也可以让你作为开发者发布并维护包

### 用途
#### ①供用户使用
##### **安装方式**
  1. 项目内安装
     - **dependencies** 的依赖；命令是 `npm install XXX -S` 或者 `npm install XXX --save`
     - **devDependencies** 的依赖；命令是 `npm install XXX -D` 或者 `npm install XXX --save-dev`
  2. 全局安装
     - 依赖包会在 node 的安装目录中，区别。。。

##### **安装的目录结构**
  1. 【**2.X**】版本时 npm 包的安装策略
     - 嵌套
  2. 【**3.X**】版本时 npm 包的安装策略
     - 平铺（没有完全平铺）

- **包的查找方式**
  - package.json目录查找，然后往父目录一直查找

#### ②供开发者开发插件

- 开发用到的工具 roll.js 或者 father 等

一般会生成三个文件夹， dist,module,es

- 本地调试，npm link(**软链，可以在了解一下硬链**)

> peerDependencies 介绍

### npm的一些问题
管理不便，浪费空间，耗时，混乱，平铺了，但没完全平铺等等

## Lerna

> 一个 monorepo 的管理工具，许多库都在用，他并不是管理 npm 的工具，但也能弥补一点npm的一些不足

只要在他的工作区间之内，下面所有项目的 npm 依赖可以一起装，可以提升安装到父目录，消除重复依赖，节约空间

工作区间内包之间相互引用，无需link (直接import 或者可以npm i 进行安装)

> yarn workspace 也能达到这个目的

## pnpm

> pnpm(performant npm)，即：高性能的npm。它由 npm/yarn 衍生而来，但却解决了 npm/yarn 内部潜在的 bug，并且极大了地优化了性能，扩展了使用场景

### 什么是 pnpm