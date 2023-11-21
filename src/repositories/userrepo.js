const User= require('../models/usermodels.js')

class userrepo{
    
   async create(user){
      try{
        const newuser = new User(user);
        const response = await newuser.save()
        
     }
     catch(er){
        console.log("something wrong in user creation ")
        throw (er)
     }
   }

   async getalluser(){
    try{
        const users = await User.find({});
        return users;
    }
    catch(er){
       console.log("something wrong in all user getting ")
       console.error(er);
    }
  }
  async getuser(name){
    try{
        const user = await User.findOne({username:name});
        return user;
    }
    catch(er){
       console.log("something wrong in getting the user ")
       console.error(er);
    }
  }
 async updatepassword(name,pass){
        try{
          
            const updateuser= await User.findOneAndUpdate({username:name},{$set:{password:pass}},{new:true})
            //console.log("at repo layer : ",updateuser)
            
            return updateuser;
        }
        catch(er){
           console.log("something wrong in updating user ")
           console.error(er);
           return false;
        }
 }
  async getuserbyid(id){
    try{
       const user= await User.findById(id).exec();
       return  user;
    }
    catch(er){
       console.log(er);
       return er ;
    }
  }

 async deleteuser(name){
    try{
        const updateuser= await User.findOneAndDelete({username:name})
        return updateuser;
    }
    catch(er){
       console.log("something wrong in deleating user")
       console.error(er);
       return false;
    }
 }

}
module.exports = userrepo