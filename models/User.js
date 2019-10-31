const mongoose=require('mongoose');

//this is what is stored in the our mongodb
//we define what we want to store in our mongodb using the schema method
//mongoose must e included our start file refer to app.js
const UserSchema=new mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
date:{
    type:Date,
    Default:Date.now
}
});
const User=mongoose.model('User',UserSchema);
module.exports=User;