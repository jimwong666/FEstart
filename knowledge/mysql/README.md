# mySQL

## 安装

### windows 平台

> windows 平台下正常安装就行了

1. 下载下来的安装包没有配置文件，如有需要，自行在根目录下新建 my.ini，如下：
```ini
[mysql]

# 设置mysql客户端默认字符集
default-character-set=utf8
 
[mysqld]

#设置端口
port = 3306
 
# 设置mysql的安装目录
basedir=D:\mysql-8.0.25-winx64
 
# 设置mysql数据库的数据的存放目录
datadir=D:\mysql-8.0.25-winx64\data
 
# 允许最大连接数
max_connections=200
 
# 服务端使用的字符集默认为8比特编码的latin1字符集
character-set-server=utf8
 
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB

shared-memory
```

### linux 平台

> 系统版本：centeOS 7.9
> mySQL版本：8.0+

开始用的 yum 安装，但在安装sql服务的时候会有问题，网上查证也有小伙伴遇到相同的问题，暂时无解~

所以采取了下载安装包安装的模式：

1. 检查系统是否已经安装了 MySQL，执行命令 rpm -qa | grep mysql，如果已经安装了，逐个清除：yum remove mysql-community-common-xxxxxx，也可以快速删除：yum remove  mysql mysql-server mysql-libs mysql-server，找出和卸载残留：find / -name mysql 和 whereis mysql，然后逐条删除：rm -rf xxxxx
2. 删除机器自带的 MariaDB，rpm -pa | grep mariadb 然后 
yum -y remove xxxxx
3. 找到相应的目录，执行 wget https://dev.mysql.com/get/Downloads/MySQL-8.0/mysql-8.0.25-1.el7.x86_64.rpm-bundle.tar 下载 mysql 8.0.25 的压缩包，解压 tar -xf mysql-8.0.25-1.el7.x86_64.rpm-bundle.tar
4. 只能装依赖：yum install mysql-community-{client,common,devel,embedded,libs,server}-*
5. 此时已经安装好了
6. 启动mysqld服务，并设为开机自动启动。命令：
```bash
systemctl start mysqld.service
systemctl enable mysqld.service
```
7. 在文件中找到初始密码：grep "password" /var/log/mysqld.log
8. 登录：mysql -u root -p，设置密码（注意Mysql8密码设置规则必须是大小写字母+特殊符号+数字的类型）：ALTER USER 'root'@'localhost' IDENTIFIED BY 'new password';
9. 开启远程访问权限：
   1.  GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '密码' WITH GRANT OPTION; 然后 FLUSH PRIVILEGES;（%代表所有Ip,此处也可以输入Ip来指定Ip）
   2.  或者也可以通过修改表来实现远程：use mysql; 然后 update user set host = '%' where user = 'root'; 最后 select host, user from user;
10. 设置数据库字符集（如果需要的话）
11. 设置自动重启 systemctl enable mysqld 和 systemctl daemon-reload，然后重启服务 systemctl restart mysqld
12. 完成，进数据库用 status 查看数据库状态，防火墙相关本章没涉及到，应为我的centeos是关着的...

#### linux中MySQL配置所在目录
1. /etc/my.cnf 这是mysql的主配置文件
2. /var/lib/mysql mysql数据库的数据库文件存放位置
3. /var/log mysql数据库的日志输出存放位置