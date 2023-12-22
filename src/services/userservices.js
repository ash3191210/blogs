const { JWT_SECRET } = require('../config/envconfig.js');
const {userrepo}=require('../repositories/index.js')
const jwt = require('jsonwebtoken')


class userservices{
    
    constructor(){
       this.newuserrepo = new userrepo();
    }
    
    async createuser(user){
        const isthere = await this.newuserrepo.getuser(user.username);
        if(!isthere ||isthere.length===0){
            const newuser = await this.newuserrepo.create(user);
            return true;
        } 
        else{
            console.error("user does already exist ");
            return false;
        }
        
    }
  async deleteuser(username){
     const response= await this.newuserrepo.deleteuser(username)
     return response;
  }
  async getalluser(){
     const users=await this.newuserrepo.getalluser();
     return users;
  }
  async getuser(name){
     const user=await this.newuserrepo.getuser(name);
     return user;
  }
  async getuserbyid(id){
    const user = await this.newuserrepo.getuserbyid(id);
    return user;
  }
  async updatepassword(name,newpassword){
     const response = await this.newuserrepo.updatepassword(name,newpassword);
     return response;
  }

   createtoken(user_id,username){
     const token = jwt.sign({id:user_id,username},JWT_SECRET,{expiresIn:'1d'})
     return token
  }
   validatetoken(token){
    const response = jwt.verify(token,JWT_SECRET)
    return response;
  }

  async uploadprofilepic(username,url,pid){
    try {
      const response = await this.newuserrepo.uploadprofilepic(username,url,pid);
      return response;
      
    } catch (error) {
       console.error("something wrong in userservices ",error);
       throw(error)
    }
  }
}


module.exports = {userservices};