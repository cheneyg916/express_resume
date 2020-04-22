// const http = require('http'); // 原生
const express = require('express'); // express
const path = require('path');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const hostname = 'localhost';
const port = 3000;

// const server = http.createServer((req, res) => { //原生
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/html');
//   res.end('Hello World\n');
// });
const app = express(); // express

app.set('views', 'views'); // 指定模板存放目录
app.set('view engine', 'hbs'); // 指定模板引擎为 Handlebars

function loggingMiddleware(req, res, next) { // 中间件
    const time = new Date();
    console.log(`[${time.toLocaleString()}] ${req.method} ${req.url}`);
    next();
}

app.use(loggingMiddleware);
app.use(express.static('public'));

// app.get('/', (req, res) => {
//     // res.send('Hello World');
//     res.render('index'); // 渲染模板
// });

// app.get('/contact', (req, res) => {
//     res.render('contact'); // 渲染模板
// });

// app.get('/api', (req, res) => {
//     res.json({ name: '程序员', website: 'https://chengxuyuan.coo' }); // json api
// });

// app.get('/broken', (req, res) => {
//     throw new Error('Broken!'); // 抛出错误
// });

app.use('/', indexRouter);
app.use('/api', apiRouter);

app.use('*', (req, res) => {
    res.status(404).render('404', { url: req.originalUrl }); // 404处理
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500'); // 错误处理
});

// server.listen(port, () => { // 原生
app.listen(port, () => { // express
    console.log(`Server running at http://${hostname}:${port}/`);
});