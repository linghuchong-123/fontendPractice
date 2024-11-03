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
import { addListener, launch } from "devtools-detector";
const view = document.createElement("div");
document.body.appendChild(view);

// 1. add listener
addListener(
  (isOpen) =>
    (view.innerText = isOpen
      ? "devtools status: open"
      : "devtools status: close")
);
// 2. launch detect
launch(); // 如果这行不被输出，可能表示开发者工具已打开
