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
module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title:"chatapp|Sign in"
    })
}