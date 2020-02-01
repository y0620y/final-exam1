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
        let user = {
            "name": "nieqiujun",
            "password": "123456"
        }
        userDao.addUser(user, function (newUser) {
            assert.ok(newUser._id != null)
            done()
        })
    })

    it("测试删除", function (done) {
        userDao.deleteUser("5e23c7e8c7ac25e9a7fe4a91", function ({ }) {
            console.log({})
            done()
        })
    })

    it("修改用户", function (done) {
        let user = {
            _id: '5e3507d2a504ce047474d676', password: '123123'

        }
        userDao.updateUser(user, function (newUser) {
            assert.ok(newUser._id != null)
            console.log(newUser)
            done()
        })
    })

    it('测试查询(第一页两条)', function (done) {
        var params = {
            pageSize: 2,
            pageNum: 1
        }
        userDao.findUsers(params, function (users, count) {
            assert.ok(users.length > 0)
            console.log(count)
            console.log(users.length)
            users.forEach(user => { console.log(user._id) })
            done()
        })
    })
})