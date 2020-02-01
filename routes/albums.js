const express = require('express');
const router = express.Router();
const albumDao = require('../dao/AlbumDao')

// 新增
router.post('/', function (req, res) {
  let album = req.body
  albumDao.addAlbum(album, function (newAlbum) {
    res.json({ code: 0, msg: '新增专辑成功', data: newAlbum })
  }, function () {
    res.json({ code: 1, msg: '新增专辑失败' })
  })
})

// 删除
router.delete('/:id', function (req, res) {
  let id = req.params.id;
  albumDao.deleteAlbum(id, function (obj) {
    res.json({ code: 0, msg: '删除专辑成功' })
  }, function () {
    res.json({ code: 1, msg: '删除专辑失败' })
  })
})

// 修改
router.put('/', function (req, res) {
  let album = req.body
  albumDao.updateAlbum(album, function (newAlbum) {
    res.json({ code: 0, msg: '修改专辑成功', data: newAlbum })
  }, function () {
    res.json({ code: 1, msg: '修改专辑失败' })
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
  albumDao.findAlbums(params, function (albums, count) {
    res.json({ code: 0, msg: '成功', total: count, list: albums })
  }, function () {
    res.json({ code: 1, msg: '错误' })
  })
})

// 获取详情
router.get('/:id', function (req, res) {
  let id = req.params.id;
  albumDao.getAlbumDetail(id, function (album) {
    res.json({ code: 0, msg: '获取成功', data: album })
  }, function () {
    res.json({ code: 1, msg: '获取失败' })
  })
})

module.exports = router;
