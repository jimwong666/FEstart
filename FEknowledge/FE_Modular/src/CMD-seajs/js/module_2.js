define(function (require, exports, module) {
	var color = "red";
	var sizez = require.async("./module_1");
	module.exports = {
		color: color,
		size: sizez.size
	}
})