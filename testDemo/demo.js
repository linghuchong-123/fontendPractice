const target = {  
  foo: 'bar',  
  _x: 'y', // 假设这是一个内部属性，我们不想直接暴露  
};  
  
const handler = {  
  get: function(target, prop, receiver) {  
    if (prop in target) {  
      // 如果属性存在于目标对象上，则返回属性值  
      return Reflect.get(...arguments);  
    } else if (prop === '_x') {  
      // 拦截对内部属性的访问，并返回一个不同的值  
      return '内部属性被拦截';  
    }  
    // 如果属性不存在，抛出异常  
    throw new ReferenceError(`Property "${prop}" does not exist.`);  
  }  
};  
  
const proxied = new Proxy(target, handler);  
  
console.log(proxied.foo); // 输出: bar  
console.log(proxied._x);  // 输出: 内部属性被拦截  
console.log(proxied.baz); // 抛出 ReferenceError: Property "baz" does not exist.
