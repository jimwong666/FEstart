import * as m2 from "./module_2.mjs/index.js";
console.log(666);
var p = document.getElementsByTagName('p')[0];
p.innerHTML = "color:" + m2.color +"---size:" + m2.size;