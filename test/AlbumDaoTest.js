const mongoose=require('mongoose')
require('../model')
let albumDao=require('../dao/AlbumDao');
const assert=require('assert')

describe("测试AlbumDao",function () {
   before(function () {
      mongoose.connect('mongodb://localhost/test',{useMongoClient:true},function (err) {

      })
   })
    after(function () {
        mongoose.disconnect()
    })

    it("测试添加专辑",function (done) {
        let album={
            "album_name": "A.I. 爱",
            "public_time": "2017-12-11",
            "price": 89,
            "cover": "http://imgcache.qq.com/music/photo/album_300/08/300_albumpic_3751508_0.jpg",
            "singers": [
                {
                    "singer_id": "265",
                    "singer_name": "王力宏"
                }
            ]
        }
        albumDao.addAlbum(album,function (nb) {

            assert.ok(nb._id!=null)
            done()
        })
    })

    it("修改专辑",function (done) {
        let album={_id:'5e23c7e8c7ac25e9a7fe4a8f',album_name:'Dreamer (梦想家)1',"singers": [
            {
                "singer_id": "941207",
                "singer_name": "nie"
            }
        ]}
        albumDao.updateAlbum(album._id,album,function (nb) {
            assert.ok(nb._id!=null)
            console.log(nb)
            done()
        })
    })
    it('测试查询所有专辑',function (done) {
        albumDao.findAllAlbums(function (albums) {
           assert.ok(albums.length>0)
           albums.forEach(album=>console.log(album._id))
           done()
       })
    })
    it("测试删除",function (done) {
        albumDao.deleteAlbum("5e23c7e8c7ac25e9a7fe4a91",function ({}) {
            console.log({})
            done()
        })
    })


})