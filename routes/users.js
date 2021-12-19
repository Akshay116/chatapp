const expres =require('express');
const router = expres.Router();
const passport =require('passport');

const userController = require('../controllers/users_controller');
router.get('/profile/:id',passport.checkAuthentication, userController.profile);
router.post('/update/:id',passport.checkAuthentication,userController.update);

router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);


router.post('/create', userController.create);

//use passport as middleware t auth
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
),userController.createSession);

//sign out desteoy session
router.get('/sign-out',userController.destorySession);

module.exports = router;