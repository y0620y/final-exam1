//dao/AlbumDao.js v1
const mogoose = require('mongoose')
let albumModel = mogoose.model("Album")

// 新增
function addAlbum(album, callback) {
    albumModel.create(album, function (err, newAlbum) {
        if (err) {
            callback(err)
        } else {
            callback(null, newAlbum.toObject())
        }
    })
}
// 导入多条
function addAlbums(albums, callback) {
    albumModel.create(albums, function (err, newAlbums) {
        if (!err) {
            callback(null, newAlbums)
        }
        else {
            callback(err)
        }
    })
}

// 删除全部
function deleteAll(callback) {
    albumModel.remove({}, function (err) {
        if (err) {
            callback(err)
        }
        else {
            callback(null, {})
        }
    })
}

//删除
function deleteAlbum(id, callback) {
    albumModel.findByIdAndRemove(id, function (err) {
        if (err) {
            callback(err)
        } else {
            callback(null, {})
        }
    })
}

// 修改
function updateAlbum(album, callback) {
    let id = album._id;
    let newAlbum = { $set: album };
    albumModel.findByIdAndUpdate(id, newAlbum, function (err) {
        if (err) {
            callback(err)
        } else {
            callback(null, album)
        }
    })
}

//查询
function findAlbums(params, callback) {
    let pageNum = params.pageNum;
    let pageSize = params.pageSize;
    let keyword = params.keyword;
    let findparams = keyword ? { album_name: keyword } : {};

    albumModel.count(findparams, (err, count) => {
        if (err) {
            callback(err);
        } else {
            albumModel.aggregate([
                {
                    $lookup: {
                        from: 'singers', localField: 'singers_id', foreignField: '_id', as: 'singers'
                    },
                },
                {
                    $lookup: {
                        from: 'users', localField: '_id', foreignField: 'collect', as: 'users'
                    },
                },
                {
                    $project: {
                        'users.password': 0,
                        'users.root': 0,
                        'singers.cover': 0,
                        'singers.introduce': 0
                    }
                },
                {
                    $match: findparams
                },
                {
                    $sort: {
                        _id: -1
                    }
                },
                {
                    $skip: (parseInt(pageNum) - 1) * parseInt(pageSize)
                },
                {
                    $limit: parseInt(pageSize)
                }

            ], (err, albums) => {
                if (err) {
                    callback(err);
                } else {
                    callback(null, albums, count)
                }
            })
        }
    })
}

//获取详情
function getAlbumDetail(id, callback) {
    albumModel.aggregate([
        { $addFields: { "sid": { "$toString": "$_id" } } },
        {
            $lookup: {
                from: 'singers', localField: 'singers_id', foreignField: '_id', as: 'singers'
            }
        },
        {
            $project: {
                'singers.introduce': 0
            }
        },
        {
            $match: { sid: id }
        }

    ], (err, album) => {
        if (err) {
            callback(err);
        } else {
            callback(null, album)
        }
    })
}

//查询全部，不分页
function findAllAlbums(callback) {
    albumModel.aggregate([
        {
            $project: {
                value: "$album_name",
                _id: 1,
                cover: 1
            }
        },
    ], (err, albums) => {
        if (err) {
            callback(err);
        } else {
            callback(null, albums)
        }
    })
}

module.exports = { deleteAll, addAlbums, findAllAlbums, getAlbumDetail, addAlbum, deleteAlbum, findAlbums, updateAlbum }
