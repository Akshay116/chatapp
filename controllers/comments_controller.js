const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){

      Post.findById(req.body.post,function(err,post){


        if(post){
            Comment.create({
                content: req.body.content,
                post : req.body.user,
                user:req.user._id

            },function(err,comment){

                  // updateing comment push by facltd by  mongodb
                post.comments.push(comment);
                post.save();// after update save needs to be called 

                res.redirect('/');
                 

            });
        }
        
        

      });

}