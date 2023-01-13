let room = {
  size: {
    width: "10m",
    height: "8m",
  },
};

const externalFun = (callback) => {
  console.log(room);
  console.log(callback);
  callback.call(room);
};

class Room {
  constructor() {
    this.fun();
  }
  size = {
    width: "10m",
    height: "8m",
  };
  fun() {
    console.log(this);
    this.size.width;
    externalFun(this.fun);
  }
}
room = new Room();
