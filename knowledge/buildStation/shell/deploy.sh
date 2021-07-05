#!/bin/bash

#Global Env
export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin
export LANG=en_US.UTF-8

export JAVA_HOME=/opt/lib/jdk1.7.0_79
export PATH=$JAVA_HOME/bin:$PATH

export NODE_HOME=/opt/node-v10.13.0
export PATH=$NODE_HOME/bin:$PATH

export M2_HOME=/opt/apache-maven-3.0.5
export PATH=$M2_HOME/bin:$PATH

#Deploy Env

soruce_dir=/home/abizaeps/aeps-all
version=$1
svn_add=http://192.168.16.81:8888/svn/CAIGOU/branches/${version}/aeps-all

logfile=/home/abizaeps/deploy.log.`date +%F-%T`
mvn_conf=/home/abizaeps/.m2/settings.xml


logPrint ()
{
  message="$1"
  echo "`date +'%F %T'` ${message}" >> $logfile
  echo "`date +'%F %T'` ${message}"
}

get_svn ()
{

rm -rf $soruce_dir/
rm -f $logfile
echo "svn checkout start"
echo $svn_add
logPrint "svn checkout start"
svn --username wangjian0818 --password wjwjwjwj export  $svn_add $soruce_dir/ >> $logfile 2>&1

    if [ $? == 0 ]
    then
            echo "svn checkout success"
            logPrint "svn checkout success"
    else
            echo "svn checkout failed"
            logPrint "svn checkout failed"
            exit 21
    fi

rm -f $soruce_dir/webapps-monitor/etc/assets.json

}

get_compile ()
{


logPrint "grunt start"
cd   $soruce_dir/ && \
7za x node_modules.7z >> $logfile 2>&1 && \
npx grunt >> $logfile  2>&1 

if [ $? == 0 ]
then
   echo "grunt success"
   logPrint "grunt success"
else
   logPrint "grunt failed"
   exit 21
fi


logPrint "maven start"
mvn clean install -s $mvn_conf -Dmaven.test.skip=true -Djdk.home="/opt/lib/jdk1.7.0_79/jre" -P prod >> $logfile 2>&1

if [ $? == 0 ]
then
        echo "maven success"
        logPrint "maven success"
else 
        echo "maven failed"
        logPrint "maven failed"
        exit 22
fi

}

if [ $# -ne 1 ];then
echo "Error
Usage is ./deploy.sh http://svnurl"
exit 1
fi

#main
get_svn
get_compile
