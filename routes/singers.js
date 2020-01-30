const express = require('express');
const router = express.Router();
const singerDao = require('../dao/SingerDao')

// 新增
router.post('/', function (req, res) {
    let singer = req.body
    singerDao.addSinger(singer, function (newSinger) {
        res.json({ code: 0, msg: '新增歌手成功', data: newSinger })
    }, function () {
        res.json({ code: 1, msg: '新增歌手失败' })
    })
})

// 删除
router.delete('/:id', function (req, res) {
    let id = req.params.id;
    singerDao.deleteSinger(id, function (obj) {
        res.json({ code: 0, msg: '删除歌手成功' })
    }, function () {
        res.json({ code: 1, msg: '删除歌手失败' })
    })
})

// 修改
router.put('/', function (req, res) {
    let singer = req.body
    singerDao.updateSinger(singer, function (newSinger) {
        res.json({ code: 0, msg: '修改歌手成功', data: newSinger })
    }, function () {
        res.json({ code: 1, msg: '修改歌手失败' })
    })
})

//查询
router.get('/', function (req, res) {
    let query = req.query;
    let params = {
        pageSize: query.pageSize || 10,
        pageNum: query.pageNum || 1,
        keyword: query.keyword
    }
    singerDao.findSingers(params, function (singers, count) {
        res.json({ code: 0, msg: '成功', total: count, list: singers })
    }, function () {
        res.json({ code: 1, msg: '错误' })
    })
})

module.exports = router;
