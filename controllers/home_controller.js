const Post = require('../models/post');
const User = require('../models/user');


module.exports.home = async function (req, res) {

    try {

        let posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'

                }
            });

        let users = await User.find({});


        return res.render('home', {
            title: "ChatApp | Home",
            posts: posts,
            all_users: users


        });
    } catch (err) {
        console.log('error', err);
        return;
    }
}

//before excec callback hell like 
// .exec(function (err, posts) {

//     User.find({}, function (err, users) {
//         return res.render('home', {
//             title: "ChatApp | Home",
//             posts: posts,
//             all_users: users


//         });


//     });


// })
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

//     return res.end('<h1>Express is running for the  chatapp</h1>')