1. 按官网教程安装，文件比较难下。https://flutter.dev/docs/get-started/install/windows
2. 安装Flutter和Dart插件
3. 各种SDK:
  * 进 setting -> Languages & Frameworks -> Dart和Flutter 设置SDK路径
  * 进 setting -> Appearance & Behavior -> System Setting -> Android SDK -> 下载机型（精简一点,wear、tv啥的去掉，太大占空间）

4. 右击 pubspec.yaml ，安装依赖
		



爬坑：
1. 代理不太好，gradle会下载失败。报错：
  <p align="center">
  <img src="https://github.com/jimwong666/FEstart/blob/master/knowledge/flutter/img/flutter_error_1.png" alt="flutter爬坑1">
  </p>
  <p align="center">
  <img src="https://github.com/jimwong666/FEstart/blob/master/knowledge/flutter/img/flutter_error_2.png" alt="flutter爬坑2">
  </p>
  解决方法：更改已有版本文件
  * gradle-wrapper.properties -> distributionUrl=https\://services.gradle.org/distributions/gradle-x.x.x-all.zip 
  * build.gradle -> ext.kotlin_version = 'x.x.xx' 和 classpath 'com.android.tools.build:gradle:x.x.x'


## API
> 各种API:
> Widget、MaterialApp、Scaffold、Container、Text、Image、ClipOval、ListView...
1. <Widget>：先要自定义组件，那他们肯定都是继承自 1️⃣ StatelessWidget：无状态组件，状态不可变。2️⃣ StatefulWidget：有状态组件，持有的状态可能在widget生命周期改变。
2. <MaterialApp>：它封装了应用程序实现Material Design所需要的一个Widget。其中包括一些常用的属性：home、title、color、theme、routes...
3. <Scaffold>：Scaffold是Material Design布局机构的基本实现，此类提供了用于显示drawer（抽屉，比如：左边栏）、snackbar（通知，）和bottom sheet（底部按钮）的API 一般和MaterialApp一起使用。
4. <Container>：Container是一个容器组件也叫布局组件(可以理解为前端的div，块级元素)，负责布局、绘画、定位和大小。
| 属性名 | 类型 | 说明 |
| :-: | :-: | :-: |
| key | Key | Container唯一表示符，用于查找更新 |



## 技术相关

##### 路由

1. onGenerateRoute 路由拦截 使用时，不管是用 if语句 还是 switch语句，记得一定要加 else 和 default。否则会报错！