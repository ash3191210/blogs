const mongoose = require('mongoose')

const userschema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:"https://qph.cf2.quoracdn.net/main-qimg-2b21b9dd05c757fe30231fac65b504dd"
    },
    image_public_id:{
        type:String,
        default:null
    },
    email:{
        type:String,
    },
    comments:[
        {   type:mongoose.Schema.Types.ObjectId,
            ref:'Comment',
        }
    ],
    likes:{
        type:mongoose.Schema.Types.ObjectId,
            ref:'Like',
    }
},{timestamps:true})

const User = mongoose.model('User',userschema);
module.exports = User