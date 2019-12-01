1. 按官网教程安装，文件比较难下。https://flutter.dev/docs/get-started/install/windows
   1. 首次进入as会跳出让你设置代理，可以设置代理。但如果没有的话，在 Android Studio 安装目录 bin/idea.properties 文件中最后追加一句：disable.android.first.run=true
   2. 安装插件等一些操作，如果没有代理直接 File->Settings
  ->Apparence & Behavior->System Settings 
    ->Updates  -> use secure connnection  去掉勾选，就可以愉快的下载插件了
   3. 设置阿里镜像
   4. 新建项目的时候，flutter就填 C:\src\flutter，不要在另外install了
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


## [API](https://blog.csdn.net/u013600907/article/details/100098082 "flutter-API")
> 各种API： Widget、MaterialApp、Scaffold、Container、Text、Image、ClipOval、ListView...
1. **Widget**：先要自定义组件，那他们肯定都是继承自 1️⃣ StatelessWidget：无状态组件，状态不可变。2️⃣ StatefulWidget：有状态组件，持有的状态可能在widget生命周期改变。
2. **MaterialApp**：它封装了应用程序实现Material Design所需要的一个Widget。其中包括一些常用的属性：home、title、color、theme、routes...
3. **Scaffold**：Scaffold是Material Design布局机构的基本实现，此类提供了用于显示drawer（抽屉，比如：左边栏）、snackbar（通知，）和bottom sheet（底部按钮）的API 一般和MaterialApp一起使用。
   * **Scaffold.of**：显示 snackbar 或者 bottom sheet 的时候，需要使用当前的 BuildContext 参数调用 Scaffold.of 函数来获取 ScaffoldState 对象，然后使用 ScaffoldState.showSnackBar 和 ScaffoldState.showBottomSheet 函数来显示。
4. **Container**：Container是一个容器组件也叫布局组件(可以理解为前端的div，块级元素)，负责布局、绘画、定位和大小。
    | 属性名 | 类型 | 说明 |
    | :-: | :-: | :- |
    | key | Key | Container唯一表示符，用于查找更新 |
    | height | Double | 设置Container容器的高度，设置为double.infinity可以强制在高度上撑满 |
    | width | Double | 设置Container容器的宽度，设置为double.infinity可以强制在宽度上撑满，不设置，则根据child和父节点两者一起布局 |
    | decoration | Decoration | 背景样式，一般可定义为BoxDecoration，里边有color属性，设置背景颜色；border:边框样式，里边有Border.all()方法，可以添加color设置边框颜色 |
    | borderRadius | BorderRadius | 可以设置Container边框圆角BorderRadius.all(Radius.circular())方法;BorderRadius.circular()方法都可以来设置边框圆角当然也可以设置圆角的图片（也可以使用ClipOval组件来实现圆角）BoxDecoration中有一个image的属性 使用方法：[略](https://blog.csdn.net/u013600907/article/details/100098082 "点击查看") |
    | margin | EdgeInsets | 外边距，调用EdgeInsets.all()方法或EdgeInsets.fromLTRB(left, top, right, bottom)方法来设置参数。 |
    | padding | EdgeInsets | 内边距，调用EdgeInsets.all()方法或EdgeInsets.fromLTRB(left, top, right, bottom)方法来设置参数。 |
    | transform | Matrix4 | 位移：调用Matrix4.translationValues(x, y, z)；旋转：Matrix4.rotationZ(-0.5)//整数是顺时针? 负数是逆时针?；缩放：Matrix4.diagonal3Values(x, y, z)； |
    | ... | ... | ... |

5. **Text**：文字组件Text
6. **Image**：图片组件Image
    * Image组件引用本地图片方法
7. **ClipOval**：圆形裁切组件ClipOval
8. **ListView**：ListView组件



## 技术相关

##### 路由

1. onGenerateRoute 路由拦截 使用时，不管是用 if语句 还是 switch语句，记得一定要加 else 和 default。否则会报错！