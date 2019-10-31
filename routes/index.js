const express=require('express');
const router=express.Router();
const{ ensureAuthenticated, }=require('../config/auth');
 
// render the welcome.ejs file
//the welcome ejs file also cointains the views of the login and register.ejs files
//**note to differentiate between the views and routes**
router.get('/',(req,res)=>res.render('welcome'));
//dashboard
router.get('/dashboard',ensureAuthenticated,(req,res)=>
res.render('dashboard',{
    name:req.user.name
}));



module.exports=router; 