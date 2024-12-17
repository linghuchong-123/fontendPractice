// https://juejin.cn/post/7277835425960099874
function dec(value, context: ClassFieldDecoratorContext) {
  console.log(context);
  return (initialValue) => {
    console.log(initialValue);

    return initialValue;
  };
}

function enhancer(target: any, propertyKey: string) {
  console.log(target); // Person {}
  console.log("key " + propertyKey); // key name
}
class Animal {
  constructor(public name: string) {}

  @dec
  public weight: number = 10;
}

const animal = new Animal("dog");
console.log(animal.weight);
