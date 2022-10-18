debugger;
export let a = 1;
console.log(a);
a = a * 3;

debugger;
/* 一个js文件中永远会最先执行 import 语句，无论import写在什么地方;
  所以两个文件想要相互传递一个变量并且同步调用，显然就会报错，这里son文件报错a未定义
  相互传递变量非同步调用或者相互传递函数是没有关系的
*/
import { b } from "./es6模块化son.js";
console.log(b);
