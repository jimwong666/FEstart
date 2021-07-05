#!/bin/bash

version=$1
pkgName=${version}_`date +%Y%m%d`.zip

pkgHome=/home/abizaeps/package/abiz_aeps
codeRoot=/home/abizaeps/aeps-all

if [ $# -ne 1 ];then
echo "Error, Usage is ./package.sh versionNUM"
exit 1
fi

rm -rf $pkgHome/ 
mkdir -p $pkgHome/

cd $pkgHome/ && mkdir -p logs/ modules/libs/  usr_conf/

#lib 
cp -a $codeRoot/webapps-monitor/lib $pkgHome/

#modules
find $codeRoot/  -name "*.war" -exec cp -a {} $pkgHome/modules/ \; 
rename '.war' '.app' $pkgHome/modules/*.war

jarlist=`find $codeRoot/ -name "*.jar" | grep '/WEB-INF/lib/'`
for i in $jarlist;
do
cp -a $i $pkgHome/modules/libs/
done


#etc
cp -a $codeRoot/webapps-monitor/etc $pkgHome/
cd $pkgHome/etc/ && unzip etc.zip && rm -f etc.zip


#usr_conf
cp -a $codeRoot/webapps-monitor/usr_conf/license.txt $pkgHome/usr_conf/

#other
cp -a $codeRoot/webapps-monitor/target/start.jar $pkgHome/start.d
cp -a $codeRoot/webapps-monitor/start.sh $codeRoot/webapps-monitor/start.bat  $pkgHome/

#zip
cd $pkgHome/../ 
rm -f $pkgName 
zip -r $pkgName abiz_aeps/
