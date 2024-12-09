/* 元数据概念目前（2024）还不是js标准库的一部分，而是由装饰器提案（如 reflect-metadata 库）提供的功能，因此需要安装reflect-metadata库 */

/* 使用tsc进行编译会将ts编译为js，但是不会处理模块之间的依赖关系，处理模块之间依赖需要打包工具，如vite rollup等;
  这里只是用tsc编译成js,那将还是import "reflect-metadata"，而js需要的是指出相对路径，所以就会报错 */
// import "reflect-metadata";

const obj = {
  name: "why",
  age: 18,
};
// note: defineMetadata(key, value, target, propertyKey)
Reflect.defineMetadata("sex", "male", obj);
// note:defineMetadata(key, value, target, propertyKey)
Reflect.defineMetadata("address", "beijing", obj, "name");

// 1.读取对象上的元数据
const res1 = Reflect.getMetadata("sex", obj);
console.log(res1);

// 2.读取对象上某个属性的元数据
const res2 = Reflect.getMetadata("address", obj, "name");
console.log(res2);

/* 3.获取对象自身的所有元数据键 */
const metadataKeys = Reflect.getOwnMetadataKeys(obj);
// 遍历元数据键并获取对应的元数据值
metadataKeys.forEach((key) => {
  const metadataValue = Reflect.getMetadata(key, obj);
  console.log(`Key: ${key}, Value: ${metadataValue}`);
});
// 如果需要获取对象属性上的元数据，可以这样做
const propertyKeys = Object.keys(obj);
propertyKeys.forEach((propertyKey) => {
  const propertyMetadataKeys = Reflect.getOwnMetadataKeys(obj, propertyKey);
  propertyMetadataKeys.forEach((metadataKey) => {
    const metadataValue = Reflect.getMetadata(metadataKey, obj, propertyKey);
    console.log(
      `Property: ${propertyKey}, Metadata Key: ${metadataKey}, Value: ${metadataValue}`
    );
  });
});

/* ----------------使用装饰器------------------- */
const SetMetadata = <T>(key: string, value: T) => {
  return (target: new (...args: any[]) => any) => {
    console.log("target类型", target, typeof target);
    Reflect.defineMetadata(key, value, target);
    return target;
  };
};

@SetMetadata<string>("name", "装饰器定义的元数据")
class Person {}

const decorateMetadata = Reflect.getMetadata("name", Person);
console.log(decorateMetadata);
