class Animal {
  public onChange?: (status, position) => void;
  constructor() {
    window.addEventListener("mousedown", () => {
      if (this.onChange) {
        this.onChange("startDrag", "0,0");
      }
    });
  }
}
const animal = new Animal();
animal.onChange = (status, position) => {
  // 函数逻辑正常执行；调用的时候用的是实参
  if (status === "startDrag") {
    console.log(status, position);
  }
};
