define(function (require, exports, module) {
	var size = require("./module_1");

	var color = "red";
	
	module.exports = {
		color: color,
		size: size.size + 1
	}
})