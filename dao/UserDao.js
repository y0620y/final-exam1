//dao/UserDao.js v1
const mogoose = require('mongoose')
let userModel = mogoose.model("User")

// 新增
function addUser(user, callback) {
    userModel.findOne({ name: user.name }, function (err, doc) {
        if (err) {
            callback('网络异常')
        } else if (doc) {
            callback('用户名已存在,请重新输入')
        } else {
            userModel.create(user, function (err, newUser) {
                if (err) {
                    callback('网络异常')
                } else {
                    callback(null, newUser.toObject())
                }
            })
        }
    });
}

// 登录验证
function checkUser(user, root, callback) {
    userModel.findOne({ name: user.name }, function (err, doc) {
        if (err) {
            callback('网络异常')
        } else if (doc) {
            if (user.password === doc.password) {
                // root为admin，是管理端登录
                if (root === 'admin') {
                    if (doc.root === 1) {
                        callback(doc)
                    } else {
                        callback('用户没有管理权限')
                    }
                } else {
                    callback(null, doc)
                }
            }
            else {
                callback('密码错误,请重新输入')
            }
        } else {
            callback('用户名不存在,请重新输入')
        }
    });
}


//删除
function deleteUser(id, callback) {
    userModel.findByIdAndRemove(id, function (err) {
        if (err) {
            callback(err)
        } else {
            callback(null, {})
        }
    })
}

// 修改
function updateUser(user, callback) {
    let id = user._id;
    let newUser = { $set: user };
    userModel.findByIdAndUpdate(id, newUser, function (err) {
        if (err) {
            callback(err)
        } else {
            callback(null, user)
        }
    })
}

// 收藏专辑
function addAlbum(user, callback) {
    userModel.findOneAndUpdate({ name: user.name }, {
        $addToSet: { collect: user.collect }
    }, function (err) {
        if (err) {
            callback(err)
        } else {
            callback(null, user)
        }
    })
}

// 取消专辑
function removeAlbum(user, callback) {
    userModel.findOneAndUpdate({ name: user.name }, {
        $pull: { collect: user.collect }
    }, function (err) {
        if (err) {
            callback(err)
        } else {
            callback(null, {})
        }
    })
}

//查询
function findUsers(params, callback) {
    let pageNum = params.pageNum;
    let pageSize = params.pageSize;
    let keyword = params.keyword;
    let findparams = keyword ? { name: keyword } : {};

    userModel.count(findparams, (err, count) => {
        if (err) {
            errcallback();
        } else {
            userModel.aggregate([
                {
                    $lookup: {
                        from: 'albums', localField: 'collect', foreignField: '_id', as: 'albums'
                    }
                },
                {
                    $project: {
                        'albums.introduce': 0
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

            ], (err, users) => {
                if (err) {
                    callback(err);
                } else {
                    callback(null, users, count)
                }
            })
        }
    })
}


module.exports = { removeAlbum, addAlbum, checkUser, addUser, deleteUser, findUsers, updateUser }
