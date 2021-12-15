const Post = require('../models/post');
module.exports.home = function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);
    

    //  Post.find({},function(err,posts){
       

    //     return res.render('home',{
    //         title:"ChatApp | Home",
    //         posts: posts


    //  });

    
    // });

    // used populate to show specific name from whole user data
    //exec()  in longer query seprate query and call back 

    Post.find({}).populate('user').exec(function(err,posts){

        return res.render('home',{
            title:"ChatApp | Home",
            posts: posts


     });

    })


}

//     return res.end('<h1>Express is running for the  chatapp</h1>')





