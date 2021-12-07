const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/chatapp_devlopment');


const db = mongoose.connection;

db.on('err',console.error.bind(console,"Error conncting Mongodb"));


db.once('open',function(){
  console.log('connected to Database : MongoDB');
});


module.exports = db;