const express = require('express');
const router = express.Router();
const albumDao = require('../dao/AlbumDao')
const path = require('path'); //系统路径模块
const fs = require('fs'); //文件模块

// 新增
router.post('/', function (req, res) {
  let album = req.body
  albumDao.addAlbum(album, function (err, newAlbum) {
    if (err) {
      res.json({ code: 1, msg: '新增专辑失败' })
    } else {
      res.json({ code: 0, msg: '新增专辑成功', data: newAlbum })
    }
  })
})

// 初始化，导入多条
router.post('/init', function (req, res) {
  albumDao.deleteAll(function (err) {
    if (err) {
      res.json({ code: 1, msg: '删除数据失败' })
    } else {
      var file = path.join(__dirname, '..', 'public/data/albums.json')
      //读取json文件
      fs.readFile(file, 'utf-8', function (err, data) {
        if (err) {
          res.send("文件读取错误");
        } else {
          var albums = JSON.parse(data)
          albumDao.addAlbums(albums, function (err, newAlbums) {
            if (err) {
              res.json({ code: 1, msg: '专辑初始化失败' })
            } else {
              res.json({ code: 0, msg: '专辑初始化成功', data: newAlbums })
            }
          })
        }
      });
    }
  })
})

// 删除
router.delete('/:id', function (req, res) {
  let id = req.params.id;
  albumDao.deleteAlbum(id, function (err, obj) {
    if (err) {
      res.json({ code: 1, msg: '删除专辑失败' })
    } else {
      res.json({ code: 0, msg: '删除专辑成功' })
    }
  })
})

// 修改
router.put('/', function (req, res) {
  let album = req.body
  albumDao.updateAlbum(album, function (err, newAlbum) {
    if (err) {
      res.json({ code: 1, msg: '修改专辑失败' })
    } else {
      res.json({ code: 0, msg: '修改专辑成功', data: newAlbum })
    }
  })
})

//查询
router.get('/', function (req, res) {
  let query = req.query;
  let params = {
    pageSize: query.pageSize || 10,
    pageNum: query.pageNum || 1,
    keyword: query.keyword,
    sort: query.sort
  }
  albumDao.findAlbums(params, function (err, albums, count) {
    if (err) {
      res.json({ code: 1, msg: '错误' })
    } else {
      res.json({ code: 0, msg: '成功', total: count, list: albums })
    }
  })
})

// 获取详情
router.get('/detail/:id', function (req, res) {
  let id = req.params.id;
  albumDao.getAlbumDetail(id, function (err, album) {
    if (err) {
      res.json({ code: 1, msg: '获取失败' })
    } else {
      res.json({ code: 0, msg: '获取成功', data: album })
    }
  })
})

//查询全部，不分页
router.get('/all', function (req, res) {
  albumDao.findAllAlbums(function (err, albums) {
    if (err) {
      res.json({ code: 1, msg: '错误' })
    } else {
      res.json({ code: 0, msg: '成功', list: albums })
    }
  })
})

module.exports = router;
