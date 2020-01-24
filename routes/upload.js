/*
处理文件上传的路由
 */
const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path')
const fs = require('fs')


const dirPath = path.join(__dirname, '..', 'public/upload')

const storage = multer.diskStorage({
  // destination: 'upload', //string时,服务启动将会自动创建文件夹
  destination: function (req, file, cb) { //函数需手动创建文件夹
    // console.log('destination()', file)
    if (!fs.existsSync(dirPath)) {
      fs.mkdir(dirPath, function (err) {
        if (err) {
          console.log(err)
        } else {
          cb(null, dirPath)
        }
      })
    } else {
      cb(null, dirPath)
    }
  },
  filename: function (req, file, cb) {
    // console.log('filename()', file)
    var ext = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + Date.now() + ext)
  }
})
const upload = multer({
  storage
})
const uploadSingle = upload.single('file') // 多图 upload.array('image', 2) 2个限制
const uploadSingleFile = upload.single('file') // 图片和文件上传删除是一样的，当然简单业务可以公用

// 上传图片
router.post('/album', (req, res) => {
  uploadSingle(req, res, function (err) { //错误处理
    if (err) {
      return res.send({
        status: 1,
        msg: '上传文件失败'
      })
    }
    var file = req.file
    res.send({
      status: 0,
      data: {
        name: file.filename,
        url: 'http://localhost:3000/upload/' + file.filename
      }
    })

  })
})

// 删除图片
router.post('/img/delete', (req, res) => {
  const {
    name
  } = req.body
  fs.unlink(path.join(dirPath, name), (err) => {
    if (err) {
      console.log(err)
      res.send({
        status: 1,
        msg: '删除文件失败'
      })
    } else {
      res.send({
        status: 0
      })
    }
  })
})

// 上传文件
router.post('/file/upload', (req, res) => {
  uploadSingleFile(req, res, function (err) { //错误处理
    if (err) {
      return res.send({
        status: 1,
        msg: '上传文件失败'
      })
    }
    var file = req.file
    res.send({
      status: 0,
      data: {
        name: file.filename,
        url: file.filename
      }
    })

  })
})

// 下载文件
router.get('/file/download', (req, res) => {
  console.log(1)
  var filename = req.query.filename;
  var oldname = req.query.oldname;
  var file = dirPath +"/"+ filename;
  res.writeHead(200, {
    'Content-Type': 'application/octet-stream', //告诉浏览器这是一个二进制文件
    'Content-Disposition': 'attachment; filename=' + encodeURI(oldname), //告诉浏览器这是一个需要下载的文件
  }); //设置响应头
  var readStream = fs.createReadStream(file); //得到文件输入流
  debugger
  readStream.on('data', (chunk) => {
    res.write(chunk, 'binary'); //文档内容以二进制的格式写到response的输出流
  });
  readStream.on('end', () => {
    res.end();
  })

})
// localhost:3333/api/upload/file/download?filename=file-1574692822014.html&oldname=file-1574692822014.html 放在浏览器url可以测试下载成功
module.exports = router;
