const expres =require('express');
const router = expres.Router();

const userController = require('../controllers/users_controller');
router.get('/profile', userController.profile);

router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);


router.post('/create', userController.create);


module.exports = router;