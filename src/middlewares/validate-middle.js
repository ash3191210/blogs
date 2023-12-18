const { userservices } = require("../services/userservices")

this.userservices = new userservices()

const validateuser = async(req,res,next)=>{
    try {
        const token=req.cookies.great_token;
        if(!token) {
            return res.render('login')
        }
         const response = this.userservices.validatetoken(token)
        
         req.user={
            username:response.username,
            id: response.id
         }
         next()

    } catch (error) {
        console.log("something wrong in vaildate middleware"+error);
        return res.redirect('/login')
    }
}

module.exports = {validateuser}