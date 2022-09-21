const http = require('http')
const server = http.createServer((req,res)=>{
    res.end('Hello World vue')
})
server.listen(4000, '127.0.0.1', (err) => {
    console.log('服务器启动成功')
})