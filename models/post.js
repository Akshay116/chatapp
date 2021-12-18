const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    content: {
        type:String,
        required:true
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'

    },

    // include arry of id of all comment i n this post schema so its easy to fetch 
     
    comments : [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'comment'
        }
    ]


},
{

  timestamps:true
   
});
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
