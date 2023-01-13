/* NOTE: get() */
// Reflect.get方法查找并返回target对象的name属性，如果没有该属性，则返回undefined。
var myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  },
};
Reflect.get(myObject, "foo"); // 1
Reflect.get(myObject, "bar"); // 2
Reflect.get(myObject, "baz"); // 3
// 如果name属性部署了读取函数（getter），则读取函数的this绑定receiver。如果没有设置receiver，读取函数本身的值。
var myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  },
};
var myReceiverObject = {
  foo: 4,
  bar: 4,
  num: 10,
};
console.log(Reflect.get(myObject, "baz")); // 3
console.log(Reflect.get(myObject, "baz", myReceiverObject)); // 8
// 如果name属性部署了读取函数（getter）,则读取函数的this绑定receiver。getter函数内可以指定对象本身没有，但是receiver有的属性。
var myObject2 = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.num + this.bar;
  },
  get age() {
    return 100;
  },
};
var myReceiverObject2 = {
  foo: 4,
  bar: 4,
  num: 10,
  age: 99,
};
console.log(Reflect.get(myObject2, "baz")); // NaN
console.log(Reflect.get(myObject2, "baz", myReceiverObject2)); // 8
// 当getter函数中没有this时，有没有receiver都是一样。
console.log(Reflect.get(myObject2, "age")); // 100
console.log(Reflect.get(myObject2, "age", myReceiverObject2)); // 100
// 如果第一个参数不是对象，Reflect.get方法会报错。
Reflect.get(1, "foo"); // 报错
Reflect.get(false, "foo"); // 报错
