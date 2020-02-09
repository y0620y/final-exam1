const mongoose = require('mongoose')
const http = require('http')
require('../model')
let app = require('../app')
let server = http.createServer(app)


// 设置用户名 nieqiujun，密码admin123
mongoose.connect("mongodb://nieqiujun:admin123@39.98.147.33:27017/test", { useMongoClient: true }, function (err) {
    console.log("mongodb 已连接!")
    console.log(err)
    if (!err) {
        server.listen(3000, function (err) {
            if (!err) {
                console.log("express 服务器已打开 ")
            }
        })
    }
})

server.on('close', function () {
    mongoose.disconnect()
})


