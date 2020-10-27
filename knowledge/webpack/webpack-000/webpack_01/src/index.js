let qqq = require('./ab.js');
require('./index.css');
require('./b.less');

console.log(qqq);

@log
class A {
	a = 1;
}
var a = new A();
console.log(a.a);

function log(target){
	console.log(target);
}