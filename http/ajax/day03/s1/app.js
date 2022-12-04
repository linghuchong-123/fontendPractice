// 引入express框架
const express = require('express');
// 路径处理模块
const path = require('path');
// 向其他服务器端请求数据的模块 通过这个模块服务器就能访问另一个服务器，服务器端没有同源政策的影响
const request = require('request');
// 创建web服务器
const app = express();
// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')));

app.get('/server', (req, res) => {
    request('http://localhost:3001/cross', (err, response, body) => {
        res.send(body);
    })
});

// 监听端口
app.listen(3000);
// 控制台提示输出
console.log('服务器启动成功');