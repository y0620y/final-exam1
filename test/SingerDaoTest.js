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
            "singer_name": "周杰伦1",
            "introduce": "周杰伦简介1",
            "cover": "http://imgcache.qq.com/music/photo/singer_300/08/300_singerpic_3751508_0.jpg"
        }
        singerDao.addSinger(singer, function (newSinger) {
            assert.ok(newSinger._id != null)
            done()
        })
    })

    it("测试删除", function (done) {
        singerDao.deleteSinger("5e23c7e8c7ac25e9a7fe4a91", function ({ }) {
            console.log({})
            done()
        })
    })

    it("修改歌手", function (done) {
        let singer = {
            _id: '5e23c7e8c7ac25e9a7fe4a8f', singer_name: 'Dreamer (梦想家)1'

        }
        singerDao.updateSinger(singer, function (newSinger) {
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
        singerDao.findSingers(params, function (singers, count) {
            assert.ok(singers.length > 0)
            console.log(count)
            console.log(singers.length)
            singers.forEach(singer => { console.log(singer._id) })
            done()
        })
    })

    it('测试查询全部（不分页）', function (done) {
        singerDao.findAllSingers(function (singers) {
            assert.ok(singers.length > 0)
            console.log(singers.length)
            singers.forEach(singer => { console.log(singer._id) })
            done()
        })
    })

})