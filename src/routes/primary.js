const express = require('express')
const usercontroller= require('../controllers/usercontroller.js');
const { blogcontroller } = require('../controllers/blogcontroller.js');
const { bindusertoreq } = require('../middlewares/login-middleware.js');
const { commentmiddleware } = require('../middlewares/comment-middleware.js');

const cookieparser = require('cookie-parser');
const {validateuser} = require('../middlewares/validate-middle.js');
const { commentcontroller } = require('../controllers/comment-controller.js');
const upload = require('../utilities/multer.js')






const router=express.Router()
router.use(cookieparser())
this.usercont=new usercontroller()
this.blogcontroller=new blogcontroller();
this.commentmiddleware =new commentmiddleware();
this.commentcontroller = new commentcontroller();

 //this.blogrepo.getblogbyauthor('beta')
 

router.get('/',this.usercont.redgisterpage)
router.get('/login',this.usercont.loginpage)
router.post('/',this.usercont.createuser)
router.post('/login',this.usercont.login)
router.get('/all',this.usercont.getalluser)
router.post('/comment',validateuser,this.commentcontroller.comment)
router.get("/blogs",validateuser,this.blogcontroller.getallblogs)
 router.get('/create/blog',validateuser,this.blogcontroller.createblogpage)
 router.post('/create/blog',validateuser,this.blogcontroller.create)
 router.get('/blog/:id',validateuser,this.blogcontroller.getblogbyid)
 router.get('/blog/user/:username',validateuser,this.blogcontroller.getblogbyauthor)
 router.get('/blog/edit/:id',validateuser,this.blogcontroller.blogedit)
 router.post('/blog/edit/:id',validateuser,this.blogcontroller.editblogbyid)
 router.get('/blog/del/:id',validateuser,this.blogcontroller.deleteblogbyid)
 router.post('/user/profile_pic/:username',validateuser,upload.single("profile_pic"),this.usercont.uploadprofilepic)
 router.get('/user/profile_pic/del',validateuser,this.usercont.delprofilepic)
// router.get('/blog/tittle',this.blogcontroller.getblogbytittle)
 


module.exports = router