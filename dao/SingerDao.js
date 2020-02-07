//dao/SingerDao.js v1
const mogoose = require('mongoose')
let singerModel = mogoose.model("Singer")

// 新增
function addSinger(singer, callback) {
    singerModel.create(singer, function (err, newSinger) {
        if (err) {
            callback(err)
        } else {
            callback(null, newSinger.toObject())
        }
    })
}


// 导入多条
function addSingers(singers, callback) {
    singerModel.create(singers, function (err, newSingers) {
        if (!err) {
            callback(null, newSingers)
        }
        else {
            callback(err)
        }
    })
}

// 删除全部
function deleteAll(callback) {
    singerModel.remove({}, function (err) {
        if (err) {
            callback(err)
        }
        else {
            callback(null, {})
        }
    })
}

//删除
function deleteSinger(id, callback) {
    singerModel.findByIdAndRemove(id, function (err) {
        if (err) {
            callback(err)
        } else {
            callback(null, {})
        }
    })
}

// 修改
function updateSinger(singer, callback) {
    let id = singer._id;
    let newSinger = { $set: singer };
    singerModel.findByIdAndUpdate(id, newSinger, function (err) {
        if (err) {
            callback(err)
        } else {
            callback(null, singer)
        }
    })
}

//查询
function findSingers(params, callback) {
    let pageNum = params.pageNum;
    let pageSize = params.pageSize;
    let keyword = params.keyword;
    let findparams = keyword ? { singer_name: keyword } : {};

    singerModel.count(findparams, (err, count) => {
        if (err) {
            callback(err);
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
                        'albums.introduce': 0,
                        'albums.cover': 0
                    }
                },
                {
                    $match: findparams
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
                    callback(err);
                } else {
                    callback(null, singers, count)
                }
            })
        }
    })
}

//获取详情
function getSingerDetail(id, callback) {
    singerModel.aggregate([
        { $addFields: { "sid": { "$toString": "$_id" } } },
        {
            $lookup: {
                from: 'albums', localField: '_id', foreignField: 'singers_id', as: 'albums'
            }
        },
        {
            $project: {
                'albums.introduce': 0,
            }
        },
        {
            $match: { sid: id }
        }
    ], (err, singer) => {
        if (err) {
            callback(err);
        } else {
            callback(null, singer)
        }
    })
}



//查询全部，不分页
function findAllSingers(callback) {
    singerModel.aggregate([
        {
            $project: {
                value: "$singer_name",
                _id: 1,
                cover: 1
            }
        },
    ], (err, singers) => {
        if (err) {
            callback(err);
        } else {
            callback(null, singers)
        }
    })
}


module.exports = { addSingers, deleteAll, getSingerDetail, addSinger, deleteSinger, findSingers, findAllSingers, updateSinger }
