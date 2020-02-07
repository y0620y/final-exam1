const express = require('express');
const router = express.Router();
const userDao = require('../dao/UserDao')

// 登录
router.post('/login/:root', function (req, res) {
  let user = req.body
  let root = req.params.root;
  userDao.checkUser(user, root, function (err, user) {
    if (err) {
      err = err || '登录失败'
      res.json({ code: 1, msg: err })
    } else {
      res.json({ code: 0, msg: user.name + '登录成功', data: user })
    }
  })
})




// 注册
router.post('/', function (req, res) {
  let user = req.body
  userDao.addUser(user, function (err, newUser) {
    if (err) {
      err = err || '注册失败'
      res.json({ code: 1, msg: err })
    } else {
      res.json({ code: 0, msg: '注册成功', data: newUser })
    }
  })
})

// 删除
router.delete('/:id', function (req, res) {
  let id = req.params.id;
  userDao.deleteUser(id, function (err, obj) {
    if (err) {
      res.json({ code: 1, msg: '删除用户失败' })
    } else {
      res.json({ code: 0, msg: '删除用户成功' })
    }
  })
})

// 修改
router.put('/', function (req, res) {
  let user = req.body
  userDao.updateUser(user, function (err, newUser) {
    if (err) {
      res.json({ code: 1, msg: '修改用户失败' })
    } else {
      res.json({ code: 0, msg: '修改用户成功', data: newUser })
    }
  })
})

// 收藏专辑
router.put('/addAlbum', function (req, res) {
  let user = req.body
  userDao.addAlbum(user, function (err, newUser) {
    if (err) {
      res.json({ code: 1, msg: '收藏专辑失败' })
    } else {
      res.json({ code: 0, msg: '收藏专辑成功' })
    }

  })
})

// 取消收藏专辑
router.put('/removeAlbum', function (req, res) {
  let user = req.body
  userDao.removeAlbum(user, function (err) {
    if (err) {
      res.json({ code: 1, msg: '取消收藏专辑失败' })
    } else {
      res.json({ code: 0, msg: '取消收藏专辑成功' })
    }

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
  userDao.findUsers(params, function (err, users, count) {
    if (err) {
      res.json({ code: 1, msg: '错误' })
    } else {
      res.json({ code: 0, msg: '成功', total: count, list: users })
    }

  })
})


module.exports = router;
