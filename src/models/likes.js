const  mongoose =require('mongoose')

const likeschema = new mongoose.Schema({
   
    likedby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    
    count:{
        type:Number,
        default:0
    }
},{timestamps:true})

const Like = mongoose.model('Like',likeschema);
module.exports = Like;