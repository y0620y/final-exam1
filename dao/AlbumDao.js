//dao/AlbumDao.js v1
const mogoose = require('mongoose')
let albumModel = mogoose.model("Album")

// 新增
function addAlbum(album, callback, errcallback) {
    let b = albumModel.create(album, function (err, newAlbum) {
        if (err) {
            errcallback()
        } else {
            callback(newAlbum.toObject())
        }
    })
}

//删除
function deleteAlbum(id, callback, errcallback) {
    albumModel.findByIdAndRemove(id, function (err) {
        if (err) {
            errcallback()
        } else {
            callback({})
        }
    })
}

// 修改
function updateAlbum(album, callback, errcallback) {
    let id = album._id;
    let newAlbum = { $set: album };
    albumModel.findByIdAndUpdate(id, newAlbum, function (err) {
        if (err) {
            errcallback()
        } else {
            callback(album)
        }
    })
}

//查询
function findAlbums(params, callback, errcallback) {
    let pageNum = params.pageNum;
    let pageSize = params.pageSize;
    let keyword = params.keyword;
    let findparams = keyword ? { album_name: keyword } : {};

    albumModel.count(findparams, (err, count) => {
        if (err) {
            errcallback();
        } else {
            albumModel.find(findparams).sort({ '_id': -1 }).skip((parseInt(pageNum) - 1) * parseInt(pageSize)).limit(parseInt(pageSize)).exec(function (err, albums) {
                if (err) {
                    errcallback();
                } else {
                    callback(albums, count)
                }
            })
        }
    })
}

module.exports = { addAlbum, deleteAlbum, findAlbums, updateAlbum }
