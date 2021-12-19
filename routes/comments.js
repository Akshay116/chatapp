const expres =require('express');
const router = expres.Router();
const passport = require('passport');//checkauthnication while posting in create 


const commentsController = require('../controllers/comments_controller');


router.post('/create',passport.checkAuthentication, commentsController.create);
router.get('/destroy/:id',passport.checkAuthentication,commentsController.destroy);


module.exports = router;