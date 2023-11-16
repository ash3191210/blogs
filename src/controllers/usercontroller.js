const userservices= require('../services/userservices.js')
this.userrservices = new userservices();

const usercontrollerforcreate = async(req,res)=>{
    const user={
       username:req.body.username,
       password:req.body.password
    }
    try{
      const newuser = await this.userrservices.createuser(user);
      res.json({
         "success":"true",
      })  
    }
    catch(er){
      console.log("something wrong in controller")
      console.error(er)
      res.json({
         "success":"false",
      }) 
    }
 }
 const usercontrollerfordelete=async(req,res)=>{
   const username = req.body.username;
   try{
        await this.userrservices.deleteuser(username);
      res.json({
         "success":"true",
      })  
    }
    catch(er){
      console.log("something wrong in controller del")
      console.error(er)
      res.json({
         "success":"false",
      }) 
    }
 }

 module.exports ={
    usercontrollerforcreate,
    usercontrollerfordelete
 };