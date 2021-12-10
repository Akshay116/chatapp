const User = require('../models/user');


module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title:"user profile"
     });
}

//render sign up
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title:"chatapp| Sign Up"
    })
}
// render sign in
module.exports.signIn = function(req, res){
    return res.render('user_sign_in',{
        title:"chatapp|Sign in"
    })
}
// get the sign up data 
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        console.log('hello');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        console.log('helo');
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            console.log(user);
            return res.redirect('back');

        }

    });
}

// sign in and create session for user 
module.exports.createSession = function(req,res){
    
}