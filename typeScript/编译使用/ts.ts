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

class Greeter {
  static standardGreeting = "Hello, there";
  greeting: string;
  greet() {
    if (this.greeting) {
          return "Hello, " + this.greeting;
      }
    else {
          return Greeter.standardGreeting;
      }
  }
}

let greeter1: Greeter;
greeter1 = new Greeter();
console.log(greeter1.greet());

let greeterMaker: typeof Greeter = Greeter;
greeterMaker.standardGreeting = "Hey there!";

let greeter2: Greeter = new greeterMaker();
console.log(greeter2.greet());