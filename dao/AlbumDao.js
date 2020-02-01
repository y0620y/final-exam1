//dao/AlbumDao.js v1
const mogoose = require('mongoose')
let albumModel = mogoose.model("Album")

// 新增
function addAlbum(album, callback, errcallback) {
    albumModel.create(album, function (err, newAlbum) {
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
// function findAlbums(params, callback, errcallback) {
//     let pageNum = params.pageNum;
//     let pageSize = params.pageSize;
//     let keyword = params.keyword;
//     let findparams = keyword ? { album_name: keyword } : {};

//     albumModel.count(findparams, (err, count) => {
//         if (err) {
//             errcallback();
//         } else {
//             albumModel.find(findparams).sort({ '_id': -1 }).skip((parseInt(pageNum) - 1) * parseInt(pageSize)).limit(parseInt(pageSize)).exec(function (err, albums) {
//                 if (err) {
//                     errcallback();
//                 } else {
//                     callback(albums, count)
//                 }
//             })
//         }
//     })
// }

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
            albumModel.aggregate([
                {
                    $lookup: {
                        from: 'singers', localField: 'singers_id', foreignField: '_id', as: 'singers'
                    }
                },
                {
                    $project: {
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
                    errcallback();
                } else {
                    callback(albums, count)
                }
            })
        }
    })
}

//获取详情
function getAlbumDetail(id, callback, errcallback) {
    albumModel.aggregate([
        { $addFields: { "sid": { "$toString": "$_id" } } },
        {
            $lookup: {
                from: 'singers', localField: 'singers_id', foreignField: '_id', as: 'singers'
            }
        },
        {
            $project: {
                'singers.cover': 0,
                'singers.introduce': 0
            }
        },
        {
            $match: { sid: id }
        }

    ], (err, album) => {
        if (err) {
            errcallback();
        } else {
            callback(album)
        }
    })
}



module.exports = { getAlbumDetail, addAlbum, deleteAlbum, findAlbums, updateAlbum }
