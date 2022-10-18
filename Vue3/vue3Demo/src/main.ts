/*
 * @Description:main.ts文件用于引用根组件，路由文件
 * @Version: 2.0
 * @Author: yangsen
 * @Date: 2022-08-24 16:34:46
 * @LastEditors: yangsen
 * @LastEditTime: 2022-08-25 16:13:25
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(router);

app.mount("#app");
