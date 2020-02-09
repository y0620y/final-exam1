const express = require('express');
const router = express.Router();
const singerDao = require('../dao/SingerDao')
const path = require('path'); //系统路径模块
const fs = require('fs'); //文件模块

// 新增
router.post('/', function (req, res) {
    let singer = req.body
    singerDao.addSinger(singer, function (err, newSinger) {
        if (err) {
            res.json({ code: 1, msg: '新增歌手失败' })
        } else {
            res.json({ code: 0, msg: '新增歌手成功', data: newSinger })
        }
    })
})

// 初始化，导入多条
router.post('/init', function (req, res) {
    singerDao.deleteAll(function (err) {
        if (err) {
            res.json({ code: 1, msg: '删除数据失败' })
        } else {
            var file = path.join(__dirname, '..', 'public/data/singers.json')
            //读取json文件
            fs.readFile(file, 'utf-8', function (err, data) {
                if (err) {
                    res.send("文件读取错误");
                } else {
                    var singers = JSON.parse(data)
                    singerDao.addSingers(singers, function (err, newSingers) {
                        if (err) {
                            res.json({ code: 1, msg: '歌手初始化失败' })
                        } else {
                            res.json({ code: 0, msg: '歌手初始化成功', data: newSingers })
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
    singerDao.deleteSinger(id, function (err, obj) {
        if (err) {
            res.json({ code: 1, msg: '删除歌手失败' })
        } else {
            res.json({ code: 0, msg: '删除歌手成功' })
        }
    })
})

// 修改
router.put('/', function (req, res) {
    let singer = req.body
    singerDao.updateSinger(singer, function (err, newSinger) {
        if (err) {
            res.json({ code: 1, msg: '修改歌手失败' })
        } else {
            res.json({ code: 0, msg: '修改歌手成功', data: newSinger })
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
        area: query.area,
    }
    singerDao.findSingers(params, function (err, singers, count) {
        if (err) {
            res.json({ code: 1, msg: '错误' })
        } else {
            res.json({ code: 0, msg: '成功', total: count, list: singers })
        }

    })
})

// 获取详情
router.get('/detail/:id', function (req, res) {
    let id = req.params.id;
    singerDao.getSingerDetail(id, function (err, singer) {
        if (err) {
            res.json({ code: 1, msg: '获取失败' })
        } else {
            res.json({ code: 0, msg: '获取成功', data: singer })
        }

    })
})

//查询全部，不分页
router.get('/all', function (req, res) {
    singerDao.findAllSingers(function (err, singers) {
        if (err) {
            res.json({ code: 1, msg: '错误' })
        } else {
            res.json({ code: 0, msg: '成功', list: singers })
        }
    })
})


module.exports = router;
