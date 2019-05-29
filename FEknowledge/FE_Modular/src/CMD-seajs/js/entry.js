//其他配置

seajs.use(['../js/module_2','../js/module_1'],function(data) {
	var p = document.getElementsByTagName('p')[0];
	p.innerHTML = "color:" + data.color +"---size:" + data.size;
});