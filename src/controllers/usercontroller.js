
const { authservice } = require('../services/auth.js')
const { blogservices } = require('../services/blogservices.js')
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
    }
    async redgisterpage(req,res){
       res.render('register')
    }
    async loginpage(req,res){
       res.render('login')
    }
   async createuser(req,res){
       const user={
         username: req.body.username,
         password:req.body.password
       }
     
       const response = await this.userser.createuser(user);

       if(response) {
          res.redirect('/blogs')
       } else res.json({
          "success": "false"
       })
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
}

module.exports = usercontroller