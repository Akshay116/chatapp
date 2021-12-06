const express = require('express');
const app = express();
const port = 8000;


app.listen(port,function(err){
if(err){
    console.log('error',error in running);
}
else {
    console.log(`server running on port number: ${port}`);//``interpolation 
}
});