let objB = {
  data: 2,
  next: 1,
};

const objA = {
  data: 1,
  next: objB.data,
};

const objNew = {
  data: 4,
  next: null,
};
/* =号直接赋值称为对象的引用（类似于快捷方式，只是多了一个内存地址的引用）；不同于对象的深浅拷贝，对象引用两个对象指向同一个内存地址，修改一个，另一个也会变化 */
const objA2 = objA;
objA2.next = objNew.data;
objA2.data = 5;
console.dir(objA); // {data:5,next:4},改变了

/* objB = 号进行赋值，又重新开辟了一个内存地址，而objB2还是指向原来的内存地址 */
const objB2 = objB;
objB = {
  new: 5,
};
console.log(objB2); // {data:2,next:3}
console.log(objB); // {new:5}

/* ---------------object.assign-------------------- */
// Object.assign虽然是浅拷贝，但是不同于=号赋值，assign两个对象是指向不同的内存地址
const objC = {
  name: "zhangsan",
};
const objD = {};
Object.assign(objD, objC);

objC.name = "lisi";
console.log(objC); // {name:"lisi"}
console.log(objD); // {name:"zhangsan"}
