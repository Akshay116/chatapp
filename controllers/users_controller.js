const User = require('../models/user');
const fs = require('fs');
const path = require('path');


module.exports.profile = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        return res.render('user_profile', {
            title: "user profile",
            profile_user: user
        });
    });

}

//update profile

module.exports.update = async function (req, res) {
   
    if (req.user.id == req.params.id) {
        try {
            let user = await User.findById(req.params.id);
            // console.log('insilde update');
            User.uploadedAvatar(req, res, function (err) {
                if (err) {
                    console.log('***Multer Error:', err);
                }

                console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file) {
                      if(user.avatar){
                          fs.unlinkSync(path.join(__dirname,'..',user.avatar));

                      }//if deleted and reuploaded link not found error 

                    //saving the path of uploaded file (profile) into avatar field in user 
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }

                user.save();
                return res.redirect('back');

            });
        } catch (err) {
            req.flash('error', err);
            return res.rediect('back');
        }

    } else {
        req.flash('error', 'unauthorized');
        return res.status(401).send('Unauthorized');
    }


}

//render sign up
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "chatapp| Sign Up"
    })
}
// render sign in
module.exports.signIn = function (req, res) {
    //to prevent to go to sign in if alreay signed in 
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title: "chatapp|Sign in"
    })
}

// get the sign up data 
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        console.log('hello');
        return res.redirect('back');
    }

    User.findOne({
        email: req.body.email
    }, function (err, user) {
        console.log('helo');
        if (err) {
            console.log('error in finding user in signing up');
            return
        }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log('error in creating user while signing up');
                    return
                }

                return res.redirect('/users/sign-in');
            })
        } else {
            console.log(user);
            return res.redirect('back');

        }

    });
}

// sign in and create session for user 
module.exports.createSession = function (req, res) {
    req.flash('success', 'Succesfully logged in');
    return res.redirect('/');
}
//sign-out 
module.exports.destorySession = function (req, res) {
    req.logout(); //using passport js 
    req.flash('success', 'Succesfully logged out');
    return res.redirect('/');
}