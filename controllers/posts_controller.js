const Post = require('../models/post');
const Comment = require('../models/comment'); // while deleteing 


module.exports.create = async function (req, res) {

    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        if(req.xhr){
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created"
            });
        }
        req.flash('success','Post published');
        return res.redirect('back');
    } catch (err) {
        req.flash('error',err);
        console.log('error', err);
        return res.redirect('back');

    }

}


// converting- callbaks to asyn await 
// deete post 
module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id)

        if (post.user == req.user.id) {
            post.remove();

            await Comment.deleteMany({
                post: req.params.id
            });
            if(req.xhr){
                return res.status(200).json({

                    data: {
                        post_id: req.params.id
                    },
                    message:"Post deleted"

                })           
             }


            req.flash('success','post and respective comments deleted');
            return res.redirect('back');
        } else {
            req.flash('error','you cant dlete this post ');
            return res.rediect('back');
        }

    } catch (err) {
        req.flash('error',err);
        return res.rediect('back');
    }






}