const { userservices } = require("../services/userservices");


class authservice {
   constructor(){
      this.userservices = new  userservices();
   }
   async signup(user){
      try{
       const response = await this.userservices.createuser(user);
       const token = this.userservices.createtoken(response._id,response.username);
       return token
      }

      catch(er){
         console.log("something wrong in sign up");
         throw er;
      }
   }

   async signin(username,password){
      try {
        const response = await this.userservices.getuser(username)
        if(response.password==password){
            const token = this.userservices.createtoken(response._id,username)
            return token
        }
        else{
          throw {error:"no password match"}
        }
      } catch (er) {
         console.log("something wrong in signin")
         throw er
      }
   }
  
}
module.exports  ={authservice}