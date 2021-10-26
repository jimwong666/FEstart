## CentOS 安装node环境
- 源码安装包：
  ```
	yum install wget
	wget https://nodejs.org/dist/v12.22.1/node-v12.22.1-linux-x64.tar.xz
	xz -d node-v12.22.1-linux-x64.tar.xz
	tar -xf node-v12.22.1-linux-x64.tar

	ln -sf /home/node-v12.22.1-linux-x64/bin/npm /usr/bin/npm
	ln -sf /home/node-v12.22.1-linux-x64/bin/node /usr/bin/node
  ```
- yum方式安装：
  ```
	curl --silent --location https://rpm.nodesource.com/setup_12.x | sudo bash
	yum -y install nodejs
  ```
- nvm方式安装：
  ```
	curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh | bash
	%or%
	wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.35.0/install.sh | bash
	
	source ~/.bashrc
  ```

## GCP（Google Cloud Platform）入门
日期：2021/2/2

## 创建实例
> 略...
> 选择<台湾省>或者<香港>的服务器，访问速度会快点

## 配置实例（用户管理、网络设置）

- 链接ssh
- 输入 **sudo passwd root**，为root用户设置密码
- 输入 **su root**，使当前用户具备 root 权限
- 输入 **vim /etc/ssh/sshd_config**，编辑 ssh 服务配置文件
- 找到 **PermitRootLogin**和**PasswordAuthentication**，把他们后面的no改成yes，即让root用户可以登录
- 顺便把ssh端口号（Port）改成高端口（范围10000~65535），避免密码在默认端口被暴力破解，把**Port**的值改成想要的端口（比如：16666）
- 然后按下**ESC**，然后输入 **:wq** 保存并退出
- 此时你发现用其他ssh还是登不上
- 因为某种原因，只改 Port 无用，还要输入**semanage port -a -t ssh_port_t -p tcp 16666**命令，centeros 8上没有安装semanage，所以要先安装一下semanage，输入**dnf install policycoreutils-python-utils**进行安装
- 要重启一下，至于重启输命令还是到控制台重启，暂时不清楚，忘了。命令有 **/etc/init.d/ssh restart**、**service sshd restart**
- 然后还要配置防火墙，不然也是登不上的
- 点击实例上的三个点-选择查看网络详情-选择防火请-创建防火请规则
- 首先创建accessinall流量方向入站-允许-网络中的所有实例-来源 IP 地址范围 0.0.0.0/0-全部允许
- 线面创建accessoutall出站-允许-网络中的所有实例等等...
- 此时用ssh工具就能连上了

## 安装Node环境

- 需要安装wget，**yum install wget**
- 然后下载Node **wget https://nodejs.org/dist/v14.15.4/node-v14.15.4-linux-x64.tar.xz**
- 下载完成后解压，**xz -d node-v14.15.4-linux-x64.tar.xz**，然后**tar -xf node-v14.15.4-linux-x64.tar**
- 解压完成后 输入 ll 回车就可以看到一个node-v14.15.4-linux-x64文件夹，接着把文件夹里的node和npm软链到/usr/bin目录下（echo $PATH可以查看你的服务器配置的地方是哪）
- 输入一下命令 **ln -sf /home/node-v14.15.4-linux-x64/bin/npm /usr/bin/npm**，和 **ln -sf /home/node-v14.15.4-linux-x64/bin/node /usr/bin/node**
- yum install git
- 下面就交个你们了~

## 一些问题
1. 用 VScode插件 连接数据库时会报错。原因是 mysql8.0 更改了密码默认的认证插件为 Caching_sha2_password，原来是 mysql_native_password，更改密码为 mysql_native_password 认证就可以了。
```sql
USE user;
ALTER user'root'@'%' IDENTIFIED WITH mysql_native_password BY 'your password';
```
2. 当从 github clone 项目一直失败时，可以把 https://... 换成 git://...



