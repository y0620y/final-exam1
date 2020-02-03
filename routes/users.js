const express = require('express');
const router = express.Router();
const userDao = require('../dao/UserDao')

// 登录
router.post('/login/:root', function (req, res) {
  let user = req.body
  let root = req.params.root;
  userDao.checkUser(user, root, function (user) {
    res.json({ code: 0, msg: user.name + '登录成功', data: user })
  }, function (msg) {
    msg = msg || '登录失败'
    res.json({ code: 1, msg: msg })
  })
})




// 注册
router.post('/', function (req, res) {
  let user = req.body
  userDao.addUser(user, function (newUser) {
    res.json({ code: 0, msg: '注册成功', data: newUser })
  }, function (msg) {
    msg = msg || '注册失败'
    res.json({ code: 1, msg: msg })
  })
})

// 删除
router.delete('/:id', function (req, res) {
  let id = req.params.id;
  userDao.deleteUser(id, function (obj) {
    res.json({ code: 0, msg: '删除用户成功' })
  }, function () {
    res.json({ code: 1, msg: '删除用户失败' })
  })
})

// 修改
router.put('/', function (req, res) {
  let user = req.body
  userDao.updateUser(user, function (newUser) {
    res.json({ code: 0, msg: '修改用户成功', data: newUser })
  }, function () {
    res.json({ code: 1, msg: '修改用户失败' })
  })
})

// 收藏专辑
router.put('/addAlbum', function (req, res) {
  let user = req.body
  userDao.addAlbum(user, function (newUser) {
    res.json({ code: 0, msg: '收藏专辑成功' })
  }, function () {
    res.json({ code: 1, msg: '收藏专辑失败' })
  })
})

// 取消收藏专辑
router.put('/removeAlbum', function (req, res) {
  let user = req.body
  userDao.removeAlbum(user, function () {
    res.json({ code: 0, msg: '取消收藏专辑成功' })
  }, function () {
    res.json({ code: 1, msg: '取消收藏专辑失败' })
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
  userDao.findUsers(params, function (users, count) {
    res.json({ code: 0, msg: '成功', total: count, list: users })
  }, function () {
    res.json({ code: 1, msg: '错误' })
  })
})


module.exports = router;
