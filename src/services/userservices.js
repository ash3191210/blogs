const {userrepo}=require('../repositories/index.js')

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
  async updatepassword(name,newpassword){
     const response = await this.newuserrepo.updatepassword(name,newpassword);
     return response;
  }
}


module.exports = {userservices};