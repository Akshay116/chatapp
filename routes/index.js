const express =require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller');
router.get('/',homeController.home);

router.use('/users',require('./users'));//request for users 

router.use('/posts',require('./posts'));//for posts

router.use('/comments',require('./comments'));

router.use('/api',require('./api'));
router.use('/likes',require('./likes'));



module.exports = router;