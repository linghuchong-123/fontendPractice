/** 防抖：再次触发，重新计时；场景：窗口resize、搜索框、按钮点击(登录请求)
 *  节流：指定时间内触发一次；窗口滚动、按钮点击（点击按钮会某种操作的那种）
 */

/** 防抖 */
// 错误
function deBounceError(func, wait) {
  let timer;
  clearTimeout(timer); // 放在这里没用，下面的定时器还是一样会执行
  timer = setTimeout(() => {
    func();
  }, wait);
  clearTimeout(timer); // 放在这里不行，清除了定时器就永远不会执行了
}

// 正确
function deBounce(func, wait) {
  // 有了上面错误的写法，这里你应该理解了为什么使用return函数的写法
  // 使用闭包，方位词法作用域外的变量，timer变量用于保存定时器，这样清除的是上一次的定时器
  let timer;
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func();
    }, wait);
  };
}

function func() {
  console.log("具体逻辑", this);
}
const myDebounce = deBounce(func, 1000);
window.addEventListener("resize", myDebounce);

////////////////////////////////////////////
/** 节流 */
function throttle(func, time) {}
