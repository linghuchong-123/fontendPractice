/* 使用appendChild()方法添加元素,被添加的元素不会在页面实时更新渲染，只有当页面刷新后才会更新渲染，body作为父元素除外；
   使用innerHTML()添加元素，被添加的元素在页面实时更新渲染，但不会引起布局在上面的元素的重新渲染，会引起下面元素的重新渲染（重排、重绘）
 */
const body = document.body;
const container = document.getElementById("container");
const firstDiv = document.createElement("div");
const secondDiv = document.createElement("div");
const thirdDiv = document.createElement("div");
const fourthDiv = document.createElement("div");
firstDiv.innerHTML = "我是第一个div";
secondDiv.innerText = "我是第二个div";
thirdDiv.innerText = "我是第三个div";
fourthDiv.innerText = "我是第四个div";
setTimeout(() => {
  body.appendChild(firstDiv);
}, 1000);

setTimeout(() => {
  container.appendChild(secondDiv);
}, 1000);
setTimeout(() => {
  console.log(container);
  container.innerHTML = thirdDiv.outerHTML;
}, 1000);
setTimeout(() => {
  container.appendChild(fourthDiv);
}, 2000);

/** 监听 DOM 尺寸变化 */
const resizeObserver = new ResizeObserver((entries) => {
  for (let entry of entries) {
    console.log("Element:", entry.target);
    console.log("Content Box Size:", entry.contentBoxSize[0]);
    console.log("Border Box Size:", entry.borderBoxSize[0]);
    // 在此处添加逻辑以响应大小变化
  }
});
resizeObserver.observe(firstDiv);
