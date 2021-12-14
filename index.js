const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts =require('express-ejs-layouts');
const db = require('./config/mongoose');
//for session cookie
const session = require('express-session');//express-session
const passport = require('passport');
const passportlocal = require('./config/passport-local-strategy');
const { Mongoose } = require('mongoose');
// const { MongoDBStore } = require('connect-mongodb-session');

 const MongoStore = require('connect-mongo');//(session);
 const sassMiddleware = require('node-sass-middleware');

 app.use(sassMiddleware({
   src:'./assets/scss',
   dest:'./assets/css',
   debug:true,
   outputStyle:' extended',
   prefix:'/css'
 }));




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

// mongo stor is used to store session cookie in db
app.use(session({
    name: 'chatapp',
    // change secret befor e deploy in production mode 
    secret:'something',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create(
       {
          mongoUrl:'mongodb://localhost/db', //method changed after express 4 documentaion on github/stackoverfllow
         autoRemove:'disabled'
        },
        function(err){
                    console.log(err || 'connect mongo setup ok');
                }

    )
    //store:  new MongoStore(
    //     {
            
        
    //        mongoConnection : db,
    //        autoRemove:'disabled'
        
    //     },
    //     function(err){
    //         console.log(err || 'connect mongo setup ok');
    //     }
    // )


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