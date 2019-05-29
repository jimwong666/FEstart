// seajs 的简单配置
seajs.config({
	base: "../js/",
	alias: {
	  
	}
  })

seajs.use(['../js/module_2'],function(data) { // 变态的地方~~
	var p = document.getElementsByTagName('p')[0];
	p.innerHTML = "color:" + data.color +"---size:" + data.size;
});