var a = require('./module_1.js');
var b = require('./module_2.js');

var p = document.getElementsByTagName('p')[0];
p.innerHTML = a + "---" + b;