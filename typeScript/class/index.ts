class Animal {
  type: string;
  name: string;

  constructor(name) {
    this.type = "animal";
    this.name = name;
  }
  bark() {
    console.log("叫");
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name);
    // 如果父类也是ts写的，那么子类调用父类方法就不再需要重新定义类型
    /* NOTE:constructor中除了可以接收实例化参数外，里面的代码也是会自动执行一遍 */
    this.bark();
  }
}

console.log(new Dog("狗狗"));
