// model
const mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId;

mongoose.Promise = require('q').Promise;
let AlbumSchema = {
    album_name: String,
    cover: String,
    public_time: String,
    price: Number,
    singers_id: [
        ObjectId
    ]
}
let SingerSchema = {
    singer_name: String,
    introduce: String,
    cover: String
}
let UserSchema = {
    name: String,
    password: String,
    root: Number,
    collect: [
        ObjectId
    ]
}

mongoose.model("Album", AlbumSchema)
mongoose.model("Singer", SingerSchema)
mongoose.model("User", UserSchema)


