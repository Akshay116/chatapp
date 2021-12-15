const expres =require('express');
const router = expres.Router();
const passport = require('passport');


const postController = require('../controllers/posts_controller');


router.post('/create',passport.checkAuthentication, postController.create);


module.exports = router;