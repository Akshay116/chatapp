const express = require('express');
const app = express();
const port = 8000;


// using expres router
app.use('/',require('./routes'));



//set up view engine 
app.set('view engine','ejs');
app.set('views', './views');



app.listen(port,function(err){
if(err){
    console.log('error',error in running);
}
{
    console.log(`server running on port number: ${port}`);//``interpolation 
}
});