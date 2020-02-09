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
            "album_name": "新增测试专辑0",
            "introduce": "简介",
            "cover": "http://localhost:3000/upload/file-1581244830917.jpg"
        }
        albumDao.addAlbum(album, function (err, newAlbum) {
            assert.ok(err == null)
            assert.ok(newAlbum._id != null)
            done()
        })
    })


    it("测试添加多条专辑", function (done) {
        let albums = [
            {
                "album_name": "新增测试专辑1",
                "introduce": "简介",
                "cover": "http://localhost:3000/upload/file-1581244830917.jpg"
            },
            {
                "album_name": "新增测试专辑2",
                "introduce": "简介",
                "cover": "http://localhost:3000/upload/file-1581244830917.jpg"
            }
        ]
        albumDao.addAlbums(albums, function (err, newAlbums) {
            assert.ok(err == null)
            assert.ok(newAlbums[0].album_name == "新增测试专辑1")
            done()
        })
    })

    it("测试删除", function (done) {
        albumDao.deleteAlbum("5e3fe1a0153c700c3f2de9ff", function (err, { }) {
            assert.ok(err == null)
            console.log({})
            done()
        })
    })

    it("修改专辑", function (done) {
        let album = {
            "_id": "5e3fdfc9153c700c3f2de9fb",
            "album_name": "玫瑰少年（测试修改）",
            "introduce": "生而为人无罪 你不需要抱歉",
            "cover": "http://localhost:3000/upload/file-1581244353586.jpg",
            "singers_id": [
                "5e3fd822153c700c3f2de9ef"
            ]
        }
        albumDao.updateAlbum(album, function (err, newAlbum) {
            assert.ok(err == null)
            assert.ok(newAlbum._id != null)
            console.log(newAlbum)
            done()
        })
    })

    it('测试查询', function (done) {
        var params = {
            pageSize: 2,
            pageNum: 1
        }
        albumDao.findAlbums(params, function (err, albums, count) {
            assert.ok(err == null)
            assert.ok(albums.length > 0)
            albums.forEach(album => { console.log(album._id) })
            done()
        })
    })

    it('测试查询全部（不分页用于搜索提示）', function (done) {
        albumDao.findAllAlbums(function (err, albums) {
            assert.ok(err == null)
            assert.ok(albums.length > 0)
            // console.log(albums)
            albums.forEach(albums => { console.log(albums.value) })
            done()
        })
    })

})