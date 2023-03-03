var arr = [1, 2];
console.log(arr.length);
arr.length = 3;
console.log(Object.getOwnPropertyDescriptors(arr));
/* Object.defineProperty(arr, 'length',{
  get: function () {
    console.log('lengthget');
    return 3
  },
  set: function () {
    console.log('setlength');
    return 4
  }
}) */

const obj = {
  name:'zhangsan'
}
Object.defineProperty(obj, 'name', {
  /* configurable指的不是不能修改属性值，是指的修饰符writable enumerable； 当设置configurable为false后，当显示的声明writable为false(默认值)后就不能修改为true，但先指定writable为true还是可以改成默认值(false);感觉configurable描述符作用不大*/
  configurable: false,
});
Object.defineProperty(obj, 'name', {
  writable: false,
})
obj.name = 'lisi'
Object.defineProperty(obj, 'name', {
  writable: true
})
console.log(obj.name); // lisi