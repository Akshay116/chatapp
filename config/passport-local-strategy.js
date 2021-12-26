const passport = require("passport");

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//aunthentication using passport
passport.use(new LocalStrategy({

        usernameField: 'email',
        passReqToCallback:true // used for flash message
    },
    function (req, email, password, done) {
        // find user and establish identity
        User.findOne({
            email: email
        }, function (err, user) {
            if (err) {
                req.flash('error', err);
                return done(err);
            }
            if (!user || user.password != password) {
                req.flash('error', 'Invalid Username/Password');
                return done(null, false);
            }
            return done(null, user);
        });

    }


));

// serializing user to decide which key is to be kept in cookie

passport.serializeUser(function (user, done) {
    done(null, user.id);

});



// deserializing the user from the key in cookies

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log('eror in finding user ');
            return done(err);
        }
        return done(null, user);
    });
});

//check if user isauthenticated
passport.checkAuthentication = function (req, res, next) {
    // if user signed in pass on requedt to next controoler action
    if (req.isAuthenticated()) {
        return next();

    }
    //if user is not signed in
    return res.redirect('/user/sign-in');


}
passport.setAuthenticatedUser = function (req, res, next) {

    if (req.isAuthenticated()) {
        //req.user conatins current signed in user from session cookie and wer sending this to local for views 
        res.locals.user = req.user;
    }
    next(); //user signed out if server restarted user session data is tempearory stored 
}


module.exports = passport;