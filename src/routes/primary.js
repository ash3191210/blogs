const express = require('express')
const {usercontrollerforcreate,usercontrollerfordelete}=
 require('../controllers/usercontroller.js');

const router=express.Router()

router.get('/',(req,res)=>{
    res.send("working fine")
})

router.post('/user',usercontrollerforcreate)
router.post('/del/user',usercontrollerfordelete)


module.exports = router