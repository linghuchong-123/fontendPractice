/* 元数据概念目前（2024）还不是js标准库的一部分，而是由装饰器提案（如 reflect-metadata 库）提供的功能，因此需要安装reflect-metadata库 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* 使用tsc进行编译会将ts编译为js，但是不会处理模块之间的依赖关系，处理模块之间依赖需要打包工具，如vite rollup等;
  这里只是用tsc编译成js,那将还是import "reflect-metadata"，而js需要的是指出相对路径，所以就会报错 */
// import "reflect-metadata";
var obj = {
    name: "why",
    age: 18,
};
// note: defineMetadata(key, value, target, propertyKey)
Reflect.defineMetadata("sex", "male", obj);
// note:defineMetadata(key, value, target, propertyKey)
Reflect.defineMetadata("address", "beijing", obj, "name");
// 1.读取对象上的元数据
var res1 = Reflect.getMetadata("sex", obj);
console.log(res1);
// 2.读取对象上某个属性的元数据
var res2 = Reflect.getMetadata("address", obj, "name");
console.log(res2);
/* 3.获取对象自身的所有元数据键 */
var metadataKeys = Reflect.getOwnMetadataKeys(obj);
// 遍历元数据键并获取对应的元数据值
metadataKeys.forEach(function (key) {
    var metadataValue = Reflect.getMetadata(key, obj);
    console.log("Key: ".concat(key, ", Value: ").concat(metadataValue));
});
// 如果需要获取对象属性上的元数据，可以这样做
var propertyKeys = Object.keys(obj);
propertyKeys.forEach(function (propertyKey) {
    var propertyMetadataKeys = Reflect.getOwnMetadataKeys(obj, propertyKey);
    propertyMetadataKeys.forEach(function (metadataKey) {
        var metadataValue = Reflect.getMetadata(metadataKey, obj, propertyKey);
        console.log("Property: ".concat(propertyKey, ", Metadata Key: ").concat(metadataKey, ", Value: ").concat(metadataValue));
    });
});
/* ----------------使用装饰器------------------- */
var SetMetadata = function (key, value) {
    return function (target) {
        console.log("target类型", target, typeof target);
        Reflect.defineMetadata(key, value, target);
        return target;
    };
};
var Person = /** @class */ (function () {
    function Person() {
    }
    Person = __decorate([
        SetMetadata("name", "装饰器定义的元数据")
    ], Person);
    return Person;
}());
var decorateMetadata = Reflect.getMetadata("name", Person);
console.log(decorateMetadata);
