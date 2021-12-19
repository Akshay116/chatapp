const Post = require('../models/post');
const Comment = require('../models/comment');// while deleteing 

module.exports.create = function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user._id


         
    },function(err,post){
        if(err){console.log('eror increating post')}

        return res.redirect('back');
    });
}

module.exports.destroy = function(req,res){

    Post.findById(req.params.id,function(err,post){   // params fro route id 
      
         // .id provide by moongoose converts to string while comparing ibj -id 
        if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({ post: req.params.id} ,function(err){
                   return res.redirect('back');
            });


        }else{
             return res.redirect('back');
        }
      

    });

}