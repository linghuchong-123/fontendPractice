class Cat {
  constructor() {
    // this.weight = "20kg"; // 使用this实例，能被监听到
  }
  weight = "20kg";
}
// Cat.prototype.weight = "20kg"; // 定义在原型上，能被监听到
/* 
  在js中同样的方式，不能监听类的实例属性变化，在ts可以
*/
Object.defineProperty(Cat.prototype, "weight", {
  set(value) {
    console.log("调用了set");
    this._weight = value;
  },
  get() {
    console.log("调用了get");
    return this._weight;
  },
});

const cat = new Cat();
console.log(cat.__proto__ === Cat.prototype); // true
cat.weight = "10kg";

console.log(cat.weight);

console.log("-----------------------------");

function MyClass() {
  this.x = 10;
}

Object.defineProperty(MyClass.prototype, "x", {
  get() {
    console.log("调用了get");
    return this.storedX;
  },
  set(x) {
    console.log("调用了set");
    this.storedX = x;
  },
});

const a = new MyClass();
console.log(a.__proto__ === MyClass.prototype); // true,也就是对一个对象的某个属性监听可以被继承，
const b = new MyClass();
a.x = 1;
console.log(b.x); // undefined
