var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.type = "animal";
        this.name = name;
    }
    Animal.prototype.bark = function () {
        console.log("叫");
    };
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog(name) {
        var _this = _super.call(this, name) || this;
        // 如果父类也是ts写的，那么子类调用父类方法就不再需要重新定义类型
        /* NOTE:constructor中除了可以接收实例化参数外，里面的代码也是会自动执行一遍 */
        _this.bark();
        _this.height = 10;
        return _this;
    }
    return Dog;
}(Animal));
console.log(new Dog("狗狗"));
var MyArray = /** @class */ (function () {
    function MyArray() {
        var _a;
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        this.data = [];
        (_a = this.data).push.apply(_a, items);
    }
    MyArray.prototype.push = function (item) {
        this.data.push(item);
    };
    MyArray.prototype.pop = function () {
        return this.data.pop();
    };
    Object.defineProperty(MyArray.prototype, "length", {
        get: function () {
            return this.data.length;
        },
        enumerable: false,
        configurable: true
    });
    MyArray.prototype.toString = function () {
        return this.data.toString();
    };
    return MyArray;
}());
var myArray = new MyArray(1, 2, 3);
myArray.push(4);
console.log(myArray.toString()); // "1,2,3,4"
console.log(myArray.pop()); // 4
var myArray2 = new MyArray("hello", "world");
myArray2.push("typescript");
console.log(myArray2.toString()); // "hello,world,typescript"
console.log(myArray2.pop()); // "typescript"
