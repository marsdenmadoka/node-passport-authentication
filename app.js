
//all te views and routes must be called inside the main file running the application in order to avoid the can get error when running the application
const express=require('express');
const expressLayouts=require('express-ejs-layouts');
const mongoose=require('mongoose');
const flash=require('connect-flash');
const session=require('express-session');
const passport=require('passport');
const ejsLint = require('ejs-lint');
const app=express();

//passport config
require('./config/passport')(passport);
//DB config
mongoose.connect('mongodb://localhost:27017/nodepassportauth',{useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology: true}); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}) 


//EJS (middleware)
//the views are called and passed using the middlware using the view engine
app.use(expressLayouts);
app.set('view engine', 'ejs');
//Bodyparser
app.use(express.urlencoded({extended:false}));
//express session middleware keeping cookies
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
    

}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash middleware
app.use(flash());
//global variable colours displays 
app.use((req, res, next)=>{
res.locals.success_msg=req.flash('success_msg');
res.locals.error_msg=req.flash('error_msg');
res.locals.error_msg=req.flash('error');
next();
});
//routes
//note routes files are called by use of the require and they must be exported using the export in their origin export rule
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));
const PORT = process.env.PORT || 4000;
  app.listen(PORT, console.log(`server started on port ${PORT}`));
