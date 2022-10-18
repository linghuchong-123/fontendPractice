/*
 * @Description:经过demo实验在class类上增加方法，对于内存的占用而言微乎其微；是在new的过程中增加的内存占用，每多new一份实例就多占用一份内存；增加属性会在new的时候明显增加内存占用
 * @Version: 2.0
 * @Author: yangsen
 * @Date: 2022-07-26 15:04:45
 * @LastEditors: yangsen
 * @LastEditTime: 2022-08-18 11:22:04
 */

class Foo {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.name = "zhangsan";
    this.height = "181cm";
    this.weight = "70kg";
    this.sex = "男";
  }

  toString() {
    return this.x + "," + this.y;
  }
  toString1() {
    return this.x + "," + this.y;
  }
  toString2() {
    return this.x + "," + this.y;
  }
  toString3() {
    return this.x + "," + this.y;
  }

  toString4() {
    return this.x + "," + this.y;
  }
  toString5() {
    return this.x + "," + this.y;
  }
  toString6() {
    let a = 1;
    for (let i = 0; i < 1000000; i++) {
      a += a;
    }
    return a;
  }
}
const foo = new Foo(1, 2);
foo.name = "lisi";
console.log(foo);
