const expres =require('express');
const router = expres.Router();


const postController = require('../controllers/posts_controller');


router.post('/create',postController.create);


module.exports = router;