const mongoose = require('mongoose')
require('../model')
let userDao = require('../dao/UserDao');
const assert = require('assert')

describe("测试UserDao", function () {
    before(function () {
        mongoose.connect('mongodb://localhost/test', { useMongoClient: true }, function (err) {

        })
    })
    after(function () {
        mongoose.disconnect()
    })

    it("测试添加用户", function (done) {
        let num1 = parseInt(Math.random() * 10);
        let num2 = parseInt(Math.random() * 10);
        let user = {
            "name": "test" + num1 + num2,
            "password": "123456",
            "root": 0
        }
        userDao.addUser(user, function (err, newUser) {
            assert.ok(err == null)
            assert.ok(newUser._id != null)
            done()
        })
    })

    it("测试删除", function (done) {
        userDao.deleteUser("5e23c7e8c7ac25e9a7fe4a91", function (err, { }) {
            assert.ok(err == null)
            console.log({})
            done()
        })
    })

    it("修改用户", function (done) {
        let user = {
            _id: '5e351a54dd22d90549c26e9d', password: '123abc'
        }
        userDao.updateUser(user, function (err, newUser) {
            assert.ok(err == null)
            assert.ok(newUser._id != null)
            console.log(newUser)
            done()
        })
    })

    it("收藏专辑", function (done) {
        let user = {
            name: 'nieqiujun', collect: '5e3fdde7153c700c3f2de9f7'
        }
        userDao.addAlbum(user, function (err, newUser) {
            assert.ok(err == null)
            assert.ok(newUser.collect.length > 0)
            console.log(newUser)
            done()
        })
    })

    it("取消收藏", function (done) {
        let user = {
            name: 'nieqiujun', collect: '5e3fe042153c700c3f2de9fc'
        }
        userDao.removeAlbum(user, function (err, { }) {
            assert.ok(err == null)
            console.log("取消收藏")
            done()
        })
    })

    it('测试查询(第一页两条)', function (done) {
        var params = {
            pageSize: 2,
            pageNum: 1
        }
        userDao.findUsers(params, function (err, users, count) {
            assert.ok(err == null)
            assert.ok(users.length > 0)
            console.log(count)
            users.forEach(user => { console.log(user._id) })
            done()
        })
    })
})