/* path是node内置模块，直接require引用，无需下载 */
const path = require('path')

// console.log(__dirname); // D:\3D\fontendPractice\node 返回当前文件所在目录
// console.log(__filename); // D:\3D\fontendPractice\node\path模块.js  返回当前文件所在目录及文件名

const resolve1 = path.resolve('./path.join path.resolve/test.js')
/* D:\3D\fontendPractice\node\path.join path.resolve\test.js resolve自动拼接了工作目录 */
// console.log(resolve1); 
const resolve2 = path.resolve(__dirname, './path.join path.resolve/test.js')
// console.log(resolve2);
/* \path.join path.resolve\test.js  /开头时不会拼接前面的路径 */
const resolve3 = path.resolve(__dirname, '/path.join path.resolve/test.js')
// console.log(resolve3);
/* D:\3D\fontendPractice\node\path.join path.resolve\test.js  相对路径都能得到完整路径 */
const resolve4 = path.resolve(__dirname, '../node/path.join path.resolve/test.js')
// console.log(resolve4);


const join1 = path.join('./path.join path.resolve/test.js')
/* path.join path.resolve\test.js join不会自动拼接工作目录 */
// console.log(join1);
const join2 = path.join(__dirname, './path.join path.resolve/test.js')
// console.log(join2);
/* D:\3D\fontendPractice\node\path.join path.resolve\test.js  /开头也会正常拼接前面的路径 */
const join3 = path.join(__dirname, '/path.join path.resolve/test.js')
// console.log(join3);
/* D:\3D\fontendPractice\node\path.join path.resolve\test.js  相对路径都能得到完整路径 */
const join4 = path.join(__dirname, '../node/path.join path.resolve/test.js')
// console.log(join4);