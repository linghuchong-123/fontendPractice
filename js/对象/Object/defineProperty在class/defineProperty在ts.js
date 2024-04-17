var Dog = /** @class */ (function () {
    function Dog() {
        this.weight = "20kg";
    }
    return Dog;
}());
Object.defineProperty(Dog.prototype, "weight", {
    set: function (value) {
        console.log("调用了set");
        this._weight = value;
    },
    get: function () {
        console.log("调用了get");
        return this._weight;
    },
});
var dog = new Dog();
dog.weight = "30kg";
console.log(dog.weight);
