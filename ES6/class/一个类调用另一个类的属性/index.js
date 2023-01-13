class Room0 {
  constructor(id, flag) {
    /*
      id：必传参数。
      flag: 可选参数，当工程内部其他类调用时会传一个0，当使用者调用时不需要传参数。
      可以满足这样的需求：另一个类只想要这个类中的属性，但是不想传必传参数。比如id是dom元素的id，工程内部是无法知道的，只有使用者才会知道。
      但是这种不适用于属性值是new 出来的场景,每new一次都会开辟一片新的地址，所以拿到的属性值还是和原来的不一样。
    */
    if (id == undefined && flag == 0) console.error("id为必传参数");
  }
  size = {
    width: "10m",
    height: "20m",
  };
}

class Car0 {
  constructor() {}
  // 如何能拿到Room的size属性
  fun() {
    const length = new Room0(0, 0).size.width;
    console.log(length);
  }
}

const car0 = new Car0();
car0.fun();
/* ------------------------------------------------------------- */
class Size {
  width = "10m";
  height = "20m";
}
class Room {
  constructor(id, flag) {
    if (id == undefined && flag !== 0) console.error("id为必传参数");
  }
  size = new Size();
}

class Car {
  constructor() {}
  // 如何能拿到Room的size属性
  fun() {
    const length = new Room(0, 0).size;
    console.log(length);
    return length;
  }
}
const room = new Room(0, 0);
const car = new Car();
console.log(car.fun() === room.size); // false
