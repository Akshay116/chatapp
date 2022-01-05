const Like = require("../models/like");
const Post = require("../models/post");
const Comment = require("../models/comment");



module.exports.toggleLike = async function(req,res){
    try{

    let likeable;
    let deleted = false;

    if(req.query.type =='Post'){
        likeable = await Post.findById(req.query.id).populate('likes');

    }else{
       likeable = await Comment.findById(req.query.id).populate('likes');
    }
       // check if likes alreday there
         
        let existingLike = await Like.findOne({

            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        })
         // if like exts removing that
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();

            existingLike.remove();
            deleted = true;
        }else{
            //else make one new 
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel:req.query.type
            });
            likeable.likes.push(newLike._id);
            likeable.save();

        }
        return res.json(200,{
            message: "Request successful",
            data: {
                deleted: deleted
            }
        })
         
       





    }catch(err){
        console.log(err);
        return res.json(500,{
            message:'Internal server error'
        });
    }
}