console.log(1111111111111111);
import Greeter from './module';
console.log(Greeter);

const a = new Greeter('zhangsan')
a.greeter()

const sum = (a: number, b: number): number => {
  return a + b;
};
console.log(sum(1, 2));