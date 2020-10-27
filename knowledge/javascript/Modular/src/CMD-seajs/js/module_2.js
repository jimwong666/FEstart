define(function (require, exports, module) {
	var color = "red";
	var size = require("./module_1");

	module.exports = {
		color: color,
		size: size.size + 1
	}
})