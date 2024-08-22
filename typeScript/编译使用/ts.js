/*
 * @Description:
                编译步骤：
                第一步全局安装
                pnpm add -g typescript
                第二步
                在对应文件夹下执行 tsc tsFileName.ts;
                会在文件夹下生成同文件名的js文件
 * @Version: 2.0
 * @Author: yangsen
 * @Date: 2022-07-26 10:32:45
 * @LastEditors: yangsen
 * @LastEditTime: 2022-07-26 11:44:52
 */
var Greeter = /** @class */ (function () {
    function Greeter() {
    }
    Greeter.prototype.greet = function () {
        if (this.greeting) {
            return "Hello, " + this.greeting;
        }
        else {
            return Greeter.standardGreeting;
        }
    };
    Greeter.standardGreeting = "Hello, there";
    return Greeter;
}());
var greeter1;
greeter1 = new Greeter();
console.log(greeter1.greet());
var greeterMaker = Greeter;
greeterMaker.standardGreeting = "Hey there!";
var greeter2 = new greeterMaker();
console.log(greeter2.greet());
