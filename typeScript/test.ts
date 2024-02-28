function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with arguments: ${args.join(", ")}`);
    const result = originalMethod.apply(this, args);
    console.log(`Method ${propertyKey} returned: ${result}`);
    return result;
  };

  return descriptor;
}

class Example {
  @log
  greet(name: string) {
    return `Hello, ${name}!`;
  }
}

const example = new Example();
example.greet("John");
