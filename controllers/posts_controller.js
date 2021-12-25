const Post = require('../models/post');
const Comment = require('../models/comment'); // while deleteing 


module.exports.create = async function (req, res) {

    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        return res.redirect('back');
    } catch (err) {
        console.log('error', err);
        return;

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
            return res.redirect('back');
        } else {
            return res.rediect('back');
        }

    } catch (err) {
        console.log('error', err);
        return;
    }






}