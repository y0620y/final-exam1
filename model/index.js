// model
const mongoose = require('mongoose')
mongoose.Promise = require('q').Promise;
let AlbumSchema = {
    album_name: String,
    cover: String,
    public_time: String,
    price: Number,
    singers: [
        { singer_id: String, singer_name: String }
    ]
}
let singerSchema = {
    singer_name: String,
    introduce: String,
    cover: String,
    albums: [
        { album_id: String, album_name: String }
    ]
}
let Customer = { name: String, password: String, root: Number }

mongoose.model("Album", AlbumSchema)
mongoose.model("Singer", singerSchema)
mongoose.model("Customer", Customer)


