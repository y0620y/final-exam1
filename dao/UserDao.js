//dao/UserDao.js v1
const mogoose = require('mongoose')
let userModel = mogoose.model("User")

// 新增
function addUser(user, callback, errcallback) {
    userModel.findOne({ name: user.name }, function (err, doc) {
        if (err) {
            errcallback('网络异常')
        } else if (doc) {
            errcallback('用户名已存在,请重新输入')
        } else {
            userModel.create(user, function (err, newUser) {
                if (err) {
                    errcallback('网络异常')
                } else {
                    callback(newUser.toObject())
                }
            })
        }
    });
}

// 登录验证
function checkUser(user, root, callback, errcallback) {
    userModel.findOne({ name: user.name }, function (err, doc) {
        if (err) {
            errcallback('网络异常')
        } else if (doc) {
            if (user.password === doc.password) {
                // root为admin，是管理端登录
                if (root === 'admin') {
                    if (doc.root === 1) {
                        callback(doc)
                    } else {
                        errcallback('用户没有管理权限')
                    }
                } else {
                    callback(doc)
                }
            }
            else {
                errcallback('密码错误,请重新输入')
            }
        } else {
            errcallback('用户名不存在,请重新输入')
        }
    });
}


//删除
function deleteUser(id, callback, errcallback) {
    userModel.findByIdAndRemove(id, function (err) {
        if (err) {
            errcallback()
        } else {
            callback({})
        }
    })
}

// 修改
function updateUser(user, callback, errcallback) {
    let id = user._id;
    let newUser = { $set: user };
    userModel.findByIdAndUpdate(id, newUser, function (err) {
        if (err) {
            errcallback()
        } else {
            callback(user)
        }
    })
}

//查询
function findUsers(params, callback, errcallback) {
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
                        'albums.price': 0,
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

            ], (err, users) => {
                if (err) {
                    errcallback();
                } else {
                    callback(users, count)
                }
            })
        }
    })
}



module.exports = { checkUser, addUser, deleteUser, findUsers, updateUser }
