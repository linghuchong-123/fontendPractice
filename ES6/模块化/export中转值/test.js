/* import * as ... from ...
  这种语法能够导入，导入文件的所有导出，包括export 与export default两种的导出
*/
import * as b from './forward.js';

console.dir(b);
console.log(b.c);
console.log(b.d);
console.log(b.e);
console.log(b.default);
