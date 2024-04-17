class Dog {
  constructor() {}
  weight = "20kg";
}

Object.defineProperty(Dog.prototype, "weight", {
  set(value) {
    console.log("调用了set");
    this._weight = value;
  },
  get() {
    console.log("调用了get");
    return this._weight;
  },
});

const dog = new Dog();
dog.weight = "30kg";

console.log(dog.weight);
