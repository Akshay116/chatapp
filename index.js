const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts =require('express-ejs-layouts');
const db = require('./config/mongoose');
//for session cookie
const session = require('express-session');//
const passport = require('passport');
const passportlocal = require('./config/passport-local-strategy');




app.use(express.urlencoded({extended : false}));
app.use(express.json());

 app.use(cookieParser());


app.use(express.static('./assets'));

//ejs layouts 
app.use(expressLayouts);

//extract styles nd scripts from sub pages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);








//set up view engine 
app.set('view engine','ejs');
app.set('views', './views');

app.use(session({
    name: 'chatapp',
    // change secret befor e deploy in production mode 
    secret:'something',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge:(1000*60*100)
    }


}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
// using expres router

app.use('/',require('./routes'));



app.listen(port,function(err){
if(err){
    console.log('error',error in running);
}
{
    console.log(`server running on port number: ${port}`);//``interpolation 
}
});