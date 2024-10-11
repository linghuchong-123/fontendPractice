const arr = [1, 2, 3, 4, 5];
let count = 0;
arr.forEach((value, index) => {
  count++;
  if (value == 1) {
    arr.splice(index, 2);
    arr.push(index + 10);
  }
});
console.log(arr);
console.log("循环次数", count);
