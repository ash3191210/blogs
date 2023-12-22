
const { authservice } = require('../services/auth.js')
const { blogservices } = require('../services/blogservices.js')
const {clouduploader,delimgincloudinary} = require('../utilities/cloudinary.js')

const {userservices}= require('../services/userservices.js')
      


class usercontroller{
  
    constructor(){
       this.userser=new userservices()
       this.authservice = new authservice()
       this.blogservices = new blogservices()

      this.createuser=this.createuser.bind(this)
       this.updatepassword=this.updatepassword.bind(this)
      this.deleateuser=this.deleateuser.bind(this)
      this.getalluser=this.getalluser.bind(this)
      this.getuser=this.getuser.bind(this)
      this.login = this.login.bind(this)
      this.uploadprofilepic=this.uploadprofilepic.bind(this);
      this.delprofilepic=this.delprofilepic.bind(this);

    }
    async redgisterpage(req,res){
       res.render('register')
    }
    async loginpage(req,res){
       res.render('login')
    }
   async createuser(req,res){
      try {
         
         const user={
            username: req.body.username,
            password:req.body.password,
            email:req.body.email
          }
        
          const response = await this.userser.createuser(user);
   
          if(response) {

            const username = req.body.username;
            const password =req.body.password;
            const token = await this.authservice.signin(username,password);
            res.cookie('great_token',token,{maxAge:900000}) 

             res.redirect('/blogs');

          } else {
             throw({error:"something wrong in usercontroller"})
          }

      } catch (error) {
         console.error("something wrong in usercontroller",error);
         throw(error)
      }
   }
   async updatepassword(req,res){
      const username=req.body.username;
      const newpassword=req.body.password;

      const response=await this.userser.updatepassword(username,newpassword);
    
      if(response) {
         res.json({
           "success":"true"
         })
      } else res.json({
         "success": "false"
      })
   }
 
   async deleateuser(req,res){
       const username=req.body.username;

       const response = await this.userser.deleteuser(username);
       if(response) {
         res.json({
           "success":"true"
         })
      } else res.json({
         "success": "false"
      })
   }
   
   async getalluser(req,res){
       const response = await this.userser.getalluser();
       res.json({
         "success":"true"
       })
   }

   async getuser(req,res){
      const username=req.body.username;
      const response = await this.userser.getuser(username);
      res.json({
        "success":"true"
      })
   }
   async login(req,res){
     try {
      const username = req.body.username;
      const password =req.body.password;
      const token = await this.authservice.signin(username,password);
      res.cookie('great_token',token,{maxAge:900000})
      res.redirect('/blogs')
     }
     
     
     catch (error) {
       console.log(error)
        res.redirect('/login')
     }
  }
  async uploadprofilepic(req,res){
     try {
        const response = await clouduploader(req.file.path);
        const username = req.user.username;
        const url = response.url;
        const public_id=response.public_id;
        const oldinfo = await this.userser.getuser(username);

        const result = await this.userser.uploadprofilepic(username,url,public_id);

        if(oldinfo.image_public_id!=null){
         console.log("enterne ")
              const delres= await delimgincloudinary(oldinfo.image_public_id)
              console.log("delres:  ",delres)
        }

        res.redirect('/blogs')
      
     } catch (error) {
        console.error("somethig wrong in usercontroller",error);
        throw(error)
     }
  }
 async delprofilepic(req,res){
    try {
   
     const oldinfo = await this.userser.getuser(req.user.username);
      const result = await delimgincloudinary(oldinfo.image_public_id);
      const defaulturl="https://qph.cf2.quoracdn.net/main-qimg-2b21b9dd05c757fe30231fac65b504dd";
      console.log('result : ',result)
      
      const updatedinfo = await this.userser.uploadprofilepic(req.user.username,defaulturl,null);
    
      res.redirect('/blogs')
       
    } catch (error) {
        console.error("something wrong in usercontroller ",error);
        throw(error)
    }
 }



}

module.exports = usercontroller