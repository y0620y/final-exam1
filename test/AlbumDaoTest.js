const mongoose = require('mongoose')
require('../model')
let albumDao = require('../dao/AlbumDao');
const assert = require('assert')

describe("测试AlbumDao", function () {
    before(function () {
        mongoose.connect('mongodb://localhost/test', { useMongoClient: true }, function (err) {

        })
    })
    after(function () {
        mongoose.disconnect()
    })

    it("测试添加专辑", function (done) {
        let album = {
            "album_name": "A.I. 爱1",
            "public_time": "2017-12-11",
            "price": 89,
            "cover": "http://imgcache.qq.com/music/photo/album_300/08/300_albumpic_3751508_0.jpg",
            "singers_id": [
                "5e341a91964bc0103dfca240"
            ]
        }
        albumDao.addAlbum(album, function (newAlbum) {
            assert.ok(newAlbum._id != null)
            done()
        })
    })

    it("测试删除", function (done) {
        albumDao.deleteAlbum("5e23c7e8c7ac25e9a7fe4a91", function ({ }) {
            console.log({})
            done()
        })
    })

    it("修改专辑", function (done) {
        let album = {
            _id: '5e23c7e8c7ac25e9a7fe4a8f', album_name: 'Dreamer (梦想家)1', "singers": [
                {
                    "singer_id": "941207",
                    "singer_name": "nie"
                }
            ]
        }
        albumDao.updateAlbum(album, function (newAlbum) {
            assert.ok(newAlbum._id != null)
            console.log(newAlbum)
            done()
        })
    })

    it('测试查询(第一页两条)', function (done) {
        var params = {
            pageSize: 2,
            pageNum: 1
        }
        albumDao.findAlbums(params, function (albums, count) {
            assert.ok(albums.length > 0)
            console.log(count)
            console.log(albums.length)
            albums.forEach(album => { console.log(album._id) })
            done()
        })
    })

})