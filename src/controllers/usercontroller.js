
const {userservices}= require('../services/userservices.js')
      


class usercontroller{
  
    constructor(){
       this.userser=new userservices()

      this.createuser=this.createuser.bind(this)
       this.updatepassword=this.updatepassword.bind(this)
      this.deleateuser=this.deleateuser.bind(this)
      this.getalluser=this.getalluser.bind(this)
      this.getuser=this.getuser.bind(this)
    }
   async createuser(req,res){
       const user={
         username: req.body.username,
         password:req.body.password
       }
     
       const response = await this.userser.createuser(user);

       if(response) {
          res.json({
            "success":"true"
          })
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
       console.log(response)
       res.json({
         "success":"true"
       })
   }

   async getuser(req,res){
      const username=req.body.username;
      const response = await this.userser.getuser(username);
      console.log(response)
      res.json({
        "success":"true"
      })
   }
}

module.exports = usercontroller