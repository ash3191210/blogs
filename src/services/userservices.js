const {userrepo}=require('../repositories/index.js')

class userservices{
    
    constructor(){
       this.newuserrepo = new userrepo();
    }
    
    async createuser(user){
        const isthere = await this.newuserrepo.getuser(user.username);
        if(!isthere){
            const newuser = await this.newuserrepo.create(user);
        } else console.error("user already exists")
    }
  async deleteuser(username){
      await this.newuserrepo.deleteuser(username)
  }
}


module.exports = userservices;