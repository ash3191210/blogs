const User= require('../models/usermodels.js')

class userrepo{
    
   async create(user){
      try{
        const newuser = new User(user);
        const response = await newuser.save()
        console.log("response  : ",response)
     }
     catch(er){
        console.log("something wrong in user creation ")
        throw (er.User)
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
            const query={username:name}
            const newpassword={password:pass}
            const updateuser= await User.findOneAndUpdate(query,newpassword)
        }
        catch(er){
           console.log("something wrong in updating user ")
           console.error(er);
        }
 }
 async deleteuser(name){
    try{
        const updateuser= await User.findOneAndDelete({username:name})
    }
    catch(er){
       console.log("something wrong in deleating user")
       console.error(er);
    }
 }

}
module.exports = userrepo