const express = require('express')
const usercontroller= require('../controllers/usercontroller.js');
const { blogcontroller } = require('../controllers/blogcontroller.js');

const router=express.Router()
this.usercont=new usercontroller()
this.blogcontroller=new blogcontroller();

router.get('/',(req,res)=>{
    res.send("working fine")

    
})

router.post('/user', this.usercont.createuser)
router.post('/del',this.usercont.deleateuser)
router.post('/update',this.usercont.updatepassword)
router.get('/all',this.usercont.getalluser)
router.get('/user/one',this.usercont.getuser)
router.post('/blog',this.blogcontroller.create)


module.exports = router