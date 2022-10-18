debugger;
/* 执行son.js是因为father.js中的import引用到了son.js，所以由father.js中跳转过来不会立即执行import语句，会先执行下面的语句，等执行完了会回过头来执行import语句再跳回father.js ；这样的设计可以避免不同文件之间的来回跳转*/
import { a } from "./es6模块化father.js";
debugger;
export let b = "abc";
b = "cba";
debugger;
/* 相互传递变量但是异步调用是没有问题的；*/
setTimeout(() => {
  console.log(a);
}, 1);
