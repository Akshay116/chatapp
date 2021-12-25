const { redirect } = require('express/lib/response');
const Comment = require('../models/comment');
const Post = require('../models/post');
// kept it as call back
// adding commnets  
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

module.exports.destroy = function(req,res){
  Comment.findById(req.params.id,function(err,comment){
      if(comment.user == req.user.id){

         let postId = comment.post;//to update it from database of post to 

         comment.remove();

         Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post){
           return res.redirect('back');
         });

      }else{
            return res.redirect('back');

      }

  });
}


