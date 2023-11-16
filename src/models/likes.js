const  mongoose =require('mongoose')

const likeschema = new mongoose.Schema({
   
    likedon:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog'
    },
    count:{
        type:Number,
        default:0
    }
})

const Like = mongoose.model('Like',likeschema);
module.exports = Like;