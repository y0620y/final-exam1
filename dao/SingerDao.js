//dao/SingerDao.js v1
const mogoose = require('mongoose')
let singerModel = mogoose.model("Singer")
let albumModel = mogoose.model("Album")

// 新增
function addSinger(singer, callback, errcallback) {
    let b = singerModel.create(singer, function (err, newSinger) {
        if (err) {
            errcallback()
        } else {
            callback(newSinger.toObject())
        }
    })
}

//删除
function deleteSinger(id, callback, errcallback) {
    singerModel.findByIdAndRemove(id, function (err) {
        if (err) {
            errcallback()
        } else {
            callback({})
        }
    })
}

// 修改
function updateSinger(singer, callback, errcallback) {
    let id = singer._id;
    let newSinger = { $set: singer };
    singerModel.findByIdAndUpdate(id, newSinger, function (err) {
        if (err) {
            errcallback()
        } else {
            callback(singer)
        }
    })
}

//查询
function findSingers(params, callback, errcallback) {
    let pageNum = params.pageNum;
    let pageSize = params.pageSize;
    let keyword = params.keyword;
    let findparams = keyword ? { singer_name: keyword } : {};

    singerModel.count(findparams, (err, count) => {
        if (err) {
            errcallback();
        } else {
            singerModel.aggregate([
                // { $addFields: { "sid": { "$toString": "$_id" } } },
                {
                    $lookup: {
                        from: 'albums', localField: '_id', foreignField: 'singers_id', as: 'albums'
                    }
                },
                {
                    $project: {
                        'albums.price': 0,
                        'albums.cover': 0
                    }
                },
                {
                    $sort: { '_id': -1 }
                },
                {
                    $skip: (parseInt(pageNum) - 1) * parseInt(pageSize)
                },
                {
                    $limit: parseInt(pageSize)
                }

            ], (err, singers) => {
                if (err) {
                    errcallback();
                } else {
                    callback(singers, count)
                }
            })
        }
    })
}

//查询全部，不分页
function findAllSingers(callback, errcallback) {
    singerModel.aggregate([
        {
            $project: {
                value: "$singer_name",
                _id: 1
            }
        },
    ], (err, singers) => {
        if (err) {
            errcallback();
        } else {
            callback(singers)
        }
    })
}


module.exports = { addSinger, deleteSinger, findSingers, findAllSingers, updateSinger }
