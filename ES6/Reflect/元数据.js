/* 元数据概念目前（2024）还不是js标准库的一部分，而是由装饰器提案（如 reflect-metadata 库）提供的功能，因此需要安装reflect-metadata库 */
import "reflect-metadata";
var obj = {
    name: "why",
    age: 18,
};
Reflect.defineMetadata("sex", "man", obj);
Reflect.defineMetadata("address", "beijing", obj, "name");
// 1.读取对象上的元数据
var res1 = Reflect.getMetadata("name", obj);
console.log(res1);
// 2.读取对象上某个属性的元数据
var res2 = Reflect.getMetadata("address", obj, "name");
console.log(res2);
