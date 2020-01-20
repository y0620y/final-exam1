var express = require('express');
var router = express.Router();
var albumDao=require('../dao/AlbumDao')
/* GET users listing. */
// 查全部列表
router.get('/', function(req, res) {
  albumDao.findAllAlbums(function (albums) {
    res.json(albums)
  })
});
// 新增
router.post('/',function (req,res) {
    let album=req.body
    albumDao.addAlbum(album,function (nb) {
      res.json(nb)
    })
})

// 修改
router.put('/',function (req,res) {
  let album=req.body
  albumDao.updateAlbum(album._id,album,function (nb) {
    res.json(nb)
  })
})
// 删除
router.delete('/:id',function (req,res) {
    let id=req.params.id;
    albumDao.deleteAlbum(id,function (obj) {
        res.json(obj)
    })
})

module.exports = router;
