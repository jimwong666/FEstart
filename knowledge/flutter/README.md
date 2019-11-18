1.按官网教程安装，文件比较难下。https://flutter.dev/docs/get-started/install/windows
2.安装Flutter和Dart插件
3.各种SDK
  进 setting -> Languages & Frameworks -> Dart和Flutter 设置SDK路径
  进 setting -> Appearance & Behavior -> System Setting -> Android SDK -> 下载机型（精简一点）

4.右击 pubspec.yaml ，安装依赖
		



爬坑：
1. 代理不太好，gradle会下载失败。报错：
  <p align="center">
  <img src="https://miro.medium.com/max/5604/0*mS7vEiMIgqRwI4vZ" alt="flutter爬坑1">
  </p>
  <p align="center">
  <img src="https://miro.medium.com/max/5604/0*mS7vEiMIgqRwI4vZ" alt="flutter爬坑2">
  </p>
  解决方法：更改已有版本文件
  * gradle-wrapper.properties -> distributionUrl=https\://services.gradle.org/distributions/gradle-x.x.x-all.zip 
  * build.gradle -> ext.kotlin_version = 'x.x.xx' 和 classpath 'com.android.tools.build:gradle:x.x.x'