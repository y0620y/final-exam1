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

    it("测试添加歌手", function (done) {
        let singer = {
            "singer_name": "新增测试歌手0",
            "introduce": "歌手简介",
            "cover": "http://localhost:3000/upload/file-1581242286770.jpg",
            "area": "华语"
        }
        singerDao.addSinger(singer, function (err, newSinger) {
            assert.ok(err == null)
            assert.ok(newSinger._id != null)
            done()
        })
    })

    it("测试删除", function (done) {
        singerDao.deleteSinger("5e3fd7b0153c700c3f2de9ed", function (err, { }) {
            assert.ok(err == null)
            console.log({})
            done()
        })
    })

    it("修改歌手", function (done) {
        let singer = {
            "_id": "5e3fd7f7153c700c3f2de9ee", "singer_name": "周杰伦（测试修改）"
        }
        singerDao.updateSinger(singer, function (err, newSinger) {
            assert.ok(err == null)
            assert.ok(newSinger._id != null)
            console.log(newSinger)
            done()
        })
    })

    it('测试查询(第一页两条)', function (done) {
        var params = {
            pageSize: 2,
            pageNum: 1
        }
        singerDao.findSingers(params, function (err, singers, count) {
            assert.ok(err == null)
            assert.ok(singers.length > 0)
            singers.forEach(singer => { console.log(singer._id) })
            done()
        })
    })

    it('测试获取歌手详情', function (done) {
        singerDao.getSingerDetail("5e3fd822153c700c3f2de9ef", function (err, singer) {
            assert.ok(err == null)
            assert.ok(singer.length == 1)
            console.log(singer)
            done()
        })
    })

    it('测试查询全部（不分页）', function (done) {
        singerDao.findAllSingers(function (err, singers) {
            assert.ok(err == null)
            assert.ok(singers.length > 0)
            singers.forEach(singer => { console.log(singer.value) })
            done()
        })
    })
})