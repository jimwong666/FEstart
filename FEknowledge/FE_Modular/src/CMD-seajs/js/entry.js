//其他配置

seajs.use(['../js/module_2'],function(data) {
	var p = document.getElementsByTagName('p')[0];
	p.innerHTML = data.color + data.size;
});