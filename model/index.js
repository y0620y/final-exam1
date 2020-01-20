// model
const mongoose=require('mongoose')
mongoose.Promise=require('q').Promise;
let AlbumSchema={
    album_name:String,
    singers:String,
    cover:String,
    public_time:String,
    price:Number,
    singers:[
        { singer_id: String, singer_name: String }
    ]
}
let Customer={name:String,password:String,score:Number}

mongoose.model("Album",AlbumSchema)
mongoose.model("Customer",Customer)


