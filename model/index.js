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
let singerSchema = {
    singer_name: String,
    introduce: String,
    cover: String
}
let Customer = { name: String, password: String, root: Number }

mongoose.model("Album", AlbumSchema)
mongoose.model("Singer", singerSchema)
mongoose.model("Customer", Customer)


