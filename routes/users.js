const expres =require('express');
const router = expres.Router();

const userController = require('../controllers/users_controller');
router.get('/profile', userController.profile);

module.exports = router;