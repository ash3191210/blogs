const cloudinary = require('cloudinary').v2
const {API_KEY,API_SECRET,CLOUD_NAME} = require('../config/cloudinary_config.js')
const fs =require('fs')


          
cloudinary.config({ 
  cloud_name: CLOUD_NAME, 
  api_key:API_KEY , 
  api_secret: API_SECRET 
});


const clouduploader = async(localfilepath)=>{
   try{
     const response=await cloudinary.uploader.upload(localfilepath);
     fs.unlink(localfilepath,(err)=>{
       if(err){
         console.log("unable to unlink ",err)
       } else {
          console.log("successfully unlinked file !!")
       }
     })
     return response;
     

   } catch(er){
     console.log("something went wrong in cloudinary : ")
     console.log("error :: ",er)
   }
}


const delimgincloudinary = async(public_id)=>{
     try {
         const response = await cloudinary.uploader.destroy(public_id);
         return response;
     } catch (error) {
      console.log("something went wrong in cloudinary (delete): ")
      console.log("error :: ",error)
     }
}
module.exports ={ clouduploader,delimgincloudinary}