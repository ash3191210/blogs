const mongoose=require('mongoose')

const connectDB = async(url)=>{
    try{
        const conn=await mongoose.connect(url)
        console.log("successfully connected to DB")
    } catch(er){
        console.log("something is wrong in DB conn")
        console.log(er)
    }
}
module.exports ={
    connectDB
}