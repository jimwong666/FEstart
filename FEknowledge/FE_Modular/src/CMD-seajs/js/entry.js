// seajs 配置

seajs.use(['../js/module_2'],function(data) { // 变态的地方~~
	var p = document.getElementsByTagName('p')[0];
	p.innerHTML = "color:" + data.color +"---size:" + data.size;
});