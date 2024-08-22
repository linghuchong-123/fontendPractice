class Animal {
  constructor(name) {
    this.name = name;

    /* 在constructor中定义的方法不能被继承 */
    function bark() {
      console.log("汪汪汪");
    }
  }
  /* class中定义的方法，是实例上的方法，可以被继承 */
  run() {
    console.log("跑跑");
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name);
    // this.bark() // this.bark is not a function
    this.run();
  }
}

const dog = new Dog("狗狗");
