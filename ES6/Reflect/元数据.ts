/* 元数据概念目前（2024）还不是js标准库的一部分，而是由装饰器提案（如 reflect-metadata 库）提供的功能，因此需要安装reflect-metadata库 */
/* 使用tsc进行编译会将ts编译为js，但是不会处理模块之间的依赖关系，处理模块之间依赖需要打包工具，如vite rollup等;
  这里只是用tsc编译成js,那将还是import "reflect-metadata"，而js需要的是指出相对路径，所以就会报错 */
import "reflect-metadata";

const obj = {
  name: "why",
  age: 18,
};
Reflect.defineMetadata("sex", "man", obj);
Reflect.defineMetadata("address", "beijing", obj, "name");

// 1.读取对象上的元数据
const res1 = Reflect.getMetadata("name", obj);
console.log(res1);

// 2.读取对象上某个属性的元数据
const res2 = Reflect.getMetadata("address", obj, "name");
console.log(res2);
