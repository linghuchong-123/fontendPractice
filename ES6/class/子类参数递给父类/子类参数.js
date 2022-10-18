class Father {
  constructor(name) {
    this.name = name;
  }
}

class Son extends Father {
  constructor(name, age) {
    // 通过super能够在子类中传递参数给父类
    super(name);
    this.age = age;
  }
}

const son = new Son("zhangsan", 18);
console.log(son);
