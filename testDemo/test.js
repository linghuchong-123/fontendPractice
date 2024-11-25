const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("成功的data数据");
  }, 100);
});
/* 说明.then的优先级高于await，使用then的情况下就不能通过await拿到值了 */
(async () => {
  const successData = await promise.then((data) => {
    console.log("resolve数据", data); // 这里能够进入
  });
  console.log(successData); // undefined
})();
