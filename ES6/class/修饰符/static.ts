/* 只有添加static修饰符能直接被类本身访问 */
class Room {
  width = "180cm";
  static height = "150cm";
  static effect() {
    console.log("能用于睡觉");
    const length = this.width; // 静态方法不能通过this访问实例属性
    const length2 = this.height; // 静态方法能访问静态属性
  }
  static roomWidth = this.width; // 静态属性不能通过this访问实例属性
  static roomHeight = this.height; // 静态属性能访问静态属性
}

Room.effect();
