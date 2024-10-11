function deBounce(func, wait) {
  let timer;
  
  timer = setTimeout(() => {
    func();
  }, wait);
  clearTimeout(timer);
}

function func() {
  console.log("具体逻辑");
}
deBounce(func, 1000);
