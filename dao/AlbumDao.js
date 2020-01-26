//dao/AlbumDao.js v1
const mogoose = require('mongoose')

let albumModel = mogoose.model("Album")
// 新增
function addAlbum(album, callback) {
    let b = albumModel.create(album, function (err, newAlbumDoc) {
        if (!err) callback(newAlbumDoc.toObject())
    })
}
// 修改
function updateAlbum(id, album, callback) {
    var nb = { $set: album };
    albumModel.findByIdAndUpdate(id, nb, function (err) {
        if (!err) callback(album)
    })
}

//查询全部
function findAllAlbums(callback) {
    albumModel.find({}).exec(function (err, albums) {
        if (!err) callback(albums)
    })
}

//按名称查询
function findAlbumsByName(name,callback) {
    albumModel.find({album_name:name}).exec(function (err, albums) {
        if (!err) callback(albums)
    })
}


//删除
function deleteAlbum(id, callback) {
    albumModel.findByIdAndRemove(id, function (err) {
        if (!err) callback({})
    })
}

module.exports = { addAlbum, deleteAlbum, findAllAlbums, updateAlbum,findAlbumsByName }
