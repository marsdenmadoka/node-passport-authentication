const express=require('express');
const route=expres.Router();
const bcrypt=require('bcryptjs');
const passport=require('passport');
 //User model
 const User=require('../models/User ');
//Login page rendering
//refer to welcome.ejs to see how the login and register views are called
router.get('/login',(req,res)=>res.render('login'))
//Register page rendering
router.get('/register',(req,res)=>res.register('register'))
//register handle
router.post('/register',(req,res)=>{
const{name,email,password,password2}=req.body; 

let errors=[];
//check required fields 
if(!name||!email||!password||!password2){
 errors.push({msg:'please fill in all field'}); 
}  
 //check passwords match
 if(password !== password2){
     errors.push({msg:'password dont match'});
 
}
//check password length for our case six characters long
if(password.length<6){
    errors.push({msg:'password to short'})
}
if(errors.lenght>0){
res.render('register',{
    errors,
    name,
    email,
    password,
    password2,
});
}else{
    //validation passed
    User.findOne({email:email})
    .then(user=>{
        if(user){
         //User exists 
         errors.push({msg:'Email is already registered'}); 
         res.render('register',{
             errors,
             name,
             email,
             password,
             password2
             
         }) ;
        }else{
const newUser=new User({
name,
email,
password,



});
//hash password
bcrypt.genSalt(10,(err, salt)=>bcrypt.hash(newUser.password,salt,()=>{
    if(err) throw err;
    //set password to hashed
    newUser.password=hash;
    //save user
    newUser.save()
    .then(user=>{
        req.flash('success_msg','your are now registered and can login');
      res.redirect('/users/login');
    })
    .catch(err=> console.log(err)); 

}))
        }


    });
     
     
}
});

//login  handle
router.post('/login',(req, res, next)=>{
    passport.authenticate('local',{
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
    })(req, res, next);
});
//Logout handler 
router.get('/logout',(req, res)=>{
req.logout();
req.flash('success_msg','your are logged out');
res.redirect('/users/login');

});
module.export=router;
 