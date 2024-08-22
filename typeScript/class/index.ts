class Animal {
  type: string;
  name: string;
  height: number; // ts可以只在父类中定义类型而不进行赋值，子类中直接使用this.属性，进行赋值

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

    this.height = 10;
  }
}

console.log(new Dog("狗狗"));

class MyArray<T> {
  private data: T[] = [];

  constructor(...items: T[]) {
    this.data.push(...items);
  }

  push(item: T): void {
    this.data.push(item);
  }

  pop(): T | undefined {
    return this.data.pop();
  }

  get length(): number {
    return this.data.length;
  }

  toString(): string {
    return this.data.toString();
  }
}

const myArray = new MyArray<number>(1, 2, 3);
myArray.push(4);
console.log(myArray.toString()); // "1,2,3,4"
console.log(myArray.pop()); // 4

const myArray2 = new MyArray<string>("hello", "world");
myArray2.push("typescript");
console.log(myArray2.toString()); // "hello,world,typescript"
console.log(myArray2.pop()); // "typescript"
