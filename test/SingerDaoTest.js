const mongoose = require('mongoose')
require('../model')
let singerDao = require('../dao/SingerDao');
const assert = require('assert')

describe("测试SingerDao", function () {
    before(function () {
        mongoose.connect('mongodb://localhost/test', { useMongoClient: true }, function (err) {

        })
    })
    after(function () {
        mongoose.disconnect()
    })

    // it("测试添加歌手", function (done) {
    //     let singer = {
    //         "singer_name": "周杰伦1",
    //         "introduce": "周杰伦简介1",
    //         "cover": "http://localhost:3000/upload/file-1580472992068.jpg"
    //     }
    //     singerDao.addSinger(singer, function (err, newSinger) {
    //         assert.ok(err == null)
    //         assert.ok(newSinger._id != null)
    //         done()
    //     })
    // })

    // it("测试删除", function (done) {
    //     singerDao.deleteSinger("5e23c7e8c7ac25e9a7fe4a91", function (err, { }) {
    //         assert.ok(err == null)
    //         console.log({})
    //         done()
    //     })
    // })

    // it("修改歌手", function (done) {
    //     let singer = {
    //         _id: '5e23c7e8c7ac25e9a7fe4a8f', singer_name: 'Dreamer (梦想家)1'

    //     }
    //     singerDao.updateSinger(singer, function (err, newSinger) {
    //         assert.ok(err == null)
    //         assert.ok(newSinger._id != null)
    //         console.log(newSinger)
    //         done()
    //     })
    // })

    // it('测试查询(第一页两条)', function (done) {
    //     var params = {
    //         pageSize: 2,
    //         pageNum: 1
    //     }
    //     singerDao.findSingers(params, function (err, singers, count) {
    //         assert.ok(err == null)
    //         assert.ok(singers.length > 0)
    //         console.log(count)
    //         console.log(singers.length)
    //         singers.forEach(singer => { console.log(singer._id) })
    //         done()
    //     })
    // })

    // it('测试获取歌手详情', function (done) {
    //     singerDao.getSingerDetail("5e3d2155af19d60e274c2f59", function (err, singer) {
    //         assert.ok(err == null)
    //         assert.ok(singer.length == 1)
    //         console.log(singer)
    //         done()
    //     })
    // })

    // it('测试查询全部（不分页）', function (done) {
    //     singerDao.findAllSingers(function (err, singers) {
    //         assert.ok(err == null)
    //         assert.ok(singers.length > 0)
    //         console.log(singers)
    //         singers.forEach(singer => { console.log(singer.value) })
    //         done()
    //     })
    // })


})