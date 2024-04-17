class Dog {
  public readonly name: string = "旺财";
  constructor() {
    this.name = "小花";
  }
}
const dog = new Dog();

/* 
  NOTE: readonly修饰符对实例而言是不可以修改的，但是在class内部还是可以修改
*/
// dog.name = "大黑";
console.log(dog.name); // 小花
0